import { program } from '@/index'
import { delegateStake } from './delegateStake'
import inquirer from 'inquirer'
import { Questions } from '@/types/questions'
import os from 'os'
import { KEYPAIRS } from '@/config/config'
import { SOLV_CLIENT_PATHS } from '@/config/solvClient'
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
      const uploadPath = `${homeDirectory}${SOLV_CLIENT_PATHS.SOLV_KEYPAIR_UPLOAD_PATH}`
      const authorityAccount = `${uploadPath}/${KEYPAIRS.TESTNET_VALITATOR_AUTHORITY_KEY}`
      await delegateStake(stakeAccount, validatorVoteAccount, authorityAccount)
    })
}
