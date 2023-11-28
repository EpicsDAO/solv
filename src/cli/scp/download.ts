import {
  MAINNET_VALIDATOR_KEYFILE,
  TESTNET_VALIDATOR_KEYFILE,
  VALIDATOR_VOTE_KEYFILE,
  VALITATOR_AUTHORITY_KEYFILE,
} from '@/config'
import { spawnSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import inquirer from 'inquirer'
import os from 'os'

export const download = async () => {
  const homeDirectory = os.userInfo().homedir
  console.log(homeDirectory)
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
  const solanaKeys = [
    TESTNET_VALIDATOR_KEYFILE,
    MAINNET_VALIDATOR_KEYFILE,
    VALIDATOR_VOTE_KEYFILE,
    VALITATOR_AUTHORITY_KEYFILE,
  ]

  const dlPath = `${homeDirectory}/solvKeys/download`
  if (!existsSync(dlPath)) {
    mkdirSync(dlPath, { recursive: true })
  }
  for (const key of solanaKeys) {
    const splits = key.split('/')
    const fileName = splits[splits.length - 1]
    const filePath = `${dlPath}/${fileName}`
    const cmd = `scp solv@${answer.ip}:${key} ${filePath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    console.log(`Successfully Exported - ${filePath} 🎉`)
  }
}
