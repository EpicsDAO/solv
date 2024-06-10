import { JITO_CONFIG } from '@/config/jitConfig'
import { spawnSync } from 'child_process'

export const jitoUpdate = (tag = JITO_CONFIG.tag) => {
  spawnSync(`sh -c "$(curl -sSfL https://release.jito.wtf/${tag}/install)"`, {
    shell: true,
    stdio: 'inherit',
  })
}
