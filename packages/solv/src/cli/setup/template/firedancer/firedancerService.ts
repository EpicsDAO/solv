const firedancerService = () => {
  const filePath = '/etc/systemd/system/frankendancer.service'
  const body = `[Unit]
Description=Firedancer Solana
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=1
User=solv
LimitNOFILE=1000000
LogRateLimitIntervalSec=0
ExecStart=/home/solv/start-firedancer.sh

[Install]
WantedBy=multi-user.target
`

  return {
    filePath,
    body,
  }
}

export default firedancerService
