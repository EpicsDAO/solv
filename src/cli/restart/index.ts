import { program } from '@/index'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { restartFetch } from './restartFetch'
import { restartSolv } from './restartSolv'

type RestartOptions = {
  snapshot: boolean
}

export const restartCommand = (solvConfig: ConfigParams) => {
  const { cmds } = solvConfig.locale
  program
    .command('restart')
    .description(cmds.restart)
    .option('--snapshot', 'Restart Solana Validator with fetch snapshot', false)
    .action(async (options: RestartOptions) => {
      if (options.snapshot) {
        restartFetch()
      } else {
        restartSolv()
      }
    })
}
