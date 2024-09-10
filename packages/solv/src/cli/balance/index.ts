import { program } from '@/index'
import { splBalance } from '@/lib/solana/splBalance'
import { homedir } from 'os'
import { DefaultConfigType } from '@/config/types'
import { getAllKeyPaths } from '@/config/config'
import { getSolBalance } from '@/lib/getSolBalance'
import { getSolanaAddress } from '@/lib/getSolanaAddress'
import { Network, NodeType } from '@/config/enums'
import chalk from 'chalk'
import { spawnSync } from 'node:child_process'
import { IDENTITY_KEY_PATH } from '@/config/constants'

export type BalanceOptions = {
  spl: boolean
}

export const balanceCommands = (config: DefaultConfigType) => {
  program
    .command('balance')
    .alias('bal')
    .alias('b')
    .option('-s, --spl', 'Show SPL Token Balance', false)
    .description('Show Keypairs Balance')
    .action(async (options: BalanceOptions) => {
      if (options.spl) {
        const defaultKey = 'mainnet-authority-keypair.json'
        const keyPath = `${homedir()}/${defaultKey}`
        await splBalance(keyPath)
        process.exit(0)
      }
      await showKeypairsInfo(config)
      process.exit(0)
    })
}

const showKeypairsInfo = async (config: DefaultConfigType) => {
  const keyInfo = getKeypairsInfo(config)
  const output = `Validator Key: ${keyInfo.validatorKey}
Address: ${keyInfo.validatorKeyAddress}
Balance: ${keyInfo.validatorKeyBalance}
Vote Key: ${keyInfo.voteKey} 
Address: ${keyInfo.voteKeyAddress}
Balance: ${keyInfo.voteKeyBalance}
Authority Key: ${keyInfo.authorityKey}
Address: ${keyInfo.authorityKeyAddress}
Balance: ${keyInfo.authorityKeyBalance}
Active Identity:`
  console.log(chalk.white(output))
  spawnSync(`solana-keygen pubkey ${IDENTITY_KEY_PATH}`, {
    stdio: 'inherit',
    shell: true,
  })
}

export const getKeypairsInfo = (config: DefaultConfigType) => {
  const keypairs = getAllKeyPaths()
  const isTestnet = config.NETWORK === Network.TESTNET
  const isRPC = config.NODE_TYPE === NodeType.RPC

  if (isRPC) {
    return {
      validatorKey: keypairs.mainnetValidatorKey,
      validatorKeyAddress: getSolanaAddress(keypairs.mainnetValidatorKey),
      validatorKeyBalance: getSolBalance(keypairs.mainnetValidatorKey),
    }
  }

  if (isTestnet) {
    return {
      validatorKey: keypairs.testnetValidatorKey,
      validatorKeyAddress: getSolanaAddress(keypairs.testnetValidatorKey),
      validatorKeyBalance: getSolBalance(keypairs.testnetValidatorKey),
      voteKey: keypairs.testnetValidatorVoteKey,
      voteKeyAddress: getSolanaAddress(keypairs.testnetValidatorVoteKey),
      voteKeyBalance: getSolBalance(keypairs.testnetValidatorVoteKey),
      authorityKey: keypairs.testnetValidatorAuthorityKey,
      authorityKeyAddress: getSolanaAddress(
        keypairs.testnetValidatorAuthorityKey,
      ),
      authorityKeyBalance: getSolBalance(keypairs.testnetValidatorAuthorityKey),
    }
  }

  return {
    validatorKey: keypairs.mainnetValidatorKey,
    validatorKeyAddress: getSolanaAddress(keypairs.mainnetValidatorKey),
    validatorKeyBalance: getSolBalance(keypairs.mainnetValidatorKey),
    voteKey: keypairs.mainnetValidatorVoteKey,
    voteKeyAddress: getSolanaAddress(keypairs.mainnetValidatorVoteKey),
    voteKeyBalance: getSolBalance(keypairs.mainnetValidatorVoteKey),
    authorityKey: keypairs.mainnetValidatorAuthorityKey,
    authorityKeyAddress: getSolanaAddress(
      keypairs.mainnetValidatorAuthorityKey,
    ),
    authorityKeyBalance: getSolBalance(keypairs.mainnetValidatorAuthorityKey),
  }
}
