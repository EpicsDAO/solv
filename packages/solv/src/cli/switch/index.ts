import { Command } from 'commander'
import inquirer from 'inquirer'
import { changeIdentityIncoming } from './changeIdentityIncoming'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { NETWORK_TYPES } from '@/config/config'
import { getSolanaAddress } from '@/lib/getSolanaAddress'
import {
  MAINNET_VALIDATOR_KEY_PATH,
  TESTNET_VALIDATOR_KEY_PATH,
} from '@/config/constants'
import { changeIdentityOutgoing } from './changeIdentityOutgoing'
import { checkSSHConnection } from '../scp/checkSSHConnection'
import chalk from 'chalk'

type SwitchType = 'Incoming' | 'Outgoing' | ''
const SWITCH_TYPES: SwitchType[] = ['Incoming', 'Outgoing']

type SwitchOptions = {
  switchType: SwitchType
  ip: string
}

export const switchCommand = async (program: Command, config: ConfigParams) => {
  program
    .command('switch')
    .option('--ip <ip>', 'IP Address of the New Validator', '')
    .option('--switchType <switchType>', 'Switch Type', '')
    .description('Switch Validator Identity with No Downtime(Mainnet Only)')
    .action(async (options: SwitchOptions) => {
      const isTestnet = config.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
      const keyPath = isTestnet
        ? TESTNET_VALIDATOR_KEY_PATH
        : MAINNET_VALIDATOR_KEY_PATH
      const pubkey = getSolanaAddress(keyPath)
      let switchType = options.switchType
      let ip = options.ip
      if (switchType === '' || ip === '') {
        const answer = await inquirer.prompt<{
          switchType: SwitchType
          ip: string
        }>([
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
            default() {
              return '1.1.1.1'
            },
          },
        ])
        switchType = answer.switchType
        ip = answer.ip
      }
      if (!SWITCH_TYPES.includes(switchType)) {
        console.log(
          chalk.yellow(
            '⚠️ Invalid Switch Type\nYou can choose only Incoming or Outgoing',
          ),
        )
        return
      }

      const result = checkSSHConnection(ip)
      if (!result) {
        console.log('SSH Connection Failed')
        return
      }
      if (switchType === 'Incoming') {
        await changeIdentityIncoming(ip, pubkey, isTestnet)
      } else {
        await changeIdentityOutgoing(ip, pubkey, isTestnet)
      }
    })
}
