import { ValidatorType } from '@/config/enums'
import { DefaultConfigType } from '@/config/types'
import { program } from '@/index'
import { spawnSync } from 'child_process'

export const statusCommands = (config: DefaultConfigType) => {
  program
    .command('status')
    .description('Check Solana Validator Status')
    .action(() => {
      systemctlStatusSolv(config)
    })
}

export const systemctlStatusSolv = (config: DefaultConfigType) => {
  const service =
    config.VALIDATOR_TYPE === ValidatorType.FRANKENDANCER
      ? 'frankendancer'
      : 'solv'
  const cmd = `sudo systemctl status ${service}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
  process.exit(0)
}
