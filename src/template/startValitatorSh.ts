import {
  ACCOUNT_PATH,
  LEDGER_PATH,
  LOG_PATH,
  TESTNET_VALIDATOR_KEYFILE,
  VALIDATOR_VOTE_KEYFILE,
} from '..'

const commonValidatorCommands = `
#!/bin/bash
exec solana-validator \\
--identity ${TESTNET_VALIDATOR_KEYFILE} \\
--vote-account ${VALIDATOR_VOTE_KEYFILE} \\
--log ${LOG_PATH} \\
--accounts ${ACCOUNT_PATH} \\
--ledger ${LEDGER_PATH} \\
--no-genesis-fetch \\
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
--wait-for-supermajority 213932256 \\
--expected-shred-version 61807 \\
--expected-bank-hash 4cyHLxMPCJH4pq9v6eVDFBKKNwrVw8ww78yYUSJNDvjU \\
--known-validator 5D1fNXzvv5NjV1ysLjirC4WY92RNsVH18vjmcszZd8on \\
--limit-ledger-size \\
`

export const startValidatorSh = (fetchSnapshot = false) => {
  if (fetchSnapshot) {
    return `${commonValidatorCommands}--no-snapshot-fetch`
  }
  return commonValidatorCommands + '--no-incremental-snapshots'
}
