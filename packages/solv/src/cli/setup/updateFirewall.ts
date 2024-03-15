import { execAsync } from '@skeet-framework/utils'
import chalk from 'chalk'
import inquirer from 'inquirer'

export const updateFirewall = async () => {
  const answer = await inquirer.prompt<{ ip: string }>([
    {
      name: 'ip',
      type: 'input',
      message: 'Enter your IP address to allow access to RPC NODE:',
      default: '0.0.0.0',
    },
  ])
  await execAsync(`sudo ufw delete allow 8899/udp`)
  await execAsync(`sudo ufw delete allow 8899/tcp`)
  await execAsync(`sudo ufw allow from ${answer.ip} to any port 8899 proto tcp`)
  await execAsync(`sudo ufw allow from ${answer.ip} to any port 8899 proto udp`)
  await execAsync(`sudo ufw reload`)
  console.log(chalk.white('✔️ Firewall updated!'))
}
