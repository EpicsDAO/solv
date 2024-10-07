---
'@epics-dao/solv': patch
---

## Update Solana Mainnet Version v1.18.25

First, update the solv version and update configuration.

```bash
solv update && solv update --config
```

Then, update the Solana Mainnet version.

```bash
solv i
```

Finally, restart the Solana Validator.

```bash
solv restart
```

## No-Downtime Update

If you want no-downtime updates, please refer to the following guide:

https://solv.epics.dev/en/doc/quickstart/no-downtime-update/
