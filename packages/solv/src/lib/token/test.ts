import 'dotenv/config'
import {
  getExplorerLink,
  getKeypairFromEnvironment,
} from '@solana-developers/helpers'
import { Connection, PublicKey, SystemProgram } from '@solana/web3.js'
import { approve, getOrCreateAssociatedTokenAccount } from '@solana/spl-token'
import { ELSOL_MINT_ADDRESS } from '@/config/config'

const TOKEN_DECIMALS = 9
const DELEGATE_AMOUNT = 0.01 * Math.pow(10, TOKEN_DECIMALS)

// Initialize connection and load user keypair
const connection = new Connection('https://rpc-ams.validators.solutions/rpc')
const user = getKeypairFromEnvironment('SECRET_KEY')

console.log(`🔑 Loaded keypair. Public key: ${user.publicKey.toBase58()}`)

// Replace this with your actual address
// For this example, we will be using System Program's ID as a delegate
const delegatePublicKey = new PublicKey(
  'L1ocbjmuFUQDVwwUWi8HjXjg1RYEeN58qQx6iouAsGF',
)

// Substitute your token mint address
const tokenMintAddress = new PublicKey(ELSOL_MINT_ADDRESS)

try {
  // Get or create the user's token account
  const userTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    user,
    tokenMintAddress,
    user.publicKey,
  )

  // Approve the delegate
  const approveTransactionSignature = await approve(
    connection,
    user,
    userTokenAccount.address,
    delegatePublicKey,
    user.publicKey,
    DELEGATE_AMOUNT,
  )

  const explorerLink = getExplorerLink(
    'transaction',
    approveTransactionSignature,
    'devnet',
  )

  console.log(`✅ Delegate approved. Transaction: ${explorerLink}`)
} catch (error) {
  console.error(
    `Error: ${error instanceof Error ? error.message : String(error)}`,
  )
}
