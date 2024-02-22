import { spawnSync } from 'child_process'

export const delegateStake = async (
  stakeAccountPubkey: string,
  validatorVoteAccountPubkey: string,
  authorityKeyPath = '~/mainnet-validator-keypair.json',
) => {
  try {
    const cmd = [
      `solana delegate-stake ${stakeAccountPubkey} ${validatorVoteAccountPubkey} --stake-authority ${authorityKeyPath} --url mainnet-beta`,
    ]
    spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`delegateStake: ${error}`)
  }
}
