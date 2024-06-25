import { NETWORK_TYPES } from '@/config/config'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { execSync } from 'child_process'
import inquirer from 'inquirer'

export type delegateStakeOption = {
  stakeAccounts: string[]
  validatorVoteAccount: string
}

export const delegateStakeAsk = async (config: ConfigParams) => {
  const stakeAccount = config.config.STAKE_ACCOUNT
  const defaultAddress =
    config.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
      ? getVoteAccountAddress(config)
      : config.config.DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY
  const answer = await inquirer.prompt<delegateStakeOption>([
    {
      type: 'checkbox',
      name: 'stakeAccounts',
      message: `Which Stake Account would you like to delegate stake to?`,
      choices: stakeAccount,
    },
    {
      type: 'input',
      name: 'validatorVoteAccount',
      message: `What is the Validator Vote Account Address?(e.g. ${config.config.DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY})`,
      default() {
        return defaultAddress
      },
    },
  ])
  return answer
}

const getVoteAccountAddress = (config: ConfigParams) => {
  const isTest =
    config.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET ? true : false
  const voteAccount = isTest ? 'testnet-vote-account' : 'mainnet-vote-account'
  const cmd = `/home/solv/${voteAccount}-keypair.json`
  const address = execSync(`solana-keygen pubkey ${cmd}`).toString()
  return address
}
