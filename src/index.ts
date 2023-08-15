import dotenv from 'dotenv'
import { Command } from 'commander'
import { VERSION } from '@/lib/version'
import {
  logCommands,
  releaseCommands,
  stopCommand,
  updateCommands,
} from './cli'
import { stakeCommands } from './cli/stake'
import { dfCommands } from './cli/df'
import { setupCommands } from './cli/setup'
import { checkCommpands } from './cli/check'
dotenv.config()

export const USER = process.env.SOLV_USER || 'solv'
export const SOLV_ROOT = '/mt/solana'
export const WD = `${SOLV_ROOT}/solana-validator`
export const LOG_PATH = `${WD}/log`
export const VOTE_ACCOUNT_PATH = `${SOLV_ROOT}/vote-account.json`
export const ACCOUNT_PATH = `/mt/solana-accounts`
export const LEDGER_PATH = `/mt/ledger/validator-ledger`
export const VALIDATOR_STARTUP_SCRIPT = `${WD}/start-validator.sh`

// Solana Wallet Keyfile Paths
export const MAINNET_VALIDATOR_KEYFILE = `${SOLV_ROOT}/mainnet-validator-keypair.json`
export const DEFAULT_VALIDATOR_KEYFILE = `${SOLV_ROOT}/testnet-validator-keypair.json`
export const VALIDATOR_VOTE_KEYFILE = `${SOLV_ROOT}/vote-account-keypair.json`
export const VALITATOR_AUTHORITY_KEYFILE = `${SOLV_ROOT}/authority-keypair.json`

export const DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY =
  '76DafWkJ6pGK2hoD41HjrM4xTBhfKqrDYDazv13n5ir1'
export const DEFAULT_AUTHORITY_ACCOUNT_KEYFILE = './authority-keypair.json'

export const program = new Command()
program.name('solv').description('CLI for Solana Validators').version(VERSION)

dotenv.config()

async function main() {
  try {
    program
      .command('solv')
      .description('CLI for Solana Validators')
      .action(() => {
        console.log('solv')
      })

    stopCommand()
    checkCommpands()
    await setupCommands()
    await dfCommands()
    await stakeCommands()
    await updateCommands()
    await logCommands()
    await releaseCommands()
    await program.parseAsync(process.argv)
  } catch (error) {
    console.log(error)
  }
}

main()
