import {
  TESTNET_VALIDATOR_KEYFILE,
  MAINNET_VALIDATOR_KEYFILE,
  VALIDATOR_VOTE_KEYFILE,
  VALITATOR_AUTHORITY_KEYFILE,
} from '@/index'
import { spawnSync } from 'child_process'
import * as dotenv from 'dotenv'
import { existsSync } from 'fs'
import { airdrop } from './airdrop'
dotenv.config()

const SOL_NETWORK = process.env.SOL_NETWORK || 'testnet'

export const setupKeys = async () => {
  try {
    if (existsSync(TESTNET_VALIDATOR_KEYFILE)) return
    const cmds = [
      `solana-keygen new --no-bip39-passphrase --outfile ${VALITATOR_AUTHORITY_KEYFILE}`,
      `solana-keygen new --no-bip39-passphrase --outfile ${VALIDATOR_VOTE_KEYFILE}`,
      `solana-keygen new --no-bip39-passphrase --outfile ${TESTNET_VALIDATOR_KEYFILE}`,
      `solana-keygen new --no-bip39-passphrase --outfile ${MAINNET_VALIDATOR_KEYFILE}`,
      `solana config set --keypair ${TESTNET_VALIDATOR_KEYFILE}`,
      `solana config set --url ${SOL_NETWORK}`,
      `solana airdrop 1`,
      `solana create-vote-account ${VALIDATOR_VOTE_KEYFILE} ${TESTNET_VALIDATOR_KEYFILE} ${VALITATOR_AUTHORITY_KEYFILE} --commission 10`,
    ]
    cmds.forEach((cmd) => {
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
    return true
  } catch (error) {
    throw new Error(`setupKeys Error: ${error}`)
  }
}
