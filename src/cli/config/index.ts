import { program } from '@/index'
import { showConfig } from './showConfig'

export const configCommands = () => {
  program
    .command('config')
    .description('Show Validator Config')
    .alias('c')
    .action(async () => {
      showConfig()
    })
}
