import {
  DECIMALS,
  SOL_MINT_ADDRESS,
  USDC_MINT_ADDRESS,
  getAllKeyPaths,
} from '@/config/config'
import { SOLANA_RPC_URL, program } from '@/index'
import getHomeDir from '@/lib/getHomeDir'
import { getJupiterPrice } from '@/lib/jupiter/getJupiterPrice'
import { jupiterSwap } from '@/lib/jupiter/jupiterSwap'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { readFile } from 'fs/promises'
import { homedir } from 'os'
import { inspect } from 'util'

type SwapOptions = {
  key: string
}

export const swapCommands = (solvConfig: ConfigParams) => {
  program
    .command('swap')
    .option('-k, --key <key>', 'Path to Wallet Key File')
    .description('Swap Solana Tokens')
    .action(async (options: SwapOptions) => {
      console.log('Swap Command')
      const { mainnetValidatorAuthorityKey } = getAllKeyPaths(getHomeDir())
      let keyPath = options.key || mainnetValidatorAuthorityKey
      const inputMint = USDC_MINT_ADDRESS
      const outputMint = SOL_MINT_ADDRESS
      const inputAmount = 1 * DECIMALS[inputMint]
      const quoteResponse = await getJupiterPrice(
        inputMint,
        outputMint,
        inputAmount,
      )
      if (!quoteResponse) {
        return
      }
      console.log(inspect(quoteResponse, false, null, true))

      const fromWalletKey = JSON.parse(
        await readFile(keyPath, 'utf8'),
      ) as number[]
      const sig = await jupiterSwap(
        SOLANA_RPC_URL,
        quoteResponse.data,
        fromWalletKey,
      )
      console.log(sig.signature)
      return
    })
}
