import { spawnSync } from 'node:child_process'

export const jupiterStatus = () => {
  const cmd = `sudo systemctl status jupiter-api.service`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
