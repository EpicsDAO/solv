import { readFile } from 'fs/promises'
import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js'
import chalk from 'chalk'
import inquirer from 'inquirer'
import dotenv from 'dotenv'
import { TokenInfoByMint } from '@/config/tokenInfo'
import getJupiterQuote from './getJupiterQuote'
import postJupiterSwap from './postJupiterSwap'
import { WEB_VALIDATORS_SOLUTIONS } from '@/config/constants'
dotenv.config()

export const swap = async (
  solanaRpcUrl: string,
  jupiterEndpoint: string,
  JupiterApiKey: string,
  keyfilePath: string,
  inputMint: string,
  outputMint: string,
  inputAmountLamport: number,
  isNeedConfirm: boolean = true,
) => {
  const connection = new Connection(solanaRpcUrl, 'confirmed')
  const quoteResponse = await getJupiterQuote(
    jupiterEndpoint,
    JupiterApiKey,
    inputMint,
    outputMint,
    inputAmountLamport,
  )
  if (typeof quoteResponse === 'string') {
    if (quoteResponse.includes('Unauthorized')) {
      console.error(
        chalk.yellow('⚠️ Invalid API key, please check your API key ⚠️\n'),
      )
      console.log(chalk.white('Get Your API key 👇'))
      console.log(chalk.white(WEB_VALIDATORS_SOLUTIONS + '\n'))
      process.exit(0)
    }
    const msg = `${chalk.yellow('⚠️ Too many requests, please try again later ⚠️')}

You can upgrade your API key to increase your rate limits.
Get Your API key 👇
Validators Solutions: ${WEB_VALIDATORS_SOLUTIONS}
`
    console.error(chalk.white(msg))
    process.exit(0)
  }
  const inputTokneInfo =
    TokenInfoByMint[inputMint as keyof typeof TokenInfoByMint]
  const outputTokenInfo =
    TokenInfoByMint[outputMint as keyof typeof TokenInfoByMint]
  const log = `🔄 Swap Quote 🔄

- 🏦 Input Token: ${inputTokneInfo.symbol} (${inputMint})
- 💰 Input Amount: ${inputAmountLamport / Math.pow(10, inputTokneInfo.decimal)} ${inputTokneInfo.symbol}

- 🏦 Output Token: ${outputTokenInfo.symbol} (${outputMint})
- 💰 Output Amount: ${Number(quoteResponse?.outAmount) / Math.pow(10, outputTokenInfo.decimal)} ${outputTokenInfo.symbol}

※ This quote is based on the current market rate and may change before the swap is completed.
`
  console.log(chalk.white(log))
  console.log(
    chalk.gray(`You can also swap using the following command: 
$ solv swap --input ${inputMint} --output ${outputMint} --amount ${inputAmountLamport} --skip-confirm
`),
  )
  let confirm = false
  if (isNeedConfirm) {
    const answer = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Do you want to proceed with the swap?',
        default: false,
      },
    ])
    confirm = answer.confirm
  } else {
    console.log(chalk.cyan('Skipping confirmation...'))
    confirm = true
  }
  if (!confirm) {
    console.log(chalk.yellow('⚠️ Swap cancelled'))
    process.exit(0)
  }

  if (!quoteResponse) {
    process.exit(0)
  }

  const fromWalletKey = JSON.parse(
    await readFile(keyfilePath, 'utf8'),
  ) as number[]
  const fromWallet = Keypair.fromSecretKey(
    new Uint8Array(Array.from(fromWalletKey)),
  )

  const swapResponse = await postJupiterSwap(
    jupiterEndpoint,
    JupiterApiKey,
    quoteResponse,
    fromWallet.publicKey.toString(),
  )
  if (typeof swapResponse === 'string') {
    if (swapResponse.includes('Unauthorized')) {
      console.error(
        chalk.yellow('⚠️ Invalid API key, please check your API key ⚠️\n'),
      )
      console.log(chalk.white('Get Your API key 👇'))
      console.log(chalk.white(WEB_VALIDATORS_SOLUTIONS + '\n'))
      process.exit(0)
    }
    const msg = `${chalk.yellow('⚠️ Too many requests, please try again later ⚠️')}

You can upgrade your API key to increase your rate limits.
Get Your API key 👇
Validators Solutions: ${WEB_VALIDATORS_SOLUTIONS}
`
    console.error(chalk.white(msg))
    process.exit(0)
  }

  const swapTransactionBuf = Buffer.from(
    swapResponse.swapTransaction as string,
    'base64',
  )
  let transaction = VersionedTransaction.deserialize(swapTransactionBuf)
  // Sign transaction
  transaction.sign([fromWallet])
  const rawTransaction = transaction.serialize()
  const txid = await connection.sendRawTransaction(rawTransaction, {
    skipPreflight: true,
    maxRetries: 2,
  })
  const blockhash = transaction.message.recentBlockhash
  console.log(`Swapping...\nTransaction ID: ${txid}`)
  await connection.confirmTransaction(
    {
      blockhash,
      lastValidBlockHeight: swapResponse.lastValidBlockHeight,
      signature: txid,
    },
    'confirmed',
  )
  return txid
}
