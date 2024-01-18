import { CONFIG, HOME_PATHS, startupScriptPaths } from '@/config/config'

const envMainnet =
  'SOLANA_METRICS_CONFIG=host=https://metrics.solana.com:8086,db=mainnet-beta,u=mainnet-beta_write,p=password'
const envTestnet =
  'SOLANA_METRICS_CONFIG=host=https://metrics.solana.com:8086,db=tds,u=testnet_write,p=c4fa841aa918bf8274e3e2a44d77568d9861b3ea'

export const solvService = (isTest = true) => {
  const { scriptPath } = startupScriptPaths(isTest)
  const environment = isTest ? envTestnet : envMainnet
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
User=${CONFIG.USERNAME}
Environment=PATH=/home/${CONFIG.USERNAME}/.local/share/solana/install/active_release/bin
WorkingDirectory=${HOME_PATHS.ROOT}
Environment="${environment}"
ExecStart=${scriptPath}

[Install]
WantedBy=multi-user.target`
  return body
}
