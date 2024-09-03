import { spawnSync } from 'node:child_process'

export const jupiterEnable = () => {
  const cmd = `sudo systemctl enable jupiter-api.service`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
