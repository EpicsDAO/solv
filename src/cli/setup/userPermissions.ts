import { MOUNT_ROOT, RAMDRIVE_PATH } from '@/index'
import { spawnSync } from 'child_process'

export const setupPermissions = () => {
  const cmds = [
    `sudo mkdir /mt`,
    `sudo mkdir /mnt`,
    `sudo chown -R solv:solv ${MOUNT_ROOT}`,
    `sudo chown -R solv:solv /mnt`,
    `sudo chmod -R 755 /mnt`,
    `sudo chmod -R 755 ${MOUNT_ROOT}`,
  ]
  spawnSync(cmds.join(' && '), { shell: true, stdio: 'inherit' })
}
