import { Network, NodeType } from '@/config/enums'
import readConfig from '@/config/readConfig'
import { spawnSync } from 'child_process'

export const delegateStake = async (
  stakeAccountPubkey: string,
  validatorVoteAccountPubkey: string,
) => {
  try {
    const config = await readConfig()
    const isTestnet = config.NETWORK === Network.TESTNET
    const isRPC = config.NODE_TYPE === NodeType.RPC
    const network = isRPC
      ? config.RPC_URL
      : isTestnet
        ? Network.TESTNET
        : config.RPC_URL
    const authorityKeyPath = isTestnet
      ? '~/testnet-authority-keypair.json'
      : '~/mainnet-authority-keypair.json'
    const cmd = [
      `solana delegate-stake ${stakeAccountPubkey} ${validatorVoteAccountPubkey} --stake-authority ${authorityKeyPath} --url ${network}`,
    ]
    spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`delegateStake: ${error}`)
  }
}
