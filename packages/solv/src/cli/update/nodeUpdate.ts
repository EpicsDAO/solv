import { CONFIG } from '@/config/config'
import { spawnSync } from 'child_process'

export const nodeUpdate = async () => {
  const cmd = `git -C /home/solv/.nodenv/plugins/node-build pull`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
  const cmd2 = `nodenv install ${CONFIG.NODE_VERSION}`
  spawnSync(cmd2, { shell: true, stdio: 'inherit' })
  const cmd3 = `nodenv local ${CONFIG.NODE_VERSION}`
  spawnSync(cmd3, { shell: true, stdio: 'inherit' })
  const cmd4 = `nodenv rehash`
  spawnSync(cmd4, { shell: true, stdio: 'inherit' })
}
