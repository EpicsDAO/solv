const startFiredancerScript = () => {
  const filePath = '/home/solv/start-firedancer.sh'
  const body = `#!/usr/bin/env bash
sudo chomd -R 700 /mnt
sudo fdctl configure init all --config /home/solv/firedancer/config.toml
sudo chown -R solv:solv /mnt
sudo fdctl run --config /home/solv/firedancer/config.toml`
  return {
    filePath,
    body,
  }
}

export default startFiredancerScript
