import {
  DEFAULT_SOLANA_NETWORK,
  MAINNET_VALIDATOR_KEYFILE,
  MAINNET_VALIDATOR_KEY_NAME,
  TESTNET_VALIDATOR_KEYFILE,
  TESTNET_VALIDATOR_KEY_NAME,
  VALIDATOR_VOTE_KEYFILE,
  VALIDATOR_VOTE_KEY_NAME,
  VALITATOR_AUTHORITY_KEYFILE,
  VALITATOR_AUTHORITY_KEY_NAME,
} from '@/config'
import { spawnSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import { airdrop } from './airdrop'
import chalk from 'chalk'
import os from 'os'

export const setupKeys = (commission = 10, isLocal = false) => {
  try {
    let authorityKey = VALITATOR_AUTHORITY_KEYFILE
    let voteKey = VALIDATOR_VOTE_KEYFILE
    let validatorTestnetKey = TESTNET_VALIDATOR_KEYFILE
    let validatorMainnetKey = MAINNET_VALIDATOR_KEYFILE
    const homeDirectory = os.userInfo().homedir
    const uploadDir = `${homeDirectory}/solvKeys/upload`
    if (isLocal) {
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true })
      }
      authorityKey = `${uploadDir}/${VALITATOR_AUTHORITY_KEY_NAME}`
      voteKey = `${uploadDir}/${VALIDATOR_VOTE_KEY_NAME}`
      validatorTestnetKey = `${uploadDir}/${TESTNET_VALIDATOR_KEY_NAME}`
      validatorMainnetKey = `${uploadDir}/${MAINNET_VALIDATOR_KEY_NAME}`
    }
    if (existsSync(authorityKey)) {
      console.log(
        chalk.yellow(
          '⚠️ Authority Key Already Exists\n\nPlease check `~/solvKeys/upload/` folder'
        )
      )
      return false
    }
    const cmds = [
      `solana-keygen new --no-bip39-passphrase --outfile ${authorityKey}`,
      `solana-keygen new --no-bip39-passphrase --outfile ${voteKey}`,
      `solana-keygen new --no-bip39-passphrase --outfile ${validatorTestnetKey}`,
      `solana-keygen new --no-bip39-passphrase --outfile ${validatorMainnetKey}`,
      `solana config set --keypair ${validatorTestnetKey}`,
      `solana config set --url ${DEFAULT_SOLANA_NETWORK}`,
      `solana airdrop 1`,
      `solana create-vote-account ${voteKey} ${validatorTestnetKey} ${authorityKey} --commission ${commission}`,
    ]
    for (const cmd of cmds) {
      if (cmd.includes('airdrop')) {
        airdrop()
        continue
      }
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    }
    return true
  } catch (error) {
    throw new Error(`setupKeys Error: ${error}`)
  }
}
