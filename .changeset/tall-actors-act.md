---
"@epics-dao/solv": minor
---

Update - solv restart for restart instructions

- Solana Testnet Cluster Restart 21 February 2024
  [https://github.com/bartenbach/cluster_restart/blob/master/README.md](https://github.com/bartenbach/cluster_restart/blob/master/README.md)

## Install latest solv CLI on your local machine

Install Pnpm

```bash
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

Update solv version

```bash
$ solv update
```

or

```bash
$ pnpm add -g @epics-dao/solv
```

Then you can restart your solana validator with the following command:

```bash
$ solv restart
```

This command will do the following steps:

1. Create a snapshot
2. Change Validator Startup Script
3. Restart Solana Validator

If you faild to create a snapshot, you can use the following command:

```bash
$ solv restart --snapshot
```

Discord Channel: [https://discord.gg/WkrwGVUYTx](https://discord.gg/WkrwGVUYTx)
