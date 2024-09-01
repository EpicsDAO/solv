// import inquirer from 'inquirer'
// import dotenv from 'dotenv'
// import {
//   SOL_TOKEN_MINT,
//   SWAP_TOKENS,
//   USDC_TOKEN_MINT,
// } from '@/config/constants'
// import chalk from 'chalk'
// import { TokenInfo } from '@/config/tokenInfo'
// import { swap } from './swap'
// dotenv.config()

// const SOLANA_RPC_URL = process.env.SOLANA_RPC_URL || ''
// const JUPITER_ENDPOINT = process.env.JUPITER_ENDPOINT || ''
// const KEYFILE_PATH = process.env.KEYFILE_PATH || ''

// if (SOLANA_RPC_URL === '' || JUPITER_ENDPOINT === '' || KEYFILE_PATH === '') {
//   console.error(
//     'Please provide SOLANA_RPC_URL, JUPITER_ENDPOINT and KEYFILE_PATH in .env file\n',
//   )
//   console.error(`.env file should look like:
// SOLANA_RPC_URL=https://api.mainnet-beta.solana.com
// JUPITER_ENDPOINT=https://quote-api.jup.ag/v6
// KEYFILE_PATH=./wallet-keypair.json
// `)
//   process.exit(1)
// }

// const swapCmd = async (
//   inputMint = '',
//   outputMint = '',
//   inputAmountLamport = 0,
//   isNeedConfirm = true,
// ) => {
//   const solanaRpcUrl = SOLANA_RPC_URL
//   const jupiterEndpoint = JUPITER_ENDPOINT
//   const keyfilePath = KEYFILE_PATH
//   const inputTokenChoice = [...SWAP_TOKENS, 'Other']
//   let inputTokenAdress = inputMint
//   let outputTokenAdress = outputMint
//   let inputAmount = inputAmountLamport
//   //  If inputTokenAdress is not provided, prompt user to select input mint
//   if (inputTokenAdress === '') {
//     const inputToken = await inquirer.prompt([
//       {
//         type: 'list',
//         name: 'name',
//         message: 'Select input mint',
//         choices: inputTokenChoice,
//         default: SOL_TOKEN_MINT,
//       },
//     ])
//     if (inputToken.name === 'Other') {
//       const inputTokenAddress = await inquirer.prompt([
//         {
//           type: 'input',
//           name: 'address',
//           message: 'Enter input mint address',
//           default: USDC_TOKEN_MINT,
//         },
//       ])
//       inputTokenAdress = inputTokenAddress.address
//     } else {
//       const tokenName = inputToken.name as keyof typeof TokenInfo
//       inputTokenAdress = TokenInfo[tokenName].tokenMint
//     }
//   }

//   // If outputTokenAdress is not provided, prompt user to select output mint
//   if (outputTokenAdress === '') {
//     const outputToken = await inquirer.prompt([
//       {
//         type: 'list',
//         name: 'name',
//         message: 'Select output mint',
//         choices: inputTokenChoice,
//       },
//     ])

//     if (outputToken.name === 'Other') {
//       const outputTokenAddress = await inquirer.prompt([
//         {
//           type: 'input',
//           name: 'address',
//           message: 'Enter output mint address',
//         },
//       ])
//       outputTokenAdress = outputTokenAddress.address
//     } else {
//       const tokenName = outputToken.name as keyof typeof TokenInfo
//       outputTokenAdress = TokenInfo[tokenName].tokenMint
//     }
//     const tokenName = outputToken.name as keyof typeof TokenInfo
//     outputTokenAdress = TokenInfo[tokenName].tokenMint
//   }

//   // If inputAmount is not provided, prompt user to enter input amount
//   if (inputAmount === 0) {
//     const inputAmountPrompt = await inquirer.prompt([
//       {
//         type: 'input',
//         name: 'amount',
//         message: 'Enter input amount in LAMPORTS. Default: 0.01 SOL',
//         default: 10000000,
//       },
//     ])
//     inputAmount = Number(inputAmountPrompt.amount)
//   }
//   const txid = await swap(
//     solanaRpcUrl,
//     jupiterEndpoint,
//     keyfilePath,
//     inputTokenAdress,
//     outputTokenAdress,
//     inputAmount,
//     isNeedConfirm,
//   )
//   if (!txid) {
//     return
//   }
//   console.log(chalk.green('✔︎ Swap completed successfully!'))
//   console.log(`https://solscan.io/tx/${txid}`)
// }

// export default swapCmd
