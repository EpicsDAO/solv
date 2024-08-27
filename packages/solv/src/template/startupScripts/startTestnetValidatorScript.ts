import { startupScriptPaths } from '@/config/config'
import { readOrCreateDefaultConfig } from '@/lib/readOrCreateDefaultConfig'

export const startTestnetValidatorScript = () => {
  const ledger = readOrCreateDefaultConfig().config.LEDGER_PATH
  const { identity, voteAccount, log, accounts } = startupScriptPaths()
  const script = `#!/bin/bash
exec solana-validator \\
--identity /home/solv/identity.json \\
--vote-account ${voteAccount} \\
--authorized-voter  ${identity} \\
--log ${log} \\
--accounts ${accounts} \\
--ledger ${ledger} \\
--entrypoint entrypoint.testnet.solana.com:8001 \\
--entrypoint entrypoint2.testnet.solana.com:8001 \\
--entrypoint entrypoint3.testnet.solana.com:8001 \\
--expected-genesis-hash 4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY \\
--dynamic-port-range 8000-8020 \\
--rpc-port 8899 \\
--wal-recovery-mode skip_any_corrupted_record \\
--wait-for-supermajority 289624982 \\
--expected-shred-version 35459 \\
--expected-bank-hash 4rWEDhTyQVgTw6sPoCthXmUNmjeiwsdKQ5ZNvpEi3uvk \\
--use-snapshot-archives-at-startup when-newest \\
--limit-ledger-size \\
--block-production-method central-scheduler \\
`
  return script
}
