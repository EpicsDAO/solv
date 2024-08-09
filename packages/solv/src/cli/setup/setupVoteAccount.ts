import { NETWORK_TYPES, SOLV_TYPES, getAllKeyPaths } from '@/config/config'
import { ConfigParams } from '@/lib/readOrCreateDefaultConfig'
import { spawnSync } from 'child_process'
import { homedir } from 'os'

export const setupVoteAccount = (solvConfig: ConfigParams) => {
  const homeDir = homedir()
  const allKeyPaths = getAllKeyPaths(homeDir)
  let validatorVoteKey = allKeyPaths.testnetValidatorVoteKey
  let validatorKey = allKeyPaths.testnetValidatorKey
  let validatorAuthorityKey = allKeyPaths.testnetValidatorAuthorityKey
  let network = NETWORK_TYPES.TESTNET
  const commision = solvConfig.config.COMMISSION

  if (solvConfig.config.SOLV_TYPE === SOLV_TYPES.MAINNET_VALIDATOR) {
    validatorVoteKey = allKeyPaths.mainnetValidatorVoteKey
    validatorKey = allKeyPaths.mainnetValidatorKey
    validatorAuthorityKey = allKeyPaths.mainnetValidatorAuthorityKey
    network = NETWORK_TYPES.MAINNET
  }

  console.log(
    `⌛️ Creating vote account with commission ${commision} - ${network}`,
  )
  const cmd = `solana create-vote-account ${validatorVoteKey} ${validatorKey} ${validatorAuthorityKey} --commission ${commision}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
