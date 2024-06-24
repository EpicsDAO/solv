import { Connection, PublicKey, Keypair } from '@solana/web3.js'
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token'

export const getOrCreateDestinationAddress = async (
  rpcUrl: string,
  fromWalletKey: number[],
  mintAddress: string,
) => {
  const fromWallet = Keypair.fromSecretKey(new Uint8Array(fromWalletKey))
  const mintPublicKey = new PublicKey(mintAddress)
  const connection = new Connection(rpcUrl)
  // SPLトークンの関連アドレスを計算します
  const associatedTokenAddress = await getOrCreateAssociatedTokenAccount(
    connection,
    fromWallet,
    mintPublicKey,
    fromWallet.publicKey,
  )

  // 関連アドレスを返します
  return associatedTokenAddress.address.toBase58()
}
