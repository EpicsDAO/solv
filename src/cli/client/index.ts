import { program } from '@/index'
import { ConfigParams } from '@/lib/createDefaultConfig'
import { client } from '@/cli/client/client'

export const clientCommands = (solvConfig: ConfigParams) => {
  program
    .command('client')
    .alias('c')
    .description('Open solv Client Dashboard')
    .action(async () => {
      await client(solvConfig)
    })
}
