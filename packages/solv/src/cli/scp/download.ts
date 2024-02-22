import { getAllKeyPaths } from '@/config/config'
import { SOLV_CLIENT_PATHS } from '@/config/solvClient'
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
  const keyDir = homeDirectory + SOLV_CLIENT_PATHS.SOLV_KEYPAIR_DOWNLOAD_PATH
  if (!existsSync(keyDir)) {
    mkdirSync(keyDir, { recursive: true })
  }
  for (const key of solanaKeys) {
    const splits = key.split('/')
    let fileName = splits[splits.length - 1]
    fileName = fileName.replace('.json', `-${answer.ip}.json`)
    const filePath = `${keyDir}/${fileName}`
    const cmd = `scp solv@${answer.ip}:${key} ${filePath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    if (existsSync(filePath)) {
      console.log(`Successfully Exported - ${filePath} 🎉`)
    }
  }
}
