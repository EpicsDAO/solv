import { getAllKeyPaths } from '@/config/config'
import { SOLANA_RPC_URL } from '@/index'
import { execSync, spawnSync } from 'child_process'
import { homedir } from 'os'
import { getHarvestBalance } from './getHarvestBalance'
import getBalance, { KeyType } from '@/lib/solana/getBalance'

export const collectSOL = () => {
  const homeDir = homedir()
  const {
    mainnetValidatorAuthorityKey,
    mainnetValidatorKey,
    mainnetValidatorVoteKey,
  } = getAllKeyPaths(homeDir)
  // Check Vote Account Balance
  const voteAccountBalance = getBalance(KeyType.VOTE)

  if (voteAccountBalance < 1) {
    console.log('Vote Account Balance is less than 1 SOL')
    return
  }

  // Withdraw all SOL from Vote Account to Authority Account
  const cmd = `solv withdraw --all`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })

  // Check Validator Key Balance
  const validatorTransferableBalance = getHarvestBalance()

  // Transfer SOL from Validator Account to Authority Account
  const result = spawnSync(
    `solana transfer ${mainnetValidatorAuthorityKey} ${validatorTransferableBalance} --url ${SOLANA_RPC_URL} --keypair ${mainnetValidatorKey}`,
    { shell: true },
  )
  if (result.status !== 0) {
    throw new Error(
      'Failed to transfer SOL from Validator Account to Authority Account',
    )
  }
}
