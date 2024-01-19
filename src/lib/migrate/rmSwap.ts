import { spawnSync } from 'child_process'

export const rmSwap = () => {
  const cmd = `sudo swapoff /mt/swapfile`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
  const cmd2 = `sudo rm /mt/swapfile`
  spawnSync(cmd2, { shell: true, stdio: 'inherit' })
}
