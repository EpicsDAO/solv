import { program } from '@/index'
import { tail } from './tail'
import { Logger } from '@/lib/logger'

export const logCommands = async () => {
  const log = program.command('log').description('log commands')

  log
    .command('tail')
    .alias('t')
    .description('tail logs')
    .option('-i, --info', 'Follow INFO output', false)
    .option('-w, --warning', 'Follow WARN output', false)
    .option('-e, --error', 'Follow ERR output', false)
    .option('-a, --all', 'Follow WARN and ERR output', false)
    .action((options) => {
      tail(options)
    })

  log
    .command('solv')
    .description('Solv AA log')
    .action(() => {
      Logger.solvAA()
      Logger.installMessage()
    })
}
