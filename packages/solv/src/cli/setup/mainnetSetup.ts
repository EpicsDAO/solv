import { MAINNET_TYPES } from '@/config/config'
import inquirer from 'inquirer'

export const mainnetSetup = async () => {
  const mainenetModes = Object.values(MAINNET_TYPES)
  const answer = await inquirer.prompt<{ mainnetMode: MAINNET_TYPES }>([
    {
      name: 'mainnetMode',
      type: 'list',
      message: 'Which mainnet mode do you want to setup?',
      choices: mainenetModes,
    },
  ])
  if (answer.mainnetMode === MAINNET_TYPES.SOLANA_CLIENT) {
    return MAINNET_TYPES.SOLANA_CLIENT
  } else if (answer.mainnetMode === MAINNET_TYPES.JITO_MEV) {
    return MAINNET_TYPES.JITO_MEV
  } else if (answer.mainnetMode === MAINNET_TYPES.FIREDANCER) {
    return MAINNET_TYPES.FIREDANCER
  } else {
    return MAINNET_TYPES.SOLANA_CLIENT
  }
}
