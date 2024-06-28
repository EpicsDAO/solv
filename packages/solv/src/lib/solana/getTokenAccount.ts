import { fetchDigitalAsset } from '@metaplex-foundation/mpl-token-metadata'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { publicKey } from '@metaplex-foundation/umi'

export type TokenInfo = {
  name: string
  symbol: string
  uri: string
  mint: string
}

export const getTokenInfo = async (rpcUrl: string, mintAddress: string) => {
  try {
    const mintPubkey = publicKey(mintAddress)
    console.log(`mintPubkey: ${mintPubkey}`)
    const umi = createUmi(rpcUrl)
    const nftMetadata = await fetchDigitalAsset(umi, mintPubkey)
    const res = {
      name: nftMetadata.metadata.name,
      symbol: nftMetadata.metadata.symbol,
      uri: nftMetadata.metadata.uri,
      mint: mintAddress,
    }
    return res as TokenInfo
  } catch (error) {
    return null
  }
}
