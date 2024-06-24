import { SOLANA_RPC_URL } from '@/index'
import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { askAmount } from '.'
import { PriorityLevel } from '@/lib/solana/priorityFee'
import { ELSOL_MINT_ADDRESS, SOLV_ELSOL_ACCOUNT_ADDRESS } from '@/config/config'
import { getOrCreateDestinationAddress } from '@/lib/solana/getOrCreateDestinationAddress'
import { Spinner } from 'cli-spinner'
import chalk from 'chalk'
import { depositSol } from '@/lib/solana/depositSOL'
import { sleep } from '@skeet-framework/utils'

export const elSOLdeposit = async (
  poolAddress: string,
  amount: number,
  fromWalletKey: number[],
) => {
  const connection = new Connection(SOLANA_RPC_URL)
  if (amount === 0) {
    amount = await askAmount()
  }
  const priorityFee = PriorityLevel.MEDIUM
  const stakePoolAddress = new PublicKey(poolAddress)
  const mintAddress = ELSOL_MINT_ADDRESS
  const destinationTokenAccount = await getOrCreateDestinationAddress(
    SOLANA_RPC_URL,
    fromWalletKey,
    mintAddress,
  )
  const depositAuthority = Keypair.fromSecretKey(new Uint8Array(fromWalletKey))
  const spinner = new Spinner('%s')
  spinner.setSpinnerString(18)
  spinner.start()
  spinner.setSpinnerTitle(chalk.yellowBright('🔄 Converting SOL to'))

  let sig = await depositSol(
    connection,
    fromWalletKey,
    amount,
    priorityFee,
    stakePoolAddress,
    new PublicKey(destinationTokenAccount),
    new PublicKey(SOLV_ELSOL_ACCOUNT_ADDRESS),
    depositAuthority.publicKey,
  )

  while (sig.status !== 'success') {
    spinner.setSpinnerTitle(chalk.yellow('Retrying...'))
    await sleep(1000)
    sig = await depositSol(connection, fromWalletKey, amount, priorityFee)
  }
  spinner.stop(true)

  console.log(
    chalk.white(
      "💰Finished Deposit - You've got elSOL ✨\nSignature:",
      sig.signature,
    ),
  )
  return
}
