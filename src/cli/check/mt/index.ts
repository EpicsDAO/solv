import { program } from '@/index'
import { mount } from './mount'
import { spawnSync } from 'child_process'
import { umount } from './umount'
import getPreferredDisk from './getLargestDisk'
import { FILE_SYSTEM_PATHS } from '@/config/config'
import { ConfigParams } from '@/lib/createDefaultConfig'

export const mountCommands = (solvConfig: ConfigParams) => {
  program
    .command('mtr')
    .description('Mount Reload Command')
    .action(() => {
      const cmd = `sudo mount --all --verbose`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })

  program
    .command('disks')
    .description('Show unmounted disks')
    .action(() => {
      const disks = getPreferredDisk()
      console.log(disks)
    })
}
