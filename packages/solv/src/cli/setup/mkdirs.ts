import { MT_PATHS } from '@/config/config'
import { createDirectoryIfNotExists } from '@/lib/createDirectoryIfNotExists'

export const setupDirs = () => {
  try {
    const dirs = [MT_PATHS.ACCOUNTS, MT_PATHS.LEDGER]
    for (const dir of dirs) {
      createDirectoryIfNotExists(dir)
    }
  } catch (error) {
    throw new Error(`setupDirs Error: ${error}`)
  }
}
