import { DECIMALS, JUP_URL, TOKEN_MINT_ADDRESS } from '@/config/config'
import { sendGet } from '@skeet-framework/utils'
import { SwapTransaction } from './jupiterResponse'

export const getJupiterPrice = async (
  inputMint: string,
  outputMint: TOKEN_MINT_ADDRESS | string,
  outputTokenAmount: number,
  outputDecimals?: number,
  slippageBps = 25,
  platformFeeBps = 80,
) => {
  // Check if

  try {
    const url = JUP_URL.V6_QUOTE_URL
    const params = {
      inputMint,
      outputMint,
      amount: outputTokenAmount,
      slippageBps,
      platformFeeBps,
    }
    const decimals =
      outputMint in DECIMALS
        ? DECIMALS[outputMint as TOKEN_MINT_ADDRESS]
        : outputDecimals || 9
    const res = await sendGet(url, params)
    const json = res as SwapTransaction

    return {
      data: json,
      price: formatNumberWithDecimals(Number(json.outAmount), decimals),
    }
  } catch (error) {
    console.log(`getJupiterPrice: ${error}`)
    return null
  }
}

function formatNumberWithDecimals(number: number, decimals: number): string {
  // 数値を小数点形式に変換し、必要に応じてゼロパディングを追加
  const scaleFactor = Math.pow(10, decimals)
  let formattedNumber = (number / scaleFactor).toFixed(decimals)

  // 整数部と小数部を分割
  let [integerPart, decimalPart] = formattedNumber.split('.')

  // 整数部に3桁ごとにカンマを挿入
  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  // 整数部と小数部を結合（小数点以下にカンマは挿入しない）
  return `${integerPart}.${decimalPart}`
}
