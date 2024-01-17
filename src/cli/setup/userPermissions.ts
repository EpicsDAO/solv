import { MT_PATHS } from '@/config/config'
import { spawnSync } from 'child_process'
import { existsSync } from 'fs'

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
    if (line.includes('mkdir') && existsSync(MT_PATHS.LEDGER)) continue
    if (line.includes('mkdir') && existsSync(MT_PATHS.ACCOUNTS)) continue
    spawnSync(line, { shell: true, stdio: 'inherit' })
  }
}
