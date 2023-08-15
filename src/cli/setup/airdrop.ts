import { spawnSync } from 'child_process'

export const airdrop = () => {
  try {
    const cmd = `solana airdrop 1`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
  } catch (error) {
    throw new Error(`airdrop Error: ${error}`)
  }
}
