import { SolvConfig } from '@/types/solvTypes'
import { exec } from 'child_process'
import { existsSync, mkdirSync } from 'fs'

const user = process.env.SOLV_USER || 'solv'

export const setupDirs = () => {
  try {
    const dirs = [
      SolvConfig.LOG_DIR,
      SolvConfig.RAMDRIVE_PATH,
      SolvConfig.LEDGER_PATH,
      SolvConfig.ACCOUNT_PATH,
    ]

    for (const dir of dirs) {
      if (existsSync(dir)) return
      mkdirSync(dir, { recursive: true })
      exec(`sudo chown -R ${user}:${user} ${dir}`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`)
          return
        }
        console.log(`stdout: ${stdout}`)
        console.error(`stderr: ${stderr}`)
      })
    }
  } catch (error) {
    throw new Error(`setupDirs Error: ${error}`)
  }
}
