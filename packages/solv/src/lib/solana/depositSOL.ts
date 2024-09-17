import {
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  ComputeBudgetProgram,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js'
import { SOLV_STAKE_POOL_ADDRESS } from '@/config/config'
import * as solanaStakePool from '@solana/spl-stake-pool'

export type DepositSOLResponse = {
  status: 'success' | 'error'
  signature?: string
  error?: any
}

export const depositSol = async (
  connection: Connection,
  fromWalletKey: number[],
  SOL: number,
  stakePoolAddress: PublicKey = new PublicKey(SOLV_STAKE_POOL_ADDRESS),
  destinationTokenAccount?: PublicKey,
  referrerTokenAccount?: PublicKey,
  depositAuthority?: PublicKey,
) => {
  try {
    const fromWallet = Keypair.fromSecretKey(new Uint8Array(fromWalletKey))
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

    const tx = new Transaction().add(...instructions).add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1000,
      }),
    )

    tx.feePayer = fromWallet.publicKey
    tx.recentBlockhash = latestBlockhashAndContext.value.blockhash
    tx.sign(...signers, fromWallet)
    const signature = await connection.sendRawTransaction(tx.serialize(), {
      skipPreflight: true,
    })

    await connection.confirmTransaction(
      {
        ...latestBlockhashAndContext.value,
        signature,
      },
      'finalized',
    )
    return { status: 'success', signature } as DepositSOLResponse
  } catch (error) {
    console.log('depositSol error', error)
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
