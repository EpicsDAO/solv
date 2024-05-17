import { spawnSync } from 'node:child_process'

export const relayerRestart = () => {
  const cmd = `sudo systemctl restart relayer.service`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
