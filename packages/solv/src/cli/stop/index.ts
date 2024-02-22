import { program } from '@/index'
import { stopSolana } from './stopSolana'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'

export const stopCommand = (solvConfig: ConfigParams) => {
  const { cmds } = solvConfig.locale
  program
    .command('stop')
    .description(cmds.stop)
    .action(() => {
      stopSolana()
    })
}
