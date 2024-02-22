import { spawnSync } from 'child_process'

export const updateSolv = () => {
  const cmd = `pnpm add -g @epics-dao/solv`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
