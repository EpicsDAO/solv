import { execSync, spawnSync } from 'child_process'
import { setupDirs } from './mkdirs'
import { setupKeys } from './setupKeys'
import { setupSwap } from './setupSwap'
import { startValidator } from './startValidator'
import { Logger } from '@/lib/logger'
import chalk from 'chalk'

export const setup = (options = { swap: false, fileSystem: '/dev/vdb' }) => {
  try {
    if (!isSolanaInstalled()) {
      Logger.normal(
        `Did you forget to restart your terminal?\n\n${chalk.green(
          `$ source ~/.profile`
        )}`
      )
      return
    }
    const chown = `sudo chown -R solv:solv /mt && sudo chmod -R 755 /mt`
    spawnSync(chown, { shell: true, stdio: 'inherit' })
    startValidator()
    setupDirs()
    setupKeys()
    if (options.swap) setupSwap(options.fileSystem)
    const cmd = [
      'sudo systemctl daemon-reload',
      'sudo systemctl enable sol',
      'sudo systemctl restart logrotate',
    ]
    spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`setup Error: ${error}`)
  }
}

function isSolanaInstalled() {
  try {
    execSync('solana --version')
    return true
  } catch (error) {
    return false
  }
}
