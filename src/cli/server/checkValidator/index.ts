import { ConfigParams } from '@/lib/createDefaultConfig'
import inquirer from 'inquirer'
import { INSTALLER_CHOICES, server } from '../server'
import { systemctlStatusSolv } from '@/cli/status'
import { startSolana } from '@/cli/start/startSolana'
import { stopSolana } from '@/cli/stop/stopSolana'
import { restartFetch } from '@/cli/restart/restartFetch'
import { restartNoFetch } from '@/cli/restart/restartNoFetch'
import { showLog } from './showLog'

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
  const { config, locale } = solvConfig
  const { cmds, installerSub } = locale
  const solvTypes = config.SOLV_TYPE
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
      restartFetch(solvTypes)
      console.log('Restarted Solana Validator with fetch snapshot')
      break
    case CHECK_CHOICES.RESTART_NO_FETCH:
      restartNoFetch(solvTypes)
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
