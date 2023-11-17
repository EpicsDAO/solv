import {
  MAINNET_VALIDATOR_KEYFILE,
  SOLV_KEYPAIR_UPLOAD_PATH,
  TESTNET_VALIDATOR_KEYFILE,
  VALIDATOR_VOTE_KEYFILE,
  VALITATOR_AUTHORITY_KEYFILE,
} from '@/config'
import chalk from 'chalk'
import { spawnSync } from 'child_process'
import { existsSync } from 'fs'
import inquirer from 'inquirer'

export const upload = async () => {
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

  for (const key of solanaKeys) {
    const splits = key.split('/')
    const fileName = splits[splits.length - 1]
    const filePath = `${SOLV_KEYPAIR_UPLOAD_PATH}/${fileName}.json`
    if (!existsSync(filePath)) {
      console.log(chalk.red(`File Not Found - ${filePath} 🚨`))
      continue
    }
    const cmd = `scp ${filePath} solv@${answer.ip}:${key}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    console.log(`Successfully Uploaded - ${fileName} 🎉`)
  }
}
