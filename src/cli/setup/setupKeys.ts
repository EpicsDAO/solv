import {
  DEFAULT_VALIDATOR_KEYFILE,
  VALIDATOR_VOTE_KEYFILE,
  VALITATOR_AUTHORITY_KEYFILE,
} from '@/index'
import { spawnSync } from 'child_process'

export const setupKeys = async () => {
  try {
    const cmds = [
      `solana-keygen new --no-bip39-passphrase --outfile ${VALITATOR_AUTHORITY_KEYFILE}`,
      `solana-keygen new --no-bip39-passphrase --outfile ${VALIDATOR_VOTE_KEYFILE}`,
      `solana-keygen new --no-bip39-passphrase --outfile ${DEFAULT_VALIDATOR_KEYFILE}`,
      `solana create-vote-account ${VALIDATOR_VOTE_KEYFILE} ${DEFAULT_VALIDATOR_KEYFILE} ${VALITATOR_AUTHORITY_KEYFILE} --commission 10`,
    ]
    cmds.forEach((cmd) => {
      spawnSync(cmd, { shell: true, stdio: 'inherit' })
    })
    return true
  } catch (error) {
    throw new Error(`setupKeys Error: ${error}`)
  }
}
