import { spawnSync } from 'node:child_process'

export const jupiterLog = (error = false) => {
  const cmd = error
    ? `journalctl -u jupiter-api.service -xef | grep ERROR`
    : `journalctl -u jupiter-api.service -xef`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
