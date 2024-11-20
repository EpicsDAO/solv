---
'@epics-dao/solv': patch
---

Update Solana Version for Testnet/Mainnet

Update solv version and the default config.

```bash
solv update && solv update --config
solv i
```

Then manually restart the node.

```bash
solv restart
```

solv auto restart mode is disabled for this Testnet update since some of users are experiencing issues with it.
If your node face a problem, please add this argument to the command: `--no-poh-speed-test` in `start-validator.sh` file.

```bash
solv stop && solv start
```
