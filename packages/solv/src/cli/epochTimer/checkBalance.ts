import getBalance, { KeyType } from '@/lib/solana/getBalance'
import { MINIMUM_VALIDATOR_BALANCE, getAllKeyPaths } from '@/config/config'
import { getSolanaAddress } from '@/lib/getSolanaAddress'
import { sendDiscord } from '@/lib/sendDiscord'
import chalk from 'chalk'
import { SOLANA_TESTNET_RPC_URL } from '@/config/constants'
import { DefaultConfigType } from '@/config/types'
import { Network } from '@/config/enums'

const checkBalance = async (config: DefaultConfigType) => {
  let rpcUrl = config.RPC_URL
  const isTestnet = config.NETWORK === Network.TESTNET
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
