import { NETWORK_TYPES } from '@/config/config'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { execSync, spawnSync } from 'node:child_process'

export const withdraw = async (solvConfig: ConfigParams) => {
  const validatorKeypair =
    solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
      ? '~/testnet-validator-keypair.json'
      : '~/mainnet-validator-keypair.json'
  const authorityKeypair =
    solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
      ? '~/testnet-authority-keypair.json'
      : '~/mainnet-authority-keypair.json'
  const voteAccount =
    solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
      ? '~/testnet-vote-account-keypair.json'
      : '~/mainnet-vote-account-keypair.json'

  const currentVoteAccountBalance = execSync(`solana balance ${voteAccount}`)
    .toString()
    .replace('SOL', '')
    .trim()
  console.log(
    chalk.white(
      '💰 Current Vote Account Balance:',
      currentVoteAccountBalance + ' SOL',
    ),
  )
  console.log(
    chalk.yellow(
      '⚠️ 0.01 SOL will be left in the account if you just press enter.',
    ),
  )
  const defaultMax = Number(currentVoteAccountBalance) - 0.01
  const answer = await inquirer.prompt<{ sol: number }>([
    {
      type: 'input',
      name: 'sol',
      message: `How many SOL? e.g. ${defaultMax}`,
      default: defaultMax,
    },
  ])

  const votePubkey = execSync(`solana address --keypair ${voteAccount}`)
    .toString()
    .trim()
  const targetPubkey = execSync(`solana address --keypair ${authorityKeypair}`)
    .toString()
    .trim()
  const cmd = `solana withdraw-from-vote-account --keypair ${validatorKeypair} --commitment finalized ${votePubkey} ${targetPubkey} ${answer.sol} --authorized-withdrawer ${authorityKeypair}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
