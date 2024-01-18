import { spawnSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'
import { airdrop } from './airdrop'
import os from 'os'
import { NETWORK_TYPES, getAllKeyPaths } from '@/config/config'
import { createVoteAccount } from './createVoteAccount'
import { SOLV_CLIENT_PATHS } from '@/config/solvClient'

export const setupKeys = (commission = 10, isLocal = false, isTest = true) => {
  try {
    let keypairs = getAllKeyPaths()
    if (isLocal) {
      const homeDirectory = os.userInfo().homedir
      const uploadDir = `${homeDirectory}${SOLV_CLIENT_PATHS.SOLV_KEYPAIR_UPLOAD_PATH}`
      if (!existsSync(uploadDir)) {
        mkdirSync(uploadDir, { recursive: true })
      }
      keypairs = getAllKeyPaths(uploadDir)
      const keyArray = Object.values(keypairs)
      createKeypairs(keyArray)
    } else {
      const keyArray = Object.values(keypairs)
      createKeypairs(keyArray)
    }
    const validatorKey = isTest
      ? keypairs.testnetValidatorKey
      : keypairs.mainnetValidatorKey
    const network = isTest ? NETWORK_TYPES.TESTNET : NETWORK_TYPES.MAINNET
    const cmds = [
      `solana config set --keypair ${validatorKey}`,
      `solana config set --url ${network}`,
      `solana airdrop 1`,
    ]
    console.log({ isTest })
    for (const cmd of cmds) {
      if (cmd.includes('airdrop') && isTest) {
        airdrop()
        continue
      }
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    }
    createVoteAccount(commission, isTest)
    return true
  } catch (error) {
    throw new Error(`setupKeys Error: ${error}`)
  }
}

const createKeypairs = (keyPaths: string[]) => {
  for (const path of keyPaths) {
    spawnSync(`solana-keygen new --no-bip39-passphrase --outfile ${path}`, {
      shell: true,
      stdio: 'inherit',
    })
  }
  return true
}
