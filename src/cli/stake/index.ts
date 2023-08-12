import {
  DEFAULT_AUTHORITY_ACCOUNT_KEYFILE,
  DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY,
  program,
} from '@/index'
import { delegateStake } from './delegateStake'

export * from './delegateStake'

export const stakeCommands = async () => {
  program
    .command('stake')
    .description('Solana Delegate Stake Command')
    .argument('<stakeAccountPubkey>', 'Stake Account Pubkey')
    .option(
      '-v, --validator <validatorVoteAccountPubkey>',
      `Validator Vote Account Pubkey e.g. ${DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY}`
    )
    .option(
      '-a, --authority <authorityAccountKeyfile>',
      `Authority Account Keyfile e.g. ${DEFAULT_AUTHORITY_ACCOUNT_KEYFILE}`
    )
    .action(async (stakeAccountPubkey: string, options) => {
      const validatorVoteAccountPubkey =
        options.validator || DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY
      const authorityAccountKeyfile =
        options.authority || DEFAULT_AUTHORITY_ACCOUNT_KEYFILE
      await delegateStake(
        stakeAccountPubkey,
        validatorVoteAccountPubkey,
        authorityAccountKeyfile
      )
    })
}
