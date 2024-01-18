import { ConfigParams } from '@/lib/createDefaultConfig'
import inquirer from 'inquirer'
import { uninstall } from '../setup/uninstall'
import { Logger } from '@/lib/logger'

enum CHOICES {
  UPGRADE,
  CHECK,
  CONFIG,
  BACKUP,
  UNINSTALL,
  EXIT,
}

export const server = async (solvConfig: ConfigParams) => {
  Logger.solvAA()
  const { logs, installer, cmds } = solvConfig.locale
  const { config } = solvConfig
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

  const selectedOption = (Number(answer.server.split(')')[0]) - 1) as CHOICES
  console.log(selectedOption)
  switch (selectedOption) {
    case CHOICES.UPGRADE:
      console.log('Upgrading solv...')
      break
    case CHOICES.CHECK:
      console.log('Checking Validator Status...')
      break
    case CHOICES.CONFIG:
      console.log('Getting Validator Config...')
      break
    case CHOICES.BACKUP:
      console.log('Backing up Validator Config...')
      break
    case CHOICES.UNINSTALL:
      await uninstall()
      break
    case CHOICES.EXIT:
      console.log('Exiting solv...')
      break
    default:
      break
  }
}
