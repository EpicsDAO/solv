import { spawnSync } from 'child_process'

export const updateSolv = () => {
  const cmd = [`sudo apt update`]
  spawnSync(cmd.join(' && '), { shell: true, stdio: 'inherit' })
  const cmd2 = [`sudo apt -y install solv`]
  spawnSync(cmd2.join(' && '), { shell: true, stdio: 'inherit' })
}
