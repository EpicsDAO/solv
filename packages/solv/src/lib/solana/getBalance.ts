import { getAllKeyPaths } from '@/config/config'
import { SOLANA_RPC_URL } from '@/index'
import { Connection } from '@solana/web3.js'
import { execSync } from 'child_process'
import { homedir } from 'os'
import loadKeypairFromFile from './loadKeypairFromFile'

export enum KeyType {
  VALIDATOR = 'validator',
  AUTH = 'auth',
  VOTE = 'vote',
}

const getBalance = async (rpcUrl = SOLANA_RPC_URL, key = KeyType.AUTH) => {
  const connection = new Connection(rpcUrl)
  const {
    mainnetValidatorVoteKey,
    mainnetValidatorKey,
    mainnetValidatorAuthorityKey,
  } = getAllKeyPaths()
  let account = mainnetValidatorAuthorityKey
  if (key === KeyType.VALIDATOR) account = mainnetValidatorKey
  if (key === KeyType.VOTE) account = mainnetValidatorVoteKey
  const publicKey = await loadKeypairFromFile(account)
  const balance = await connection.getBalance(publicKey.publicKey)
  const voteAccountBalance = Number(balance)

  if (isNaN(voteAccountBalance)) throw new Error('Failed to get balance')
  return voteAccountBalance
}

export default getBalance
