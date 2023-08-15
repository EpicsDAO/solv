import { program } from '@/index'
import { df } from './df'
import { logDiskUsage } from './du'

export const dfCommands = async () => {
  program
    .command('df')
    .description('Solana Disk Free Command')
    .action(async () => {
      const parsedData = df()
      console.log(parsedData)
    })

  program
    .command('df:check')
    .description('Solana Disk Free Check Command')
    .action(async () => {
      logDiskUsage()
    })
}
