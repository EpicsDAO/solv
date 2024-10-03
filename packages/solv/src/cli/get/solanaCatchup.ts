import { spawnSync } from 'node:child_process'

export const solanaCatchup = () => {
  const cmd = `solana catchup --our-localhost`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
