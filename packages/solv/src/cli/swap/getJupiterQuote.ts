import { QuoteResponse } from '@jup-ag/api'

// Referral fee in basis points 42 = 0.42%
const PLATFORM_FEE_BPS = 42

const getJupiterQuote = async (
  jupiterEndpoint: string,
  apiKey: string,
  inputMint: string,
  outputMint: string,
  inputAmountLamport: number,
  slippageBps: number = 50,
  platformFeeBps: number = PLATFORM_FEE_BPS,
) => {
  try {
    const url = `${jupiterEndpoint}/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${inputAmountLamport}&slippageBps=${slippageBps}&platformFeeBps=${platformFeeBps}`
    const result = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    })
    if (result.status === 429) {
      const error = 'Too many requests, please try again later'
      return error
    }
    if (result.status === 401) {
      const error = 'Unauthorized, please check your API key'
      return error
    }

    const json = (await result.json()) as QuoteResponse
    return json
  } catch (error) {
    throw new Error(`Error getJupiterQuote: ${error}`)
  }
}

export default getJupiterQuote
