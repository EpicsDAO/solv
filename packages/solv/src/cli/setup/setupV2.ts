import readConfig from '@/config/readConfig'
import initialConfigSetup from './question/initialConfigSetup'
import { Network, NodeType } from '@/config/enums'
import setupRpcNode from './rpc'
import setupValidatorNode from './validator'
import chalk from 'chalk'
import { setupDirs } from './mkdirs'
import mountDirs from './mount/mountDirs'
import { setupPermissions } from './userPermissions'
import { makeServices } from './makeServices'
import { setupKeys } from './setupKeys'
import { daemonReload } from '@/lib/daemonReload'
import { getSnapshot } from '../get/snapshot'
import { startSolana } from '../start/startSolana'
import setupCpuGovernor from './setupCpuGovernor'
import updateSysctlConfig from '@/template/updateSysctlConfig'
import { restartLogrotate } from '@/lib/restartLogrotate'
import { enableSolv } from '@/lib/enableSolv'
import { createSymLink } from './createSymLink'

export const setupV2 = async (skipInitConfig = false, skipMount = false) => {
  try {
    if (!skipInitConfig) {
      console.log(chalk.white(`🟢 Initializing Setup`))
      // Init Config File - solv4.config.json is the new config file
      await readConfig()
      const init = await initialConfigSetup()
      if (!init) {
        throw new Error('Error in initialConfigSetup')
      }
    }

    const latestConfig = await readConfig()
    const isTest = latestConfig.TESTNET_SOLANA_VERSION === Network.TESTNET
    // Generate /mnt/ledger and /mnt/accounts
    setupDirs()
    if (!skipMount) {
      // Mount /mnt/ledger and /mnt/accounts
      mountDirs()
    }
    // Setup Permissions
    setupPermissions()
    // Generate Systemd Service
    makeServices(isTest)
    // Restart Logrotate
    restartLogrotate()
    // Set CPU governor to performance
    setupCpuGovernor()
    // Update Sysctl Config if needed
    await updateSysctlConfig()
    // Generate Solana Keys
    setupKeys(latestConfig)
    createSymLink(latestConfig.IS_DUMMY, isTest)

    // Generate Soalna Startup Script
    switch (latestConfig.NODE_TYPE) {
      case NodeType.RPC:
        await setupRpcNode(latestConfig)
        break
      case NodeType.VALIDATOR:
        await setupValidatorNode(latestConfig)
        break
      default:
        throw new Error('Unknown Node Type')
    }
    // Reload Daemon
    daemonReload()
    // Enable Solv Service
    enableSolv()
    // Download Snapshot
    getSnapshot(isTest)
    // Start Solana
    startSolana()
    console.log(chalk.white(`🟢 Setup Completed`))
    lastMsg()
  } catch (error: any) {
    throw new Error(`Setup Error: ${error.message}`)
  }
}

const lastMsg = () => {
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

Validators Solutions: https://validators.solutions
`
  console.log(chalk.yellow(warning))
}
