import { program } from '@/index'
import { delegateStake } from './delegateStake'
import { SolvConfig } from '@/types/solvTypes'

export * from './delegateStake'

export const stakeCommands = async () => {
  program
    .command('stake')
    .description('Solana Delegate Stake Command')
    .argument('<stakeAccountPubkey>', 'Stake Account Pubkey')
    .option(
      '-v, --validator <validatorVoteAccountPubkey>',
      `Validator Vote Account Pubkey e.g. ${SolvConfig.DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY}`
    )
    .option(
      '-a, --authority <authorityAccountKeyfile>',
      `Authority Account Keyfile e.g. ${SolvConfig.DEFAULT_AUTHORITY_ACCOUNT_KEYFILE}`
    )
    .action(async (stakeAccountPubkey: string, options) => {
      const validatorVoteAccountPubkey =
        options.validator || SolvConfig.DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY
      const authorityAccountKeyfile =
        options.authority || SolvConfig.DEFAULT_AUTHORITY_ACCOUNT_KEYFILE
      await delegateStake(
        stakeAccountPubkey,
        validatorVoteAccountPubkey,
        authorityAccountKeyfile
      )
    })
}
