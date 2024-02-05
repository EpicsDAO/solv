import { JITO_CONFIG } from '@/config/jitConfig'
import { spawnSync } from 'child_process'

export const setupJitoMev = () => {
  try {
    const TAG = `${JITO_CONFIG.tag}`
    appendProfile(`export TAG=${TAG}`)
    spawnSync(`sudo apt-get update -y`, { shell: true, stdio: 'inherit' })
    spawnSync(
      `sudo apt-get install -y libssl-dev libudev-dev pkg-config zlib1g-dev llvm clang cmake make libprotobuf-dev protobuf-compiler`,
      { shell: true, stdio: 'inherit' },
    )
    spawnSync(
      `git clone https://github.com/jito-foundation/jito-solana.git --recurse-submodules`,
      { shell: true, stdio: 'inherit' },
    )
    spawnSync(`git checkout tags/${TAG}`, {
      cwd: 'jito-solana',
      shell: true,
      stdio: 'inherit',
    })
    spawnSync(`git submodule update --init --recursive`, {
      cwd: 'jito-solana',
      shell: true,
      stdio: 'inherit',
    })
    spawnSync(
      `CI_COMMIT=$(git rev-parse HEAD) scripts/cargo-install-all.sh --validator-only ~/.local/share/solana/install/releases/"$TAG"`,
      { cwd: 'jito-solana', shell: true, stdio: 'inherit' },
    )
    appendProfile(
      'export PATH="$HOME/.local/share/solana/install/releases/' +
        TAG +
        '/bin:\\$PATH"',
    )
    const CI_COMMIT = spawnSync('git rev-parse HEAD', {
      cwd: 'jito-solana',
      shell: true,
    }).stdout.toString()
    appendProfile('export CI_COMMIT=' + CI_COMMIT)
  } catch (error) {
    throw new Error(`Error in setupJitoMev: ${error}`)
  }
}

const appendProfile = (line: string) => {
  const profilePath = '~/.profile'
  const cmd = `echo "${line}" >> ${profilePath}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
