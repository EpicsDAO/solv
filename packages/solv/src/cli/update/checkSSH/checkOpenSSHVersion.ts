import chalk from 'chalk'
import { execSync } from 'child_process'

const checkOpenSSHVersion = () => {
  const version = execSync('dpkg -l | grep openssh-server').toString()
  const collectVersion = '1:8.9p1-3ubuntu0.10'
  if (version.includes(collectVersion)) {
    console.log(chalk.green('OpenSSH is up to date 👍'))
    return true
  }
  console.log(chalk.red('⚠️ OpenSSH is not up to date'))
  return false
}

export default checkOpenSSHVersion
