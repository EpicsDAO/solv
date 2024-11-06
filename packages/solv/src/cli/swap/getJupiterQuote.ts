import { QuoteResponse } from '@jup-ag/api'

const getJupiterQuote = async (
  jupiterEndpoint: string,
  apiKey: string,
  inputMint: string,
  outputMint: string,
  inputAmountLamport: number,
) => {
  try {
    const url = `${jupiterEndpoint}/quote?inputMint=${inputMint}&outputMint=${outputMint}&amount=${inputAmountLamport}`
    const result = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
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
