import dotenv from 'dotenv'
import { Command } from 'commander'
import { VERSION } from '@/lib/version'

export const program = new Command()

program.name('solv').description('CLI for Solana Validators').version(VERSION)

dotenv.config()

async function main() {
  try {
    await program.parseAsync(process.argv)
  } catch (error) {
    console.log(error)
  }
}

main()
