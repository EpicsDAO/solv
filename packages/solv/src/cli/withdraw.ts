import { NETWORK_TYPES } from '@/config/config'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { execSync, spawnSync } from 'node:child_process'

export const withdraw = (solvConfig: ConfigParams) => {
  const validatorKeypair =
    solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
      ? '~/testnet-validator-keypair.json'
      : '~/mainnet-validator-keypair.json'
  const authorityKeypair =
    solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
      ? '~/testnet-authority-keypair.json'
      : '~/mainnet-authority-keypair.json'
  const voteAccount =
    solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
      ? '~/testnet-vote-account.json'
      : '~/mainnet-vote-account.json'
  const votePubkey = execSync(`solana address ${voteAccount}`).toString()
  const targetPubkey = execSync(`solana address ${authorityKeypair}`).toString()
  const cmd = `solana withdraw-from-vote-account -k ${validatorKeypair} --commitment finalized ${votePubkey} ${targetPubkey} 1 --authorized-withdrawer ${authorityKeypair}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
