import { program } from '@/index'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { showKeypairsInfo } from '../server/getValidatorInfo/showKeypairsInfo'
import { splBalance } from '@/lib/solana/splBalance'
import getHomeDir from '@/lib/getHomeDir'

export type BalanceOptions = {
  spl: boolean
}

export const balanceCommands = (solvConfig: ConfigParams) => {
  const { config } = solvConfig
  program
    .command('balance')
    .alias('bal')
    .option('-s, --spl', 'Show SPL Token Balance', false)
    .description('Show Keypairs Balance')
    .action(async (options: BalanceOptions) => {
      if (options.spl) {
        const defaultKey = 'mainnet-authority-keypair.json'
        const keyPath = `${getHomeDir()}/${defaultKey}`
        await splBalance(keyPath)
        return
      }
      await showKeypairsInfo(config.SOLV_TYPE)
    })
}
