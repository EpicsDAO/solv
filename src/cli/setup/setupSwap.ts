import { Logger } from '@/lib/logger'
import chalk from 'chalk'
import { spawnSync } from 'child_process'

export const setupSwap = () => {
  try {
    const cmd = [
      'sudo dd if=/dev/zero of=/swapfile bs=1G count=300',
      'sudo mkswap /mt/swapfile',
      'sudo chmod 600 /mt/swapfile',
      'sudo swapon /mt/swapfile',
    ]
    console.log(chalk.white('Setting up swap...\n'))
    const spinner = Logger.syncSpinner('This may take a while...')
    spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
    spinner.stop()
    console.log(chalk.green('Swap setup complete!\n'))
  } catch (error) {
    throw new Error(`setupSwap Error: ${error}`)
  }
}
