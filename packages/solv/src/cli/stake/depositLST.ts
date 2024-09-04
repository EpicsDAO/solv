import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { askAmount } from '.'
import { PriorityLevel } from '@/lib/solana/priorityFee'
import { SOLV_POOL_MANAGER_ADDRESS } from '@/config/config'
import { getOrCreateDestinationAddress } from '@/lib/solana/getOrCreateDestinationAddress'
import { Spinner } from 'cli-spinner'
import chalk from 'chalk'
import { depositSol } from '@/lib/solana/depositSOL'
import { sleep } from '@skeet-framework/utils'
import { getStakePoolInfo } from '@/lib/solana/getStakePoolInfo'

export const depositeLST = async (
  rpcUrl: string,
  poolAddress: string,
  amount: number,
  fromWalletKey: number[],
  symbol?: string,
) => {
  const connection = new Connection(rpcUrl)
  if (amount === 0) {
    amount = await askAmount()
  }
  const spinner = new Spinner('%s')
  spinner.setSpinnerString(18)
  spinner.start()
  spinner.setSpinnerTitle(
    chalk.green(`✔︎ Checking Stake Pool ${poolAddress}...`),
  )
  const priorityFee = PriorityLevel.MEDIUM
  const stakePoolAddress = new PublicKey(poolAddress)
  const stakePool = await getStakePoolInfo(rpcUrl, poolAddress)
  if (!stakePool) {
    console.log('Stake Pool not found')
    return false
  }
  spinner.setSpinnerTitle(
    chalk.green(`🔍 Getting or Creating AssociatedTokenAccount`),
  )
  const mintAddress = stakePool.poolMint
  const depositAuthority = Keypair.fromSecretKey(new Uint8Array(fromWalletKey))
  const destinationTokenAccount = await getOrCreateDestinationAddress(
    rpcUrl,
    fromWalletKey,
    mintAddress,
    depositAuthority.publicKey,
  )
  const solvAssociatedTokenAccount = await getOrCreateDestinationAddress(
    rpcUrl,
    fromWalletKey,
    mintAddress,
    new PublicKey(SOLV_POOL_MANAGER_ADDRESS),
    true,
  )
  await sleep(1000)

  spinner.setSpinnerTitle(chalk.green(`🔄 Converting SOL to ${symbol}`))

  let sig = await depositSol(
    connection,
    fromWalletKey,
    amount,
    priorityFee,
    stakePoolAddress,
    new PublicKey(destinationTokenAccount),
    new PublicKey(solvAssociatedTokenAccount),
    depositAuthority.publicKey,
  )

  let retryCount = 0
  while (sig.status !== 'success') {
    retryCount++
    if (retryCount > 10) {
      spinner.stop(true)
      console.log(chalk.red('Failed to deposit.Please try again later 🙏'))
      return false
    }
    console.log(chalk.yellow(`⏳ ${retryCount} Times Retrying...\n`))
    await sleep(1000)
    sig = await depositSol(
      connection,
      fromWalletKey,
      amount,
      priorityFee,
      stakePoolAddress,
      new PublicKey(destinationTokenAccount),
      new PublicKey(solvAssociatedTokenAccount),
      depositAuthority.publicKey,
    )
  }
  spinner.stop(true)
  console.log(
    chalk.white(`💰 You've got ${symbol} ✨\n\nSignature:`, sig.signature),
  )
  return true
}
