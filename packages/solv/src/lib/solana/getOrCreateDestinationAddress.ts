import { Connection, PublicKey, Keypair } from '@solana/web3.js'
import { getOrCreateAssociatedTokenAccount } from '@solana/spl-token'

export const getOrCreateDestinationAddress = async (
  rpcUrl: string,
  fromWalletKey: number[],
  mintAddress: string,
  owner: PublicKey,
  allowOwnerOffCurve = false,
) => {
  try {
    const payer = Keypair.fromSecretKey(new Uint8Array(fromWalletKey))
    const mintPublicKey = new PublicKey(mintAddress)
    const connection = new Connection(rpcUrl)
    // SPLトークンの関連アドレスを計算します
    const associatedTokenAddress = await getOrCreateAssociatedTokenAccount(
      connection,
      payer,
      mintPublicKey,
      owner,
      allowOwnerOffCurve,
    )

    // 関連アドレスを返します
    return associatedTokenAddress.address.toBase58()
  } catch (error) {
    console.log('Error in getOrCreateDestinationAddress', error)
    throw new Error(JSON.stringify(error))
  }
}
