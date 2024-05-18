import { spawnSync } from 'child_process'

export const enableSolv = (hasRelayer = false) => {
  spawnSync('sudo systemctl enable solv', { shell: true, stdio: 'inherit' })
  if (hasRelayer) {
    spawnSync('sudo systemctl enable relayer', {
      shell: true,
      stdio: 'inherit',
    })
  }
}
