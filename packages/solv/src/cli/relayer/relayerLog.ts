import { spawnSync } from 'node:child_process'

export const relayerLog = (error = false) => {
  const cmd = error
    ? `journalctl -u relayer.service -xef | grep ERROR`
    : `journalctl -u relayer.service -xef`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
