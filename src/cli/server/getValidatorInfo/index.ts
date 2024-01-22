import { ConfigParams } from '@/lib/createDefaultConfig'
import inquirer from 'inquirer'
import { INSTALLER_CHOICES, server } from '../server'
import { showConfig } from '@/cli/get/showConfig'
import { getEpochAndSlot } from './getEpochAndSlot'
import { showKeypairsInfo } from './showKeypairsInfo'
import { solanaCatchup } from '@/cli/get/solanaCatchup'
import { monitorSolana } from '@/cli/get/monitorSolana'

export enum GET_CHOICES {
  CONFIG,
  KEYPAIRS,
  EPOCH_SLOT,
  CATCHUP,
  MONITOR,
  RETURN_TO_INSTALLER,
}

export const getValidatorInfoCommands = async (solvConfig: ConfigParams) => {
  const { config, locale } = solvConfig
  const { cmds, installerSub } = locale
  const solvType = config.SOLV_TYPE
  const choices = installerSub[INSTALLER_CHOICES.CONFIG].map((item, index) => {
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
    1) as GET_CHOICES
  switch (selectedOption) {
    case GET_CHOICES.CONFIG:
      showConfig()
      break
    case GET_CHOICES.KEYPAIRS:
      showKeypairsInfo(solvType)
      break
    case GET_CHOICES.EPOCH_SLOT:
      getEpochAndSlot()
      break
    case GET_CHOICES.CATCHUP:
      solanaCatchup()
      break
    case GET_CHOICES.MONITOR:
      monitorSolana()
      break
    case GET_CHOICES.RETURN_TO_INSTALLER:
      server(solvConfig)
      break
    default:
      server(solvConfig)
      break
  }
}
