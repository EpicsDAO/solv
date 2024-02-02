import { spawnSync } from 'child_process'

export const setupJitoMev = () => {
  try {
    const TAG = '1.17.18'
    spawnSync(`curl https://sh.rustup.rs -sSf | sh -s -- -y`, {
      shell: true,
      stdio: 'inherit',
    })
    spawnSync(`source $HOME/.cargo/env`, { shell: true, stdio: 'inherit' })
    appendProfile('export PATH="$HOME/.cargo/bin:$PATH"')
    spawnSync(`rustup component add rustfmt`, { shell: true, stdio: 'inherit' })
    spawnSync(`rustup update`, { shell: true, stdio: 'inherit' })
    appendProfile(`export TAG=v${TAG}-jito`)
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
    const CI_COMMIT = spawnSync('git rev-parse HEAD', {
      cwd: 'jito-solana',
      shell: true,
    }).stdout.toString()
    appendProfile('export CI_COMMIT=' + CI_COMMIT)
    spawnSync(`nohup ./start > faucet.log &`)
  } catch (error) {
    throw new Error(`Error in setupJitoMev: ${error}`)
  }
}

const appendProfile = (line: string) => {
  const profilePath = '~/.profile'
  const cmd = `echo "${line}" >> ${profilePath}`
  spawnSync(cmd, { shell: true, stdio: 'inherit' })
}
