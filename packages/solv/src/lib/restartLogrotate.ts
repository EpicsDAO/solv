import { spawnSync } from 'child_process'

export const restartLogrotate = () => {
  spawnSync('sudo systemctl restart logrotate', {
    shell: true,
    stdio: 'inherit',
  })
}
