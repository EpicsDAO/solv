import { execAsync } from '@skeet-framework/utils'
import chalk from 'chalk'
import inquirer from 'inquirer'

export const updateFirewall = async () => {
  const answer = await inquirer.prompt<{ ip: string; isRelayer: boolean }>([
    {
      name: 'ip',
      type: 'input',
      message: 'Enter your IP address to allow access to RPC NODE:',
      default: '1.2.3.4',
    },
    {
      name: 'isRelayer',
      type: 'confirm',
      message: 'Do you want to add Jito Relayer?',
      default: false,
    },
  ])
  await execAsync(`sudo ufw delete allow 8899/udp`)
  await execAsync(`sudo ufw delete allow 8899/tcp`)
  await execAsync(`sudo ufw allow from ${answer.ip} to any port 8899 proto tcp`)
  await execAsync(`sudo ufw allow from ${answer.ip} to any port 8899 proto udp`)
  await execAsync(`sudo ufw reload`)
  if (answer.isRelayer) {
    await execAsync(`sudo ufw allow 11228/tcp`)
    await execAsync(`sudo ufw allow 11229/tcp`)
    await execAsync(`sudo ufw allow 11228/udp`)
    await execAsync(`sudo ufw allow 11228/udp`)
  }
  console.log(chalk.white('✔️ Firewall updated!'))
}
