import { spawnSync } from 'child_process'

export const updateSolv = () => {
  spawnSync('pnpm add -g pnpm', { shell: true, stdio: 'inherit' })
  const cmd = `pnpm add -g @epics-dao/solv`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
