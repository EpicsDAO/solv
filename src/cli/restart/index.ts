import { program } from '@/index'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { restartNoFetch } from './restartNoFetch'
import { restartFetch } from './restartFetch'

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
      const { config } = solvConfig
      const solvTypes = config.SOLV_TYPE
      options.snapshot ? restartFetch(solvTypes) : restartNoFetch(solvTypes)
    })
}
