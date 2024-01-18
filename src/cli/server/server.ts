import inquirer from 'inquirer'

enum CHOICES {
  INSTALL = '1) Install - Initial Setup',
  UPGRADE = '2) Upgrade - Solana Version Update/Downgrade',
  CHECK = '3) Check Validator Status or Start/Stop',
  CONFIG = '4) Get Validator Config',
  UNINSTALL = '5) Uninstall',
  EXIT = '6) Exit',
}

export const server = async () => {
  const answer = await inquirer.prompt<{ server: CHOICES }>([
    {
      name: 'server',
      type: 'list',
      message: '⚡️ Welcome to the solv Installer - Please select an option:',
      choices: Object.values(CHOICES),
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
