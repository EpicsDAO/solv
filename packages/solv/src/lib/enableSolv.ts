import { spawnSync } from 'node:child_process'

export const enableSolv = () => {
  spawnSync('sudo systemctl enable solv', { shell: true, stdio: 'inherit' })
}
