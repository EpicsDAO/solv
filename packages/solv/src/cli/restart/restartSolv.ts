import { MAINNET_TYPES } from '@/config/config'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { genStartupValidatorScript } from '@/cli/setup/genStartupValidatorScript'
import { stopSolana } from '@/cli/stop/stopSolana'
import { startSolana } from '@/cli/start/startSolana'

export const restartSolv = (solvConfig: ConfigParams) => {
  const isJitoMev =
    solvConfig.config.MAINNET_TYPE === MAINNET_TYPES.JITO_MEV ? true : false
  genStartupValidatorScript(true, solvConfig.config.SOLV_TYPE, isJitoMev)
  stopSolana()
  startSolana()
}
