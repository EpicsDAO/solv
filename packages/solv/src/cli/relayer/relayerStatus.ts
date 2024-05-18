import { spawnSync } from 'node:child_process'

export const relayerStatus = () => {
  const cmd = `sudo systemctl status relayer.service`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
