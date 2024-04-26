import { program } from '@/index'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { showKeypairsInfo } from '../server/getValidatorInfo/showKeypairsInfo'

export const balanceCommands = (solvConfig: ConfigParams) => {
  const { config } = solvConfig
  program
    .command('balance')
    .alias('bal')
    .description('Show Keypairs Balance')
    .action(async () => {
      await showKeypairsInfo(config.SOLV_TYPE)
    })
}
