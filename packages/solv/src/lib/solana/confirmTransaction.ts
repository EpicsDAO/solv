import {
  Connection,
  Keypair,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from '@solana/web3.js'
import { PriorityLevel } from './priorityFee'
import { getTestVersionedTxResult } from './getTestVersionedTxResult'

export const confirmTransaction = async (
  connection: Connection,
  fromWalletKeyString: string,
  instructions: TransactionInstruction[],
  priorityFee: PriorityLevel = PriorityLevel.LOW,
) => {
  try {
    const fromWalletKey = fromWalletKeyString.split(',').map(Number)
    const fromWallet = Keypair.fromSecretKey(
      new Uint8Array(Array.from(fromWalletKey)),
    )
    const testVersionedTx = await getTestVersionedTxResult(
      connection,
      fromWalletKeyString,
      instructions,
      priorityFee,
    )
    const versionedTx = new VersionedTransaction(
      new TransactionMessage({
        instructions,
        payerKey: fromWallet.publicKey,
        recentBlockhash:
          testVersionedTx.latestBlockhashAndContext.value.blockhash,
      }).compileToV0Message(),
    )

    versionedTx.sign([fromWallet])
    const signature = await connection.sendRawTransaction(
      versionedTx.serialize(),
    )
    await connection.confirmTransaction(
      {
        ...testVersionedTx.latestBlockhashAndContext.value,
        signature,
      },
      'finalized',
    )
    return signature
  } catch (error) {
    console.log(`confirmTransaction: ${error}`)
    throw new Error(JSON.stringify(error))
  }
}
