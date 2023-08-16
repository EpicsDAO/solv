import { SolvConfig } from '@/types/solvTypes'
import { spawnSync } from 'child_process'

export const setupPermissions = () => {
  const cmds = [
    `sudo mkdir -p /mt/solana/solana-validator`,
    `sudo mkdir -p `,
    `sudo mkdir /mnt`,
    `sudo chown -R solv:solv ${SolvConfig.MOUNT_ROOT}`,
    `sudo chown -R solv:solv /mnt`,
    `sudo chmod -R 755 /mnt`,
    `sudo chmod -R 755 ${SolvConfig.MOUNT_ROOT}`,
  ]
  spawnSync(cmds.join(' && '), { shell: true, stdio: 'inherit' })
}
