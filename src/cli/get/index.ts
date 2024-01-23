import { program } from '@/index'
import { getEpoch } from '../cron/getEpoch'
import { getSlot } from '../cron/getSlot'
import { Logger } from '@/lib/logger'
import { solanaCatchup } from './solanaCatchup'
import { monitorSolana } from './monitorSolana'
import { showConfig } from './showConfig'
import { ConfigParams } from '@/lib/createDefaultConfig'

export const getCommands = (solvConfig: ConfigParams) => {
  const { locale } = solvConfig
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
    .command('monitor')
    .alias('m')
    .description(locale.cmds.monitor)
    .action(async () => {
      monitorSolana()
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
