import { NETWORK_TYPES } from '@/config/config'
import { readOrCreateDefaultConfig } from '@/lib/readOrCreateDefaultConfig'
import { spawnSync } from 'child_process'

export const delegateStake = async (
  stakeAccountPubkey: string,
  validatorVoteAccountPubkey: string,
) => {
  try {
    const config = readOrCreateDefaultConfig()
    const authorityKeyPath =
      config.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
        ? '~/testnet-authority-keypair.json'
        : '~/mainnet-authority-keypair.json'
    const cmd = [
      `solana delegate-stake ${stakeAccountPubkey} ${validatorVoteAccountPubkey} --stake-authority ${authorityKeyPath} --url ${config.config.SOLANA_NETWORK}`,
    ]
    spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`delegateStake: ${error}`)
  }
}
