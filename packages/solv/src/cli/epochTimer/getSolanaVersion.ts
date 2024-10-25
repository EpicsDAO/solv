import { spawnSync } from 'node:child_process'

const getSolanaVersion = (): string => {
  const { stdout } = spawnSync('solana --version', { shell: true })
  const version = stdout ? String(stdout) : 'Unknown'
  return version.trim()
}

export default getSolanaVersion
