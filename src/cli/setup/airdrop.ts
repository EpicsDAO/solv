import { SOLV_DISCORD_INVITE } from '@/config'
import chalk from 'chalk'
import { spawnSync } from 'child_process'

export const airdrop = () => {
  try {
    const solanaPubkey = spawnSync(`solana address`, {
      shell: true,
      encoding: 'utf8',
    })
    const cmd = `solana airdrop 1`
    const { stderr } = spawnSync(cmd, {
      shell: true,
      encoding: 'utf8',
    })
    if (stderr.includes('Error')) {
      console.log(
        chalk.yellow(
          `\n⚠️ Airdrop failed. Please get 1 SOL in your pubkey below:\n\n${chalk.white(
            solanaPubkey.stdout
          )}\n`
        )
      )
      console.log(chalk.white(`and Try Again with this command;\n`))
      console.log(chalk.green(`$ solv setup --vote\n`))
      console.log(
        chalk.white(`To get Testnet SOL,\nVisit EpicsDAO's Discord Channel:`)
      )
      console.log(chalk.green(`${SOLV_DISCORD_INVITE}\n`))
    }
    return true
  } catch (error) {
    throw new Error(`airdrop Error: ${error}`)
  }
}
