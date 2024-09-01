// import { readFile } from 'fs/promises'
// import { Connection, Keypair, VersionedTransaction } from '@solana/web3.js'
// import chalk from 'chalk'
// import inquirer from 'inquirer'
// import dotenv from 'dotenv'
// import { TokenInfoByMint } from '@/config/tokenInfo'
// dotenv.config()

// const apiKey = process.env.VS_API_KEY || ''

// if (apiKey === '') {
//   console.error('Please provide VS_API_KEY in .env file\n')
//   console.error(`.env file should look like:
// VS_API_KEY=your_api_key_here
// `)
//   process.exit(1)
// }

// export const swap = async (
//   solanaRpcUrl: string,
//   jupiterEndpoint: string,
//   keyfilePath: string,
//   inputMint: string,
//   outputMint: string,
//   inputAmountLamport: number,
//   isNeedConfirm: boolean = true,
// ) => {
//   const connection = new Connection(solanaRpcUrl, 'confirmed')
//   const quoteResponse = await getJupiterQuote(
//     jupiterEndpoint,
//     apiKey,
//     inputMint,
//     outputMint,
//     inputAmountLamport,
//   )
//   if (typeof quoteResponse === 'string') {
//     if (quoteResponse.includes('Unauthorized')) {
//       console.error(
//         chalk.yellow('⚠️ Invalid API key, please check your API key ⚠️'),
//       )
//       return
//     }
//     const msg = `${chalk.yellow('⚠️ Too many requests, please try again later ⚠️')}

// You can upgrade your API key to increase your rate limits.
// Get Your API key 👇
// Validators DAO: https://discord.gg/validators
// `
//     console.error(chalk.white(msg))
//     return
//   }
//   const inputTokneInfo =
//     TokenInfoByMint[inputMint as keyof typeof TokenInfoByMint]
//   const outputTokenInfo =
//     TokenInfoByMint[outputMint as keyof typeof TokenInfoByMint]
//   const log = `🔄 Swap Quote 🔄

// - 🏦 Input Token: ${inputTokneInfo.symbol} (${inputMint})
// - 💰 Input Amount: ${inputAmountLamport / Math.pow(10, inputTokneInfo.decimal)} ${inputTokneInfo.symbol}

// - 🏦 Output Token: ${outputTokenInfo.symbol} (${outputMint})
// - 💰 Output Amount: ${Number(quoteResponse?.outAmount) / Math.pow(10, outputTokenInfo.decimal)} ${outputTokenInfo.symbol}

// ※ This quote is based on the current market rate and may change before the swap is completed.
// `
//   console.log(chalk.white(log))
//   let confirm = false
//   if (isNeedConfirm) {
//     const answer = await inquirer.prompt([
//       {
//         type: 'confirm',
//         name: 'confirm',
//         message: 'Do you want to proceed with the swap?',
//         default: false,
//       },
//     ])
//     confirm = answer.confirm
//   } else {
//     console.log(chalk.cyan('Skipping confirmation...'))
//     confirm = true
//   }
//   if (!confirm) {
//     console.log(chalk.yellow('⚠️ Swap cancelled'))
//     return
//   }

//   if (!quoteResponse) {
//     return
//   }

//   const fromWalletKey = JSON.parse(
//     await readFile(keyfilePath, 'utf8'),
//   ) as number[]
//   const fromWallet = Keypair.fromSecretKey(
//     new Uint8Array(Array.from(fromWalletKey)),
//   )

//   const swapResponse = await postJupiterSwap(
//     jupiterEndpoint,
//     apiKey,
//     quoteResponse,
//     fromWallet.publicKey.toString(),
//   )
//   if (typeof swapResponse === 'string') {
//     if (swapResponse.includes('Unauthorized')) {
//       console.error(
//         chalk.yellow('⚠️ Invalid API key, please check your API key ⚠️'),
//       )
//       return
//     }
//     const msg = `${chalk.yellow('⚠️ Too many requests, please try again later ⚠️')}

// You can upgrade your API key to increase your rate limits.
// Get Your API key 👇
// Validators DAO: https://discord.gg/validators
// `
//     console.error(chalk.white(msg))
//     return
//   }

//   const swapTransactionBuf = Buffer.from(
//     swapResponse.swapTransaction as string,
//     'base64',
//   )
//   let transaction = VersionedTransaction.deserialize(swapTransactionBuf)
//   // Sign transaction
//   transaction.sign([fromWallet])
//   const rawTransaction = transaction.serialize()
//   const txid = await connection.sendRawTransaction(rawTransaction, {
//     skipPreflight: true,
//     maxRetries: 2,
//   })
//   const blockhash = transaction.message.recentBlockhash
//   console.log(`Swapping...\nTransaction ID: ${txid}`)
//   await connection.confirmTransaction(
//     {
//       blockhash,
//       lastValidBlockHeight: swapResponse.lastValidBlockHeight,
//       signature: txid,
//     },
//     'confirmed',
//   )
//   return txid
// }
