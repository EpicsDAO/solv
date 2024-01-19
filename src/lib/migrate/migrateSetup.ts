import { spawnSync } from 'child_process'
import { umount } from '@/cli/check/mt/umount'
import getPreferredDisk, {
  GetPreferredDisksResult,
} from '@/cli/check/mt/getLargestDisk'
import { startSolana } from '@/cli/start/startSolana'
import { DISK_TYPES, SOLV_TYPES } from '@/config/config'
import { ensureFstabEntries } from '@/cli/check/ensureMountAndFiles'
import { updateSolvConfig } from '@/lib/updateSolvConfig'
import { setupDirs } from '@/cli/setup/mkdirs'
import { formatDisk } from '@/cli/setup/formatDisk'
import { setupPermissions } from '@/cli/setup/userPermissions'
import { genStartupValidatorScript } from '@/cli/setup/genStartupValidatorScript'
import { makeServices } from '@/cli/setup/makeServices'

export const migrateSetup = async () => {
  try {
    const sType = SOLV_TYPES.TESTNET_VALIDATOR

    console.log('Migrating to Solv3...')

    const disks: GetPreferredDisksResult = getPreferredDisk()
    const mountPoint = disks.disks[0].mountpoint
    setupDirs()
    console.log('Setting up SINGLE DISK...')
    updateSolvConfig({
      DISK_TYPES: DISK_TYPES.SINGLE,
      SOLV_TYPE: sType,
    })
    const isUmounted = umount(mountPoint)
    const fileSystem = '/dev/' + disks.disks[0].name
    formatDisk(fileSystem)
    ensureFstabEntries(fileSystem)
    setupPermissions()
    genStartupValidatorScript(true)
    makeServices()
    const cmds = [
      'sudo systemctl daemon-reload',
      'sudo systemctl enable solv',
      'sudo systemctl restart logrotate',
    ]
    for (const line of cmds) {
      spawnSync(line, { shell: true, stdio: 'inherit' })
    }
    startSolana()
    updateSolvConfig({ IS_SETUP: true })
    return true
  } catch (error) {
    throw new Error(`setup Error: ${error}`)
  }
}
