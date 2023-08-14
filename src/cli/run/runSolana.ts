import { spawnSync } from 'child_process'

export const runSolana = async () => {
  const cmd = ['sudo systemctl start sol']
  spawnSync(cmd[0], { shell: true, stdio: 'inherit' })
}
