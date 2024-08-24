import { execSync } from 'child_process'
import { setupKeys } from '@/cli/setup/setupKeys'
import { genStartupValidatorScript } from '@/cli/setup/genStartupValidatorScript'
import { Logger } from '@/lib/logger'
import chalk from 'chalk'
import { makeServices } from '@/cli/setup/makeServices'
import { setupPermissions } from '@/cli/setup/userPermissions'
import getPreferredDisk, {
  GetPreferredDisksResult,
} from '../check/mt/getLargestDisk'
import { startSolana } from '@/cli/start/startSolana'
import { CONFIG, MAINNET_TYPES, RPC_MODE, SOLV_TYPES } from '@/config/config'
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
import { jitoRelayerSetup } from './jitoRelayerSetup'
import { createSymLink } from './createSymLink'
import { getSnapshot } from '../get/snapshot'
import setupMount from './setupMount'
import setupCpuGovernor from './setupCpuGovernor'
import updateSysctlConfig from '@/template/updateSysctlConfig'

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

    const askIfDummy = await inquirer.prompt<{ isDummy: boolean }>([
      {
        name: 'isDummy',
        type: 'confirm',
        message:
          'Do you want to setup as a dummy(Inactive) node?(※For Migration)',
        default: true,
      },
    ])

    let blockEngineUrl = ''
    let hasRelayer = false
    if (isJitoMev) {
      const jitoConfig = await askJitoSetting()
      await readOrCreateJitoConfig()
      await updateJitoSolvConfig(jitoConfig)
      blockEngineUrl = jitoConfig.blockEngineUrl

      if (jitoConfig.hasRelayer) {
        hasRelayer = true
      }
    }

    let commission = CONFIG.COMMISSION
    let isJitoRPC = false

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
      // Ask if Jito RPC Node
      const question = await inquirer.prompt<{ rpcMode: string }>([
        {
          name: 'rpcMode',
          type: 'list',
          message: 'Which RPC Mode do you want to setup?',
          choices: RPC_MODE,
        },
      ])
      if (question.rpcMode === 'JITO_RPC') {
        isJitoRPC = true
      }
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

    // Check if there is enough disk space
    const disks: GetPreferredDisksResult = getPreferredDisk()

    // Skip mounting disk if there is not enough disk space
    if (!disks.has400GB && !disks.has850GB && !disks.hasUsed1250GB) {
      console.log(
        chalk.yellow(
          `⚠️ Not enough disk space to setup Solana Validator\nYou need at least 1TB disk space\nSkip mounting disk...`,
        ),
      )
    } else {
      // Mount the disk
      await setupMount(disks, sType, commission, isTest)
    }

    const newSolvConfig = readOrCreateDefaultConfig()
    setupPermissions()

    // Generate startup script
    await genStartupValidatorScript(
      true,
      sType,
      isJitoMev,
      hasRelayer,
      isJitoRPC,
    )
    makeServices(isTest, hasRelayer, blockEngineUrl)
    daemonReload()

    setupKeys(newSolvConfig)
    createSymLink(askIfDummy.isDummy, isTest)

    enableSolv(hasRelayer)
    restartLogrotate()

    if (isJitoMev) {
      setupJitoMev()
      if (hasRelayer) {
        await jitoRelayerSetup(blockEngineUrl)
      }
      daemonReload()
      updateSolvConfig({ MAINNET_TYPE: MAINNET_TYPES.JITO_MEV })
    }

    // Set CPU governor to performance
    await setupCpuGovernor()

    // Update Sysctl Config if needed
    await updateSysctlConfig()

    getSnapshot(isTest)
    startSolana()
    updateSolvConfig({ IS_SETUP: true })
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

You can check current status by running:

$ solv monitor

(Above cmd only works when the snapshot is downloaded and the validator is running.)
If above cmd doesn't work, please check if your node has finished downloading the snapshot by running:

$ solv log

You can only track error logs by running:

$ solv log -e

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
