import { getAllKeyPaths } from '@/config/config'
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js'
import loadKeypairFromFile from './loadKeypairFromFile'
import { homedir } from 'os'

export enum KeyType {
  VALIDATOR = 'validator',
  AUTH = 'auth',
  VOTE = 'vote',
}

type NetworkPrefix = 'mainnet' | 'testnet'

type KeySuffix = 'ValidatorKey' | 'ValidatorVoteKey' | 'ValidatorAuthorityKey'

type AccountKey =
  | 'mainnetValidatorKey'
  | 'mainnetValidatorVoteKey'
  | 'mainnetValidatorAuthorityKey'
  | 'testnetValidatorKey'
  | 'testnetValidatorVoteKey'
  | 'testnetValidatorAuthorityKey'

const keySuffixMap: Record<KeyType, KeySuffix> = {
  [KeyType.VALIDATOR]: 'ValidatorKey',
  [KeyType.AUTH]: 'ValidatorAuthorityKey',
  [KeyType.VOTE]: 'ValidatorVoteKey',
}

const getBalance = async (
  rpcUrl: string,
  key: KeyType = KeyType.AUTH,
  isTestnet: boolean = false,
): Promise<number> => {
  const connection = new Connection(rpcUrl)
  const home = homedir()
  const keyPaths = getAllKeyPaths(home)

  const prefix: NetworkPrefix = isTestnet ? 'testnet' : 'mainnet'

  const accountKey = `${prefix}${keySuffixMap[key]}` as AccountKey
  const account = keyPaths[accountKey]

  const keypair = await loadKeypairFromFile(account)
  const balance = await connection.getBalance(keypair.publicKey)
  const lamports = Number(balance)
  const SOL = lamports / LAMPORTS_PER_SOL

  if (isNaN(SOL)) throw new Error('Failed to get balance')
  return SOL
}

export default getBalance
