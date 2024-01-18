import { execSync, spawnSync } from 'child_process'
import { setupDirs } from './mkdirs'
import { setupKeys } from './setupKeys'
import { genStartupValidatorScript } from './genStartupValidatorScript'
import { Logger } from '@/lib/logger'
import chalk from 'chalk'
import { makeServices } from './makeServices'
import { setupPermissions } from './userPermissions'
import { umount } from '../check/mt/umount'
import getPreferredDisk, {
  GetPreferredDisksResult,
} from '../check/mt/getLargestDisk'
import { startSolana } from '../start/startSolana'
import { CONFIG, DISK_TYPES, SOLV_TYPES } from '@/config/config'
import { ensureFstabEntries } from '../check/ensureMountAndFiles'
import { formatDisk } from './formatDisk'
import { updateSolvConfig } from '@/lib/updateSolvConfig'
import inquirer from 'inquirer'

export const setup = async () => {
  try {
    if (!isSolanaInstalled()) {
      Logger.normal(
        `Did you forget to restart your terminal?\n\n${chalk.green(
          `$ source ~/.profile`,
        )}`,
      )
      return
    }

    // Check which SOLV_TYPES to setup
    const choices = Object.values(SOLV_TYPES).filter(
      (value) => typeof value !== 'number',
    )
    const { solvType } = await inquirer.prompt<{ solvType: string }>([
      {
        name: 'solvType',
        type: 'list',
        message: 'Which solv types do you want to setup?',
        choices,
      },
    ])
    let commission = CONFIG.COMMISSION
    if (solvType !== 'RPC_NODE') {
      const question = await inquirer.prompt<{ commission: number }>([
        {
          name: 'commission',
          type: 'number',
          message:
            'What is your commission rate? You can change it later (default: 10%)',
          default: CONFIG.COMMISSION,
        },
      ])
      commission = Number(question.commission)
    }
    console.log(`Setting up ${solvType}...`)

    const disks: GetPreferredDisksResult = getPreferredDisk()
    const mountPoint = disks.disks[0].mountpoint
    setupDirs()
    // Detect if DISK_TYPE is DOUBLE or SINGLE
    if (disks.has980GB && disks.has480GB) {
      // DOUBLE
      console.log('Setting up DOUBLE DISK...')
      updateSolvConfig({ DISK_TYPES: DISK_TYPES.DOUBLE })
      const fileSystem = '/dev/' + disks.disks[0].name
      formatDisk(fileSystem)
      const fileSystem2 = '/dev/' + disks.disks[1].name
      formatDisk(fileSystem2)
      ensureFstabEntries(fileSystem, fileSystem2)
    } else {
      // SINGLE
      console.log('Setting up SINGLE DISK...')
      updateSolvConfig({ DISK_TYPES: DISK_TYPES.SINGLE })
      umount(mountPoint)
      const fileSystem = '/dev/' + disks.disks[0].name
      formatDisk(fileSystem)
      ensureFstabEntries(fileSystem)
    }
    setupPermissions()
    genStartupValidatorScript(true)
    makeServices()
    setupKeys(commission)
    const cmds = [
      'sudo systemctl daemon-reload',
      'sudo systemctl enable solv',
      'sudo systemctl restart logrotate',
    ]
    for (const line of cmds) {
      spawnSync(line, { shell: true, stdio: 'inherit' })
    }
    startSolana()
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
