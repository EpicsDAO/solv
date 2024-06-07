import { getAllKeyPaths } from '@/config/config'
import { SOLV_CLIENT_PATHS } from '@/config/solvClient'
import { spawnSync } from 'child_process'
import { existsSync } from 'fs'
import inquirer from 'inquirer'
import os from 'os'

export const upload = async () => {
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
  let keyPath = `${homeDirectory}${SOLV_CLIENT_PATHS.SOLV_KEYPAIR_UPLOAD_PATH}`
  if (homeDirectory.includes('/home/solv')) {
    keyPath = SOLV_CLIENT_PATHS.SOLV_KEYPAIR_UPLOAD_PATH_LINUX
  }
  const solanaKeys = Object.values(getAllKeyPaths(keyPath))

  for (const key of solanaKeys) {
    const splits = key.split('/')
    const fileName = splits[splits.length - 1]
    if (!fileName.endsWith('keypair.json')) {
      continue
    }
    const filePath = `${keyPath}/${fileName}`
    if (!existsSync(filePath)) {
      continue
    }
    const cmd = `scp -o StrictHostKeyChecking=no ${filePath} solv@${answer.ip}:${key}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    console.log(`Successfully Uploaded - ${fileName} 🎉`)
  }
}
