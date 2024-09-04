import { Network } from '@/config/enums'
import readConfig from '@/config/readConfig'
import { spawnSync } from 'child_process'

export const deactivateStake = async (stakeAccountPubkey: string) => {
  try {
    const config = await readConfig()
    const authorityKeyPath =
      config.NETWORK === Network.TESTNET
        ? '~/testnet-authority-keypair.json'
        : '~/mainnet-authority-keypair.json'
    const cmd = `solana deactivate-stake ${stakeAccountPubkey} --stake-authority ${authorityKeyPath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`deactivateStake: ${error}`)
  }
}
