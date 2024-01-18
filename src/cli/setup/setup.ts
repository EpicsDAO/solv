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
    let isTest = true
    const { solvType } = await inquirer.prompt<{ solvType: string }>([
      {
        name: 'solvType',
        type: 'list',
        message: 'Which solv types do you want to setup?',
        choices,
      },
    ])
    let commission = CONFIG.COMMISSION

    // Check if solvType is RPC_NODE
    if (solvType !== 'RPC_NODE') {
      // Ask for commission rate if not RPC_NODE
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

    // Check if solvType is TESTNET_VALIDATOR
    if (solvType !== 'TESTNET_VALIDATOR') {
      isTest = true
    }

    // Check if solvType is MAINNET_VALIDATOR
    let sType = isTest
      ? SOLV_TYPES.TESTNET_VALIDATOR
      : SOLV_TYPES.MAINNET_VALIDATOR

    // Check if solvType is RPC_NODE
    if (solvType === 'RPC_NODE') {
      sType = SOLV_TYPES.RPC_NODE
    }
    console.log(`Setting up ${solvType}...`)

    const disks: GetPreferredDisksResult = getPreferredDisk()
    const mountPoint = disks.disks[0].mountpoint
    setupDirs()
    // Detect if DISK_TYPE is DOUBLE or SINGLE
    if (disks.has980GB && disks.has480GB) {
      // DOUBLE
      console.log('Setting up DOUBLE DISK...')

      updateSolvConfig({
        DISK_TYPES: DISK_TYPES.DOUBLE,
        SOLV_TYPE: sType,
        COMMISSION: commission,
      })
      const fileSystem = '/dev/' + disks.disks[0].name
      formatDisk(fileSystem)
      const fileSystem2 = '/dev/' + disks.disks[1].name
      formatDisk(fileSystem2)
      ensureFstabEntries(fileSystem, fileSystem2)
    } else {
      // SINGLE
      console.log('Setting up SINGLE DISK...')
      updateSolvConfig({
        DISK_TYPES: DISK_TYPES.SINGLE,
        SOLV_TYPE: sType,
        COMMISSION: commission,
      })
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
