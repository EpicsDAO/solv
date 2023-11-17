import { DEFAULT_SSH_PUBKEY_PATH } from '@/config'
import chalk from 'chalk'
import { spawnSync } from 'child_process'
import { existsSync } from 'fs'

export const cat = () => {
  if (!existsSync(DEFAULT_SSH_PUBKEY_PATH)) {
    console.log(chalk.white('SSH Public Key Not Found\n'))
    console.log(chalk.white('Please run `solv scp init` first'))
    return
  }
  const cmd = `cat ${DEFAULT_SSH_PUBKEY_PATH}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
