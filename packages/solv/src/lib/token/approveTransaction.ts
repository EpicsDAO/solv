import { approve } from '@solana/spl-token'
import { Connection, PublicKey, Signer } from '@solana/web3.js'

const approveTransaction = async (
  connection: Connection,
  payer: Signer,
  account: PublicKey,
  delegate: PublicKey,
  owner: PublicKey,
  amount: number,
) => {
  try {
    const transactionSignature = await approve(
      connection,
      payer,
      account,
      delegate,
      owner,
      amount,
    )
    return transactionSignature
  } catch (error) {
    throw new Error(`approveTransaction: ${error}`)
  }
}
export default approveTransaction
