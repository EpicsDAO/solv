import path from 'path'
import { readdirSync } from 'fs'
import { ConfigParams } from './readOrCreateDefaultConfig'
import { KEYPAIRS, NETWORK_TYPES } from '@/config/config'
import getHomeDir from './getHomeDir'

export const getKeypairPaths = (solvConfig: ConfigParams) => {
  const homeDir = getHomeDir()
  const keyDir = solvConfig.config.IS_CLIENT
    ? path.join(homeDir, 'solvKeys', 'upload')
    : homeDir
  const defaultKey =
    solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.MAINNET
      ? path.join(keyDir, KEYPAIRS.MAINNET_VALIDATOR_KEY)
      : path.join(keyDir, KEYPAIRS.TESTNET_VALIDATOR_KEY)
  // Get all *-keypair.json files
  const keypairs = readdirSync(keyDir).filter((file) =>
    file.endsWith('-keypair.json'),
  )
  return {
    keypairs,
    defaultKey,
  }
}
