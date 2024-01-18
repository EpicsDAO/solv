import { ConfigParams } from '@/lib/createDefaultConfig'
import inquirer from 'inquirer'
import { uninstall } from '../setup/uninstall'

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
      await uninstall()
      break
    case CHOICES.EXIT:
      console.log('Exiting solv...')
      break
    default:
      break
  }
}
