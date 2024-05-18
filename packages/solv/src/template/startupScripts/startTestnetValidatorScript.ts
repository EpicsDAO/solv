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
--entrypoint entrypoint.testnet.solana.sergo.dev:8001 \\
--known-validator eoKpUABi59aT4rR9HGS3LcMecfut9x7zJyodWWP43YQ \\
--known-validator GAPNvBD6MXboQmxP9XTCC4CMsT5gUpdFZWbnj4Tz2s7i \\
--known-validator 5D1fNXzvv5NjV1ysLjirC4WY92RNsVH18vjmcszZd8on \\
--known-validator BFquPCAYdjN9QyLVfuGrQdJTF9Ct7Z85FDxhFeLcpFqR \\
--known-validator 9e2RvEzemWs6ZkEhdW2NddSWiFKgJfkw5LWGtgwvPnvw \\
--only-known-rpc \\
--expected-genesis-hash 4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY \\
--dynamic-port-range 8000-8020 \\
--rpc-port 8899 \\
--wal-recovery-mode skip_any_corrupted_record \\
--wait-for-supermajority 254108257 \\
--expected-shred-version 35459 \\
--expected-bank-hash 4rWEDhTyQVgTw6sPoCthXmUNmjeiwsdKQ5ZNvpEi3uvk \\
--limit-ledger-size \\
`
  return script
}
