import { spawnSync } from 'child_process'

export const delegateStake = async (
  stakeAccountPubkey: string,
  validatorVoteAccountPubkey: string,
  authorityAccountKeyfile = '/mt/solana/solana-validator/authority-keypair.json'
) => {
  try {
    const cmd = [
      `solana delegate-stake ${stakeAccountPubkey} ${validatorVoteAccountPubkey} --stake-authority ${authorityAccountKeyfile}`,
    ]
    spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`delegateStake Error: ${error}`)
  }
}
