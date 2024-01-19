import { KEYPAIRS, NETWORK_TYPES, CONFIG } from '@/config/config'
import { spawnSync } from 'child_process'

export const setupVoteAccount = (
  commission = CONFIG.COMMISSION,
  isTest = true
) => {
  const validatorVoteKey = isTest
    ? KEYPAIRS.TESTNET_VALIDATOR_VOTE_KEY
    : KEYPAIRS.MAINNET_VALIDATOR_VOTE_KEY
  const validatorKey = isTest
    ? KEYPAIRS.TESTNET_VALIDATOR_KEY
    : KEYPAIRS.MAINNET_VALIDATOR_KEY
  const validatorAuthorityKey = isTest
    ? KEYPAIRS.TESTNET_VALITATOR_AUTHORITY_KEY
    : KEYPAIRS.MAINNET_VALITATOR_AUTHORITY_KEY

  const network = isTest ? NETWORK_TYPES.TESTNET : NETWORK_TYPES.MAINNET
  const setNetwork = `solana config set --url https://api.${network}.solana.com`
  spawnSync(setNetwork, { shell: true, stdio: 'inherit' })

  console.log(
    `⌛️ Creating vote account with commission ${commission} - ${network}`
  )
  const cmd = `solana create-vote-account ${validatorVoteKey} ${validatorKey} ${validatorAuthorityKey} --commission ${commission}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
