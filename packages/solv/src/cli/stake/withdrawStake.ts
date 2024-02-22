import { spawnSync } from 'child_process'

export const withdrawStake = async (
  stakeAccountPubkey: string,
  destinationPubkey: string,
  amount: string, // 例: '0.5' SOL
) => {
  try {
    const cmd = `solana withdraw-stake ${stakeAccountPubkey} ${destinationPubkey} ${amount}`
    spawnSync(cmd, { shell: true, stdio: 'inherit' })
    return true
  } catch (error) {
    throw new Error(`withdrawStake: ${error}`)
  }
}
