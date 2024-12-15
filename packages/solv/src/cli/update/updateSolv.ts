import { CONFIG } from '@/config/config'
import { spawnSync } from 'child_process'

export const updateSolv = () => {
  spawnSync('pnpm add -g pnpm', { shell: true, stdio: 'inherit' })
  const nodeVersion = CONFIG.NODE_VERSION
  spawnSync(`pnpm env use ${nodeVersion} --global`, {
    shell: true,
    stdio: 'inherit',
  })
  const cmd = `pnpm add -g @vsx-labs/solv`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
