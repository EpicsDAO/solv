import { KEYPAIRS } from '@/config/config'
import { SOLV_CLIENT_PATHS } from '@/config/solvClient'
import { spawnSync } from 'child_process'
import os from 'os'

export const delegateStake = async (
  stakeAccountPubkey: string,
  validatorVoteAccountPubkey: string,
  authorityAccountKeyfile = ''
) => {
  try {
    let authorityKeyPath = authorityAccountKeyfile
    if (authorityKeyPath === '') {
      const homeDirectory = os.userInfo().homedir
      const uploadPath = `${homeDirectory}/${SOLV_CLIENT_PATHS.SOLV_KEYPAIR_UPLOAD_PATH}`
      authorityKeyPath = `${uploadPath}/${KEYPAIRS.MAINNET_VALITATOR_AUTHORITY_KEY}`
    }
    const cmd = [
      `solana delegate-stake ${stakeAccountPubkey} ${validatorVoteAccountPubkey} --stake-authority ${authorityKeyPath} --url mainnet-beta`,
    ]
    spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`delegateStake: ${error}`)
  }
}
