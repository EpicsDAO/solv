import { SOLV_TYPES } from '@/config/config'
import { getKeypairsInfo } from './getKeypairsInfo'
import chalk from 'chalk'
import { spawnSync } from 'node:child_process'

export const showKeypairsInfo = async (solvType: SOLV_TYPES) => {
  const keyInfo = getKeypairsInfo(solvType)
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
  spawnSync(`solana-keygen pubkey identity.json`, {
    stdio: 'inherit',
    shell: true,
  })
}
