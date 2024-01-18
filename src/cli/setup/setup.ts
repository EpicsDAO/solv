import { execSync, spawnSync } from 'child_process'
import { setupDirs } from './mkdirs'
import { setupKeys } from './setupKeys'
import { genStartupValidatorScript } from './genStartupValidatorScript'
import { Logger } from '@/lib/logger'
import chalk from 'chalk'
import { makeServices } from './makeServices'
import { setupPermissions } from './userPermissions'
import { umount } from '../check/mt/umount'
import { getPreferredDisk } from '../check/mt/getLargestDisk'
import { startSolana } from '../start/startSolana'
import { CONFIG } from '@/config/config'

export const setup = (commission = CONFIG.COMMISSION) => {
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
    const mountPoint = disks?.mountpoint || ''
    if (mountPoint !== '') {
      umount(mountPoint)
    }
    setupDirs()
    setupPermissions()
    genStartupValidatorScript(true)
    makeServices()
    setupKeys(commission)
    const cmds = [
      'sudo systemctl daemon-reload',
      'sudo systemctl enable solv',
      'sudo systemctl restart logrotate',
    ]
    for (const line of cmds) {
      spawnSync(line, { shell: true, stdio: 'inherit' })
    }
    startSolana()
    return true
  } catch (error) {
    throw new Error(`setup Error: ${error}`)
  }
}

export function isSolanaInstalled() {
  try {
    execSync('solana --version')
    return true
  } catch (error) {
    return false
  }
}
