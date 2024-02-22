import chalk from 'chalk'
import { readFileSync } from 'fs'
import os from 'os'

export const cat = () => {
  try {
    const homeDirectory = os.userInfo().homedir
    const publicKeyPath = `${homeDirectory}/.ssh/id_rsa.pub`
    const publicKey = readFileSync(publicKeyPath, 'utf8')
    console.log(chalk.white('Your SSH Public Key is:\n'))
    console.log(chalk.white(publicKey))
  } catch (error) {
    console.error(chalk.white('Error reading SSH Public Key\n'))
    console.error(chalk.white(error))
  }
}
