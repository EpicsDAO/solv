import { spawnSync } from 'child_process'

export const enableSolv = () => {
  spawnSync('sudo systemctl enable solv', { shell: true, stdio: 'inherit' })
}
