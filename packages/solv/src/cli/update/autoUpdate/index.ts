import getSolvVersion from '@/cli/epochTimer/getSolvVersion'
import {
  CONFIG,
  getAllKeyPaths,
  NETWORK_TYPES,
  NODE_RESTART_REQUIRED,
} from '@/config/config'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { sendDiscord } from '@/lib/sendDiscord'
import { spawnSync } from 'child_process'
import waitCatchup from './waitCatchup'

// const NODE_RESTART_REQUIRED = false
// This is a global variable that is not defined in this file
// It is defined in packages/solv/src/cli/config/config.ts
// Please DO NOT forget to turn this to false if it's not needed

const autoUpdate = async (solvConfig: ConfigParams) => {
  if (!solvConfig.config.AUTO_UPDATE) {
    return false
  }
  const isMainnet = solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.MAINNET
  const { mainnetValidatorKey, testnetValidatorKey } = getAllKeyPaths()
  const validatorKey = isMainnet ? mainnetValidatorKey : testnetValidatorKey
  const solanaVersion = isMainnet
    ? CONFIG.MAINNET_SOLANA_VERSION
    : CONFIG.TESTNET_SOLANA_VERSION
  // Run the update command
  spawnSync(`solv update`, { stdio: 'inherit', shell: true })
  const isUpdateRequired = NODE_RESTART_REQUIRED
    ? solvConfig.config.AUTO_RESTART
    : false
  const msg = `✨ solv updated to the latest version
Validator Address: ${validatorKey}
solv Version: ${getSolvVersion()}
Solana Version: ${solanaVersion}
Network: ${isMainnet ? 'Mainnet' : 'Testnet'}
isNodeRestartRequired: ${isUpdateRequired}
`
  await sendDiscord(msg)

  if (NODE_RESTART_REQUIRED && solvConfig.config.AUTO_RESTART) {
    // Restart the node
    const msg = `🔄 Node Restart Required 🔄
⏳ Restarting...
This will take a few minutes to catch up...
※ sometimes it may take longer than expected    
`
    await sendDiscord(msg)
    spawnSync(`solv update -b`, { stdio: 'inherit', shell: true })
    await sendDiscord(`✔️ Your Node has been restarted\nNow Catching up...`)
    // Wait for the node to catch up
    const catchup = await waitCatchup(solvConfig)
    if (catchup) {
      await sendDiscord(`🚀 Your Node has caught up!`)
    }
    return catchup
  }
  return true
}

export default autoUpdate
