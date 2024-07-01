import { SOLANA_RPC_URL, program } from '@/index'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import epochTimer from './epochTimer'

export const epochTimerCommands = (solvConfig: ConfigParams) => {
  program
    .command('epochTimer')
    .description('Check Solana Epoch Timer')
    .action(async () => {
      const isMEV = solvConfig.config.IS_MEV_MODE
      await epochTimer(SOLANA_RPC_URL, isMEV)
    })
}
