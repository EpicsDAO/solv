# @epics-dao/solv

## 3.3.2

### Patch Changes

- [#88](https://github.com/EpicsDAO/solv/pull/88) [`a4c3d1f`](https://github.com/EpicsDAO/solv/commit/a4c3d1fc2f976a005bb724c028c4360cbe123e0c) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - ## Solana Validator Standard Update for 1.18.4(testnet), 1.17.4(mainnet)

  Update solv

  ```
  solv update
  ```

  Check if solv version is updated

  ```
  solv -V
  3.3.2
  ```

  Update solana and restart the node

  ```
  solv update -b
  ```

  You can monitor the progress of the update by running the following command

  ```
  solv get monitor
  ```

## 3.3.1

### Patch Changes

- [#79](https://github.com/EpicsDAO/solv/pull/79) [`ce54a8f`](https://github.com/EpicsDAO/solv/commit/ce54a8fa3c06bf7e53b760b94665194de3fa4bef) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - ## added LEDGER_PATH in solv.config.json

  Update solv version

  ```bash
  pnpm add -g @epics-dao/solv
  ```

  To set custom ledger path, add LEDGER_PATH in solv.config.json

  ```~/solv.config.json
  {
    "LEDGER_PATH": "path/to/ledger",
    ..
  }
  ```

  Default ledger path is `/mnt/ledger`

## 3.3.0

### Minor Changes

- [#78](https://github.com/EpicsDAO/solv/pull/78) [`1984b71`](https://github.com/EpicsDAO/solv/commit/1984b71d32b53e53615ad6efbde6e6e1f25d296f) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - solv restart for restart instructions

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
