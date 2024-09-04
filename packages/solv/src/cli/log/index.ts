import { program } from '@/index'
import { tail } from './tail'

export const logCommands = () => {
  program
    .command('log')
    .description('tail logs')
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
