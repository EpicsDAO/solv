import { getAllKeyPaths } from '@/config/config'
import { SOLV_CLIENT_PATHS } from '@/config/solvClient'
import { existsSync, mkdirSync } from 'fs'
import inquirer from 'inquirer'
import { homedir } from 'os'
import { executeSCP } from './executeSCP'
import { RELAYER_KEY, UNSTAKED_KEY } from '@/config/constants'

export const download = async (ip = '') => {
  let migrateIP = ip
  if (ip === '') {
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
    migrateIP = answer.ip
  }
  const solanaKeys = Object.values(getAllKeyPaths())
  const homeDirectory = homedir()
  const keyDir = homeDirectory.includes('/home/solv')
    ? '/home/solv'
    : homeDirectory + SOLV_CLIENT_PATHS.SOLV_KEYPAIR_DOWNLOAD_PATH
  if (!existsSync(keyDir)) {
    mkdirSync(keyDir, { recursive: true })
  }
  const isDownload = true
  const relayerKeyPath = homeDirectory + '/' + RELAYER_KEY
  solanaKeys.push(relayerKeyPath)
  for (const key of solanaKeys) {
    const splits = key.split('/')
    let fileName = splits[splits.length - 1]
    fileName = homeDirectory.includes('/home/solv')
      ? fileName
      : fileName.replace('.json', `-${migrateIP}.json`)
    const filePath = `${keyDir}/${fileName}`
    const result = executeSCP(migrateIP, key, filePath, isDownload)
    if (result) {
      console.log(`Successfully Exported - ${filePath} 🎉`)
    }
  }
}
