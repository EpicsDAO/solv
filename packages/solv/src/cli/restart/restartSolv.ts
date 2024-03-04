import { MAINNET_TYPES } from '@/config/config'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { genStartupValidatorScript } from '@/cli/setup/genStartupValidatorScript'
import { stopSolana } from '@/cli/stop/stopSolana'
import { startSolana } from '@/cli/start/startSolana'
import inquirer from 'inquirer'

export const restartSolv = async (solvConfig: ConfigParams) => {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirm',
      message:
        'This will overwrite start-validator.sh file and restart the validator. Are you sure?',
      default: false,
    },
  ])
  if (!answer.confirm) {
    return
  }
  const isJitoMev =
    solvConfig.config.MAINNET_TYPE === MAINNET_TYPES.JITO_MEV ? true : false
  genStartupValidatorScript(true, solvConfig.config.SOLV_TYPE, isJitoMev)
  stopSolana()
  startSolana()
}
