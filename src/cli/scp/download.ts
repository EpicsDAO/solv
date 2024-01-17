import { getAllKeyPaths } from '@/config/config'
import { SOLV_CLIENT_PATHS } from '@/config/solvClient'
import chalk from 'chalk'
import { spawnSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import inquirer from 'inquirer'
import os from 'os'

export const download = async () => {
  const homeDirectory = os.userInfo().homedir
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

  const dlPath = `${homeDirectory}${SOLV_CLIENT_PATHS.SOLV_KEYPAIR_DOWNLOAD_PATH}`
  if (!existsSync(dlPath)) {
    mkdirSync(dlPath, { recursive: true })
  }
  for (const key of solanaKeys) {
    const splits = key.split('/')
    const fileName = splits[splits.length - 1]
    const filePath = `${dlPath}/${fileName}`
    if (!existsSync(filePath)) {
      console.log(chalk.red(`File Not Found - ${filePath} 🚨`))
      continue
    }
    const cmd = `scp solv@${answer.ip}:${key} ${filePath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    console.log(`Successfully Exported - ${filePath} 🎉`)
  }
}
