import {
  CONFIG,
  MAINNET_TYPES,
  NETWORK_TYPES,
  SOLV_TYPES,
} from '@/config/config'
import { jitoUpdate } from '../update/jitoUpdate'
import { monitorUpdate, updateVersion } from '../update'
import { updateSolvConfig } from '@/lib/updateSolvConfig'
import { updateJitoSolvConfig } from '@/lib/updateJitoSolvConfig'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'

export const updateCmd = async (solvConfig: ConfigParams) => {
  const version =
    solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.MAINNET
      ? CONFIG.MAINNET_SOLANA_VERSION
      : CONFIG.TESTNET_SOLANA_VERSION
  if (solvConfig.config.SOLANA_VERSION === version) {
    console.log('Already up to date ⭐️')
    return
  }
  if (solvConfig.config.SOLV_TYPE === SOLV_TYPES.TESTNET_VALIDATOR) {
    updateVersion(version)
    updateSolvConfig({
      SOLANA_VERSION: version,
      TESTNET_SOLANA_VERSION: version,
    })
    monitorUpdate(CONFIG.DELINQUENT_STAKE, true)
    return
  } else {
    if (solvConfig.config.MAINNET_TYPE === MAINNET_TYPES.JITO_MEV) {
      jitoUpdate()
      updateSolvConfig({ SOLANA_VERSION: version })
      updateJitoSolvConfig({ version, tag: `v${version}-jito` })
      monitorUpdate(CONFIG.DELINQUENT_STAKE, true)
      return
    }
    updateVersion(version)
    updateSolvConfig({
      SOLANA_VERSION: version,
      MAINNET_SOLANA_VERSION: version,
    })
    monitorUpdate(CONFIG.DELINQUENT_STAKE, true)
    return
  }
}
