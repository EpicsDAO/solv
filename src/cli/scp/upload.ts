import { getAllKeyPaths } from '@/config/config'
import { SOLV_CLIENT_PATHS } from '@/config/solvClient'
import chalk from 'chalk'
import { spawnSync } from 'child_process'
import { existsSync } from 'fs'
import inquirer from 'inquirer'
import os from 'os'

export const upload = async () => {
  const homeDirectory = os.userInfo().homedir
  const text = `Please make sure your keypair names has the IP address of your server in the name.
Dir: ~/solvKeys/upload/
Example: testnet-validator-keypair-1.1.1.1.json
         testnet-vote-keypair-1.1.1.1.json
         testnet-authority-keypair-1.1.1.1.json
  `
  console.log(text)
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

  const uploadPath = `${homeDirectory}${SOLV_CLIENT_PATHS.SOLV_KEYPAIR_UPLOAD_PATH}`
  for (const key of solanaKeys) {
    const splits = key.split('/')
    let fileName = splits[splits.length - 1]
    fileName = fileName.replace('.json', `-${answer.ip}.json`)
    const filePath = `${uploadPath}/${fileName}`
    if (!existsSync(filePath)) {
      continue
    }
    const cmd = `scp ${filePath} solv@${answer.ip}:${key}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    console.log(`Successfully Uploaded - ${fileName} 🎉`)
  }
}
