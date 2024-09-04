import { program } from '@/index'
import { df } from './df/df'
import { displayTable } from '@/lib/logger/table'
import getPreferredDisks, { GetPreferredDisksResult } from './mt/getLargestDisk'

export const checkCommands = () => {
  const check = program.command('check').description('Check System Status')

  check
    .command('df')
    .description('Check Disk Free')
    .action(() => {
      const dirs = df()
      displayTable(dirs)
    })

  check
    .command('mnt')
    .description('Check Mounted Directories')
    .action(() => {
      const disks: GetPreferredDisksResult = getPreferredDisks()
      console.log(disks)
    })
}
