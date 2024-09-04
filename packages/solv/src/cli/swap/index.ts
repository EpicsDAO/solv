import inquirer from 'inquirer'
import dotenv from 'dotenv'
import {
  JUPITER_ENDPOINT,
  SOL_TOKEN_MINT,
  SOLV_SWAP,
  SWAP_TOKENS,
  USDC_TOKEN_MINT,
} from '@/config/constants'
import chalk from 'chalk'
import { TokenInfo } from '@/config/tokenInfo'
import { swap } from './swap'
import { Command } from 'commander'
import { ELSOL_MINT_ADDRESS } from '@/config/config'
import { DefaultConfigType } from '@/config/types'
dotenv.config()

export const swapCommand = async (
  program: Command,
  config: DefaultConfigType,
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
        try {
          await swapCmd(
            config.RPC_URL,
            config.KEYPAIR_PATH,
            config.API_KEY,
            options.input,
            options.output,
            Number(options.amount),
            !options.confirm,
          )
        } catch (error: any) {
          if (error.message.includes('User force closed the prompt')) {
            console.error(chalk.cyan(`Exiting...🌛`))
            process.exit(0)
          }
          console.error(chalk.red(`Swap Error: ${error.message}`))
          process.exit(0)
        }
      },
    )
}

const swapCmd = async (
  solanaRpcUrl: string,
  keyfilePath: string,
  jupiterApiKey: string,
  inputMint = '',
  outputMint = '',
  inputAmountLamport = 0,
  isNeedConfirm = true,
) => {
  console.log(chalk.white('Solana RPC URL:', solanaRpcUrl))
  console.log(chalk.white('KeyfilePath:', keyfilePath))
  if (!keyfilePath || keyfilePath === '') {
    console.log(
      chalk.yellow(
        `⚠️ Please set the KEYPAIR_PATH in the solv4.config.json file to use this command ⚠️`,
      ),
    )
    return
  }
  const jupiterEndpoint = JUPITER_ENDPOINT
  let inputTokenChoice = [...SWAP_TOKENS, 'Other']
  let inputTokenAdress = inputMint
  let inputTokenSymbol = '' as keyof typeof TokenInfo
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
      inputTokenSymbol = inputToken.name
      inputTokenAdress = TokenInfo[inputTokenSymbol].tokenMint
    }
  }

  // If outputTokenAdress is not provided, prompt user to select output mint
  if (outputTokenAdress === '') {
    inputTokenChoice = inputTokenChoice.filter(
      (item) => item !== inputTokenSymbol,
    )
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
          default: ELSOL_MINT_ADDRESS,
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
        message: 'Enter input amount in LAMPORTS. e.g. 0.01 SOL',
        default: '10000000',
      },
    ])
    inputAmount = Number(inputAmountPrompt.amount)
  }

  const apiKey =
    !jupiterApiKey || jupiterApiKey === '' ? SOLV_SWAP : jupiterApiKey
  const txid = await swap(
    solanaRpcUrl,
    jupiterEndpoint,
    apiKey,
    keyfilePath,
    inputTokenAdress,
    outputTokenAdress,
    inputAmount,
    isNeedConfirm,
  )
  if (!txid) {
    process.exit(0)
  }
  console.log(chalk.green('✔︎ Sent Tx Successfully!'))
  console.log(chalk.white(`Check Your TX 👉: https://solscan.io/tx/${txid}`))
}

export default swapCmd
