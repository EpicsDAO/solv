import { execSync } from 'child_process'
import { setupDirs } from '@/cli/setup/mkdirs'
import { setupKeys } from '@/cli/setup/setupKeys'
import { genStartupValidatorScript } from '@/cli/setup/genStartupValidatorScript'
import { Logger } from '@/lib/logger'
import chalk from 'chalk'
import { makeServices } from '@/cli/setup/makeServices'
import { setupPermissions } from '@/cli/setup/userPermissions'
import { umount } from '@/cli/check/mt/umount'
import getPreferredDisk, {
  GetPreferredDisksResult,
} from '../check/mt/getLargestDisk'
import { startSolana } from '@/cli/start/startSolana'
import {
  CONFIG,
  DISK_TYPES,
  MAINNET_TYPES,
  NETWORK_TYPES,
  SOLV_TYPES,
} from '@/config/config'
import { ensureFstabEntries } from '@/cli/check/ensureMountAndFiles'
import { formatDisk } from '@/cli/setup/formatDisk'
import { updateSolvConfig } from '@/lib/updateSolvConfig'
import inquirer from 'inquirer'
import {
  ConfigParams,
  readOrCreateDefaultConfig,
} from '@/lib/readOrCreateDefaultConfig'
import { langSet } from '@/lib/langSet'
import { mainnetSetup } from './mainnetSetup'
import { setupJitoMev } from '@/template/startupScripts/setupJitoMev'
import { daemonReload } from '@/lib/daemonReload'
import { enableSolv } from '@/lib/enableSolv'
import { restartLogrotate } from '@/lib/restartLogrotate'
import { askJitoSetting } from './askJitoSetting'
import { readOrCreateJitoConfig } from '@/lib/readOrCreateJitoConfig'
import { updateFirewall } from './updateFirewall'
import { updateJitoSolvConfig } from '@/lib/updateJitoSolvConfig'
import { setupSwap } from './setupSwap'

export const setup = async (solvConfig: ConfigParams) => {
  try {
    if (!isSolanaInstalled()) {
      Logger.normal(
        `Did you forget to restart your terminal?\n\n${chalk.green(
          `$ source ~/.profile`,
        )}`,
      )
      return
    }

    const { config } = solvConfig
    if (!config.LANG_SETUP) {
      await langSet()
      console.log(`Please run command again:\n\n${chalk.green('$ solv setup')}`)
      return
    }
    let isTest = true
    let solvType = 'TESTNET_VALIDATOR'
    // Check which SOLV_TYPES to setup
    const choices = Object.values(SOLV_TYPES).filter(
      (value) => typeof value !== 'number',
    )

    const answer = await inquirer.prompt<{ solvType: string }>([
      {
        name: 'solvType',
        type: 'list',
        message: 'Which solv types do you want to setup?',
        choices,
      },
    ])
    solvType = answer.solvType
    let isJitoMev = false

    if (solvType === 'MAINNET_VALIDATOR') {
      const mainnetType = await mainnetSetup()
      if (mainnetType === MAINNET_TYPES.JITO_MEV) {
        console.log('JITO MEV Setup Mode on!')
        isJitoMev = true
      } else if (mainnetType === MAINNET_TYPES.FIREDANCER) {
        console.log('Coming soon...')
        return
      }
    }

    if (isJitoMev) {
      const jitoConfig = await askJitoSetting()
      await readOrCreateJitoConfig()
      await updateJitoSolvConfig(jitoConfig)
      console.log('Updated JITO MEV Config:', jitoConfig)
    }

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
    } else {
      await updateFirewall()
    }

    // Check if solvType is TESTNET_VALIDATOR
    if (solvType !== 'TESTNET_VALIDATOR') {
      isTest = false
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
    if (disks.has850GB && disks.has400GB) {
      // DOUBLE
      console.log('Setting up DOUBLE DISK...')

      updateSolvConfig({
        DISK_TYPES: DISK_TYPES.DOUBLE,
        SOLV_TYPE: sType,
        COMMISSION: commission,
        SOLANA_NETWORK: isTest ? NETWORK_TYPES.TESTNET : NETWORK_TYPES.MAINNET,
      })

      const isDisk1Formatted = formatDisk(disks.disks[0].name)
      const isDisk2Formatted = formatDisk(disks.disks[1].name)
      if (!isTest) {
        await setupSwap()
      }
      let fileSystem1 = isDisk1Formatted ? '/dev/' + disks.disks[0].name : ''
      let fileSystem2 = isDisk2Formatted ? '/dev/' + disks.disks[1].name : ''
      let isLatitude = false
      if (fileSystem1 === '' && fileSystem2) {
        fileSystem1 = fileSystem2
        fileSystem2 = ''
        isLatitude = true
      }
      ensureFstabEntries(fileSystem1, fileSystem2, isLatitude)
    } else {
      // SINGLE
      console.log('Setting up SINGLE DISK...')
      updateSolvConfig({
        DISK_TYPES: DISK_TYPES.SINGLE,
        SOLV_TYPE: sType,
        COMMISSION: commission,
      })
      if (!mountPoint.includes('/mnt')) {
        const fileSystem = '/dev/' + disks.disks[0].name
        formatDisk(fileSystem)
        ensureFstabEntries(fileSystem)
      } else {
        umount(mountPoint)
        const fileSystem = '/dev/' + disks.disks[0].name
        formatDisk(fileSystem)
        ensureFstabEntries(fileSystem)
      }
    }
    const newSolvConfig = readOrCreateDefaultConfig()
    setupPermissions()
    await genStartupValidatorScript(true, sType, isJitoMev)
    makeServices(isTest)
    daemonReload()

    setupKeys(newSolvConfig)

    enableSolv()
    restartLogrotate()

    if (isJitoMev) {
      setupJitoMev()
      daemonReload()
      updateSolvConfig({ MAINNET_TYPE: MAINNET_TYPES.JITO_MEV })
      const content = `\n👷‍♀️ Please exchange your keys \`solv s\` -> 4)\n\nThen run \`solv start\` to run your JITO MEV!`
      Logger.normal(content)
      return
    }

    startSolana()
    updateSolvConfig({ IS_SETUP: true })
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
