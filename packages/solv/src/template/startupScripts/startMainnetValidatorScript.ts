import { startupScriptPaths } from '@/config/config'
import { readOrCreateDefaultConfig } from '@/lib/readOrCreateDefaultConfig'

export const startMainnetValidatorScript = () => {
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
--known-validator DE1bawNcRJB9rVm3buyMVfr8mBEoyyu73NBovf2oXJsJ \\
--known-validator GdnSyH3YtwcxFvQrVVJMm1JhTS4QVX7MFsX56uJLUfiZ \\
--known-validator CakcnaRDHka2gXyfbEd2d3xsvkJkqsLw2akB3zsN1D2S \\
--known-validator C1ocKDYMCm2ooWptMMnpd5VEB2Nx4UMJgRuYofysyzcA \\
--known-validator GwHH8ciFhR8vejWCqmg8FWZUCNtubPY2esALvy5tBvji \\
--known-validator 6WgdYhhGE53WrZ7ywJA15hBVkw7CRbQ8yDBBTwmBtAHN \\
--known-validator 7Np41oeYqPefeNQEHSv1UDhYrehxin3NStELsSKCT4K2 \\
--known-validator RBFiUqjYuy4mupzZaU96ctXJBy23sRBRsL3KivDAsFM \\
--dynamic-port-range 8000-8020 \\
--rpc-bind-address 0.0.0.0 \\
--rpc-port 8899 \\
--wal-recovery-mode skip_any_corrupted_record \\
--use-snapshot-archives-at-startup when-newest \\
--limit-ledger-size \\
--block-production-method central-scheduler \\
`
  return script
}
