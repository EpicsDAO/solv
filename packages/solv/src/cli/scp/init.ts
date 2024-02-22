import { spawnSync } from 'child_process'

export const init = () => {
  const cmd = 'ssh-keygen -t rsa -b 4096'
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
