import { spawnSync } from 'node:child_process'

export const relayerLog = (error = false) => {
  const cmd = error
    ? `jounalctl -u relayer.service -xef |grep ERROR`
    : `jounalctl -u relayer.service -xf`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
