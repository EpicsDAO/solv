import { program } from '@/index'
import { startValidatorSh } from '@/template/startValitatorSh'
import { SolvConfig } from '@/types/solvTypes'
import { spawnSync } from 'child_process'
import { chmodSync, writeFileSync } from 'fs'

export const restartCommand = () => {
  program
    .command('restart')
    .description('Restart Solana Validator')
    .option('--snapshot', 'Restart Solana Validator with fetch snapshot', false)
    .action(async (options) => {
      if (options.snapshot) {
        const startValidator = startValidatorSh(true)
        writeFileSync(SolvConfig.VALIDATOR_STARTUP_SCRIPT, startValidator)
        chmodSync(SolvConfig.VALIDATOR_STARTUP_SCRIPT, '755')
      } else {
        const startValidator = startValidatorSh()
        writeFileSync(SolvConfig.VALIDATOR_STARTUP_SCRIPT, startValidator)
        chmodSync(SolvConfig.VALIDATOR_STARTUP_SCRIPT, '755')
      }
      const cmd = `sudo systemctl restart solana`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
}
