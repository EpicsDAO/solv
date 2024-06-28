export interface SwapTransaction {
  inputMint: string
  inAmount: string
  outputMint: string
  outAmount: string
  otherAmountThreshold: string
  swapMode: 'ExactIn' | 'ExactOut' // 仮定される他のモードがあれば追加
  slippageBps: number
  platformFee: number | null
  priceImpactPct: string
  routePlan: RoutePlanItem[]
  contextSlot: number
  timeTaken: number
}

export interface RoutePlanItem {
  swapInfo: SwapInfo
  percent: number
}

export interface SwapInfo {
  ammKey: string
  label: string
  inputMint: string
  outputMint: string
  inAmount: string
  outAmount: string
  feeAmount: string
  feeMint: string
}
