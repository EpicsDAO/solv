import { program } from '@/index'
import { getEpoch } from '../cron/getEpoch'
import { getSlot } from '../cron/getSlot'
import { Logger } from '@/lib/logger'
import { showConfig } from './showConfig'
import { getSnapshot } from './snapshot'
import { spawnSync } from 'node:child_process'
import chalk from 'chalk'
import { DefaultConfigType } from '@/config/types'
import { Network, NodeType } from '@/config/enums'
import {
  VERSION_MAINNET,
  VERSION_SOLANA_RPC,
  VERSION_TESTNET,
} from '@/config/versionConfig'
import getSolanaCLI from '@/config/getSolanaCLI'

export const getCommands = (config: DefaultConfigType) => {
  const isTest = config.NETWORK === Network.TESTNET
  let version = isTest ? VERSION_TESTNET : VERSION_MAINNET
  if (config.NODE_TYPE === NodeType.RPC) {
    version = VERSION_SOLANA_RPC
  }
  const get = program
    .command('get')
    .description(`Get Solana Validator's Information`)
    .argument(
      '<cmd>',
      `Subcommands: epoch, slot, catchup, snapshot, contact, config`,
    )

  get
    .command('epoch')
    .description(`Show Validator's Epoch`)
    .action(() => {
      const epoch = getEpoch()
      console.log({ epoch })
    })

  get
    .command('ip')
    .description(`Show Validator's IP Address`)
    .action(() => {
      const cmd = `curl ipinfo.io/ip`
      const { stdout } = spawnSync(cmd, { shell: true, stdio: 'pipe' })
      console.log(chalk.white(`${stdout}`))
    })

  get
    .command('slot')
    .description(`Show Current Slot`)
    .action(() => {
      const slot = getSlot()
      console.log({ slot })
    })

  get
    .command('snapshot')
    .alias('sn')
    .option(
      '-m, --minDownloadSpeed <minDownloadSpeed>',
      'Minimum download speed',
      '45',
    )
    .option('-l, --ledgerPath <ledgerPath>', 'Ledger Path', config.LEDGER_PATH)
    .option(
      '-s, --snapshotPath <snapshotPath>',
      'Snapshot Path',
      config.SNAPSHOTS_PATH,
    )
    .option('-v, --version <version>', 'Specific Version Node', version)
    .description(`Download the latest snapshot`)
    .action(
      (options: {
        minDownloadSpeed: string
        ledgerPath: string
        snapshotPath: string
        version: string
      }) => {
        const minDownloadSpeed = options.minDownloadSpeed
        const ledgerPath = options.ledgerPath
        const snapshotPath = options.snapshotPath
        const version = options.version
        getSnapshot(isTest, minDownloadSpeed, ledgerPath, snapshotPath, version)
      },
    )

  get
    .command('contact')
    .description('Show Validator Contact Information')
    .action(() => {
      const solanaValidatorClient = getSolanaCLI()
      const cmd = `${solanaValidatorClient} --ledger /mnt/ledger/ contact-info`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })

  get
    .command('config')
    .description('Show Solv Config')
    .alias('c')
    .action(async () => {
      showConfig()
    })

  get
    .command('aa')
    .description('Show Solv AA')
    .option('-c, --client', 'Show Solv Client Mode AA', false)
    .action((options: { client: boolean }) => {
      Logger.solvAA()
      if (options.client) {
        Logger.installClientMessage()
      } else {
        Logger.installMessage()
      }
    })
  get.addHelpCommand('help [cmd]', 'Get Solana Validator Information')
}
