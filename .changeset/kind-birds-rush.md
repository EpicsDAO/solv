---
'@epics-dao/solv': patch
---

## Testnet Rollback and Restart

This release is to support the Testnet Rollback and Restart.

Please update your Solv CLI to the latest version by running the following commands:

```bash
solv update && solv update -b
```

If your node does not automatically restart, please delete the snapshot and restart the node by running the following commands:

```bash
solv stop
solv rm:snapshot
solv start
```

Solana Official Instructions: https://github.com/anza-xyz/agave/wiki/2024-10-16-Testnet-Rollback-and-Restart

## solv switch

This update also includes the following changes:

- solv switch to use `--require-tower`
- solv scp download - not include `unstaked-keypair.json` in the download
- solv setup - key generation always generate a new unstaked keypair
