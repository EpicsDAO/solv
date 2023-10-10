import { program } from '@/index'
import { mount } from './mount'
import { spawnSync } from 'child_process'
import { SolvPaths } from '@/types/solvTypes'
import { umount } from './umount'

export const mountCommands = () => {
  program
    .command('mt')
    .description('Linux Mount Command')
    .option(
      '-p,--path <path>',
      'File System Path e.g /dev/vda',
      SolvPaths.DEFAULT_FILE_SYSTEM
    )
    .action((options: any) => {
      mount(options.path)
    })

  program
    .command('umt')
    .description('Solana Umount Command')
    .option(
      '-p,--path <path>',
      'File System Path e.g /dev/vda',
      SolvPaths.DEFAULT_FILE_SYSTEM
    )
    .action((options: any) => {
      umount(options.path)
    })

  program
    .command('mtr')
    .description('Mount Reload Command')
    .action(() => {
      const cmd = `sudo mount --all --verbose`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
}
