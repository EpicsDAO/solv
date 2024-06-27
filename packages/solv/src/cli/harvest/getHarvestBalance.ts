import { BN } from 'bn.js'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import getBalance, { KeyType } from '@/lib/solana/getBalance'

// Havrst Settings
const MINIMUM_EPOCH_START_BALANCE = new BN(3 * LAMPORTS_PER_SOL) // LAMPORTS

export const getHarvestBalance = () => {
  const validatorBalance = getBalance(KeyType.VALIDATOR)
  const validatorBalanceBN = new BN(
    Number(Number(validatorBalance) * LAMPORTS_PER_SOL),
  )
  const withdrawableBalanceLamport = validatorBalanceBN.sub(
    MINIMUM_EPOCH_START_BALANCE,
  )
  const withdrawableBalance =
    Number(withdrawableBalanceLamport) / LAMPORTS_PER_SOL
  return withdrawableBalance
}
