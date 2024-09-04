import { SERVICE_PATHS, startupScriptPaths } from '@/config/config'
import chalk from 'chalk'
import { spawnSync } from 'node:child_process'

export const showConfig = () => {
  const cmd = `solana config get`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
  const config = startupScriptPaths()
  console.log(chalk.white('start-validator.sh: ') + config.scriptPath)
  console.log(chalk.white('solv.service: ') + SERVICE_PATHS.SOL_SERVICE)
  console.log(chalk.white('logrotate: ') + SERVICE_PATHS.SOL_LOGROTATE)
  console.log(chalk.white('sysctl.d: ') + SERVICE_PATHS.SOL_SYSTEM_CONFIG21)
  console.log(chalk.white('limits.d: ') + SERVICE_PATHS.SOL_NOFILES_CONF)
  console.log(chalk.white('system.conf: ') + SERVICE_PATHS.SOL_SYSTEM_CONF)
}
