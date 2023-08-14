import { spawnSync } from 'child_process'
import { setupDirs } from './mkdirs'
import { setupPermissions } from './userPermissions'
import { setupKeys } from './setupKeys'
import { setupSwap } from './setupSwap'

export const setup = (options = { swap: false }) => {
  try {
    setupDirs()
    setupPermissions()
    setupKeys()
    if (options.swap) setupSwap()
    const cmd = [
      'sudo systemctl daemon-reload',
      'sudo systemctl enable solana',
      'sudo systemctl start solana',
      'sudo systemctl restart logrotate',
    ]
    spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`setup Error: ${error}`)
  }
}
