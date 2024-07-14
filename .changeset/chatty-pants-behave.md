---
'@epics-dao/solv': patch
---

Update - solana version v1.18.18 for mainnet

If you are running a validator on mainnet, please update your solana version to v1.18.18.

Ignore this step if you are using solv mev mode - automatic update will take care of it.

If you are not using solv mev mode, please run the following command:

```bash
$ solv update && solv update -b
```

This will update your solana version to v1.18.18 and restart the validator.

If you want to use no-downtime migration, please refer to the [solv doc](https://solv.epics.dev/en/doc/quickstart/no-downtime-update/).
