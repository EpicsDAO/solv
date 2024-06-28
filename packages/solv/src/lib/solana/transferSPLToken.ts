import {
  Connection,
  PublicKey,
  Keypair,
  ComputeBudgetProgram,
  VersionedTransaction,
  TransactionMessage,
} from '@solana/web3.js'
import {
  getOrCreateAssociatedTokenAccount,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'
import { PriorityLevel, getPriorityFeeEstimate } from './priorityFee'

export const transferSPLToken = async (
  endpoint: string,
  fromWalletKey: number[],
  toAddressPubkey: string,
  amount: number,
  tokenMintAddress: string,
  tokenDecimals: number,
) => {
  try {
    const connection = new Connection(endpoint, 'finalized')

    const fromWallet = Keypair.fromSecretKey(new Uint8Array(fromWalletKey))
    const toPubkey = new PublicKey(toAddressPubkey)
    const mintPubkey = new PublicKey(tokenMintAddress)

    const amountInSmallestUnit = Math.trunc(
      amount * Math.pow(10, tokenDecimals),
    )

    const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      fromWallet,
      mintPubkey,
      fromWallet.publicKey,
    )
    const toTokenAccount = await getOrCreateAssociatedTokenAccount(
      connection,
      fromWallet,
      mintPubkey,
      toPubkey,
      true,
    )

    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const testInstructions = [
          createTransferInstruction(
            fromTokenAccount.address,
            toTokenAccount.address,
            fromWallet.publicKey,
            amountInSmallestUnit,
            [],
            TOKEN_PROGRAM_ID,
          ),
          ComputeBudgetProgram.setComputeUnitLimit({
            units: 200_000,
          }),
          ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: Math.ceil(5000000),
          }),
        ]

        const latestBlockhashAndContext =
          await connection.getLatestBlockhashAndContext({
            commitment: 'finalized',
          })

        const testVersionedTx = new VersionedTransaction(
          new TransactionMessage({
            instructions: testInstructions,
            payerKey: fromWallet.publicKey,
            recentBlockhash: latestBlockhashAndContext.value.blockhash,
          }).compileToV0Message(),
        )

        const simulationResult = await connection.simulateTransaction(
          testVersionedTx,
          {
            replaceRecentBlockhash: true,
            sigVerify: false,
          },
        )
        testVersionedTx.sign([fromWallet])

        const estimatedFee = await getPriorityFeeEstimate(
          connection.rpcEndpoint,
          testVersionedTx,
          PriorityLevel.MEDIUM,
        )

        const instructions = [
          createTransferInstruction(
            fromTokenAccount.address,
            toTokenAccount.address,
            fromWallet.publicKey,
            amountInSmallestUnit,
            [],
            TOKEN_PROGRAM_ID,
          ),
          ComputeBudgetProgram.setComputeUnitLimit({
            units: simulationResult.value.unitsConsumed
              ? Math.trunc(simulationResult.value.unitsConsumed * 1.2)
              : 200_000,
          }),
          ComputeBudgetProgram.setComputeUnitPrice({
            microLamports: Math.ceil(estimatedFee.priorityFeeEstimate),
          }),
        ]
        const versionedTx = new VersionedTransaction(
          new TransactionMessage({
            instructions,
            payerKey: fromWallet.publicKey,
            recentBlockhash: latestBlockhashAndContext.value.blockhash,
          }).compileToV0Message(),
        )

        versionedTx.sign([fromWallet])
        const signature = await connection.sendRawTransaction(
          versionedTx.serialize(),
        )

        await connection.confirmTransaction(
          {
            ...latestBlockhashAndContext.value,
            signature,
          },
          'finalized',
        )
        console.log('finalized signature:', signature)
        return signature
      } catch (error) {
        console.error('Transfer failed, retrying...', error)
      }
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
