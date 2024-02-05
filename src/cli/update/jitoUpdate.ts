import { JITO_CONFIG } from '@/config/jitConfig'
import { spawnSync } from 'child_process'
import { setupSolvService } from '../setup/setupSolvService'
import { SERVICE_PATHS } from '@/config/config'
import { daemonReload } from '@/lib/daemonReload'

export const jitoUpdate = async () => {
  const TAG = `${JITO_CONFIG.tag}`
  spawnSync(`export TAG=${TAG}`, { shell: true, stdio: 'inherit' })
  spawnSync(`git pull`, {
    cwd: '/home/solv/jito-solana',
    shell: true,
    stdio: 'inherit',
  })
  spawnSync(`git checkout tags/${TAG}`, {
    cwd: '/home/solv/jito-solana',
    shell: true,
    stdio: 'inherit',
  })
  spawnSync(`git submodule update --init --recursive`, {
    cwd: '/home/solv/jito-solana',
    shell: true,
    stdio: 'inherit',
  })
  spawnSync(
    `CI_COMMIT=$(git rev-parse HEAD) scripts/cargo-install-all.sh --validator-only ~/.local/share/solana/install/releases/${TAG}`,
    { cwd: '/home/solv/jito-solana', shell: true, stdio: 'inherit' },
  )
  spawnSync(`sudo rm -rf ${SERVICE_PATHS.SOL_SERVICE}`, {
    shell: true,
    stdio: 'inherit',
  })
  setupSolvService(false, true)
  daemonReload()
}
