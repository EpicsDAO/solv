import { getAllKeyPaths } from '@/config/config'
import { SOLANA_RPC_URL } from '@/index'
import { execSync } from 'child_process'
import { homedir } from 'os'

export enum KeyType {
  VALIDATOR = 'validator',
  AUTH = 'auth',
  VOTE = 'vote',
}

const getBalance = (key = KeyType.AUTH) => {
  const homeDir = homedir()
  const {
    mainnetValidatorVoteKey,
    mainnetValidatorKey,
    mainnetValidatorAuthorityKey,
  } = getAllKeyPaths(homeDir)
  let account = mainnetValidatorAuthorityKey
  if (key === KeyType.VALIDATOR) account = mainnetValidatorKey
  if (key === KeyType.VOTE) account = mainnetValidatorVoteKey
  const voteAccountB = execSync(
    `solana balance ${account} --url ${SOLANA_RPC_URL}`,
  )
    .toString()
    .replace('SOL', '')
    .trim()

  const voteAccountBalance = Number(voteAccountB)

  if (isNaN(voteAccountBalance)) throw new Error('Failed to get balance')
  return voteAccountBalance
}

export default getBalance
