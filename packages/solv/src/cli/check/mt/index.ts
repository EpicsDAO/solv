import { program } from '@/index'
import { spawnSync } from 'child_process'
import getPreferredDisk from './getLargestDisk'

export const mountCommands = () => {
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
