import {
  ACCOUNTS_PATH,
  IDENTITY_KEY_PATH,
  LEDGER_PATH,
  LOG_PATH,
} from '@/config/constants'
export const startRPCNodeScript = () => {
  const script = `#!/bin/bash
exec agave-validator \\
--identity ${IDENTITY_KEY_PATH} \\
--log ${LOG_PATH} \\
--accounts ${ACCOUNTS_PATH} \\
--ledger ${LEDGER_PATH} \\
--known-validator Certusm1sa411sMpV9FPqU5dXAYhmmhygvxJ23S6hJ24 \\
--known-validator 7Np41oeYqPefeNQEHSv1UDhYrehxin3NStELsSKCT4K2 \\
--known-validator GdnSyH3YtwcxFvQrVVJMm1JhTS4QVX7MFsX56uJLUfiZ \\
--known-validator CakcnaRDHka2gXyfbEd2d3xsvkJkqsLw2akB3zsN1D2S \\
--expected-genesis-hash 5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d \\
--expected-shred-version 50093 \\
--only-known-rpc \\
--full-rpc-api \\
--no-voting \\
--private-rpc \\
--enable-cpi-and-log-storage \\
--no-skip-initial-accounts-db-clean \\
--dynamic-port-range 8000-8020 \\
--rpc-bind-address 0.0.0.0 \\
--rpc-port 8899 \\
--no-port-check \\
--account-index program-id spl-token-mint spl-token-owner \\
--enable-rpc-transaction-history \\
--rpc-pubsub-enable-block-subscription \\
--rpc-pubsub-enable-vote-subscription \\
--no-wait-for-vote-to-start-leader \\
--wal-recovery-mode skip_any_corrupted_record \\
--use-snapshot-archives-at-startup when-newest \\
--limit-ledger-size 400000000 \\
`
  return script
}
