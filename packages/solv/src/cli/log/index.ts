import { program } from '@/index'
import { tail } from './tail'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'

export const logCommands = (solvConfig: ConfigParams) => {
  const { cmds } = solvConfig.locale
  program
    .command('log')
    .description(cmds.log)
    .alias('l')
    .description('tail logs')
    .option('-i, --info', 'Follow INFO output', false)
    .option('-w, --warning', 'Follow WARN output', false)
    .option('-e, --error', 'Follow ERR/WARN output', false)
    .option('-a, --all', 'Follow All output', false)
    .action((options) => {
      tail(options)
    })
}
