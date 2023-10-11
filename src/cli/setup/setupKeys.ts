import { SolvConfig } from '@/types/solvTypes'
import { spawnSync } from 'child_process'
import { existsSync } from 'fs'

export const setupKeys = async () => {
  try {
    if (existsSync(SolvConfig.TESTNET_VALIDATOR_KEYFILE)) return
    const cmds = [
      `solana-keygen new --no-bip39-passphrase --outfile ${SolvConfig.VALITATOR_AUTHORITY_KEYFILE}`,
      `solana-keygen new --no-bip39-passphrase --outfile ${SolvConfig.VALIDATOR_VOTE_KEYFILE}`,
      `solana-keygen new --no-bip39-passphrase --outfile ${SolvConfig.TESTNET_VALIDATOR_KEYFILE}`,
      `solana-keygen new --no-bip39-passphrase --outfile ${SolvConfig.MAINNET_VALIDATOR_KEYFILE}`,
      `solana config set --keypair ${SolvConfig.TESTNET_VALIDATOR_KEYFILE}`,
      `solana config set --url ${SolvConfig.DEFAULT_SOLANA_NETWORK}`,
      `solana airdrop 1`,
      `solana create-vote-account ${SolvConfig.VALIDATOR_VOTE_KEYFILE} ${SolvConfig.TESTNET_VALIDATOR_KEYFILE} ${SolvConfig.VALITATOR_AUTHORITY_KEYFILE} --commission 10`,
    ]
    for (const cmd of cmds) {
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    }
    return true
  } catch (error) {
    throw new Error(`setupKeys Error: ${error}`)
  }
}
