import { spawnSync } from 'node:child_process'

// Agave Install e.g. agaveInstall('0.1.0')
const agaveInstall = (version: string) => {
  spawnSync(
    `sh -c "$(curl -sSfL https://release.anza.xyz/v${version}/install)"`,
    {
      shell: true,
      stdio: 'inherit',
    },
  )
}

export default agaveInstall
