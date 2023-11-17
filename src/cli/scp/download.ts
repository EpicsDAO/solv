import {
  MAINNET_VALIDATOR_KEYFILE,
  SOLV_KEYPAIR_DOWNLOAD_PATH,
  TESTNET_VALIDATOR_KEYFILE,
  VALIDATOR_VOTE_KEYFILE,
  VALITATOR_AUTHORITY_KEYFILE,
} from '@/config'
import { spawnSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import inquirer from 'inquirer'

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
  const solanaKeys = [
    TESTNET_VALIDATOR_KEYFILE,
    MAINNET_VALIDATOR_KEYFILE,
    VALIDATOR_VOTE_KEYFILE,
    VALITATOR_AUTHORITY_KEYFILE,
  ]

  if (!existsSync(SOLV_KEYPAIR_DOWNLOAD_PATH)) {
    mkdirSync(SOLV_KEYPAIR_DOWNLOAD_PATH, { recursive: true })
  }
  for (const key of solanaKeys) {
    const splits = key.split('/')
    const fileName = splits[splits.length - 1]
    const filePath = `${SOLV_KEYPAIR_DOWNLOAD_PATH}/${fileName}.json`
    const cmd = `scp solv@${answer.ip}:${key} ${filePath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    console.log(`Successfully Exported - ${filePath} 🎉`)
  }
}
