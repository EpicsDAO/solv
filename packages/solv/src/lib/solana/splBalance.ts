import chalk from 'chalk'
import { spawnSync } from 'child_process'

export const splBalance = async (keyPath: string) => {
  try {
    const cmd = `spl-token accounts --owner ${keyPath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  } catch (error) {
    console.log(chalk.yellow(`You might need to install the Solana SPL CLI:\n`))
    console.log(chalk.white(`$ cargo install spl-token-cli`))
  }
}
