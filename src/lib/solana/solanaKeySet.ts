import { spawnSync } from 'child_process'
import { ConfigParams } from '../readOrCreateDefaultConfig'
import inquirer from 'inquirer'
import { CONFIG, KEYPAIRS, NETWORK_TYPES } from '@/config/config'
import os from 'os'
import path from 'path'
import { readdirSync } from 'fs'

export const solanaKeySet = async (solvConfig: ConfigParams) => {
  const { keypair, network } = await solanaKeySetAsk(solvConfig)
  const cmd = `solana config set --url ${network} --keypair ${keypair}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
  return true
}

export type SolanaKeySetAskOption = {
  network: string
  keypair: string
}

export const solanaKeySetAsk = async (solvConfig: ConfigParams) => {
  const homeDir = os.homedir()
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
  const answer = await inquirer.prompt<SolanaKeySetAskOption>([
    {
      type: 'list',
      name: 'network',
      message: 'Select Solana Network',
      choices: [NETWORK_TYPES.TESTNET, NETWORK_TYPES.MAINNET],
      default: solvConfig.config.SOLANA_NETWORK || 'testnet',
    },
    {
      type: 'list',
      name: 'keypair',
      message: 'Select Solana keypair',
      choices: keypairs,
      default: defaultKey,
    },
  ])
  return answer
}
