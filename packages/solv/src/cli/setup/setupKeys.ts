import { spawnSync } from 'node:child_process'
import { createSolvKeyPairs } from '@/lib/createSolvKeys'
import { setupVoteAccount } from '@/cli/setup/setupVoteAccount'
import { DefaultConfigType } from '@/config/types'
import { Network, NodeType } from '@/config/enums'
import {
  MAINNET_VALIDATOR_KEY_PATH,
  TESTNET_VALIDATOR_KEY_PATH,
} from '@/config/constants'

export const setupKeys = (config: DefaultConfigType) => {
  try {
    createSolvKeyPairs(config)
    const network = config.NETWORK
    // AirDrop 1 SOL if it's a testnet
    if (network === Network.TESTNET) {
      spawnSync(
        `solana config set --url ${network} -k ${TESTNET_VALIDATOR_KEY_PATH}`,
        {
          shell: true,
          stdio: 'inherit',
        },
      )
      spawnSync(
        `solana airdrop 1 --url ${network} -k ${TESTNET_VALIDATOR_KEY_PATH}`,
        {
          shell: true,
          stdio: 'inherit',
        },
      )
    } else {
      spawnSync(
        `solana config set --url ${network} -k ${MAINNET_VALIDATOR_KEY_PATH}`,
        {
          shell: true,
          stdio: 'inherit',
        },
      )
    }

    if (config.NODE_TYPE !== NodeType.RPC) {
      setupVoteAccount(config)
    }
    return true
  } catch (error) {
    throw new Error(`setupKeys Error: ${error}`)
  }
}
