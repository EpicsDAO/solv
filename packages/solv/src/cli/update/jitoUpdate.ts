import { JITO_CONFIG } from '@/config/jitConfig'
import { spawnSync } from 'child_process'

export const jitoUpdate = async () => {
  const TAG = `${JITO_CONFIG.tag}`
  spawnSync(`sh -c "$(curl -sSfL https://release.jito.wtf/${TAG}/install)"`, {
    shell: true,
    stdio: 'inherit',
  })
}
