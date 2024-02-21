import { MAINNET_TYPES } from '@/config/config'
import { genStartupValidatorScript } from '../setup/genStartupValidatorScript'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { monitorUpdate } from '../update'

export const restartFetch = (solvConfig: ConfigParams) => {
  const isJitoMev =
    solvConfig.config.MAINNET_TYPE === MAINNET_TYPES.JITO_MEV ? true : false
  genStartupValidatorScript(false, solvConfig.config.SOLV_TYPE, isJitoMev)
  monitorUpdate(solvConfig.config.DELINQUENT_STAKE, true)
}
