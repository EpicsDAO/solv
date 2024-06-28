import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import inquirer from 'inquirer'
import { uninstall } from '@/cli/setup/uninstall'
import { Logger } from '@/lib/logger'
import { langSet } from '@/lib/langSet'
import chalk from 'chalk'
import { checkValidatorCommands } from './checkValidator'
import { getValidatorInfoCommands } from './getValidatorInfo'
import { getBackupCommands } from './backup'
import os from 'os'
import { updateCmd } from './updateCmd'
import { stakeCmds } from './stake'

export enum INSTALLER_CHOICES {
  UPGRADE,
  CHECK,
  CONFIG,
  BACKUP,
  STAKE,
  UNINSTALL,
  EXIT,
}

export const server = async (solvConfig: ConfigParams) => {
  Logger.solvAA()
  const { logs, installer, cmds } = solvConfig.locale
  const { config } = solvConfig
  if (!config.LANG_SETUP) {
    await langSet()
    console.log(`Please run command again:\n\n${chalk.green('$ solv s')}`)
    return
  }
  const msg = Logger.warningHex(logs.installer.welcomeMsg)
  console.log(msg + '\n')

  if (!config.IS_SETUP) {
    const msg2 = logs.installer.description
    console.log(Logger.greyHex(msg2) + '\n')
  }

  // Put increment number in front of each item
  const choices = installer.map((item, index) => {
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
    1) as INSTALLER_CHOICES
  switch (selectedOption) {
    case INSTALLER_CHOICES.UPGRADE:
      await updateCmd(solvConfig)
      break
    case INSTALLER_CHOICES.CHECK:
      checkValidatorCommands(solvConfig)
      break
    case INSTALLER_CHOICES.CONFIG:
      getValidatorInfoCommands(solvConfig)
      break
    case INSTALLER_CHOICES.BACKUP:
      getBackupCommands(solvConfig)
      break
    case INSTALLER_CHOICES.STAKE:
      stakeCmds(solvConfig)
      break
    case INSTALLER_CHOICES.UNINSTALL:
      await uninstall()
      break
    case INSTALLER_CHOICES.EXIT:
      console.log('Exiting solv...')
      break
    default:
      console.log('node!')
      break
  }
}
