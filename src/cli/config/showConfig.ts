import { Logger } from '@/lib/logger'
import { SolvConfig } from '@/types/solvTypes'
import chalk from 'chalk'
import { spawnSync } from 'child_process'

export const showConfig = () => {
  const cmd = `solana config get`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
  console.log(
    chalk.white('start-validator.sh: ') + SolvConfig.VALIDATOR_STARTUP_SCRIPT
  )
  console.log(
    chalk.white('testnet-validator-keypair.json: ') +
      SolvConfig.TESTNET_VALIDATOR_KEYFILE
  )
  console.log(
    chalk.white('mainnet-validator-keypair.json: ') +
      SolvConfig.MAINNET_VALIDATOR_KEYFILE
  )
  console.log(
    chalk.white('vote-account-keypair.json: ') +
      SolvConfig.VALIDATOR_VOTE_KEYFILE
  )
  console.log(
    chalk.white('authority-keypair.json: ') +
      SolvConfig.VALITATOR_AUTHORITY_KEYFILE
  )
  console.log(chalk.white('sol.service: ') + SolvConfig.SOL_SERVICE_PATH)
  console.log(chalk.white('logrotate: ') + SolvConfig.SOL_LOGROTATE_PATH)
  console.log(chalk.white('sysctl.d: ') + SolvConfig.SOL_SYSTEM_CONFIG21_PATH)
  console.log(chalk.white('limits.d: ') + SolvConfig.SOL_NOFILES_CONF_PATH)
  console.log(chalk.white('system.conf: ') + SolvConfig.SOL_SYSTEM_CONF)
}
