import { WD } from '..'

export const solService = (username: string) => {
  const workingDirectory = WD
  const body = `[Unit]
Description=Solana Validator
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=1
LimitNOFILE=1000000
LogRateLimitIntervalSec=0
User=${username}
Environment=PATH=/home/${username}/.local/share/solana/install/active_release/bin
WorkingDirectory=${workingDirectory}
Environment="SOLANA_METRICS_CONFIG=host=https://metrics.solana.com:8086,db=tds,u=testnet_write,p=c4fa841aa918bf8274e3e2a44d77568d9861b3ea"
ExecStart=${workingDirectory}/start-validator.sh

[Install]
WantedBy=multi-user.target`
  return body
}
