import { getAllKeyPaths } from '@/config/config'
import { SOLV_CLIENT_PATHS } from '@/config/solvClient'
import { spawnSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import inquirer from 'inquirer'
import os from 'os'
import { executeSCP } from './executeSCP'

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
  const keyDir = homeDirectory.includes('/home/solv')
    ? '/home/solv'
    : homeDirectory + SOLV_CLIENT_PATHS.SOLV_KEYPAIR_DOWNLOAD_PATH
  if (!existsSync(keyDir)) {
    mkdirSync(keyDir, { recursive: true })
  }
  const isDownload = true
  for (const key of solanaKeys) {
    const splits = key.split('/')
    let fileName = splits[splits.length - 1]
    fileName = homeDirectory.includes('/home/solv')
      ? fileName
      : fileName.replace('.json', `-${answer.ip}.json`)
    const filePath = `${keyDir}/${fileName}`
    const result = executeSCP(answer.ip, key, filePath, isDownload)
    if (result) {
      console.log(`Successfully Exported - ${filePath} 🎉`)
    }
  }
}
