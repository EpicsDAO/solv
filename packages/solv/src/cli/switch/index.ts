import { Command } from 'commander'
import inquirer from 'inquirer'
import { changeIdentityIncoming } from './changeIdentityIncoming'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { NETWORK_TYPES } from '@/config/config'
import { getSolanaAddress } from '@/lib/getSolanaAddress'
import {
  MAINNET_VALIDATOR_KEY_PATH,
  TESTNET_VALIDATOR_KEY,
  TESTNET_VALIDATOR_KEY_PATH,
} from '@/config/constants'
import { changeIdentityOutgoing } from './changeIdentityOutgoing'
import { checkSSHConnection } from '../scp/checkSSHConnection'

export const switchCommand = async (program: Command, config: ConfigParams) => {
  program
    .command('switch')
    .description('Switch Validator Identity with No Downtime(Mainnet Only)')
    .action(async () => {
      const isTestnet = config.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
      const keyPath = isTestnet
        ? TESTNET_VALIDATOR_KEY_PATH
        : MAINNET_VALIDATOR_KEY_PATH
      const pubkey = getSolanaAddress(keyPath)
      const answer = await inquirer.prompt<{ switchType: string; ip: string }>([
        {
          name: 'switchType',
          type: 'list',
          message: 'Which switch type do you want to perform?※Mainnet Only',
          choices: ['Incoming', 'Outgoing'],
        },
        {
          name: 'ip',
          type: 'input',
          message: 'What is the IP address of the new validator?',
        },
      ])
      const result = checkSSHConnection(answer.ip)
      if (!result) {
        console.log('SSH Connection Failed')
        return
      }
      if (answer.switchType === 'Incoming') {
        await changeIdentityIncoming(answer.ip, pubkey)
      } else {
        await changeIdentityOutgoing(answer.ip, pubkey)
      }
    })
}
