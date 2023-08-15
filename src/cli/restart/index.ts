import { program } from '@/index'
import { spawnSync } from 'child_process'

export const restartCommand = () => {
  program
    .command('restart')
    .description('Restart Solana')
    .action(async () => {
      const cmd = `sudo systemctl restart solana`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
}
