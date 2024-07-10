import { isValidatorActive } from '@/cli/epochTimer/isValidatorActive'
import { getAllKeyPaths, NETWORK_TYPES } from '@/config/config'
import { SOLANA_RPC_URL } from '@/index'
import { getSolanaAddress } from '@/lib/getSolanaAddress'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import sleep from '@/lib/sleep'
import { sendDiscord } from '@skeet-framework/utils'

const MAX_RETRIES = 60

const waitCatchup = async (solvConfig: ConfigParams) => {
  try {
    const isTestnet = solvConfig.config.SOLANA_NETWORK === NETWORK_TYPES.TESTNET
    const { mainnetValidatorVoteKey, testnetValidatorVoteKey } =
      getAllKeyPaths()
    const validatorKey = isTestnet
      ? testnetValidatorVoteKey
      : mainnetValidatorVoteKey
    const validatorPubkey = getSolanaAddress(validatorKey)
    let result = await isValidatorActive(
      SOLANA_RPC_URL,
      validatorPubkey,
      isTestnet,
    )
    let retries = 0
    while (!result.isActive) {
      if (retries >= MAX_RETRIES) {
        console.log('Max retries reached, exiting...')
        const msg = `⚠️ Validator is not active for ${MAX_RETRIES} minutes!
Account: ${result.pubkey}
Reason: ${result.reason}
Message: Max retries reached, exiting catchup check...
         Please check your validator node 👷‍♀️`
        await sendDiscord(msg)
        return false
      }

      console.log('Waiting for validator to catch up...')
      // Wait for 1 minute
      await sleep(60 * 1000)
      result = await isValidatorActive(
        SOLANA_RPC_URL,
        validatorPubkey,
        isTestnet,
      )
      retries++
    }
    return true
  } catch (error) {
    console.log('Error in waitCatchup:', error)
    return false
  }
}

export default waitCatchup
