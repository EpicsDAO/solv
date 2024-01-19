import { HOME_PATHS, getAllKeyPaths } from '@/config/config'
import { SOLV_CLIENT_PATHS } from '@/config/solvClient'
import chalk from 'chalk'
import { spawnSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import inquirer from 'inquirer'
import os from 'os'

export const download = async () => {
  const answer = await inquirer.prompt<{ ip: string }>([
    {
      type: 'input',
      name: 'ip',
      message: 'Enter your Ubuntu Server IP',
      default() {
        return '1.1.1.1'
      },
    },
  ])
  const solanaKeys = Object.values(getAllKeyPaths())
  const homeDirectory = os.userInfo().homedir
  for (const key of solanaKeys) {
    console.log(`Downloading ${key}...`)
    const splits = key.split('/')
    const fileName = splits[splits.length - 1]
    const filePath = `./${fileName}`
    const cmd = `scp solv@${answer.ip}:${key} ${filePath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    console.log(`Successfully Exported - ${filePath} 🎉`)
  }
}
