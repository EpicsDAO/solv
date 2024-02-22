import { spawnSync } from 'child_process'

export const stopSolana = () => {
  const cmd = ['sudo systemctl stop solv']
  spawnSync(cmd[0], { shell: true, stdio: 'inherit' })
}
