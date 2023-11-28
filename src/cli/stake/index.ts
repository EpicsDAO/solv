import { program } from '@/index'
import { delegateStake } from './delegateStake'
import inquirer from 'inquirer'
import { Questions } from '@/types/questions'
import { VALITATOR_AUTHORITY_KEY_NAME } from '@/config'
import os from 'os'
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
      const homeDirectory = os.userInfo().homedir
      const uploadPath = `${homeDirectory}/solvKeys/upload`
      const authorityAccount = `${uploadPath}/${VALITATOR_AUTHORITY_KEY_NAME}`
      await delegateStake(stakeAccount, validatorVoteAccount, authorityAccount)
    })
}
