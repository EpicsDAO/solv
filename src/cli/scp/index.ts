import {
  MAINNET_VALIDATOR_KEYFILE,
  TESTNET_VALIDATOR_KEYFILE,
  VALIDATOR_VOTE_KEYFILE,
  VALITATOR_AUTHORITY_KEYFILE,
} from '@/config'
import { program } from '@/index'
import { spawnSync } from 'child_process'
import inquirer from 'inquirer'

export const scpCommands = () => {
  const scp = program.command('scp').description('Export Solana Validator Data')

  scp
    .command('keypair')
    .alias('k')
    .description('Export Solana Validator Keypair')
    .action(async () => {
      const answer = await inquirer.prompt<{ username: string; ip: string }>([
        {
          type: 'input',
          name: 'username',
          message: 'Enter your Ubuntu Server Username',
          default() {
            return 'solv'
          },
        },
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
      for (const key of solanaKeys) {
        const splits = key.split('/')
        const fileName = splits[splits.length - 1]
        const cmd = `scp ${answer.username}@${answer.ip}:${key} ./${fileName}.json`
        spawnSync(cmd, { shell: true, stdio: 'inherit' })
        console.log(`Successfully Exported - ${fileName} 🎉`)
      }
    })
}
