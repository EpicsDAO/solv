import {
  TESTNET_VALIDATOR_KEYFILE,
  VALIDATOR_VOTE_KEYFILE,
  VALITATOR_AUTHORITY_KEYFILE,
} from '@/config'
import { spawnSync } from 'child_process'

export const setupVoteAccount = (commission = 10) => {
  const cmd = `solana create-vote-account ${VALIDATOR_VOTE_KEYFILE} ${TESTNET_VALIDATOR_KEYFILE} ${VALITATOR_AUTHORITY_KEYFILE} --commission ${commission}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
