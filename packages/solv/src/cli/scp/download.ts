import { MT_PATHS, getAllKeyPaths } from '@/config/config'
import { SOLV_CLIENT_PATHS } from '@/config/solvClient'
import { spawnSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import { readdir } from 'fs/promises'
import inquirer from 'inquirer'
import os from 'os'
import path from 'path'

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

    // Download tower file
    const towerPath = `${MT_PATHS.LEDGER}`
    const files = await readdir(towerPath)
    const towerFiles = files.filter((file) => file.startsWith('tower-'))
    const towerFile = towerFiles.map((file) => path.join(towerPath, file))
    for (const file of towerFile) {
      const splits = file.split('/')
      let fileName = splits[splits.length - 1]
      fileName = fileName.replace('.json', `-${answer.ip}.json`)
      const filePath = `${keyDir}/${fileName}`
      const cmd = `scp solv@${answer.ip}:${file} ${filePath}`
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    }

    if (existsSync(filePath)) {
      console.log(`Successfully Exported - ${filePath} 🎉`)
    }
  }
}
