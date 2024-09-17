import { spawnSync } from 'node:child_process'

export const createStakeAccount = (
  stakeKeypair: string,
  sol: number,
  retryLimit: number = 5, // リトライの最大回数を設定
): boolean => {
  let attempt = 0
  while (attempt < retryLimit) {
    const result = spawnSync(
      `solana create-stake-account ${stakeKeypair} ${sol}`,
      { shell: true, stdio: 'pipe' },
    )
    const output = result.stdout.toString() + result.stderr.toString()

    if (output.includes('Signature:')) {
      console.log('Stake account created successfully:', output)
      return true
    } else if (output.includes('Error:')) {
      console.log('Error encountered:', output)
      attempt++
      console.log(`Retrying... (${attempt}/${retryLimit})`)
    } else {
      console.log('Unknown output:', output)
      break
    }

    if (attempt === retryLimit) {
      console.log('Failed to create stake account after retries.')
    }
  }

  return false
}
