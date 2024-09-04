import getSolvVersion from '@/cli/epochTimer/getSolvVersion'
import {
  CONFIG,
  getAllKeyPaths,
  NODE_RESTART_REQUIRED_MAINNET,
  NODE_RESTART_REQUIRED_TESTNET,
} from '@/config/config'
import { sendDiscord } from '@/lib/sendDiscord'
import { spawnSync } from 'child_process'
import waitCatchup from './waitCatchup'
import { getSolanaAddress } from '@/lib/getSolanaAddress'
import sleep from '@/lib/sleep'
import { DefaultConfigType } from '@/config/types'
import { Network } from '@/config/enums'

// NODE_RESTART_REQUIRED_MAINNET/TESTNET is a boolean
// This is a global variable that is not defined in this file
// It is defined in packages/solv/src/cli/config/config.ts
// Please DO NOT forget to turn this to false if it's not needed

const autoUpdate = async (config: DefaultConfigType) => {
  const isMainnet = config.NETWORK === Network.MAINNET
  const { mainnetValidatorKey, testnetValidatorKey } = getAllKeyPaths()
  const validatorKey = isMainnet ? mainnetValidatorKey : testnetValidatorKey
  const solanaVersion = isMainnet
    ? CONFIG.MAINNET_SOLANA_VERSION
    : CONFIG.TESTNET_SOLANA_VERSION
  // Notify the user about the update
  let isUpdateRequired = isMainnet
    ? NODE_RESTART_REQUIRED_MAINNET
    : NODE_RESTART_REQUIRED_TESTNET
  isUpdateRequired = isUpdateRequired && config.AUTO_RESTART
  const address = getSolanaAddress(validatorKey)
  const msg = `=== ✨ solv updated to the latest version ✨ ===
Validator Address: ${address}
solv Version: ${getSolvVersion()}
Solana Version: ${solanaVersion}
Network: ${isMainnet ? 'Mainnet' : 'Testnet'}
isNodeRestartRequired: ${isUpdateRequired}
`
  await sendDiscord(msg)

  if (isUpdateRequired) {
    // Restart the node
    const msg = `== ⏳ Restarting the Node ⏳ ==
Address: ${address}
This will take a few minutes to catch up...
※ sometimes it may take longer than expected    
`
    await sendDiscord(msg)
    try {
      spawnSync(`solv update -b`, { stdio: 'inherit', shell: true })
    } catch (error) {
      const errorMsg = `❌ Error in restarting the node
Address: ${address}
Error: ${error}`
      await sendDiscord(errorMsg)
      return false
    }
    const restartMsg = `== 🙆 Your Node has been restarted! ==
Address: ${address}
Now Catching up... 🚛💨
`
    await sendDiscord(restartMsg)
    await sleep(180 * 1000)
    // Wait for the node to catch up
    const catchup = await waitCatchup(config)
    if (catchup) {
      const msg = `== 🟢 Your Node has caught up! ==
Address: ${address}
✨ Auto Update Completed ✨
`
      await sendDiscord(msg)
    }
    return catchup
  }
  return true
}

export default autoUpdate
