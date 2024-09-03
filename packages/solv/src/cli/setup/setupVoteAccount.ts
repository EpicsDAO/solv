import { NETWORK_TYPES, getAllKeyPaths } from '@/config/config'
import { Network } from '@/config/enums'
import { DefaultConfigType } from '@/config/types'
import { spawnSync } from 'child_process'
import { homedir } from 'os'

export const setupVoteAccount = (config: DefaultConfigType) => {
  const homeDir = homedir()
  const allKeyPaths = getAllKeyPaths(homeDir)
  let validatorVoteKey = allKeyPaths.testnetValidatorVoteKey
  let validatorKey = allKeyPaths.testnetValidatorKey
  let validatorAuthorityKey = allKeyPaths.testnetValidatorAuthorityKey
  let network = NETWORK_TYPES.TESTNET
  const commision = config.COMMISSION

  if (config.NETWORK === Network.MAINNET) {
    validatorVoteKey = allKeyPaths.mainnetValidatorVoteKey
    validatorKey = allKeyPaths.mainnetValidatorKey
    validatorAuthorityKey = allKeyPaths.mainnetValidatorAuthorityKey
    network = NETWORK_TYPES.MAINNET
  }

  console.log(
    `⌛️ Creating vote account with commission ${commision} - ${network}`,
  )
  let url = config.RPC_URL || network
  if (config.NETWORK === Network.TESTNET) {
    url = NETWORK_TYPES.TESTNET
  }
  const cmd = `solana create-vote-account ${validatorVoteKey} ${validatorKey} ${validatorAuthorityKey} --commission ${commision} --url ${url} --keypair ${validatorKey}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
