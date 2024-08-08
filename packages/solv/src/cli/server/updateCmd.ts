import { CONFIG, MAINNET_TYPES, SOLV_TYPES } from '@/config/config'
import { jitoUpdate } from '../update/jitoUpdate'
import { monitorUpdate, updateVersion } from '../update'
import { updateSolvConfig } from '@/lib/updateSolvConfig'
import { updateJitoSolvConfig } from '@/lib/updateJitoSolvConfig'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'

export const updateCmd = async (solvConfig: ConfigParams) => {
  const isTest =
    solvConfig.config.SOLV_TYPE === SOLV_TYPES.TESTNET_VALIDATOR ? true : false
  const version = isTest
    ? CONFIG.MAINNET_SOLANA_VERSION
    : CONFIG.TESTNET_SOLANA_VERSION
  const deliquentStake = isTest
    ? CONFIG.TESTNET_DELINQUENT_STAKE
    : CONFIG.MAINNET_DELINQUENT_STAKE

  if (solvConfig.config.SOLV_TYPE === SOLV_TYPES.TESTNET_VALIDATOR) {
    if (version === solvConfig.config.TESTNET_SOLANA_VERSION) {
      console.log('Already up to date ✨')
      return
    }
    updateVersion(version)
    updateSolvConfig({
      TESTNET_SOLANA_VERSION: version,
    })
    monitorUpdate(deliquentStake, true)
    return
  } else {
    if (solvConfig.config.MAINNET_TYPE === MAINNET_TYPES.JITO_MEV) {
      if (version === solvConfig.config.MAINNET_SOLANA_VERSION) {
        console.log('Already up to date ✨')
        return
      }
      jitoUpdate()
      updateSolvConfig({ MAINNET_SOLANA_VERSION: version })
      updateJitoSolvConfig({ version, tag: `v${version}-jito` })
      monitorUpdate(deliquentStake, true)
      return
    }
    if (version === solvConfig.config.MAINNET_SOLANA_VERSION) {
      console.log('Already up to date ✨')
      return
    }
    updateVersion(version)
    updateSolvConfig({
      MAINNET_SOLANA_VERSION: version,
    })
    monitorUpdate(deliquentStake, true)
    return
  }
}
