import { getAllKeyPaths } from '@/config/config'
import { SOLANA_RPC_URL } from '@/index'
import { Connection, LAMPORTS_PER_SOL } from '@solana/web3.js'
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
  const homeDir = homedir()
  const home = homeDir.includes('solv')
    ? '/home/solv'
    : `${homeDir}/solvKeys/upload`
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

export default getBalance
