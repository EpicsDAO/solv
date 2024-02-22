import { spawnSync } from 'child_process'

export const restartLogrotate = () => {
  const cmd = 'sudo systemctl restart logrotate'
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
