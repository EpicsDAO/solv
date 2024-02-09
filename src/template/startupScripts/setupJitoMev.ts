import { updateJitoSolanaPath } from '@/cli/setup/updateJitoSolanaPath'
import { JITO_CONFIG } from '@/config/jitConfig'
import { spawnSync } from 'child_process'

export const setupJitoMev = () => {
  try {
    const TAG = `${JITO_CONFIG.tag}`
    spawnSync(`export TAG=${TAG}`, { shell: true, stdio: 'inherit' })
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
      `CI_COMMIT=$(git rev-parse HEAD) scripts/cargo-install-all.sh --validator-only ~/.local/share/solana/install/releases/${TAG}`,
      { cwd: 'jito-solana', shell: true, stdio: 'inherit' },
    )
    updateJitoSolanaPath()
  } catch (error) {
    throw new Error(`Error in setupJitoMev: ${error}`)
  }
}

export const appendProfile = (line: string) => {
  const profilePath = '~/.profile'
  const cmd = `echo "${line}" >> ${profilePath}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
