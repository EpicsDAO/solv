import { VERSION_JITO_TESTNET } from '@/config/versionConfig'
import { spawnSync } from 'child_process'

export const installJito = (version = VERSION_JITO_TESTNET) => {
  const tag = `v${version}-jito`
  spawnSync(`sh -c "$(curl -sSfL https://release.jito.wtf/${tag}/install)"`, {
    shell: true,
    stdio: 'inherit',
  })
}
