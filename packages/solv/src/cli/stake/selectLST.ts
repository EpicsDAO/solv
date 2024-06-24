import { SOLV_STAKE_POOL_ADDRESS } from '@/config/config'
import inquirer from 'inquirer'

export const selectLST = async () => {
  const answer = await inquirer.prompt<{ stakePoolAddress: string }>([
    {
      type: 'input',
      name: 'stakePoolAddress',
      message: 'Enter Stake Pool Address(default: elSOL)',
      default: SOLV_STAKE_POOL_ADDRESS,
    },
  ])
  return answer.stakePoolAddress
}
