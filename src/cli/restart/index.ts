import { VALIDATOR_STARTUP_SCRIPT } from '@/config'
import { program } from '@/index'
import { startValidatorSh } from '@/template/startValitatorSh'
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
        writeFileSync(VALIDATOR_STARTUP_SCRIPT, startValidator)
        chmodSync(VALIDATOR_STARTUP_SCRIPT, '755')
      } else {
        const startValidator = startValidatorSh()
        writeFileSync(VALIDATOR_STARTUP_SCRIPT, startValidator)
        chmodSync(VALIDATOR_STARTUP_SCRIPT, '755')
      }
      const cmd = `sudo systemctl restart solv`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
}
