import { Connection, PublicKey } from '@solana/web3.js'
import { stakePoolInfo } from '@solana/spl-stake-pool'
import { StakePoolInfoRes } from './stakePoolInfoRes'
import { SOLV_STAKE_POOL_ADDRESS } from '@/config/config'

export const getStakePoolInfo = async (
  rpcUrl: string,
  poolAddress = SOLV_STAKE_POOL_ADDRESS,
) => {
  const connection = new Connection(rpcUrl)

  const stakePoolAddress = new PublicKey(poolAddress)
  const stakePool = await stakePoolInfo(connection, stakePoolAddress)
  return stakePool as StakePoolInfoRes
}
