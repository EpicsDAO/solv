import { ComputeBudgetProgram, PublicKey, Transaction } from '@solana/web3.js'
import { createApproveInstruction } from '@solana/spl-token'

async function buildApproveTransaction(
  account: PublicKey,
  delegate: PublicKey,
  owner: PublicKey,
  amount: number,
): Promise<Transaction> {
  const transaction = new Transaction()
    .add(createApproveInstruction(account, delegate, owner, amount))
    .add(
      ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: 1000,
      }),
    )
  return transaction
}
export default buildApproveTransaction
