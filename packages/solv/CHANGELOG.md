# @epics-dao/solv

## 3.3.5

### Patch Changes

- [#99](https://github.com/EpicsDAO/solv/pull/99) [`e22bf97`](https://github.com/EpicsDAO/solv/commit/e22bf97e4d89e9e7eeb98252a61ecefc2e13a022) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update Logrotate, RPC NODE firewall

  ## Update Logrotation

  Recently, we have updated the logrotate configuration for Solana Validator.
  To apply the changes, you need to run the following command.
  (We recommend running this command if you are attending to TDS with Edgevana Server.)

  ```bash
  $ solv update --logrotate
  ```

  ## Update RPC NODE Firewall

  We have noticed that some users are facing issues with the RPC Node's performance.
  We have updated the firewall configuration to improve the RPC Node's to prevent the DDoS attack.
  Thank you @cryptoo_bear San for reporting the issue to us.
  New solv setup command will ask you to enter your IP address to allow access to RPC NODE.
  But you can also run the following command to update the firewall configuration.

  ```bash
  $ solv update --firewall
  ? Enter your IP address to allow access to RPC NODE: (0.0.0.0)
  ```

## 3.3.4

### Patch Changes

- [#96](https://github.com/EpicsDAO/solv/pull/96) [`5ac5a64`](https://github.com/EpicsDAO/solv/commit/5ac5a64dfe16151e20b2492158fe18da32de382e) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update solana version for testnet/mainnet

  ## Update solv

  ```bash
  $ solv update
  $ solv -V
  3.3.4
  ```

  ## Update Solana Validator Version

  ```bash
  $ solv update -b
  ```

  You can always check the validator status by running the following command:

  ```bash
  $ solv get monitor
  ```

## 3.3.3

### Patch Changes

- [#94](https://github.com/EpicsDAO/solv/pull/94) [`ac02cef`](https://github.com/EpicsDAO/solv/commit/ac02cefa6d9621998898fcc2c19ef01e2295fc7f) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update solana version to testnet/mainnet

  ```bash
  $ solv update
  $ solv -V
  3.3.3
  ```

  and update the solana version to testnet/mainnet

  ```bash
  $ solv update -b
  ```

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
