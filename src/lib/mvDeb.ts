import { spawn } from 'child_process'
import { existsSync, mkdirSync } from 'fs'

export const mvDeb = (version: string) => {
  const fileDir = `release/solv_${version}`
  if (!existsSync(fileDir)) {
    mkdirSync(fileDir)
  }
  const cmd = `mv solv_${version}* ${fileDir}`
  spawn(cmd, { shell: true, stdio: 'inherit' })
}

mvDeb('0.1.4')
