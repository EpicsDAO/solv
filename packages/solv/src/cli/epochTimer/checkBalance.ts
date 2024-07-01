import { SOLANA_RPC_URL } from '@/index'
import getBalance, { KeyType } from '@/lib/solana/getBalance'
import { MINIMUM_VALIDATOR_BALANCE, getAllKeyPaths } from '@/config/config'
import { getSolanaAddress } from '@/lib/getSolanaAddress'
import { sendDiscord } from '@/lib/sendDiscord'

const checkBalance = async () => {
  const balance = await getBalance(SOLANA_RPC_URL, KeyType.VALIDATOR)
  if (balance < MINIMUM_VALIDATOR_BALANCE) {
    const { mainnetValidatorKey } = getAllKeyPaths()
    const address = getSolanaAddress(mainnetValidatorKey)
    const msg = `⚠️ Validator Account Balance is less than ${MINIMUM_VALIDATOR_BALANCE} SOL\nPlease top up your Validator Account\nAddress: ${address}`
    await sendDiscord(msg)
    return false
  }
  return true
}
export default checkBalance
