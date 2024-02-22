import { spawnSync } from 'child_process'

export const rmLogs = () => {
  const cmd = `sudo rm -rf /home/solv/solana-validator.log.*`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
