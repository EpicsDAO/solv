import { MT_PATHS } from '@/config/config'
import { spawnSync } from 'child_process'

export const setupPermissions = () => {
  const cmds = [
    `sudo mkdir -p ${MT_PATHS.ROOT}`,
    `sudo chown -R solv:solv ${MT_PATHS.ROOT}`,
    `sudo chmod -R 755 ${MT_PATHS.ROOT}`,
    `sudo mkdir -p ${MT_PATHS.ACCOUNTS}`,
    `sudo chown -R solv:solv ${MT_PATHS.ACCOUNTS}`,
    `sudo chmod -R 755 ${MT_PATHS.ACCOUNTS}`,
    `sudo mkdir -p ${MT_PATHS.LEDGER}`,
    `sudo chown -R solv:solv ${MT_PATHS.LEDGER}`,
    `sudo chmod -R 755 ${MT_PATHS.LEDGER}`,
  ]

  for (const line of cmds) {
    spawnSync(line, { shell: true, stdio: 'ignore' })
  }
}
