import { spawnSync } from 'node:child_process'

export const relayerStop = () => {
  const cmd = `sudo systemctl stop relayer.service`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
