import { MAX_RETRIES, SOLANA_RPC_URL, program } from '@/index'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import inquirer from 'inquirer'
import { execSync, spawnSync } from 'child_process'
import chalk from 'chalk'
import sleep from '@/lib/sleep'
import { homedir } from 'os'

const RETRY_DELAY = 1000

export type BalanceOptions = {
  spl: boolean
}

export enum TransferFrom {
  VALIDATOR = 'Validator Account',
  AUTHORITY = 'Authority Account',
}

export enum TransferTo {
  VALIDATOR = 'Validator Account',
  AUTHORITY = 'Authority Account',
  OTHER = 'Other Account',
}

export type SelectTransferRes = {
  fromWalletPath: string
  fromAddress: string
  toAddress: string
}

export const transferFromArray: string[] = Object.values(TransferFrom)

export const transferCommands = (solvConfig: ConfigParams) => {
  program
    .command('transfer')
    .alias('tr')
    .option('-s, --spl', 'Show SPL Token Balance', false)
    .description('Transfer Solana Tokens/SPL Tokens')
    .action(async (options: BalanceOptions) => {
      if (options.spl) {
        console.log(
          chalk.blue(
            '✨ Coming Soon\nThis Feature is Currently Under Development\nPlease Check Back Later',
          ),
        )
        return
      }
      const { fromWalletPath, fromAddress, toAddress } =
        await selectFromKeypairs()
      let toBalance = '0'
      try {
        const out = spawnSync(
          `solana balance ${toAddress} --url ${SOLANA_RPC_URL}`,
          { shell: true },
        )
        if (out.status !== 0) {
          throw new Error('Invalid Wallet Address')
        }
        toBalance = out.stdout.toString()
        console.log('toBalance:', toBalance)
      } catch (error) {
        console.log(
          chalk.red(`❌ To Wallet is Invalid\nPlease Check the Wallet Address`),
        )
        return
      }

      const fromBalance = execSync(
        `solana balance ${fromAddress} --url ${SOLANA_RPC_URL}`,
      ).toString()

      console.log(
        chalk.white(
          `🏦 From Wallet: ${fromAddress}\n💰 Balance: ${fromBalance}`,
        ),
      )
      console.log(
        chalk.white(`🏦 To Wallet: ${toAddress}\n💰 Balance: ${toBalance}`),
      )
      const { amount } = await inquirer.prompt<{ amount: number }>([
        {
          type: 'number',
          name: 'amount',
          message: 'Enter Amount to Transfer',
          default: 0.1,
        },
      ])
      const cmd = `solana transfer ${toAddress} ${amount} --allow-unfunded-recipient --keypair ${fromWalletPath} --url ${SOLANA_RPC_URL}`
      let result = spawnSync(cmd, { shell: true, stdio: 'inherit' })
      let maxRetries = MAX_RETRIES
      while (result.status !== 0 && maxRetries > 0) {
        console.log(
          chalk.red(
            `❌ Transaction Failed\nRetrying Transaction in ${RETRY_DELAY}ms\nRetries Left: ${maxRetries}`,
          ),
        )
        await sleep(RETRY_DELAY)
        result = spawnSync(cmd, { shell: true, stdio: 'inherit' })
        maxRetries--
      }
      return
    })
}

export const validateSolanaKey = (input: string): boolean | string => {
  const regex = /^[1-9A-HJ-NP-Za-km-z]{43,44}$/
  if (regex.test(input)) {
    return true
  }
  return 'Invalid Solana keygen string. Please enter a valid key.'
}

const selectFromKeypairs = async () => {
  const homeDir = homedir()
  const authorityKey = 'mainnet-authority-keypair.json'
  const validatorKey = 'mainnet-validator-keypair.json'
  let toKeyPath = `${homeDir}/${authorityKey}`

  let toAddress = execSync(`solana address -k ${toKeyPath}`).toString().trim()
  const answer = await inquirer.prompt<{ from: string }>([
    {
      type: 'list',
      name: 'from',
      message: 'Select Transfer From Account',
      choices: transferFromArray,
    },
  ])
  const secondChoice =
    answer.from === TransferFrom.VALIDATOR
      ? Object.values(TransferTo).filter(
          (value) => value !== TransferTo.VALIDATOR,
        )
      : Object.values(TransferTo).filter(
          (value) => value !== TransferTo.AUTHORITY,
        )

  const second = await inquirer.prompt<{ to: string }>([
    {
      type: 'list',
      name: 'to',
      message: 'Select Transfer To Account',
      choices: secondChoice,
    },
  ])
  if (second.to === TransferTo.OTHER) {
    const { to } = await inquirer.prompt<{ to: string }>([
      {
        type: 'input',
        name: 'to',
        message: 'Enter Transfer To Account',
        validate: validateSolanaKey,
      },
    ])
    toAddress = to
  } else {
    const toKey =
      answer.from === TransferFrom.VALIDATOR ? authorityKey : validatorKey
    toKeyPath = `${homeDir}/${toKey}`
    toAddress = execSync(`solana address -k ${toKeyPath}`).toString().trim()
  }
  const key =
    answer.from === TransferFrom.VALIDATOR ? validatorKey : authorityKey
  const fromWalletPath = `${homeDir}/${key}`
  const fromAddress = execSync(`solana address -k ${fromWalletPath}`)
    .toString()
    .trim()
  return { fromWalletPath, fromAddress, toAddress } as SelectTransferRes
}
