import { spawnSync } from 'node:child_process'

export const jupiterStart = () => {
  const cmd = `sudo systemctl start jupiter-api.service`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
