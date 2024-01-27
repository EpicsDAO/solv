import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import inquirer from 'inquirer'
import { INSTALLER_CHOICES, server } from '../server'
import { backupCmd } from './backupCmd'
import chalk from 'chalk'
import { restoreCmd } from './restoreCmd'

export enum BACKUP_CHOICES {
  BACKUP,
  RESTORE,
  RETURN_TO_INSTALLER,
}

export const getBackupCommands = async (solvConfig: ConfigParams) => {
  const { config, locale } = solvConfig
  const { cmds, installerSub } = locale
  const choices = installerSub[INSTALLER_CHOICES.BACKUP].map((item, index) => {
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
    1) as BACKUP_CHOICES
  switch (selectedOption) {
    case BACKUP_CHOICES.BACKUP:
      await backupCmd()
      break
    case BACKUP_CHOICES.RESTORE:
      restoreCmd()
      break
    case BACKUP_CHOICES.RETURN_TO_INSTALLER:
      await server(solvConfig)
      break
  }
}
