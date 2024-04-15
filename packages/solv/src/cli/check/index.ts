import { program } from '@/index'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { df } from './df/df'
import { displayTable } from '@/lib/logger/table'
import getPreferredDisks, { GetPreferredDisksResult } from './mt/getLargestDisk'

export const checkCommands = (solvConfig: ConfigParams) => {
  const { locale } = solvConfig
  const check = program.command('check').description(locale.cmds.check)

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
