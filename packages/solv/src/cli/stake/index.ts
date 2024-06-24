import { SOLANA_RPC_URL, program } from '@/index'
import { delegateStake } from './delegateStake'
export * from './delegateStake'
import {
  ConfigParams,
  readOrCreateDefaultConfig,
} from '@/lib/readOrCreateDefaultConfig'
import { stakeAccountQuestion } from './stakeAccountQuestion'
import { deactivateStake } from './deactivateStake'
import { withdrawStake } from './withdrawStake'
import { delegateStakeAsk } from '../server/stake/delegateStakeAsk'
import { deactivateStakeAsk } from '../server/stake/deactivateStakeAsk'
import { unstakeAsk } from '../server/stake/unstakeAsk'
import { withdrawStakeAsk } from '../server/stake/withdrawStakeAsk'
import chalk from 'chalk'
import {
  ELSOL_MINT_ADDRESS,
  NETWORK_TYPES,
  SOLV_ELSOL_ACCOUNT_ADDRESS,
  SOLV_STAKE_POOL_ADDRESS,
} from '@/config/config'
import { selectLST } from './selectLST'
import { Connection, Keypair, PublicKey } from '@solana/web3.js'
import { readFile } from 'fs/promises'
import { depositSol } from '@/lib/solana/depositSOL'
import inquirer from 'inquirer'
import { homedir } from 'os'
import { PriorityLevel } from '@/lib/solana/priorityFee'
import { getOrCreateDestinationAddress } from '@/lib/solana/getOrCreateDestinationAddress'
import { sleep } from '@skeet-framework/utils'
import { Spinner } from 'cli-spinner'
import { elSOLdeposit } from './elSOLdeposit'
import { depositeLST } from './depositLST'
import { execSync } from 'child_process'

export type StakeOptions = {
  lst: boolean
  elsol: boolean
  amount: string
}
export const stakeCommands = (solvConfig: ConfigParams) => {
  const { config, locale } = solvConfig
  const { cmds } = locale
  program
    .command('stake')
    .description(cmds.stake)
    .option('-l, --lst', 'Convert to Liquid Stake Token')
    .option('-e, --elsol', 'Convert to elSOL', false)
    .option('-a, --amount <amount>', 'Amount of SOL to stake', '0')
    .action(async (options: StakeOptions) => {
      let amount = Number(options.amount)
      let poolAddress = SOLV_STAKE_POOL_ADDRESS
      const homeDir = homedir()
      const keyRoot = homeDir.includes('solv')
        ? '/home/solv'
        : `${homeDir}/solvKeys/upload`
      const keypairPath =
        config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
          ? `${keyRoot}/testnet-authority-keypair.json`
          : `${keyRoot}/mainnet-authority-keypair.json`
      execSync(`solana config set --keypair ${keypairPath}`)
      const fromWalletKey = JSON.parse(
        await readFile(keypairPath, 'utf-8'),
      ) as number[]
      if (options.elsol) {
        // Deposit SOL to elSOL
        await elSOLdeposit(poolAddress, amount, fromWalletKey)
        return
      } else if (options.lst) {
        poolAddress = await selectLST()
        // Deposit SOL to LST
        await depositeLST(poolAddress, amount, fromWalletKey)
        return
      } else {
        // Solana Native Stake
        const result = await stakeAccountQuestion(solvConfig)
        if (!result) {
          return
        }
        const newSolvConfig = readOrCreateDefaultConfig()
        const { validatorVoteAccount, stakeAccounts } =
          await delegateStakeAsk(newSolvConfig)
        for await (const stakeAccount of stakeAccounts) {
          try {
            await delegateStake(stakeAccount, validatorVoteAccount)
          } catch (error) {
            console.log(
              chalk.yellow(
                `Network might be busy, please try again later\nYou can use a custom RPC endpoint to avoid this issue\n`,
              ),
            )
          }
        }
      }
    })

  program
    .command('unstake')
    .description(cmds.stake)
    .action(async () => {
      const { unstakeOption } = await unstakeAsk()
      if (unstakeOption === 'Deactivate Stake') {
        const { stakeAccounts } = await deactivateStakeAsk()
        for await (const stakeAccount of stakeAccounts) {
          try {
            await deactivateStake(stakeAccount)
          } catch (error) {
            console.log(
              chalk.yellow(
                `Network might be busy, please try again later\nYou can use a custom RPC endpoint to avoid this issue\n`,
              ),
            )
          }
        }
      } else {
        const answer = await withdrawStakeAsk()
        await withdrawStake(
          answer.stakeAccounts,
          answer.destinationAddress,
          answer.solAmount,
        )
      }
    })
}

export const askAmount = async () => {
  const currentAddress = execSync(`solana address`).toString().trim()
  const currentVoteAccountBalance = execSync(`solana balance`)
    .toString()
    .replace('SOL', '')
    .trim()
  console.log(
    chalk.white(
      `📗 Address: ${currentAddress}\n💰 Account Balance:`,
      currentVoteAccountBalance + ' SOL',
    ),
  )
  console.log(
    chalk.yellow(
      '⚠️ 0.03 SOL will be remaining in the account if you just press enter.',
    ),
  )
  const answer = await inquirer.prompt<{ amount: number }>([
    {
      type: 'input',
      name: 'amount',
      message: 'Enter amount of SOL to stake:',
      default: Number(currentVoteAccountBalance) - 0.03,
    },
  ])
  return Number(answer.amount)
}
