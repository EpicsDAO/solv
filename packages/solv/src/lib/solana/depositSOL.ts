import {
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  ComputeBudgetProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js'
import { PriorityLevel, getPriorityFeeEstimate } from './priorityFee'
import { SOLV_STAKE_POOL_ADDRESS } from '@/config/config'
import * as solanaStakePool from '@solana/spl-stake-pool'
import chalk from 'chalk'

export type DepositSOLResponse = {
  status: 'success' | 'error'
  signature?: string
  error?: any
}

export const depositSol = async (
  connection: Connection,
  fromWalletKey: number[],
  SOL: number,
  priorityFee: PriorityLevel = PriorityLevel.LOW,
  stakePoolAddress: PublicKey = new PublicKey(SOLV_STAKE_POOL_ADDRESS),
  destinationTokenAccount?: PublicKey,
  referrerTokenAccount?: PublicKey,
  depositAuthority?: PublicKey,
) => {
  console.log(chalk.white(`⏳ Starting deposit of ${SOL} SOL`))
  try {
    const fromWallet = Keypair.fromSecretKey(new Uint8Array(fromWalletKey))

    console.log(
      chalk.white(`Staking Wallet: ${fromWallet.publicKey.toBase58()}\n`),
    )
    const lamport = SOL * LAMPORTS_PER_SOL
    const { instructions, signers } = await depositSOLInstruction(
      connection,
      fromWalletKey,
      lamport,
      stakePoolAddress,
      destinationTokenAccount,
      referrerTokenAccount,
      depositAuthority,
    )

    const txForEstimate = new Transaction().add(...instructions)
    txForEstimate.feePayer = fromWallet.publicKey
    const latestBlockhashAndContext =
      await connection.getLatestBlockhashAndContext({
        commitment: 'finalized',
      })

    txForEstimate.recentBlockhash = latestBlockhashAndContext.value.blockhash
    txForEstimate.sign(...signers, fromWallet)

    const estimatedFee = await getPriorityFeeEstimate(
      connection.rpcEndpoint,
      txForEstimate,
      priorityFee,
    )

    const tx = new Transaction().add(...instructions).add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: Math.ceil(estimatedFee.priorityFeeEstimate),
      }),
    )

    tx.feePayer = fromWallet.publicKey
    tx.recentBlockhash = latestBlockhashAndContext.value.blockhash
    tx.sign(...signers, fromWallet)
    const signature = await connection.sendRawTransaction(tx.serialize())

    await connection.confirmTransaction(
      {
        ...latestBlockhashAndContext.value,
        signature,
      },
      'finalized',
    )
    return { status: 'success', signature } as DepositSOLResponse
  } catch (error) {
    return { status: 'error', error } as DepositSOLResponse
  }
}

const depositSOLInstruction = async (
  connection: Connection,
  fromWalletKey: number[],
  lamport: number,
  stakePoolAddress: PublicKey = new PublicKey(SOLV_STAKE_POOL_ADDRESS),
  destinationTokenAccount?: PublicKey,
  referrerTokenAccount?: PublicKey,
  depositAuthority?: PublicKey,
) => {
  const fromWallet = Keypair.fromSecretKey(new Uint8Array(fromWalletKey))
  const payerAddress = fromWallet.publicKey
  const res = await solanaStakePool.depositSol(
    connection,
    stakePoolAddress,
    payerAddress,
    lamport,
    destinationTokenAccount,
    referrerTokenAccount,
    depositAuthority,
  )
  return res
}
