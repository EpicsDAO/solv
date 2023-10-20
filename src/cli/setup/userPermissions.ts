import { MOUNT_ROOT, VALIDATOR_STARTUP_SCRIPT } from '@/config'
import { spawnSync } from 'child_process'
import { existsSync } from 'fs'

export const setupPermissions = () => {
  const cmds = [
    `sudo mkdir -p ${MOUNT_ROOT}`,
    `sudo chown -R solv:solv ${MOUNT_ROOT}`,
    `sudo chmod -R 755 ${MOUNT_ROOT}`,
  ]
  for (const line of cmds) {
    if (line.includes('mkdir') && existsSync(MOUNT_ROOT)) continue
    spawnSync(line, { shell: true, stdio: 'inherit' })
  }
}
