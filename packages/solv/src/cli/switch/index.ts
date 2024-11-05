import { Command } from 'commander'
import inquirer from 'inquirer'
import { changeIdentityIncoming } from './changeIdentityIncoming'
import { getSolanaAddress } from '@/lib/getSolanaAddress'
import {
  MAINNET_VALIDATOR_KEY_PATH,
  TESTNET_VALIDATOR_KEY_PATH,
} from '@/config/constants'
import { changeIdentityOutgoing } from './changeIdentityOutgoing'
import { checkSSHConnection } from '../scp/checkSSHConnection'
import chalk from 'chalk'
import { DefaultConfigType } from '@/config/types'
import { Network, NodeType } from '@/config/enums'
import { changeIdentityIncomingV1toV2 } from './changeIdentityIncomingV1toV2'

type SwitchType = 'Incoming' | 'Outgoing' | ''
const SWITCH_TYPES: SwitchType[] = ['Incoming', 'Outgoing']

type SwitchOptions = {
  switchType: SwitchType
  ip: string
  v2MigrateIncoming: boolean
}

export const switchCommand = async (
  program: Command,
  config: DefaultConfigType,
) => {
  program
    .command('switch')
    .option('--ip <ip>', 'IP Address of the New Validator', '')
    .option('--switchType <switchType>', 'Switch Type', '')
    .option('--v2-migrate-incoming', 'Switch V1 to V2 Incoming', false)
    .description('Switch Validator Identity with No Downtime')
    .action(async (options: SwitchOptions) => {
      try {
        const isTestnet = config.NETWORK === Network.TESTNET
        const isRPC = config.NODE_TYPE === NodeType.RPC
        let keyPath = isTestnet
          ? TESTNET_VALIDATOR_KEY_PATH
          : MAINNET_VALIDATOR_KEY_PATH

        if (isRPC) {
          keyPath = TESTNET_VALIDATOR_KEY_PATH
        }

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
              message: 'Which switch type do you want to perform?',
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
          if (options.v2MigrateIncoming) {
            const confirm = await inquirer.prompt<{ confirm: boolean }>([
              {
                name: 'confirm',
                type: 'confirm',
                message:
                  'Are you sure you want to migrate V1 to V2 Incoming? This node must be running V2 and the remote node must be running V1.',
              },
            ])
            if (!confirm.confirm) {
              console.log(chalk.cyan(`Exiting...🌛`))
              process.exit(0)
            }
            console.log(chalk.white('🟢 Migrating V1 to V2 Incoming...'))
            await changeIdentityIncomingV1toV2(ip, pubkey, config)
            return
          }
          await changeIdentityIncoming(ip, pubkey, config)
        } else {
          await changeIdentityOutgoing(ip, pubkey, config)
        }
        process.exit(0)
      } catch (error: any) {
        if (error.message.includes('User force closed the prompt')) {
          console.error(chalk.cyan(`Exiting...🌛`))
          process.exit(0)
        }
        console.error(chalk.red(`Switch Error: ${error.message}`))
        process.exit(0)
      }
    })
}
