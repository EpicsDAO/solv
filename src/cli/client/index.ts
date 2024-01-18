import { program } from '@/index'
import { ConfigParams } from '@/lib/createDefaultConfig'

export const clientCommands = (solvConfig: ConfigParams) => {
  program
    .command('client')
    .alias('c')
    .description('Open solv Client Dashboard')
    .action(() => {
      console.log('client')
    })
}
