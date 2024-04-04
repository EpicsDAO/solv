import { NETWORK_TYPES } from '@/config/config'
import { readOrCreateDefaultConfig } from '@/lib/readOrCreateDefaultConfig'
import { spawnSync } from 'child_process'

export const deactivateStake = async (stakeAccountPubkey: string) => {
  try {
    const config = readOrCreateDefaultConfig()
    const authorityKeyPath =
      config.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
        ? '~/testnet-authority-keypair.json'
        : '~/mainnet-authority-keypair.json'
    const cmd = `solana deactivate-stake ${stakeAccountPubkey} --stake-authority ${authorityKeyPath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`deactivateStake: ${error}`)
  }
}
