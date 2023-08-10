import { program } from '@/index'
import { tail } from './tail'

export const logCommands = async () => {
  const log = program.command('log').description('log commands')

  log
    .command('tail')
    .alias('t')
    .description('tail logs')
    .option('-i, --info', 'Follow INFO output', false)
    .option('-w, --warning', 'Follow WARN output', false)
    .option('-e, --error', 'Follow ERR output', false)
    .option('-a, --all', 'Follow WARN and ERR output', true)
    .action(async (options) => {
      await tail(options)
    })
}
