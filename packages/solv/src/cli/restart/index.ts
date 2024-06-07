import { program } from '@/index'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { spawnSync } from 'node:child_process'
import { MT_PATHS } from '@/config/config'

export const restartCommand = (solvConfig: ConfigParams) => {
  const { cmds } = solvConfig.locale
  program
    .command('restart')
    .description(cmds.restart)
    .action(async () => {
      const config = solvConfig.config
      const cmd = `solana-validator --ledger ${MT_PATHS.LEDGER} exit --max-delinquent-stake ${config.MAINNET_DELINQUENT_STAKE}`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
}
