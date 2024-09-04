import { BN } from 'bn.js'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import getBalance, { KeyType } from '@/lib/solana/getBalance'

// Havrst Settings
const MINIMUM_EPOCH_START_BALANCE = new BN(3 * LAMPORTS_PER_SOL) // LAMPORTS

export const getHarvestBalance = async (rpcUrl: string) => {
  const validatorBalance = await getBalance(rpcUrl, KeyType.VALIDATOR)
  const validatorBalanceBN = new BN(
    Number(Number(validatorBalance) * LAMPORTS_PER_SOL),
  )
  const withdrawableBalanceLamport = validatorBalanceBN.sub(
    MINIMUM_EPOCH_START_BALANCE,
  )
  let withdrawableBalance =
    Number(withdrawableBalanceLamport) / LAMPORTS_PER_SOL
  // round to 9 decimal places
  withdrawableBalance = Math.round(withdrawableBalance * 1e9) / 1e9
  return withdrawableBalance // SOL
}
