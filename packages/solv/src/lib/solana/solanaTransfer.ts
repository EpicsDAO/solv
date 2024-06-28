import {
  Keypair,
  Connection,
  PublicKey,
  SystemProgram,
  ComputeBudgetProgram,
  VersionedTransaction,
  TransactionMessage,
} from '@solana/web3.js'
import { PriorityLevel, getPriorityFeeEstimate } from './priorityFee'

export const solanaTransfer = async (
  endpoint: string,
  fromWalletKey: number[],
  toAddressPubkey: string,
  transferAmountLamport: number,
) => {
  try {
    const connection = new Connection(endpoint, 'finalized')

    const fromWallet = Keypair.fromSecretKey(
      new Uint8Array(Array.from(fromWalletKey)),
    )
    const toPubkey = new PublicKey(toAddressPubkey)
    const lamports = transferAmountLamport

    // eslint-disable-next-line no-constant-condition
    while (true) {
      try {
        const testInstructions = [
          SystemProgram.transfer({
            fromPubkey: fromWallet.publicKey,
            toPubkey,
            lamports,
          }),
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
          SystemProgram.transfer({
            fromPubkey: fromWallet.publicKey,
            toPubkey,
            lamports,
          }),
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
        console.log(`solanaTransfer failed, retrying... Error: ${error}`)
      }
    }
  } catch (error) {
    console.log(`solanaTransfer: ${error}`)
    throw new Error(JSON.stringify(error))
  }
}
