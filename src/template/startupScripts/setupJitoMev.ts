import { JITO_CONFIG } from '@/config/jitConfig'
import { spawnSync } from 'child_process'

export const setupJitoMev = () => {
  try {
    const TAG = `${JITO_CONFIG.tag}`
    spawnSync(`sudo apt-get update -y`, { shell: true, stdio: 'inherit' })
    spawnSync(
      `sudo apt-get install -y libssl-dev libudev-dev pkg-config zlib1g-dev llvm clang cmake make libprotobuf-dev protobuf-compiler`,
      { shell: true, stdio: 'inherit' },
    )
    spawnSync(`sh -c "$(curl -sSfL https://release.jito.wtf/${TAG}/install)"`, {
      shell: true,
      stdio: 'inherit',
    })
  } catch (error) {
    throw new Error(`Error in setupJitoMev: ${error}`)
  }
}

export const appendProfile = (line: string) => {
  const profilePath = '~/.profile'
  const cmd = `echo "${line}" >> ${profilePath}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
