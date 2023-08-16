import { program } from '@/index'

export const configCommands = () => {
  program
    .command('config')
    .description('Show Validator Config')
    .alias('c')
    .action(async () => {
      console.log('config')
    })
}
