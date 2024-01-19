import { program } from '@/index'
import { ConfigParams } from '@/lib/createDefaultConfig'
import { spawnSync } from 'child_process'

export const statusCommands = (solvConfig: ConfigParams) => {
  const { cmds } = solvConfig.locale
  program
    .command('status')
    .description(cmds.status)
    .action(() => {
      const cmd = `sudo systemctl status solv`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
}
