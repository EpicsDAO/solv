import { spawnSync } from 'child_process'

export const createStakeAccount = (
  stakeKeypair: string,
  authorityKeypair: string,
  sol: number,
) => {
  const cmd = `solana create-stake-account ${stakeKeypair} ${sol} --keypair ${authorityKeypair}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
