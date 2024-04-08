import { Logger } from '@/lib/logger'
import chalk from 'chalk'
import { spawnSync, execSync } from 'node:child_process'
import { statfs } from 'fs/promises'

const SWAP_PATH = '/swapfile'
const MIN_SWAP_SIZE_GB = 15 // Min swap size in GB
const REQUIRED_FREE_SPACE_GB = 100 // Required free space in GB

export const setupSwap = async () => {
  try {
    console.log(chalk.white('Checking swap and disk space...\n'))

    // Check if swap file already exists and is large enough
    const currentSwapSizeGB = getSwapFileSizeGB()
    if (currentSwapSizeGB >= MIN_SWAP_SIZE_GB) {
      console.log(
        chalk.yellow(
          'Current swap size meets the required size. No action taken.\n',
        ),
      )
      return
    }

    // Check if there is enough free space on root directory
    const freeSpaceGB = await getRootFreeSpaceGB()
    if (freeSpaceGB < REQUIRED_FREE_SPACE_GB) {
      console.log(
        chalk.yellow(
          'Not enough free space on root directory. No action taken.\n',
        ),
      )
      return
    }

    // Remove existing swap file if it exists
    execSync(`sudo swapoff ${SWAP_PATH}`)
    execSync(`sudo rm ${SWAP_PATH}`)

    const cmds = [
      `sudo dd if=/dev/zero of=${SWAP_PATH} bs=1M count=16384`,
      `sudo mkswap ${SWAP_PATH}`,
      `sudo chmod 600 ${SWAP_PATH}`,
      `sudo swapon ${SWAP_PATH}`,
      `sudo swapon --all --verbose`,
    ]

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

const getSwapFileSizeGB = () => {
  try {
    const sizeBytes = execSync(`sudo stat --format="%s" ${SWAP_PATH}`)
      .toString()
      .trim()
    return parseInt(sizeBytes, 10) / 1024 ** 3 // Convert size from bytes to GB
  } catch (error) {
    throw new Error(`Error getting swap file size: ${error}`)
  }
}

const getRootFreeSpaceGB = async () => {
  try {
    const stats = await statfs('/')
    const freeSpaceBytes = BigInt(stats.bavail) * BigInt(stats.bfree) // Available blocks * block size
    return Number(freeSpaceBytes / BigInt(1024 ** 3)) // Convert size from bytes to GB
  } catch (error) {
    throw new Error(`Error getting root directory free space: ${error}`)
  }
}
