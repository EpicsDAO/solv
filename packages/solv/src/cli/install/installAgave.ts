import { spawnSync } from 'node:child_process'

// Agave Install e.g. installAgave('0.1.0')
const installAgave = (version: string) => {
  spawnSync(
    `sh -c "$(curl -sSfL https://release.anza.xyz/v${version}/install)"`,
    {
      shell: true,
      stdio: 'inherit',
    },
  )
}

export default installAgave
