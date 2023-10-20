import { LEDGER_PATH, LOG_DIR, SOLANA_ACCOUNT_ROOT } from '@/config'
import { createDirectoryIfNotExists } from '@/lib/createDirectoryIfNotExists'

export const setupDirs = () => {
  try {
    const dirs = [LOG_DIR, LEDGER_PATH, SOLANA_ACCOUNT_ROOT]

    for (const dir of dirs) {
      createDirectoryIfNotExists(dir)
    }
  } catch (error) {
    throw new Error(`setupDirs Error: ${error}`)
  }
}
