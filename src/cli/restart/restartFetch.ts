import { MAINNET_TYPES } from '@/config/config'
import { genStartupValidatorScript } from '@/cli/setup/genStartupValidatorScript'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { stopSolana } from '@/cli/stop/stopSolana'
import { startSolana } from '@/cli/start/startSolana'

export const restartFetch = (solvConfig: ConfigParams) => {
  const isJitoMev =
    solvConfig.config.MAINNET_TYPE === MAINNET_TYPES.JITO_MEV ? true : false
  genStartupValidatorScript(false, solvConfig.config.SOLV_TYPE, isJitoMev)
  stopSolana()
  startSolana()
}
