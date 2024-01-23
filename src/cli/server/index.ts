import { program } from '@/index'
import { server } from '@/cli/server/server'
import { ConfigParams } from '@/lib/createDefaultConfig'

export const serverCommands = (solvConfig: ConfigParams) => {
  const { cmds } = solvConfig.locale
  program
    .command('server')
    .alias('s')
    .description(cmds.server)
    .action(async () => {
      await server(solvConfig)
    })
}
