import { spawnSync } from 'child_process'
import { existsSync, mkdirSync, readdirSync, rmSync } from 'fs'
import os from 'os'
import { KEYPAIRS, SOLV_TYPES } from '@/config/config'
import { SOLV_CLIENT_PATHS } from '@/config/solvClient'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import path from 'path'

export const createSolvKeyPairs = (solvConfig: ConfigParams) => {
  const solvType = solvConfig.config.SOLV_TYPE
  let genKeys = []
  let keyNum = 0
  switch (solvType) {
    case SOLV_TYPES.MAINNET_VALIDATOR:
      genKeys = [
        KEYPAIRS.MAINNET_VALIDATOR_KEY,
        KEYPAIRS.MAINNET_VALITATOR_AUTHORITY_KEY,
        KEYPAIRS.MAINNET_VALIDATOR_VOTE_KEY,
      ]
      keyNum = 3
      console.log('Mainnet Validator')
      break
    case SOLV_TYPES.TESTNET_VALIDATOR:
      genKeys = [
        KEYPAIRS.TESTNET_VALIDATOR_KEY,
        KEYPAIRS.TESTNET_VALITATOR_AUTHORITY_KEY,
        KEYPAIRS.TESTNET_VALIDATOR_VOTE_KEY,
        KEYPAIRS.MAINNET_VALIDATOR_KEY,
        KEYPAIRS.MAINNET_VALITATOR_AUTHORITY_KEY,
        KEYPAIRS.MAINNET_VALIDATOR_VOTE_KEY,
      ]
      keyNum = 6
      console.log('Testnet Validator')
      break
    case SOLV_TYPES.RPC_NODE:
      genKeys = [KEYPAIRS.MAINNET_VALIDATOR_KEY]
      keyNum = 1
      console.log('RPC Node')
      break
  }

  const cmd = `solana-keygen grind --starts-and-ends-with E:SV:${keyNum}`
  spawnSync(cmd, { shell: true, stdio: 'ignore' })
  const files = readdirSync('./').filter((f) => f.endsWith('SV.json'))
  const homeDirectory = os.userInfo().homedir
  const keyDir = solvConfig.config.IS_CLIENT
    ? homeDirectory + SOLV_CLIENT_PATHS.SOLV_KEYPAIR_UPLOAD_PATH
    : homeDirectory
  if (!existsSync(keyDir)) {
    mkdirSync(keyDir, { recursive: true })
  }
  let i = 0
  for (const file of files) {
    const keyPath = path.join(keyDir, genKeys[i])
    i++
    if (existsSync(keyPath)) {
      console.log(`${keyPath} is already exist!`)
      rmSync(file, { recursive: true })
      continue
    }
    const cmd = `mv ${file} ${keyPath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  }
  console.log(`Generated keypairs - ${keyDir}`)
}
