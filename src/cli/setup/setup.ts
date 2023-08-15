import { spawnSync } from 'child_process'
import { setupDirs } from './mkdirs'
import { setupPermissions } from './userPermissions'
import { setupKeys } from './setupKeys'
import { setupSwap } from './setupSwap'

export const setup = (options = { swap: false, fileSystem: '/dev/vdb' }) => {
  try {
    setupPermissions()
    setupDirs()
    setupKeys()
    if (options.swap) setupSwap(options.fileSystem)
    const cmd = [
      'sudo systemctl daemon-reload',
      'sudo systemctl enable sol',
      'sudo systemctl start sol',
      'sudo systemctl restart logrotate',
    ]
    spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`setup Error: ${error}`)
  }
}
