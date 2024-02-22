import { spawnSync } from 'child_process'

export const getSolanaAddress = (keypath: string) => {
  const cmd = `solana address --keypair ${keypath}`
  const { stdout } = spawnSync(cmd, { shell: true, stdio: 'pipe' })
  const address = stdout.toString().trim()
  return address
}
