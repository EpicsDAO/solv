import { program } from '@/index'
import { delegateStake } from './delegateStake'
export * from './delegateStake'
import { stakeAccountQuestion } from './stakeAccountQuestion'
import { deactivateStake } from './deactivateStake'
import { withdrawStake } from './withdrawStake'
import chalk from 'chalk'
import { SOLV_STAKE_POOL_ADDRESS } from '@/config/config'
import { selectLST } from './selectLST'
import { readFile } from 'fs/promises'
import inquirer from 'inquirer'
import { existsAsync } from '@skeet-framework/utils'
import { elSOLdeposit } from './elSOLdeposit'
import { depositeLST } from './depositLST'
import { execSync } from 'node:child_process'
import { homedir } from 'os'
import { DefaultConfigType } from '@/config/types'
import { Network } from '@/config/enums'
import readConfig from '@/config/readConfig'

export type StakeOptions = {
  lst: boolean
  elsol: boolean
  amount: string
}
export const stakeCommands = (config: DefaultConfigType) => {
  program
    .command('stake')
    .description('Stake SOL')
    .option('-l, --lst', 'Convert to Liquid Stake Token')
    .option('-e, --elsol', 'Convert to elSOL', false)
    .option('-a, --amount <amount>', 'Amount of SOL to stake', '0')
    .action(async (options: StakeOptions) => {
      let amount = Number(options.amount)
      console.log('RPC URL:', config.RPC_URL)
      let poolAddress = SOLV_STAKE_POOL_ADDRESS
      const isTestnet = config.NETWORK === Network.TESTNET
      const keyRoot = homedir()
      const keypairPath = isTestnet
        ? `${keyRoot}/testnet-authority-keypair.json`
        : `${keyRoot}/mainnet-authority-keypair.json`
      execSync(`solana config set --keypair ${keypairPath}`)
      if (!(await existsAsync(keypairPath))) {
        console.log(
          chalk.yellow(
            '⚠️ No keypair found. Please place your keypair in the following path:\n',
          ),
        )
        console.log(chalk.white(keypairPath))
        return
      }
      const fromWalletKey = JSON.parse(
        await readFile(keypairPath, 'utf-8'),
      ) as number[]
      if (options.elsol) {
        // Deposit SOL to elSOL
        await elSOLdeposit(config.RPC_URL, poolAddress, amount, fromWalletKey)
        return
      } else if (options.lst) {
        const lst = await selectLST(config.RPC_URL)
        if (!lst) {
          return
        }
        poolAddress = lst.stakePoolAddress
        // Deposit SOL to LST
        await depositeLST(
          config.RPC_URL,
          poolAddress,
          amount,
          fromWalletKey,
          lst.symbol,
        )
        return
      } else {
        // Solana Native Stake
        const result = await stakeAccountQuestion(config)
        if (!result) {
          return
        }
        const newSolvConfig = await readConfig()
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
    .description('Unstake SOL')
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
      `📗 Selected Wallet: ${currentAddress}\n💰 Account Balance:`,
      currentVoteAccountBalance + ' SOL',
    ),
  )
  console.log(
    chalk.yellow(
      '⚠️ 0.03 SOL will be remaining in the account if you just press enter.',
    ),
  )
  const answer = await inquirer.prompt<{ amount: string }>([
    {
      type: 'input',
      name: 'amount',
      message: 'Enter amount of SOL to stake:',
      default: String(Number(currentVoteAccountBalance) - 0.03),
    },
  ])
  return Number(answer.amount)
}

type deactivateStakeAskOption = {
  stakeAccounts: string[]
}

const deactivateStakeAsk = async () => {
  const config = await readConfig()
  const answer = await inquirer.prompt<deactivateStakeAskOption>([
    {
      type: 'checkbox',
      name: 'stakeAccounts',
      message: `Which Stake Account would you like to deactivate stake from?`,
      choices: config.STAKE_ACCOUNTS,
    },
  ])
  return answer
}

type delegateStakeOption = {
  stakeAccounts: string[]
  validatorVoteAccount: string
}

const delegateStakeAsk = async (config: DefaultConfigType) => {
  const stakeAccount = config.STAKE_ACCOUNTS
  const defaultAddress =
    config.NETWORK === Network.TESTNET
      ? getVoteAccountAddress(config)
      : config.DEFAULT_VALIDATOR_VOTE_ACCOUNT_PUBKEY
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
      message: `What is the Validator Vote Account Address?`,
      default() {
        return defaultAddress
      },
    },
  ])
  return answer
}

const getVoteAccountAddress = (config: DefaultConfigType) => {
  const isTest = config.NETWORK === Network.TESTNET
  const voteAccount = isTest ? 'testnet-vote-account' : 'mainnet-vote-account'
  const cmd = `/home/solv/${voteAccount}-keypair.json`
  const address = execSync(`solana-keygen pubkey ${cmd}`).toString()
  return address
}

type unstakeAskOption = {
  unstakeOption: string
}

const unstakeAsk = async () => {
  const unstakeOptions = ['Deactivate Stake', 'Withdraw Stake']
  const answer = await inquirer.prompt<unstakeAskOption>([
    {
      type: 'list',
      name: 'unstakeOption',
      message: 'What would you like to do?',
      choices: unstakeOptions,
      default: unstakeOptions[0],
    },
  ])
  return answer
}

type withdrawStakeAskOption = {
  stakeAccounts: string
  destinationAddress: string
  solAmount: string
}

const withdrawStakeAsk = async () => {
  const stakeAccount = (await readConfig()).STAKE_ACCOUNTS
  const answer = await inquirer.prompt<withdrawStakeAskOption>([
    {
      type: 'checkbox',
      name: 'stakeAccounts',
      message: `Which Stake Account would you like to withdraw stake from?`,
      choices: stakeAccount,
    },
    {
      type: 'input',
      name: 'destinationAddress',
      message: `What is the destination address for the withdrawn SOL?`,
      default() {
        return 'xxxxxxxx'
      },
    },
    {
      type: 'input',
      name: 'solAmount',
      message: `How many SOL would you like to withdraw?`,
      default() {
        return '1'
      },
    },
  ])
  return answer
}
