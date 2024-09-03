import { program } from '@/index'
import { jupiterStatus } from '@/cli/jupiter/jupiterStatus'
import { jupiterStart } from '@/cli/jupiter/jupiterStart'
import { jupiterStop } from '@/cli/jupiter/jupiterStop'
import { jupiterRestart } from '@/cli/jupiter/jupiterRestart'
import { jupiterLog } from '@/cli/jupiter/jupiterLog'
import { jupiterEnable } from '@/cli/jupiter/jupiterEnable'

export const jupiterCommands = () => {
  const jupiter = program.command('jupiter').description('Jupiter API Commands')

  jupiter
    .command('status')
    .description('Show Jupiter Status')
    .action(() => {
      jupiterStatus()
    })

  jupiter
    .command('start')
    .description('Start Jupiter')
    .action(() => {
      jupiterStart()
    })

  jupiter
    .command('stop')
    .description('Stop Jupiter')
    .action(() => {
      jupiterStop()
    })

  jupiter
    .command('log')
    .option('-e, --error', 'Show Error Logs', false)
    .description('Show Jupiter Logs')
    .action((options: { error: boolean }) => {
      jupiterLog(options.error)
    })

  jupiter
    .command('restart')
    .description('Restart Jupiter')
    .action(() => {
      jupiterRestart()
    })

  jupiter
    .command('enable')
    .description('Enable Jupiter')
    .action(() => {
      jupiterEnable()
    })
}
