import { SOLV_STAKE_POOL_ADDRESS } from '@/config/config'
import { getStakePoolInfo } from '@/lib/solana/getStakePoolInfo'
import { TokenInfo, getTokenInfo } from '@/lib/solana/getTokenAccount'
import chalk from 'chalk'
import inquirer from 'inquirer'

export interface StakePoolInfo extends TokenInfo {
  stakePoolAddress: string
}

export const selectLST = async (rpcUrl: string) => {
  const answer = await inquirer.prompt<{ stakePoolAddress: string }>([
    {
      type: 'input',
      name: 'stakePoolAddress',
      message: 'Enter Stake Pool Address(default: elSOL)',
      default: SOLV_STAKE_POOL_ADDRESS,
    },
  ])
  try {
    const poolInfo = await getStakePoolInfo(rpcUrl, answer.stakePoolAddress)
    if (!poolInfo) {
      console.log(
        chalk.yellow(
          '⚠️ Invalid Stake Pool Address\nPlease check the correct address and try again.\n',
        ),
      )
      console.log(
        chalk.white(
          'For stake pool information\n🔗 https://solanacompass.com/stake-pools/',
        ),
      )
      return null
    }

    const poolMint = poolInfo.poolMint
    let tokenInfo = await getTokenInfo(rpcUrl, poolMint)

    if (!tokenInfo) {
      tokenInfo = {
        name: poolMint,
        symbol: poolMint,
        mint: poolMint,
        uri: 'no metadata',
      }
    }
    const result: StakePoolInfo = {
      ...tokenInfo,
      stakePoolAddress: answer.stakePoolAddress,
    }
    const stakeInfo = `🪙  ${result.symbol}\nName: ${result.name} \nToken Mint: ${result.mint}`
    const confirm = await inquirer.prompt<{ confirm: boolean }>([
      {
        type: 'confirm',
        name: 'confirm',
        message: stakeInfo + '\nIs this the correct Stake Pool?',
      },
    ])
    if (!confirm.confirm) {
      console.log(chalk.yellow('✔️ Canceled'))
      return null
    }
    return result
  } catch (error) {
    console.log(
      chalk.yellow(
        '⚠️ Invalid Stake Pool Address\nPlease check the correct address and try again.\n',
      ),
    )
    console.log(
      chalk.white(
        'For stake pool information\n🔗 https://solanacompass.com/stake-pools/',
      ),
    )
    return null
  }
}
