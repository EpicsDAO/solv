import type { DefaultConfigType } from '@/config/defaultConfig.ts'
import { startSolv } from '@/cli/systemctl/startSolv.ts'
import { stopSolv } from '@/cli/systemctl/stopSolv.ts'
import type { Command } from '@cliffy'

export const systemctlCommand = (
  program: Command,
  config: DefaultConfigType,
) => {
  program
    .command('start')
    .description('Start Solana Validator')
    .action(async () => {
      await startSolv(config)
      return
    })

  program
    .command('stop')
    .description('Stop Solana Validator')
    .action(async () => {
      await stopSolv(config)
      return
    })

  program
    .command('restart')
    .description('Restart Solana Validator')
    .option('-r, --rm', 'Remove Snapshot and Restart Validator')
    .action(async (options) => {
      if (options.rm) {
        await stopSolv(config)
      } else {
        await startSolv(config)
      }
      return
    })
}
