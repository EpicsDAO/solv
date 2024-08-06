import { program } from '@/index'
import { relayerStatus } from './relayerStatus'
import { relayerStart } from './relayerStart'
import { relayerStop } from './relayerStop'
import { relayerRestart } from './relayerRestart'

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
    .command('restart')
    .description('Restart Relayer')
    .action(() => {
      relayerRestart()
    })
}
