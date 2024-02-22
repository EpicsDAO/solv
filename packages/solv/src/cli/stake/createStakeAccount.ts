import { spawnSync } from 'child_process'

export const createStakeAccount = (authorityKeyPath: string, sol: number) => {
  const cmd = `solana create-stake-account ${authorityKeyPath} ${sol}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
