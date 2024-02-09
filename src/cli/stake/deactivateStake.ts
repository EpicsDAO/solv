import { spawnSync } from 'child_process'

export const deactivateStake = async (
  stakeAccountPubkey: string,
  authorityKeyPath = '~/mainnet-validator-keypair.json',
) => {
  try {
    const cmd = `solana deactivate-stake ${stakeAccountPubkey} --stake-authority ${authorityKeyPath}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`deactivateStake: ${error}`)
  }
}
