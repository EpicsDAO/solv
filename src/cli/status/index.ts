import { program } from '@/index'
import { spawnSync } from 'child_process'

export const statusCommands = (solvConfig: ConfigParams) => {
  program
    .command('status')
    .description('Show Solana Validator Status')
    .action(() => {
      const cmd = `sudo systemctl status solv`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
}
