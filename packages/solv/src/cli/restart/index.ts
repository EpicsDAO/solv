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
      try {
        if (options.snapshot) {
          await restartFetch(solvConfig)
        } else {
          // TODO: Uncomment this line and update the createSnapshot function when The Solana team releases the new instructions
          // Comment out for the usual restart
          // createSnapshot(solvConfig)
          await restartSolv(solvConfig)
        }
      } catch (error) {
        console.log(
          `If you failed to create a snapshot, please try - $ solv restart --snapshot`,
        )
      }
    })
}
