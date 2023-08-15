import { program } from '@/index'
import { df } from './df'
import { logDiskUsage } from './du'
import { displayTable } from '@/lib/logger/table'

export const dfCommands = async () => {
  program
    .command('df')
    .description('Solana Disk Free Command')
    .action(async () => {
      const dirs = df()
      displayTable(dirs)
    })
}
