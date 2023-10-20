import { Logger } from '@/lib/logger'
import chalk from 'chalk'
import { spawnSync } from 'child_process'
import { checkMemoryAndSwap } from '../check/checkMemoryAndSwap'
import { ensureFstabEntries } from '../check/ensureMountAndFiles'
import { formatDisk } from './formatDisk'
import { DEFAULT_FILE_SYSTEM, MOUNT_ROOT, SWAP_PATH } from '@/config'
import { createDirectoryIfNotExists } from '@/lib/createDirectoryIfNotExists'

export const setupSwap = (fileSystem = DEFAULT_FILE_SYSTEM) => {
  try {
    formatDisk(fileSystem)
    createDirectoryIfNotExists(MOUNT_ROOT)

    const cmds = [
      `sudo dd if=/dev/zero of=${SWAP_PATH} bs=1MiB count=250KiB`,
      `sudo mkswap ${SWAP_PATH}`,
      `sudo chmod 600 ${SWAP_PATH}`,
      `sudo swapon ${SWAP_PATH}`,
      `sudo swapon --all --verbose`,
    ]
    if (!checkMemoryAndSwap()) {
      ensureFstabEntries(fileSystem)
    }
    console.log(chalk.white('Setting up swap...\n'))
    const spinner = Logger.syncSpinner('This may take a while...')
    for (const line of cmds) {
      spawnSync(line, { shell: true, stdio: 'inherit' })
    }
    spinner.stop()
    console.log(chalk.green('Swap setup complete!\n'))
  } catch (error) {
    throw new Error(`setupSwap Error: ${error}`)
  }
}
