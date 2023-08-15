import { ACCOUNT_PATH, LEDGER_PATH } from '@/index'
import { spawnSync } from 'child_process'
import { existsSync } from 'fs'

export const setupDirs = () => {
  try {
    const dirs = ['/mt/solana/solana-validator/log', ACCOUNT_PATH, LEDGER_PATH]

    dirs.forEach((dir) => {
      if (existsSync(dir)) return
      const cmd = `mkdir -p ${dir}`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
  } catch (error) {
    throw new Error(`setupDirs Error: ${error}`)
  }
}
