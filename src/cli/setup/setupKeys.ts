import { spawnSync } from 'child_process'
import { KEYPAIRS, NETWORK_TYPES, SOLV_TYPES } from '@/config/config'
import { updateSolvConfig } from '@/lib/updateSolvConfig'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { createSolvKeyPairs } from '@/lib/createSolvKeys'
import { setupVoteAccount } from '@/cli/setup/setupVoteAccount'
import os from 'os'

export const setupKeys = (solvConfig: ConfigParams) => {
  try {
    createSolvKeyPairs(solvConfig)
    const homeDir = os.homedir()
    const keyDir = solvConfig.config.IS_CLIENT
      ? `${homeDir}/solvKeys/upload`
      : homeDir
    let validatorKey = `${keyDir}/${KEYPAIRS.TESTNET_VALIDATOR_KEY}`
    let network = NETWORK_TYPES.TESTNET
    const solvType = solvConfig.config.SOLV_TYPE
    switch (solvType) {
      case SOLV_TYPES.MAINNET_VALIDATOR || SOLV_TYPES.RPC_NODE:
        network = NETWORK_TYPES.MAINNET
        validatorKey = `${keyDir}/${KEYPAIRS.MAINNET_VALIDATOR_KEY}`
        const cmd = `solana config set --keypair ${validatorKey} --url ${network}`
        spawnSync(cmd, { shell: true, stdio: 'inherit' })
        break
      case SOLV_TYPES.TESTNET_VALIDATOR:
        const cmds = [
          `solana config set --keypair ${validatorKey} --url ${network}`,
          `solana airdrop 1`,
        ]
        cmds.push(`solana airdrop 1`)
        for (const cmd of cmds) {
          spawnSync(cmd, { shell: true, stdio: 'inherit' })
        }
        setupVoteAccount(solvConfig)
        break
    }
    updateSolvConfig({ SOLANA_NETWORK: network, SOLV_TYPE: solvType })
    return true
  } catch (error) {
    throw new Error(`setupKeys Error: ${error}`)
  }
}
