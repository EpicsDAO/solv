import { langSet } from '@/lib/langSet'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import chalk from 'chalk'
import { execSync } from 'node:child_process'

export const setupV2 = async (solvConfig: ConfigParams) => {
  try {
    const { config } = solvConfig
    if (!config.LANG_SETUP) {
      await langSet()
      console.log(`Please run command again:\n\n${chalk.green('$ solv setup')}`)
      return
    }

    const msg = `Setup completed 🎊\nYour node will be ready in a few hours⏳\n`
    console.log(chalk.green(msg))
    const warning = `===⚠️ Frequently Asked Questions ⚠️===
Q: How long does it take to catch up with the latest slot?
Q: Error: error sending request for url (http://localhost:8899/)
Q: Can't connect to Solana RPC Node

A:
It will take an hour to a several hours to catch up with the latest slot.
This time may vary depending on your network speed and hardware.
Solana Validator requires at least 256GB RAM and 12 CPU cores.
RPC Node requires at least 512GB RAM and 16 CPU cores.
It may not finish catching up if your hardware does not meet the requirements.

You can check current log by running:

$ solv log

You can only track error logs by running:

$ solv log -e

To monitor the status of the validator, run:

$ solv monitor

※ solv monitor command only works when the snapshot is downloaded and the validator is running.

EpicsDAO Discord: https://discord.gg/CU6CcXV9en
`
    console.log(chalk.yellow(warning))
    return true
  } catch (error) {
    throw new Error(`setup Error: ${error}`)
  }
}

export function isSolanaInstalled() {
  try {
    execSync('solana --version')
    return true
  } catch (error) {
    return false
  }
}
