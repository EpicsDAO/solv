import { spawnSync } from 'node:child_process'

export const jupiterRestart = () => {
  const cmd = `sudo systemctl restart jupiter-api.service`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
