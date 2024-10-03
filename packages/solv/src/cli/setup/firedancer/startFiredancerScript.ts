const startFiredancerScript = () => {
  const filePath = '/home/solv/start-firedancer.sh'
  const body = `#!/usr/bin/env bash
sudo fdctl configure init all --config /home/solv/firedancer/config.toml
sudo fdctl run --config /home/solv/firedancer/config.toml`
  return {
    filePath,
    body,
  }
}

export default startFiredancerScript
