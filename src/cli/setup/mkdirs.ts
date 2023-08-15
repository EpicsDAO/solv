import {
  ACCOUNT_PATH,
  LEDGER_PATH,
  LOG_DIR,
  MOUNT_ROOT,
  RAMDRIVE_PATH,
  SWAP_PATH,
} from '@/index'
import { spawnSync } from 'child_process'
import { existsSync } from 'fs'

export const setupDirs = () => {
  try {
    const dirs = [MOUNT_ROOT, LOG_DIR, ACCOUNT_PATH, LEDGER_PATH, RAMDRIVE_PATH]

    dirs.forEach((dir) => {
      if (existsSync(dir)) return
      const cmd = `mkdir -p ${dir}`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
  } catch (error) {
    throw new Error(`setupDirs Error: ${error}`)
  }
}
