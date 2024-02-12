import chalk from 'chalk'
import { setupKeys } from './setupKeys'
import { isSolanaInstalled } from './setup'
import { Logger } from '@/lib/logger'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'

export const onlyGenKeys = async (config: ConfigParams) => {
  if (!isSolanaInstalled()) {
    Logger.normal(`Did you install solana CLI?\n\n${chalk.green(`$ solv i`)}`)
    return
  }
  console.log(chalk.white('Setting up Validator Keypairs ...'))
  setupKeys(config)
}
