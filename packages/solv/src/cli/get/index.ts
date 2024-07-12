import { program } from '@/index'
import { getEpoch } from '../cron/getEpoch'
import { getSlot } from '../cron/getSlot'
import { Logger } from '@/lib/logger'
import { solanaCatchup } from './solanaCatchup'
import { monitorSolana } from './monitorSolana'
import { showConfig } from './showConfig'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { getSnapshot } from './snapshot'
import { NETWORK_TYPES, SOLV_TYPES } from '@/config/config'
import { spawnSync } from 'node:child_process'
import { AGAVE_VALIDATOR, SOLANA_VALIDATOR } from '@/config/constants'

export const getCommands = (solvConfig: ConfigParams) => {
  const { locale, config } = solvConfig
  const get = program
    .command('get')
    .description(locale.cmds.get)
    .argument('<cmd>', locale.cmds.get)

  get
    .command('epoch')
    .description(locale.cmds.epoch)
    .action(() => {
      const epoch = getEpoch()
      console.log({ epoch })
    })

  get
    .command('slot')
    .description(locale.cmds.slot)
    .action(() => {
      const slot = getSlot()
      console.log({ slot })
    })

  get
    .command('catchup')
    .alias('ca')
    .description(locale.cmds.catchup)
    .action(() => {
      solanaCatchup()
    })

  get
    .command('snapshot')
    .alias('sn')
    .option(
      '-m, --minDownloadSpeed <minDownloadSpeed>',
      'Minimum download speed',
      '45',
    )
    .description(`Download the latest snapshot`)
    .action((options) => {
      const isTest =
        config.SOLV_TYPE === SOLV_TYPES.TESTNET_VALIDATOR ? true : false
      const minDonwloadSpeed = options.minDownloadSpeed
      getSnapshot(isTest, minDonwloadSpeed)
    })

  get
    .command('monitor')
    .alias('m')
    .description(locale.cmds.monitor)
    .action(() => {
      monitorSolana(solvConfig)
    })

  get
    .command('contact')
    .description('Show Validator Contact Information')
    .action(() => {
      const isTestnet = config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
      const solanaValidatorClient = isTestnet
        ? AGAVE_VALIDATOR
        : SOLANA_VALIDATOR
      const cmd = `${solanaValidatorClient} --ledger /mnt/ledger/ contact-info`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })

  get
    .command('config')
    .description(locale.cmds.config)
    .alias('c')
    .action(async () => {
      showConfig()
    })

  get
    .command('aa')
    .description(locale.cmds.solv)
    .option('-c, --client', 'Show Solv Client Mode AA', false)
    .action((options: { client: boolean }) => {
      Logger.solvAA()
      if (options.client) {
        Logger.installClientMessage()
      } else {
        Logger.installMessage()
      }
    })
  get.addHelpCommand('help [cmd]', locale.cmds.subcmdHelp)
}
