import { getExplorerLink, getKeypairFromFile } from '@solana-developers/helpers'
import {
  createSyncNativeInstruction,
  getAccount,
  getAssociatedTokenAddress,
  NATIVE_MINT,
} from '@solana/spl-token'
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from '@solana/web3.js'
import buildApproveTransaction from './buildApproveTransaction'
import { SOLANA_TESTNET_RPC_URL } from '@/config/constants'

const wrapSOLandApprove = async (
  rpcUrl: string,
  keyfilePath: string,
  delegatePubkey: string,
  wrapSOLamount: number,
  maxDelegateAmount = 100,
  isTest = false,
) => {
  const SOLANA_RPC_URL = isTest ? SOLANA_TESTNET_RPC_URL : rpcUrl
  const connection = new Connection(SOLANA_RPC_URL)
  console.log(`RPC URL: ${SOLANA_RPC_URL}`)
  console.log(`🔑 Key Path: ${keyfilePath}`)
  const payer = await getKeypairFromFile(keyfilePath)
  console.log(`Payer: ${payer.publicKey.toBase58()}`)
  const delegate = new PublicKey(delegatePubkey)
  const associatedTokenAccount = await getAssociatedTokenAddress(
    NATIVE_MINT,
    payer.publicKey,
  )
  console.log(`associatedTokenAccount: ${associatedTokenAccount.toBase58()}`)
  const solTransferTransaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: associatedTokenAccount,
      lamports: wrapSOLamount * LAMPORTS_PER_SOL,
    }),
    createSyncNativeInstruction(associatedTokenAccount),
  )
  await sendAndConfirmTransaction(connection, solTransferTransaction, [payer])
  console.log(`✅ SOL transferred`)
  const accountInfo = await getAccount(connection, associatedTokenAccount)
  const amountLamport = maxDelegateAmount * LAMPORTS_PER_SOL
  const tx = await buildApproveTransaction(
    accountInfo.address,
    delegate,
    payer.publicKey,
    amountLamport,
  )
  const latestBlockhashAndContext =
    await connection.getLatestBlockhashAndContext({
      commitment: 'finalized',
    })
  tx.feePayer = payer.publicKey
  tx.recentBlockhash = latestBlockhashAndContext.value.blockhash
  tx.sign(payer)
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
  const network = isTest ? 'testnet' : 'mainnet-beta'
  const explorerLink = getExplorerLink('transaction', signature, network)
  console.log(`✅ Delegate approved. Transaction: ${explorerLink}`)
}

export default wrapSOLandApprove
