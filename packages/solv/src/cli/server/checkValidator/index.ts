import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import inquirer from 'inquirer'
import { INSTALLER_CHOICES, server } from '../server'
import { systemctlStatusSolv } from '@/cli/status'
import { startSolana } from '@/cli/start/startSolana'
import { stopSolana } from '@/cli/stop/stopSolana'
import { showLog } from './showLog'
import { restartSolv } from '@/cli/restart/restartSolv'

export enum CHECK_CHOICES {
  STATUS,
  LOG,
  START,
  STOP,
  RESTART_FETCH,
  RESTART_NO_FETCH,
  RETURN_TO_INSTALLER,
}

export const checkValidatorCommands = async (solvConfig: ConfigParams) => {
  const { locale } = solvConfig
  const { cmds, installerSub } = locale
  const choices = installerSub[INSTALLER_CHOICES.CHECK].map((item, index) => {
    return `${index + 1}${item}`
  })
  const answer = await inquirer.prompt<{ server: string }>([
    {
      name: 'server',
      type: 'list',
      message: cmds.installer,
      choices,
    },
  ])
  const selectedOption = (Number(answer.server.split(')')[0]) -
    1) as CHECK_CHOICES
  switch (selectedOption) {
    case CHECK_CHOICES.STATUS:
      systemctlStatusSolv()
      break
    case CHECK_CHOICES.LOG:
      showLog()
      break
    case CHECK_CHOICES.START:
      startSolana()
      console.log('Started Solana Validator')
      break
    case CHECK_CHOICES.STOP:
      stopSolana()
      console.log('Stopped Solana Validator')
      break
    case CHECK_CHOICES.RESTART_FETCH:
      console.log('Coming soon...')
      break
    case CHECK_CHOICES.RESTART_NO_FETCH:
      await restartSolv(solvConfig)
      console.log('Restarted Solana Validator without fetch snapshot')
      break
    case CHECK_CHOICES.RETURN_TO_INSTALLER:
      await server(solvConfig)
      break
    default:
      console.log('Invalid choice')
      break
  }
}
