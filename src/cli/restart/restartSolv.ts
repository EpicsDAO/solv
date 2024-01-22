import { spawnSync } from 'child_process'

export const restartSolv = () => {
  const cmd = `sudo systemctl restart solv`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
