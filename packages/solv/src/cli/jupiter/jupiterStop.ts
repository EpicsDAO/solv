import { spawnSync } from 'node:child_process'

export const jupiterStop = () => {
  const cmd = `sudo systemctl stop jupiter-api.service`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
