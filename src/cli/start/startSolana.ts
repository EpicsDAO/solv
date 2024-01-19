import { spawnSync } from 'child_process'

export const startSolana = () => {
  const cmd = ['sudo systemctl start solv']
  spawnSync(cmd[0], { shell: true, stdio: 'inherit' })
}
