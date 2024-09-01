// import fetch from 'cross-fetch'
// import { QuoteResponse, SwapPostRequest, SwapResponse } from '@jup-ag/api'

// const postJupiterSwap = async (
//   jupiterEndpoint: string,
//   apiKey: string,
//   quoteResponse: QuoteResponse,
//   fromWalletPubkey: string,
// ) => {
//   try {
//     const outputMint = quoteResponse.outputMint
//     let swapBody: SwapPostRequest
//     const associationAccount =
//       AssociationAccount[outputMint as keyof typeof AssociationAccount]

//     if (associationAccount) {
//       swapBody = {
//         swapRequest: {
//           quoteResponse,
//           userPublicKey: fromWalletPubkey,
//           feeAccount: associationAccount,
//         },
//       }
//     } else {
//       swapBody = {
//         swapRequest: {
//           quoteResponse,
//           userPublicKey: fromWalletPubkey,
//         },
//       }
//     }
//     const url = `${jupiterEndpoint}/swap`
//     const result = await fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${apiKey}`,
//       },
//       body: JSON.stringify(swapBody.swapRequest),
//     })
//     if (result.status === 429) {
//       const error = 'Too many requests, please try again later'
//       return error
//     }
//     const json = (await result.json()) as SwapResponse
//     return json
//   } catch (error) {
//     throw new Error(`Error postJupiterSwap: ${error}`)
//   }
// }

// export default postJupiterSwap
