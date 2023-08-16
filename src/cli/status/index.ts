import { program } from '@/index'
import { spawnSync } from 'child_process'

export const statusCommands = () => {
  program
    .command('status')
    .description('solv Status Command')
    .action(() => {
      const cmd = `sudo systemctl status sol`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
}
