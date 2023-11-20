import { program } from '@/index'
import { delegateStake } from './delegateStake'
import inquirer from 'inquirer'
import { Questions } from '@/types/questions'
import {
  SOLV_KEYPAIR_UPLOAD_PATH,
  VALITATOR_AUTHORITY_KEY_NAME,
} from '@/config'

export * from './delegateStake'

export const stakeCommands = async () => {
  program
    .command('stake')
    .description('Solana Delegate Stake Command')
    .action(async () => {
      const { validatorVoteAccount, stakeAccount } = await inquirer.prompt<{
        stakeAccount: string
        validatorVoteAccount: string
      }>(Questions.delegateStake)

      const authorityAccount = `${SOLV_KEYPAIR_UPLOAD_PATH}/${VALITATOR_AUTHORITY_KEY_NAME}`
      await delegateStake(stakeAccount, validatorVoteAccount, authorityAccount)
    })
}
