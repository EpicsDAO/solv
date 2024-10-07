import { revoke } from '@solana/spl-token'
import { Connection, PublicKey, Signer } from '@solana/web3.js'

const revokeTransaction = async (
  connection: Connection,
  payer: Signer,
  account: PublicKey,
  owner: PublicKey,
) => {
  const transactionSignature = await revoke(connection, payer, account, owner)
  return transactionSignature
}

export default revokeTransaction
