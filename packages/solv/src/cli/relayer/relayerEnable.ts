import { spawnSync } from 'node:child_process'

export const relayerEnable = () => {
  const cmd = `sudo systemctl enable relayer.service`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
