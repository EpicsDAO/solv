import dotenv from 'dotenv'
import { Command } from 'commander'
import { VERSION } from '@/lib/version'
import { logCommands, releaseCommands, updateCommands } from './cli'
import { stakeCommands } from './cli/stake'
dotenv.config()

export const USER = process.env.SOLV_USER || 'solv'
export const SOLV_ROOT = '/mt/solana'
export const WD = `${SOLV_ROOT}/solana-validator`
export const LOG_PATH = `${WD}/log`
export const VOTE_ACCOUNT_PATH = `${SOLV_ROOT}/vote-account.json`
export const ACCOUNT_PATH = `/mt/solana-accounts`
export const LEDGER_PATH = `/mt/ledger/validator-ledger`

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
