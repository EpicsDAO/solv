import { MAINNET_TYPES } from '@/config/config'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { genStartupValidatorScript } from '../setup/genStartupValidatorScript'
import { monitorUpdate } from '../update'

export const restartSolv = (solvConfig: ConfigParams) => {
  const isJitoMev =
    solvConfig.config.MAINNET_TYPE === MAINNET_TYPES.JITO_MEV ? true : false
  genStartupValidatorScript(true, solvConfig.config.SOLV_TYPE, isJitoMev)
  monitorUpdate(solvConfig.config.DELINQUENT_STAKE, true)
}
