import { VERSION_FIREDANCER } from '@/config/versionConfig'
import { spawnSync } from 'child_process'
import startFiredancerScript from './startFiredancerScript'

const setupFiredancer = async () => {
  spawnSync(
    `git clone --recurse-submodules https://github.com/firedancer-io/firedancer.git`,
    { shell: true },
  )
  spawnSync(`git checkout v${VERSION_FIREDANCER}`, {
    shell: true,
    cwd: '/home/solv/firedancer',
  })
  spawnSync(`FD_AUTO_INSTALL_PACKAGES=1 ./deps.sh check install`, {
    shell: true,
    cwd: '/home/solv/firedancer',
  })
  spawnSync(`make -j fdctl solana`, {
    shell: true,
    cwd: '/home/solv/firedancer',
  })
  spawnSync(
    `ln -s /home/solv/firedancer/build/native/gcc/bin/fdctl /usr/local/bin/fdctl`,
    {
      shell: true,
    },
  )
  const { filePath, body } = startFiredancerScript()
  spawnSync(`echo "${body}" | sudo tee ${filePath} > /dev/null`, {
    shell: true,
  })
  spawnSync(`sudo systemctl daemon-reload`, { shell: true })
}

export default setupFiredancer
