import { VALIDATOR_STARTUP_SCRIPT, program } from '@/index'
import { startValidatorSh } from '@/template/startValitatorSh'
import { spawnSync } from 'child_process'
import { chmodSync, writeFileSync } from 'fs'

export const restartCommand = () => {
  program
    .command('restart')
    .description('Restart Solana')
    .option('--snapshot', 'Restart Solana Validator with fetch snapshot', false)
    .action(async (options) => {
      if (options.snapshot) {
        const startValidator = startValidatorSh(true)
        writeFileSync(VALIDATOR_STARTUP_SCRIPT, startValidator)
        chmodSync(VALIDATOR_STARTUP_SCRIPT, 'x')
      } else {
        const startValidator = startValidatorSh()
        writeFileSync(VALIDATOR_STARTUP_SCRIPT, startValidator)
        chmodSync(VALIDATOR_STARTUP_SCRIPT, 'x')
      }
      const cmd = `sudo systemctl restart solana`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
}
