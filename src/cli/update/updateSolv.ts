import { spawnSync } from 'child_process'

export const updateSolv = () => {
  const cmd = `npm i -g @epics-dao/solv`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
