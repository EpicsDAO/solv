import { isValidatorActive } from '@/cli/epochTimer/isValidatorActive'
import { getAllKeyPaths } from '@/config/config'
import { Network } from '@/config/enums'
import { DefaultConfigType } from '@/config/types'
import { getSolanaAddress } from '@/lib/getSolanaAddress'
import sleep from '@/lib/sleep'
import { sendDiscord } from '@skeet-framework/utils'

const MAX_RETRIES = 60

const waitCatchup = async (config: DefaultConfigType) => {
  try {
    const isTestnet = config.NETWORK === Network.TESTNET
    const { mainnetValidatorVoteKey, testnetValidatorVoteKey } =
      getAllKeyPaths()
    const validatorKey = isTestnet
      ? testnetValidatorVoteKey
      : mainnetValidatorVoteKey
    const validatorPubkey = getSolanaAddress(validatorKey)
    let result = await isValidatorActive(
      config.RPC_URL,
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
        config.RPC_URL,
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
