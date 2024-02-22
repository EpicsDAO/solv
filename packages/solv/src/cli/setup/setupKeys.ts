import { spawnSync } from 'child_process'
import { KEYPAIRS, NETWORK_TYPES, SOLV_TYPES } from '@/config/config'
import { updateSolvConfig } from '@/lib/updateSolvConfig'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { createSolvKeyPairs } from '@/lib/createSolvKeys'
import { setupVoteAccount } from '@/cli/setup/setupVoteAccount'
import os from 'os'
import path from 'path'

export const setupKeys = (solvConfig: ConfigParams) => {
  try {
    createSolvKeyPairs(solvConfig)
    const homeDir = os.homedir()
    const keyDir = solvConfig.config.IS_CLIENT
      ? path.join(homeDir, 'solvKeys', 'upload')
      : homeDir
    let validatorKey = `${keyDir}/${KEYPAIRS.TESTNET_VALIDATOR_KEY}`
    let network = NETWORK_TYPES.TESTNET
    const solvType = solvConfig.config.SOLV_TYPE
    const cmds: string[] = []
    switch (solvType) {
      case SOLV_TYPES.MAINNET_VALIDATOR:
        network = NETWORK_TYPES.MAINNET
        validatorKey = `${keyDir}/${KEYPAIRS.MAINNET_VALIDATOR_KEY}`
        cmds.push(
          `solana config set --keypair ${validatorKey} --url ${network}`,
        )
        spawnSync(cmds.join(' && '), { shell: true, stdio: 'inherit' })
        break
      case SOLV_TYPES.RPC_NODE:
        network = NETWORK_TYPES.MAINNET
        validatorKey = `${keyDir}/${KEYPAIRS.MAINNET_VALIDATOR_KEY}`
        cmds.push(
          `solana config set --keypair ${validatorKey} --url ${network}`,
        )
        spawnSync(cmds.join(' && '), { shell: true, stdio: 'inherit' })
        break
      case SOLV_TYPES.TESTNET_VALIDATOR:
        cmds.push(
          `solana config set --keypair ${validatorKey} --url ${network}`,
          `solana airdrop 1`,
          `solana airdrop 1`,
        )
        spawnSync(cmds.join(' && '), { shell: true, stdio: 'inherit' })
        setupVoteAccount(solvConfig)
        break
      default:
        cmds.push(
          `solana config set --keypair ${validatorKey} --url ${network}`,
          `solana airdrop 1`,
          `solana airdrop 1`,
        )
        spawnSync(cmds.join(' && '), { shell: true, stdio: 'inherit' })
        setupVoteAccount(solvConfig)
        break
    }
    updateSolvConfig({ SOLANA_NETWORK: network, SOLV_TYPE: solvType })
    return true
  } catch (error) {
    throw new Error(`setupKeys Error: ${error}`)
  }
}
