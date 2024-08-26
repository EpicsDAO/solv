import getBalance, { KeyType } from '@/lib/solana/getBalance'
import {
  MINIMUM_VALIDATOR_BALANCE,
  NETWORK_TYPES,
  getAllKeyPaths,
} from '@/config/config'
import { getSolanaAddress } from '@/lib/getSolanaAddress'
import { sendDiscord } from '@/lib/sendDiscord'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import chalk from 'chalk'
import { SOLANA_TESTNET_RPC_URL } from '@/config/constants'

const checkBalance = async (solvConfig: ConfigParams) => {
  let rpcUrl = solvConfig.config.RPC_URL
  const isTestnet = solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
  if (isTestnet) {
    rpcUrl = SOLANA_TESTNET_RPC_URL
  }
  const balance = await getBalance(rpcUrl, KeyType.VALIDATOR, isTestnet)
  if (balance < MINIMUM_VALIDATOR_BALANCE) {
    const { mainnetValidatorKey, testnetValidatorKey } = getAllKeyPaths()
    const address = isTestnet
      ? getSolanaAddress(testnetValidatorKey)
      : getSolanaAddress(mainnetValidatorKey)
    const msg = `⚠️ Validator Account Balance is less than ${MINIMUM_VALIDATOR_BALANCE} SOL\nPlease top up your Validator Account\nAddress: ${address}`
    await sendDiscord(msg)
    return false
  }
  console.log(chalk.green('✔️ Validator Account Balance is sufficient'))
  return true
}
export default checkBalance
