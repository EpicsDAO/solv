import { spawnSync } from 'child_process'

export const getSolBalance = (keyPath: string) => {
  const cmd = `solana balance --keypair ${keyPath}`
  const { stdout } = spawnSync(cmd, { shell: true, stdio: 'pipe' })
  const balance = stdout.toString().trim()
  return balance
}
