import { program } from '@/index'
import { relayerStatus } from './relayerStatus'
import { relayerStart } from './relayerStart'
import { relayerStop } from './relayerStop'
import { relayerRestart } from './relayerRestart'
import { relayerLog } from './relayerLog'
import chalk from 'chalk'
import { LEDGER_PATH } from '@/config/constants'
import { spawnSync } from 'child_process'
import { relayerEnable } from './relayerEnable'
import getSolanaCLI from '@/config/getSolanaCLI'

export const relayerCommands = () => {
  const relayer = program
    .command('relayer')
    .description('Jito Relayer Commands')

  relayer
    .command('status')
    .description('Show Relayer Status')
    .action(() => {
      relayerStatus()
    })

  relayer
    .command('start')
    .description('Start Relayer')
    .action(() => {
      relayerStart()
    })

  relayer
    .command('stop')
    .description('Stop Relayer')
    .action(() => {
      relayerStop()
    })

  relayer
    .command('log')
    .option('-e, --error', 'Show Error Logs', false)
    .description('Show Relayer Logs')
    .action((options: { error: boolean }) => {
      relayerLog(options.error)
    })

  relayer
    .command('restart')
    .description('Restart Relayer')
    .action(() => {
      relayerRestart()
    })

  relayer
    .command('enable')
    .description('Enable Relayer')
    .action(() => {
      relayerEnable()
    })

  relayer
    .command('set:url')
    .option('-u, --url <url>', 'Set Relayer URL', '')
    .description('Set Relayer URL on Validator')
    .action((options: { url: string }) => {
      if (options.url === '') {
        console.log(chalk.red('Please provide a URL'))
        return
      }
      const cmd = `${getSolanaCLI()} --ledger ${LEDGER_PATH} set-relayer-config --relayer-url ${options.url}`
      console.log(chalk.white('Setting Relayer URL ...'))
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
      console.log(chalk.green('🟢 Relayer URL Set'))
    })
}
