import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { askAmount } from '.'
import { ELSOL_MINT_ADDRESS, SOLV_ELSOL_ACCOUNT_ADDRESS } from '@/config/config'
import { getOrCreateDestinationAddress } from '@/lib/solana/getOrCreateDestinationAddress'
import { Spinner } from 'cli-spinner'
import chalk from 'chalk'
import { depositSol } from '@/lib/solana/depositSOL'
import { sleep } from '@skeet-framework/utils'

export const elSOLdeposit = async (
  rpcUrl: string,
  poolAddress: string,
  amount: number,
  fromWalletKey: number[],
) => {
  console.log(chalk.white('Solana RPC URL:', rpcUrl))
  let connection = new Connection(rpcUrl)
  if (amount === 0) {
    amount = await askAmount()
  }
  const spinner = new Spinner('%s')
  spinner.setSpinnerString(18)
  spinner.start()
  spinner.setSpinnerTitle(
    chalk.green(`✔︎ Checking Stake Pool ${poolAddress}...`),
  )
  const stakePoolAddress = new PublicKey(poolAddress)
  const depositAuthority = Keypair.fromSecretKey(new Uint8Array(fromWalletKey))
  const mintAddress = ELSOL_MINT_ADDRESS
  spinner.setSpinnerTitle(
    chalk.green(`🔍 Getting or Creating AssociatedTokenAccount`),
  )
  const destinationTokenAccount = await getOrCreateDestinationAddress(
    rpcUrl,
    fromWalletKey,
    mintAddress,
    depositAuthority.publicKey,
  )
  await sleep(1000)
  spinner.setSpinnerTitle(chalk.green('🔄 Converting SOL to elSOL'))

  let sig = await depositSol(
    connection,
    fromWalletKey,
    amount,
    stakePoolAddress,
    new PublicKey(destinationTokenAccount),
    new PublicKey(SOLV_ELSOL_ACCOUNT_ADDRESS),
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
    spinner.setSpinnerTitle(chalk.yellow(`⏳ ${retryCount} Times Retrying...`))
    await sleep(3000)
    connection = new Connection(rpcUrl)
    sig = await depositSol(
      connection,
      fromWalletKey,
      amount,
      stakePoolAddress,
      new PublicKey(destinationTokenAccount),
      new PublicKey(SOLV_ELSOL_ACCOUNT_ADDRESS),
      depositAuthority.publicKey,
    )
  }
  spinner.stop(true)

  console.log(
    chalk.white(
      "💰 Finished Deposit - You've got elSOL ✨\n\nSignature:",
      sig.signature,
    ),
  )
  return true
}
