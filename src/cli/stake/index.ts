import { program } from '@/index'
import { delegateStake } from './delegateStake'
import inquirer from 'inquirer'
import { Questions } from '@/types/questions'

export * from './delegateStake'

export const stakeCommands = async () => {
  program
    .command('stake')
    .description('Solana Delegate Stake Command')
    .action(async () => {
      const { validatorVoteAccount, stakeAccount, authorityAccount } =
        await askDelegationStake()
      await delegateStake(stakeAccount, validatorVoteAccount, authorityAccount)
    })
}

export const askDelegationStake = async () => {
  const asking = inquirer.prompt(Questions.delegateStake)
  let validatorVoteAccount = ''
  let stakeAccount = ''
  let authorityAccount = ''
  await asking.then(
    async (answer: {
      validatorVoteAccount: string
      stakeAccount: string
      authorityAccount: string
    }) => {
      validatorVoteAccount = answer.validatorVoteAccount
      stakeAccount = answer.stakeAccount
      authorityAccount = answer.authorityAccount
    }
  )
  return { validatorVoteAccount, stakeAccount, authorityAccount }
}
