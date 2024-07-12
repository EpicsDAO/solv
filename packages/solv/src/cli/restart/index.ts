import { program } from '@/index'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { spawnSync } from 'node:child_process'
import { NETWORK_TYPES } from '@/config/config'
import chalk from 'chalk'
import {
  AGAVE_VALIDATOR,
  LEDGER_PATH,
  SOLANA_VALIDATOR,
} from '@/config/constants'

export const restartCommand = (solvConfig: ConfigParams) => {
  const { cmds } = solvConfig.locale
  const isTestnet = solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
  const solanaValidatorClient = isTestnet ? AGAVE_VALIDATOR : SOLANA_VALIDATOR
  program
    .command('restart')
    .description(cmds.restart)
    .option('-r, --rm', 'Remove Snapshot and Restart Validator', false)
    .action(async (options: { rm: boolean }) => {
      if (options.rm) {
        console.log(
          chalk.white('👷‍♀️ Removing Snapshot and Restarting Validator...'),
        )
        spawnSync('solv stop', { stdio: 'inherit', shell: true })
        spawnSync('solv rm:snapshot', { stdio: 'inherit', shell: true })
        spawnSync('solv get snapshot', { stdio: 'inherit', shell: true })
        spawnSync('solv start', { stdio: 'inherit', shell: true })
        console.log(chalk.green('✔︎ Successfully Restarted Validator'))
        return
      }

      const config = solvConfig.config
      const cmd = `${solanaValidatorClient} --ledger ${LEDGER_PATH} exit --max-delinquent-stake ${config.MAINNET_DELINQUENT_STAKE}`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
}
