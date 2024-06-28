import { Keypair } from '@solana/web3.js'
import { readFile } from 'fs/promises'

const loadKeypairFromFile = async (filePath: string) => {
  const secretKey = JSON.parse(await readFile(filePath, 'utf8')) as number[]
  return Keypair.fromSecretKey(new Uint8Array(secretKey))
}

export default loadKeypairFromFile
