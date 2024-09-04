import { program } from '@/index'
import { spawnSync } from 'child_process'

export const statusCommands = () => {
  program
    .command('status')
    .description('Check Solana Validator Status')
    .action(() => {
      systemctlStatusSolv()
    })
}

export const systemctlStatusSolv = () => {
  const cmd = `sudo systemctl status solv`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
  process.exit(0)
}
