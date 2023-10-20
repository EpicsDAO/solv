import { execSync, spawnSync } from 'child_process'
import { setupDirs } from './mkdirs'
import { setupKeys } from './setupKeys'
import { setupSwap } from './setupSwap'
import { startValidator } from './startValidator'
import { Logger } from '@/lib/logger'
import chalk from 'chalk'
import { makeServices } from './makeServices'
import { setupPermissions } from './userPermissions'
import { umount } from '../mt/umount'
import { getPreferredDisk } from '../mt/getLargestDisk'

export const setup = () => {
  try {
    if (!isSolanaInstalled()) {
      Logger.normal(
        `Did you forget to restart your terminal?\n\n${chalk.green(
          `$ source ~/.profile`
        )}`
      )
      return
    }
    const disks = getPreferredDisk()
    const fileSystem = `/dev/${disks?.name}`
    const mountPoint = disks?.mountpoint || ''
    if (mountPoint !== '') {
      umount(mountPoint)
    }
    setupSwap(fileSystem)
    setupDirs()
    setupPermissions()
    makeServices()
    startValidator()
    setupKeys()
    const cmds = [
      'sudo systemctl daemon-reload',
      'sudo systemctl enable solv',
      'sudo systemctl restart logrotate',
    ]
    for (const line of cmds) {
      spawnSync(line, { shell: true, stdio: 'inherit' })
    }
    return true
  } catch (error) {
    throw new Error(`setup Error: ${error}`)
  }
}

function isSolanaInstalled() {
  try {
    execSync('solana --version')
    return true
  } catch (error) {
    return false
  }
}
