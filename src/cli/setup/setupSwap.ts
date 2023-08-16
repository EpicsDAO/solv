import { Logger } from '@/lib/logger'
import chalk from 'chalk'
import { spawnSync } from 'child_process'
import { checkMemoryAndSwap } from '../check/checkMemoryAndSwap'
import { ensureFstabEntries } from '../check/ensureMountAndFiles'
import { SolvConfig } from '@/types/solvTypes'

export const setupSwap = (fileSystem = '/dev/vdb') => {
  try {
    const cmd = [
      `sudo mount -t tmpfs -o rw,size=300G tmpfs ${SolvConfig.ACCOUNT_PATH}`,
      `sudo dd if=/dev/zero of=${SolvConfig.SWAP_PATH} bs=1G count=300`,
      `sudo mkswap ${SolvConfig.SWAP_PATH}`,
      `sudo chmod 600 ${SolvConfig.SWAP_PATH}`,
      `sudo swapon ${SolvConfig.SWAP_PATH}`,
      `sudo swapon --all --verbose`,
    ]
    if (!checkMemoryAndSwap()) {
      ensureFstabEntries(fileSystem)
    }
    console.log(chalk.white('Setting up swap...\n'))
    const spinner = Logger.syncSpinner('This may take a while...')
    spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
    spinner.stop()
    console.log(chalk.green('Swap setup complete!\n'))
  } catch (error) {
    throw new Error(`setupSwap Error: ${error}`)
  }
}
