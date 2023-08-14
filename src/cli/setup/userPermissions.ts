import { spawnSync } from 'child_process'

export const setupPermissions = () => {
  spawnSync('sudo chown -R solv:solv /mt/*', { shell: true, stdio: 'inherit' })
}
