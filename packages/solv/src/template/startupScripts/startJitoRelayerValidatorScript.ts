import { startupScriptPaths } from '@/config/config'
import { readOrCreateDefaultConfig } from '@/lib/readOrCreateDefaultConfig'

export const startJitoRelayerValidatorScript = (
  commissionBps = 1000,
  blockEngineUrl: string,
  shredReceiverAddr: string,
) => {
  const isTest = false
  const ledger = readOrCreateDefaultConfig().config.LEDGER_PATH
  const { identity, voteAccount, log, accounts } = startupScriptPaths(isTest)
  const script = `#!/bin/bash
exec solana-validator \\
--identity /home/solv/identity.json \\
--vote-account ${voteAccount} \\
--authorized-voter  ${identity} \\
--log ${log} \\
--accounts ${accounts} \\
--ledger ${ledger} \\
--entrypoint entrypoint.mainnet-beta.solana.com:8001 \\
--entrypoint entrypoint2.mainnet-beta.solana.com:8001 \\
--entrypoint entrypoint3.mainnet-beta.solana.com:8001 \\
--entrypoint entrypoint4.mainnet-beta.solana.com:8001 \\
--entrypoint entrypoint5.mainnet-beta.solana.com:8001 \\
--known-validator Certusm1sa411sMpV9FPqU5dXAYhmmhygvxJ23S6hJ24 \\
--known-validator 7Np41oeYqPefeNQEHSv1UDhYrehxin3NStELsSKCT4K2 \\
--known-validator GdnSyH3YtwcxFvQrVVJMm1JhTS4QVX7MFsX56uJLUfiZ \\
--known-validator CakcnaRDHka2gXyfbEd2d3xsvkJkqsLw2akB3zsN1D2S \\
--expected-genesis-hash 5eykt4UsFv8P8NJdTREpY1vzqKqZKvdpKuc147dw2N9d \\
--expected-shred-version 50093 \\
--tip-payment-program-pubkey T1pyyaTNZsKv2WcRAB8oVnk93mLJw2XzjtVYqCsaHqt \\
--tip-distribution-program-pubkey 4R3gSG8BpU4t19KYj8CfnbtRpnT8gtk4dvTHxVRwc2r7 \\
--merkle-root-upload-authority GZctHpWXmsZC1YHACTGGcHhYxjdRqQvTpYkb9LMvxDib \\
--commission-bps ${commissionBps} \\
--relayer-url http://127.0.0.1:11226 \\
--rpc-bind-address 0.0.0.0 \\
--block-engine-url ${blockEngineUrl} \\
--shred-receiver-address ${shredReceiverAddr} \\
--dynamic-port-range 8000-8020 \\
--rpc-port 8899 \\
--private-rpc \\
--full-rpc-api \\
--account-index program-id \\
--account-index-include-key AddressLookupTab1e1111111111111111111111111 \\
--use-snapshot-archives-at-startup when-newest \\
--limit-ledger-size \\
`
  return script
}
