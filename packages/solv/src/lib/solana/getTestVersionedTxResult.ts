import {
  ComputeBudgetProgram,
  Connection,
  Keypair,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'

export const getTestVersionedTxResult = async (
  connection: Connection,
  fromWalletKeyString: string,
  instructions: TransactionInstruction[],
) => {
  const fromWalletKey = fromWalletKeyString.split(',').map(Number)
  const fromWallet = Keypair.fromSecretKey(
    new Uint8Array(Array.from(fromWalletKey)),
  )
  const testInstructions = [
    ...instructions,
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

  const result = {
    testVersionedTx,
    estimatedFee: 1000,
    simulationResult,
    latestBlockhashAndContext,
  }
  return result
}
