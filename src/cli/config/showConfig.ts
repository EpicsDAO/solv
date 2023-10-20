import {
  MAINNET_VALIDATOR_KEYFILE,
  SOL_LOGROTATE_PATH,
  SOL_NOFILES_CONF_PATH,
  SOL_SERVICE_PATH,
  SOL_SYSTEM_CONF,
  SOL_SYSTEM_CONFIG21_PATH,
  TESTNET_VALIDATOR_KEYFILE,
  VALIDATOR_STARTUP_SCRIPT,
  VALIDATOR_VOTE_KEYFILE,
  VALITATOR_AUTHORITY_KEYFILE,
} from '@/config'
import chalk from 'chalk'
import { spawnSync } from 'child_process'

export const showConfig = () => {
  const cmd = `solana config get`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
  console.log(chalk.white('start-validator.sh: ') + VALIDATOR_STARTUP_SCRIPT)
  console.log(
    chalk.white('testnet-validator-keypair.json: ') + TESTNET_VALIDATOR_KEYFILE
  )
  console.log(
    chalk.white('mainnet-validator-keypair.json: ') + MAINNET_VALIDATOR_KEYFILE
  )
  console.log(
    chalk.white('vote-account-keypair.json: ') + VALIDATOR_VOTE_KEYFILE
  )
  console.log(
    chalk.white('authority-keypair.json: ') + VALITATOR_AUTHORITY_KEYFILE
  )
  console.log(chalk.white('solv.service: ') + SOL_SERVICE_PATH)
  console.log(chalk.white('logrotate: ') + SOL_LOGROTATE_PATH)
  console.log(chalk.white('sysctl.d: ') + SOL_SYSTEM_CONFIG21_PATH)
  console.log(chalk.white('limits.d: ') + SOL_NOFILES_CONF_PATH)
  console.log(chalk.white('system.conf: ') + SOL_SYSTEM_CONF)
}
