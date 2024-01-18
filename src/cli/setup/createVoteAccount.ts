import {
  CONFIG,
  KEYPAIRS,
  NETWORK_TYPES,
  getAllKeyPaths,
} from '@/config/config'
import chalk from 'chalk'
import { spawnSync } from 'child_process'

export const createVoteAccount = (
  commission = CONFIG.COMMISSION,
  isTest = true,
) => {
  const keypairs = getAllKeyPaths()
  const validatorVoteKey = isTest
    ? keypairs.testnetValidatorVoteKey
    : keypairs.mainnetValidatorVoteKey
  const validatorKey = isTest
    ? keypairs.testnetValidatorKey
    : keypairs.mainnetValidatorKey
  const validatorAuthorityKey = isTest
    ? keypairs.testnetValidatorAuthorityKey
    : keypairs.mainnetValidatorAuthorityKey
  const network = isTest ? NETWORK_TYPES.TESTNET : NETWORK_TYPES.MAINNET
  const setNetwork = `solana config set --url https://api.${network}.solana.com`
  spawnSync(setNetwork, { shell: true, stdio: 'inherit' })
  console.log(
    `⌛️ Creating vote account with commission ${commission} - ${network}`,
  )
  const cmd = `solana create-vote-account ${validatorVoteKey} ${validatorKey} ${validatorAuthorityKey} --commission ${commission}`
  const { stderr } = spawnSync(cmd, { shell: true, stdio: 'inherit' })
  if (stderr.includes('Error')) {
    const solanaPubkey = spawnSync(`solana address`, {
      shell: true,
      encoding: 'utf8',
    })
    console.log(
      chalk.yellow(
        `\n⚠️ Creating VoteAccount failed. Please get some SOL in your pubkey below:\n\n${chalk.white(
          solanaPubkey.stdout,
        )}\n`,
      ),
    )
    console.log(chalk.white(`and Try Again with this command;\n`))
    console.log(chalk.green(`$ solv setup --vote --network ${network}\n`))
    return false
  }
}
