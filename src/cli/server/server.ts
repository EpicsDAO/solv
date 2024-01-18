import { ConfigParams } from '@/lib/createDefaultConfig'
import inquirer from 'inquirer'

enum CHOICES {
  INSTALL,
  UPGRADE,
  CHECK,
  CONFIG,
  UNINSTALL,
  EXIT,
}

export const server = async (solvClient: ConfigParams) => {
  const { installer, cmds } = solvClient.locale
  // Put increment number in front of each item
  const choices = installer.map((item, index) => {
    return `${index + 1}${item}`
  })
  const answer = await inquirer.prompt<{ server: CHOICES }>([
    {
      name: 'server',
      type: 'list',
      message: cmds.installer,
      choices,
    },
  ])

  switch (answer.server) {
    case CHOICES.INSTALL:
      console.log('Installing solv...')
      break
    case CHOICES.UPGRADE:
      console.log('Upgrading solv...')
      break
    case CHOICES.CHECK:
      console.log('Checking Validator Status...')
      break
    case CHOICES.CONFIG:
      console.log('Getting Validator Config...')
      break
    case CHOICES.UNINSTALL:
      console.log('Uninstalling solv...')
      break
    case CHOICES.EXIT:
      console.log('Exiting solv...')
      break
    default:
      break
  }
}
