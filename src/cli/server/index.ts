import { program } from '@/index'
import { server } from './server'
import { ConfigParams } from '@/lib/createDefaultConfig'

export const serverCommands = (solvConfig: ConfigParams) => {
  program
    .command('server')
    .alias('s')
    .description('solv Server Dashboard')
    .action(async () => {
      await server(solvConfig)
    })
}
