import {
  CONFIG,
  KEYPAIRS,
  NETWORK_TYPES,
  getAllKeyPaths,
} from '@/config/config'
import { spawnSync } from 'child_process'

export const createVoteAccount = (
  commission = CONFIG.COMMISSION,
  isTest = true,
) => {
  const keypairs = getAllKeyPaths()
  const validatorVoteKey = isTest
    ? keypairs.testnetValidatorVoteKey
    : keypairs.mainnetValidatorVoteKey
  const validatorKey = isTest
    ? keypairs.testnetValidatorKey
    : keypairs.mainnetValidatorKey
  const validatorAuthorityKey = isTest
    ? keypairs.testnetValidatorAuthorityKey
    : keypairs.mainnetValidatorAuthorityKey
  const network = isTest ? NETWORK_TYPES.TESTNET : NETWORK_TYPES.MAINNET
  const setNetwork = `solana config set --url https://api.${network}.solana.com`
  spawnSync(setNetwork, { shell: true, stdio: 'inherit' })
  console.log(
    `⌛️ Creating vote account with commission ${commission} - ${network}`,
  )
  const cmd = `solana create-vote-account ${validatorVoteKey} ${validatorKey} ${validatorAuthorityKey} --commission ${commission}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
