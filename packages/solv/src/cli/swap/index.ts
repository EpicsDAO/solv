import inquirer from 'inquirer'
import dotenv from 'dotenv'
import {
  JUPITER_ENDPOINT,
  SOL_TOKEN_MINT,
  SWAP_TOKENS,
  USDC_TOKEN_MINT,
} from '@/config/constants'
import chalk from 'chalk'
import { TokenInfo } from '@/config/tokenInfo'
import { swap } from './swap'
import { Command } from 'commander'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
dotenv.config()

export const swapCommand = async (
  program: Command,
  solvConfig: ConfigParams,
) => {
  program
    .command('swap')
    .description('Swap tokens')
    .option('-i, --input <input>', 'Input token mint', '')
    .option('-o, --output <output>', 'Output token mint', '')
    .option('-a, --amount <amount>', 'Input amount in lamports', '0')
    .option('-s, --skip-confirm', 'Skip confirmation', false)
    .action(
      async (options: {
        input: string
        output: string
        amount: number
        confirm: boolean
      }) => {
        await swapCmd(
          solvConfig.config.RPC_URL,
          solvConfig.config.KEYPAIR_PATH,
          options.input,
          options.output,
          Number(options.amount),
          !options.confirm,
        )
      },
    )
}

const swapCmd = async (
  solanaRpcUrl: string,
  keyfilePath: string,
  inputMint = '',
  outputMint = '',
  inputAmountLamport = 0,
  isNeedConfirm = true,
) => {
  console.log('Solana RPC URL:', solanaRpcUrl)
  if (!keyfilePath) {
    console.log(
      chalk.red(
        'Please set the keypair path in the config file or provide it as an argument',
      ),
    )
    return
  }
  const jupiterEndpoint = JUPITER_ENDPOINT
  const inputTokenChoice = [...SWAP_TOKENS, 'Other']
  let inputTokenAdress = inputMint
  let outputTokenAdress = outputMint
  let inputAmount = inputAmountLamport
  //  If inputTokenAdress is not provided, prompt user to select input mint
  if (inputTokenAdress === '') {
    const inputToken = await inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: 'Select input mint',
        choices: inputTokenChoice,
        default: SOL_TOKEN_MINT,
      },
    ])
    if (inputToken.name === 'Other') {
      const inputTokenAddress = await inquirer.prompt([
        {
          type: 'input',
          name: 'address',
          message: 'Enter input mint address',
          default: USDC_TOKEN_MINT,
        },
      ])
      inputTokenAdress = inputTokenAddress.address
    } else {
      const tokenName = inputToken.name as keyof typeof TokenInfo
      inputTokenAdress = TokenInfo[tokenName].tokenMint
    }
  }

  // If outputTokenAdress is not provided, prompt user to select output mint
  if (outputTokenAdress === '') {
    const outputToken = await inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: 'Select output mint',
        choices: inputTokenChoice,
      },
    ])

    if (outputToken.name === 'Other') {
      const outputTokenAddress = await inquirer.prompt([
        {
          type: 'input',
          name: 'address',
          message: 'Enter output mint address',
        },
      ])
      outputTokenAdress = outputTokenAddress.address
    } else {
      const tokenName = outputToken.name as keyof typeof TokenInfo
      outputTokenAdress = TokenInfo[tokenName].tokenMint
    }
    const tokenName = outputToken.name as keyof typeof TokenInfo
    outputTokenAdress = TokenInfo[tokenName].tokenMint
  }

  // If inputAmount is not provided, prompt user to enter input amount
  if (inputAmount === 0) {
    const inputAmountPrompt = await inquirer.prompt([
      {
        type: 'input',
        name: 'amount',
        message: 'Enter input amount in LAMPORTS. Default: 0.01 SOL',
        default: 10000000,
      },
    ])
    inputAmount = Number(inputAmountPrompt.amount)
  }
  const txid = await swap(
    solanaRpcUrl,
    jupiterEndpoint,
    keyfilePath,
    inputTokenAdress,
    outputTokenAdress,
    inputAmount,
    isNeedConfirm,
  )
  if (!txid) {
    return
  }
  console.log(chalk.green('✔︎ Sent Tx Successfully!'))
  console.log(`Check Your TX 👉: https://solscan.io/tx/${txid}`)
}

export default swapCmd
