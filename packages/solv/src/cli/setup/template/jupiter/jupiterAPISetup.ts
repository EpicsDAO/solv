import { spawnSync } from 'child_process'
import jupiterAPIService from '@/cli/setup/template/jupiter/jupiterAPIService'
import inquirer from 'inquirer'
import chalk from 'chalk'
import rpcLog from '@/utils/rpcLog'

type JupiterAPISetupOptions = {
  rpcUrl: string
  grpcUrl: string
  grpcToken: string
}

const jupiterAPISetup = async () => {
  const questions = await inquirer.prompt<JupiterAPISetupOptions>([
    {
      name: 'rpcUrl',
      message: 'Enter RPC URL',
      type: 'input',
      default: 'http://localhost:8899',
    },
    {
      name: 'grpcUrl',
      message: 'Enter GRPC URL',
      type: 'input',
      default: 'http://localhost:10000',
    },
    {
      name: 'grpcToken',
      message: 'Enter GRPC Token',
      type: 'input',
      default: 'token',
    },
  ])
  const cmd = `sudo apt-get install unzip wget -y
wget https://github.com/jup-ag/jupiter-swap-api/releases/download/v6.0.25/jupiter-swap-api-x86_64-unknown-linux-gnu.zip
unzip jupiter-swap-api-x86_64-unknown-linux-gnu.zip
chmod +x jupiter-swap-api
rm jupiter-swap-api-x86_64-unknown-linux-gnu.zip`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
  const { filePath, body } = jupiterAPIService(
    questions.rpcUrl,
    questions.grpcUrl,
    questions.grpcToken,
  )
  spawnSync(`echo '${body}' | sudo tee ${filePath}`, {
    shell: true,
    stdio: 'inherit',
  })
  console.log(
    chalk.white('🟢 Jupiter Swap API Setup Completed\n\n$ solv jupiter --help'),
  )
}

export default jupiterAPISetup
