import { spawnSync } from 'node:child_process'

export const relayerStart = () => {
  const cmd = `sudo systemctl start relayer.service`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
