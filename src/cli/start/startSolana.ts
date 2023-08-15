import { spawnSync } from 'child_process'

export const startSolana = async () => {
  const cmd = ['sudo systemctl start sol']
  spawnSync(cmd[0], { shell: true, stdio: 'inherit' })
}
