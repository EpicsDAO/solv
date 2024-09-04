import { program } from '@/index'
import { spawnSync } from 'node:child_process'
import chalk from 'chalk'
import {
  AGAVE_VALIDATOR,
  LEDGER_PATH,
  SOLANA_VALIDATOR,
} from '@/config/constants'
import { DefaultConfigType } from '@/config/types'
import { Network, NodeType } from '@/config/enums'

export const restartCommand = (config: DefaultConfigType) => {
  const isTestnet = config.NETWORK === Network.TESTNET
  const isRPC = config.NODE_TYPE === NodeType.RPC
  let solanaValidatorClient = isTestnet ? AGAVE_VALIDATOR : SOLANA_VALIDATOR
  if (isRPC) {
    solanaValidatorClient = AGAVE_VALIDATOR
  }
  program
    .command('restart')
    .description('Restart Solana Validator')
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
        process.exit(0)
      }
      const cmd = `${solanaValidatorClient} --ledger ${LEDGER_PATH} exit --max-delinquent-stake ${config.MAINNET_DELINQUENT_STAKE}`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
      process.exit(0)
    })
}
