import { spawnSync } from 'child_process'

export const daemonReload = () => {
  spawnSync('sudo systemctl daemon-reload', { shell: true, stdio: 'inherit' })
}
