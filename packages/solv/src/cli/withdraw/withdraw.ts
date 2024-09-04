import { SOLANA_TESTNET_RPC_URL } from '@/config/config'
import { Network } from '@/config/enums'
import { DefaultConfigType } from '@/config/types'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { execSync, spawnSync } from 'node:child_process'

export const withdraw = async (config: DefaultConfigType, isAll = false) => {
  const isTestnet = config.NETWORK === Network.TESTNET
  const RPC_URL = isTestnet ? SOLANA_TESTNET_RPC_URL : config.RPC_URL
  const validatorKeypair = isTestnet
    ? '~/testnet-validator-keypair.json'
    : '~/mainnet-validator-keypair.json'
  const authorityKeypair = isTestnet
    ? '~/testnet-authority-keypair.json'
    : '~/mainnet-authority-keypair.json'
  const voteAccount = isTestnet
    ? '~/testnet-vote-account-keypair.json'
    : '~/mainnet-vote-account-keypair.json'

  const currentVoteAccountBalance = execSync(`solana balance ${voteAccount}`)
    .toString()
    .replace('SOL', '')
    .trim()

  let withdrawAmount = 0
  const defaultMax = Number(currentVoteAccountBalance) - 0.03
  if (isAll) {
    withdrawAmount = defaultMax
  } else {
    console.log(
      chalk.white(
        '💰 Current Vote Account Balance:',
        currentVoteAccountBalance + ' SOL',
      ),
    )
    console.log(
      chalk.yellow(
        '⚠️ 0.03 SOL will be left in the account if you just press enter.',
      ),
    )
    const answer = await inquirer.prompt<{ sol: string }>([
      {
        type: 'input',
        name: 'sol',
        message: `How many SOL? e.g. ${defaultMax}`,
        default: String(defaultMax),
      },
    ])
    withdrawAmount = Number(answer.sol)
  }

  const votePubkey = execSync(`solana address --keypair ${voteAccount}`)
    .toString()
    .trim()
  const targetPubkey = execSync(`solana address --keypair ${authorityKeypair}`)
    .toString()
    .trim()
  const cmd = `solana withdraw-from-vote-account --keypair ${validatorKeypair} --commitment finalized ${votePubkey} ${targetPubkey} ${withdrawAmount} --authorized-withdrawer ${authorityKeypair} --url ${RPC_URL}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
