import { LAMPORTS_PER_SOL } from '@solana/web3.js'
import getBalance, { KeyType } from '@/lib/solana/getBalance'
import { SOLANA_RPC_URL } from '@/index'

// Harvest Settings
const MINIMUM_EPOCH_START_BALANCE = 3 * LAMPORTS_PER_SOL // LAMPORTS

export const getHarvestBalance = async () => {
  const validatorBalance = await getBalance(SOLANA_RPC_URL, KeyType.VALIDATOR)

  // Convert validator balance to lamports using BigInt for precise calculations
  const validatorBalanceLamports =
    BigInt(validatorBalance) * BigInt(LAMPORTS_PER_SOL)

  // Calculate the withdrawable balance
  const withdrawableBalanceLamport =
    validatorBalanceLamports - BigInt(MINIMUM_EPOCH_START_BALANCE)

  // Convert lamports back to SOL
  let withdrawableBalance =
    Number(withdrawableBalanceLamport) / LAMPORTS_PER_SOL

  // Round to 9 decimal places
  withdrawableBalance = Math.round(withdrawableBalance * 1e9) / 1e9

  return withdrawableBalance // SOL
}
