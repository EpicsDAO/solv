import { program } from '@/index'
import { getEpoch } from '../cron/getEpoch'
import { getSlot } from '../cron/getSlot'
import { Logger } from '@/lib/logger'
import { showConfig } from './showConfig'
import { getSnapshot } from './snapshot'
import { spawnSync } from 'node:child_process'
import { AGAVE_VALIDATOR, SOLANA_VALIDATOR } from '@/config/constants'
import chalk from 'chalk'
import { DefaultConfigType } from '@/config/types'
import { Network } from '@/config/enums'

export const getCommands = (config: DefaultConfigType) => {
  const isTest = config.NETWORK === Network.TESTNET
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
    .option('-l, --ledgerPath <ledgerPath>', 'Ledger Path', '/mnt/ledger')
    .option(
      '-s, --snapshotPath <snapshotPath>',
      'Snapshot Path',
      '/mnt/ledger/snapshot',
    )
    .description(`Download the latest snapshot`)
    .action(
      (options: {
        minDownloadSpeed: string
        ledgerPath: string
        snapshotPath: string
      }) => {
        const minDonwloadSpeed = options.minDownloadSpeed
        const ledgerPath = options.ledgerPath
        const snapshotPath = options.snapshotPath
        getSnapshot(isTest, minDonwloadSpeed, ledgerPath, snapshotPath)
      },
    )

  get
    .command('contact')
    .description('Show Validator Contact Information')
    .action(() => {
      const solanaValidatorClient = isTest ? AGAVE_VALIDATOR : SOLANA_VALIDATOR
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
