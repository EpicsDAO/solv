import { sendPost } from '@skeet-framework/utils'
import { Connection, PublicKey, VersionedTransaction } from '@solana/web3.js'
import { Keypair } from '@solana/web3.js'
import { SwapTransaction } from './jupiterResponse'
import { JUP_URL, SOLV_POOL_MANAGER_ADDRESS } from '@/config/config'
import { inspect } from 'util'

export const jupiterSwap = async (
  endpoint: string,
  quoteResponse: SwapTransaction,
  fromWalletKey: number[],
) => {
  try {
    const url = JUP_URL.V6_SWAP_URL
    const connection = new Connection(endpoint, 'confirmed')
    const fromWallet = Keypair.fromSecretKey(
      new Uint8Array(Array.from(fromWalletKey)),
    )

    const params = {
      quoteResponse,
      userPublicKey: fromWallet.publicKey.toBase58(),
      feeAccount: SOLV_POOL_MANAGER_ADDRESS,
      destinationTokenAccount: fromWallet.publicKey.toBase58(),
      //computeUnitPriceMicroLamports: 5000000, // Priority fee
    }
    const res = await sendPost(url, params)
    console.log(`Swap Transaction: ${inspect(res, false, null, true)}`)
    const swapTransactionBuf = Buffer.from(
      res.swapTransaction as string,
      'base64',
    )
    let transaction = VersionedTransaction.deserialize(swapTransactionBuf)

    // Sign transaction
    transaction.sign([fromWallet])

    const rawTransaction = transaction.serialize()
    const txid = await connection.sendRawTransaction(rawTransaction, {
      skipPreflight: true,
      maxRetries: 2,
    })
    console.log(`Swapping...`)
    await connection.confirmTransaction(txid, 'finalized')
    console.log(`https://solscan.io/tx/${txid}`)
    return { signature: txid }
  } catch (error) {
    console.log(`jupiterSwap: ${error}`)
    return { signature: null }
  }
}
