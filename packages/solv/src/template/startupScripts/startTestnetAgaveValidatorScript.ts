import {
  ACCOUNTS_PATH,
  IDENTITY_KEY_PATH,
  LEDGER_PATH,
  LOG_PATH,
  TESTNET_VALIDATOR_VOTE_KEY_PATH,
} from '@/config/constants'

export const startTestnetAgaveValidatorScript = () => {
  const script = `#!/bin/bash
exec agave-validator \\
--identity ${IDENTITY_KEY_PATH} \\
--vote-account ${TESTNET_VALIDATOR_VOTE_KEY_PATH} \\
--authorized-voter  ${IDENTITY_KEY_PATH} \\
--log ${LOG_PATH} \\
--accounts ${ACCOUNTS_PATH} \\
--ledger ${LEDGER_PATH} \\
--entrypoint entrypoint.testnet.solana.com:8001 \\
--entrypoint entrypoint2.testnet.solana.com:8001 \\
--entrypoint entrypoint3.testnet.solana.com:8001 \\
--known-validator 5D1fNXzvv5NjV1ysLjirC4WY92RNsVH18vjmcszZd8on \\
--known-validator dDzy5SR3AXdYWVqbDEkVFdvSPCtS9ihF5kJkHCtXoFs \\
--known-validator Ft5fbkqNa76vnsjYNwjDZUXoTWpP7VYm3mtsaQckQADN \\
--known-validator eoKpUABi59aT4rR9HGS3LcMecfut9x7zJyodWWP43YQ \\
--known-validator 9QxCLckBiJc783jnMvXZubK4wH86Eqqvashtrwvcsgkv \\
--only-known-rpc \\
--expected-genesis-hash 4uhcVJyU9pJkvQyS88uRDiswHXSCkY3zQawwpjk2NsNY \\
--dynamic-port-range 8000-8020 \\
--rpc-port 8899 \\
--wal-recovery-mode skip_any_corrupted_record \\
--wait-for-supermajority 289624982 \\
--expected-shred-version 4084 \\
--expected-bank-hash EXknCC4rNBR5SyBVrUgUB3FaoGbujPMoraEjG7C49Bdk \\
--use-snapshot-archives-at-startup when-newest \\
--limit-ledger-size \\
--block-production-method central-scheduler \\
`
  return script
}
