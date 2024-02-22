import { program } from '@/index'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { restartFetch } from './restartFetch'
import { restartSolv } from './restartSolv'
import inquirer from 'inquirer'
import { createSnapshot } from './createSnapshot'

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
        const answer = await inquirer.prompt([
          {
            type: 'confirm',
            name: 'confirm',
            message:
              'This will overwrite start-validator.sh file and restart the validator. Are you sure?\nThis time will take some time to create a snapshot...',
            default: false,
          },
        ])
        if (!answer.confirm) {
          return
        }
        createSnapshot()
        if (options.snapshot) {
          restartFetch(solvConfig)
        } else {
          restartSolv(solvConfig)
        }
      } catch (error) {
        console.log(
          `If you failed to create a snapshot, please try - $ solv restart --snapshot`,
        )
      }
    })
}
