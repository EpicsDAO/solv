import {
  SOLV_KEYPAIR_TRASH_PATH,
  SOLV_KEYPAIR_UPLOAD_PATH,
  validatorKeys,
  validatorLocalKeys,
} from '@/config'
import chalk from 'chalk'
import { spawnSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import inquirer from 'inquirer'
import { setupKeys } from './setupKeys'
import { isSolanaInstalled } from './setup'
import { Logger } from '@/lib/logger'

export const onlyGenKeys = async (commission = 10) => {
  if (!isSolanaInstalled()) {
    Logger.normal(`Did you install solana CLI?\n\n${chalk.green(`$ solv i`)}`)
    return
  }
  console.log(chalk.white('Setting up Validator Keypairs ...'))
  if (!existsSync(SOLV_KEYPAIR_UPLOAD_PATH)) {
    mkdirSync(SOLV_KEYPAIR_UPLOAD_PATH, { recursive: true })
  }
  setupKeys(commission, true)
}
