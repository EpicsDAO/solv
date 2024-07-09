import { getAllKeyPaths } from '@/config/config'
import { SOLANA_RPC_URL } from '@/index'
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js'
import loadKeypairFromFile from './loadKeypairFromFile'
import getHomeDir from '../getHomeDir'

export enum KeyType {
  VALIDATOR = 'validator',
  AUTH = 'auth',
  VOTE = 'vote',
}

const getBalance = async (
  rpcUrl = SOLANA_RPC_URL,
  key = KeyType.AUTH,
  isTestnet = false,
) => {
  if (isTestnet) {
    const connection = new Connection(rpcUrl)
    const home = getHomeDir()
    const {
      testnetValidatorVoteKey,
      testnetValidatorKey,
      testnetValidatorAuthorityKey,
    } = getAllKeyPaths(home)
    let account = testnetValidatorAuthorityKey
    if (key === KeyType.VALIDATOR) account = testnetValidatorKey
    if (key === KeyType.VOTE) account = testnetValidatorVoteKey
    const publicKey = await loadKeypairFromFile(account)
    const balance = await connection.getBalance(publicKey.publicKey)
    const lamports = Number(balance)
    const SOL = lamports / LAMPORTS_PER_SOL
    if (isNaN(lamports)) throw new Error('Failed to get balance')
    return SOL
  } else {
    const connection = new Connection(rpcUrl)
    const home = getHomeDir()
    const {
      mainnetValidatorVoteKey,
      mainnetValidatorKey,
      mainnetValidatorAuthorityKey,
    } = getAllKeyPaths(home)
    let account = mainnetValidatorAuthorityKey
    if (key === KeyType.VALIDATOR) account = mainnetValidatorKey
    if (key === KeyType.VOTE) account = mainnetValidatorVoteKey
    const publicKey = await loadKeypairFromFile(account)
    const balance = await connection.getBalance(publicKey.publicKey)
    const lamports = Number(balance)
    const SOL = lamports / LAMPORTS_PER_SOL
    if (isNaN(lamports)) throw new Error('Failed to get balance')
    return SOL
  }
}

export default getBalance
