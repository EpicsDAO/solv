# @epics-dao/solv

## 4.7.4

### Patch Changes

- [`2f8e760`](https://github.com/EpicsDAO/solv/commit/2f8e7602595356fbb3385f29f4d4d15e64471858) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - fix - remove solana client

  `solv i` had a dependency on the solana client, which is not needed for v2.x.x.
  This change removes the dependency on the solana client.

## 4.7.3

### Patch Changes

- [`66f2978`](https://github.com/EpicsDAO/solv/commit/66f2978b712cd9d339bab0022a6526356336c4a3) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update Solana Version v2.0.15 for Mainnet/Testnet

  - For users who are not using solv Auto Operation Mode: Please follow the instructions below.

  ```bash
  $ solv update && solv update -b
  ```

  ## How to use solv Auto Operation Mode?

  Run the following command:

  ```bash
  $ solv auto
  ? Do you want to enable solv Auto Operation Mode?(You can change it again) (y/N)
  ? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
  ? Do you want to enable AUTO RESTART? (Recommended) (y/N)
  ※ Please turn off if you are using no-downtime migration.
  ? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
  ```

  1.  Enable solv Auto Operation Mode.
  2.  Enable AUTO UPDATE.
  3.  Enable AUTO RESTART.
      ※ Please turn off if you are using no-downtime migration.
      ※ No-downtime migration requires spare server and manual restart.
  4.  Enter your Discord Webhook URL.
      ※ You can receive notifications about the Solana/solv version update.
  5.  Enter RPC URL (Mainnet Only)
  6.  Enter Harvest Account (Mainnet Only)

  ## How to disable solv Auto Operation Mode?

## 4.7.2

### Patch Changes

- [#335](https://github.com/EpicsDAO/solv/pull/335) [`6438adc`](https://github.com/EpicsDAO/solv/commit/6438adc3ccd0b298a8a7250f99e770ba3d684883) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update solv swap

  Added new default options to the `solv swap` command.

  The new options are as follows:

  ```
  dynamicComputeUnitLimit: true,
  prioritizationFeeLamports: 'auto'
  dynamicSlippage: { 'maxBps': 300 }
  ```

  Jupiter Swap API v6
  https://station.jup.ag/docs/apis/swap-api#setting-priority-fee-for-your-transaction

## 4.7.1

### Patch Changes

- [`cefcd04`](https://github.com/EpicsDAO/solv/commit/cefcd04de51345035b339aa3c15a337b7abaf053) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - rm console log

## 4.7.0

### Minor Changes

- [`74afffc`](https://github.com/EpicsDAO/solv/commit/74afffc39efa4d126aab4a14240d352d6f3fa99d) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Now that we have the v2 version of the solv cli, we need to update the solv cli versioin.
  So, we are adding a new function `getSolanaCLI` to get the solana cli version for agave/solana.
  Also, solv switch incoming for v1 to v2.

  Add - getSolanaCLI to get the solana cli version for agave/solana
  Add - solv switch incoming for v1 to v2

  solana version: 1.x.x will be deprecated soon, so we need to switch to v2.

## 4.6.15

### Patch Changes

- [`4df32b1`](https://github.com/EpicsDAO/solv/commit/4df32b12194b28f02ea3dae4a05e839a02f408c9) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - feat(add): version control for snapshot-finder

  ## Update - solv get snapshot v4.6.15

  Version control for snapshot-finder

  https://github.com/EpicsDAO/solv/pull/331

  @gabrielhicks, Thank you for your contribution 🎊

## 4.6.14

### Patch Changes

- [#329](https://github.com/EpicsDAO/solv/pull/329) [`0b6be61`](https://github.com/EpicsDAO/solv/commit/0b6be61d2790de537846c04c988b62ccf490194b) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - fix - auto update solana version notification

  === ✨ solv updated to the latest version ✨ ===
  Validator Address: xxxxxxxx
  solv Version: 4.6.13
  Solana Version: 2.0.14
  Network: Testnet
  isNodeRestartRequired: false

## 4.6.13

### Patch Changes

- [#327](https://github.com/EpicsDAO/solv/pull/327) [`27adb05`](https://github.com/EpicsDAO/solv/commit/27adb050d7694d7183c2a312c4c68b35e3cb8a8c) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - fix - solv auto update notification

## 4.6.12

### Patch Changes

- [`e153c6d`](https://github.com/EpicsDAO/solv/commit/e153c6dd893e5c90fe60836b293f8ee9ecb2a557) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update Solana Testnet v2.0.14

  - For users who are not using solv Auto Operation Mode: Please follow the instructions below.

  ```bash
  $ solv update && solv update -b
  ```

  ## How to use solv Auto Operation Mode?

  Run the following command:

  ```bash
  $ solv auto
  ? Do you want to enable solv Auto Operation Mode?(You can change it again) (y/N)
  ? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
  ? Do you want to enable AUTO RESTART? (Recommended) (y/N)
  ※ Please turn off if you are using no-downtime migration.
  ? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
  ```

  1.  Enable solv Auto Operation Mode.
  2.  Enable AUTO UPDATE.
  3.  Enable AUTO RESTART.
      ※ Please turn off if you are using no-downtime migration.
      ※ No-downtime migration requires spare server and manual restart.
  4.  Enter your Discord Webhook URL.
      ※ You can receive notifications about the Solana/solv version update.
  5.  Enter RPC URL (Mainnet Only)
  6.  Enter Harvest Account (Mainnet Only)

  ## How to disable solv Auto Operation Mode?

  Run the following command:

  ```bash
  $ solv auto
  ? Do you want to enable solv Auto Operation Mode?(You can change it again) (y/N) n
  ✅ Cron Job successfully removed.
  ```

## 4.6.11

### Patch Changes

- [`f039622`](https://github.com/EpicsDAO/solv/commit/f0396220c61acf8debe41799aa1844b7ff6b61b8) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Downgrade Solana Testnet v1.18.26

  - For users who are not using solv Auto Operation Mode: Please follow the instructions below.

  ```bash
  $ solv update && solv update -b
  ```

  ## How to use solv Auto Operation Mode?

  Run the following command:

  ```bash
  $ solv auto
  ? Do you want to enable solv Auto Operation Mode?(You can change it again) (y/N)
  ? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
  ? Do you want to enable AUTO RESTART? (Recommended) (y/N)
  ※ Please turn off if you are using no-downtime migration.
  ? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
  ```

  1.  Enable solv Auto Operation Mode.
  2.  Enable AUTO UPDATE.
  3.  Enable AUTO RESTART.
      ※ Please turn off if you are using no-downtime migration.
      ※ No-downtime migration requires spare server and manual restart.
  4.  Enter your Discord Webhook URL.
      ※ You can receive notifications about the Solana/solv version update.
  5.  Enter RPC URL (Mainnet Only)
  6.  Enter Harvest Account (Mainnet Only)

  ## How to disable solv Auto Operation Mode?

  Run the following command:

  ```bash
  $ solv auto
  ? Do you want to enable solv Auto Operation Mode?(You can change it again) (y/N) n
  ✅ Cron Job successfully removed.
  ```

## 4.6.10

### Patch Changes

- [`bd9c764`](https://github.com/EpicsDAO/solv/commit/bd9c76498ac9fd56a40bbfdb78261c03361a77a0) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update Solana Testnet Version v2.0.14

  - For users who are not using solv Auto Operation Mode: Please follow the instructions below.

  ```bash
  $ solv update && solv update -b
  ```

  ## How to use solv Auto Operation Mode?

  Run the following command:

  ```bash
  $ solv auto
  ? Do you want to enable solv Auto Operation Mode?(You can change it again) (y/N)
  ? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
  ? Do you want to enable AUTO RESTART? (Recommended) (y/N)
  ※ Please turn off if you are using no-downtime migration.
  ? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
  ```

  1.  Enable solv Auto Operation Mode.
  2.  Enable AUTO UPDATE.
  3.  Enable AUTO RESTART.
      ※ Please turn off if you are using no-downtime migration.
      ※ No-downtime migration requires spare server and manual restart.
  4.  Enter your Discord Webhook URL.
      ※ You can receive notifications about the Solana/solv version update.
  5.  Enter RPC URL (Mainnet Only)
  6.  Enter Harvest Account (Mainnet Only)

  ## How to disable solv Auto Operation Mode?

  Run the following command:

  ```bash
  $ solv auto
  ? Do you want to enable solv Auto Operation Mode?(You can change it again) (y/N) n
  ✅ Cron Job successfully removed.
  ```

## 4.6.9

### Patch Changes

- [#314](https://github.com/EpicsDAO/solv/pull/314) [`ebb5584`](https://github.com/EpicsDAO/solv/commit/ebb5584ad43b91c21dcd4783de529e0f92c88905) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - ## Testnet Rollback and Restart

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

## 4.6.8

### Patch Changes

- [`3b50531`](https://github.com/EpicsDAO/solv/commit/3b505316ae82d1c65e8a1f2c69236591c993e65b) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update Solana Testnet Instruction

  If you are usin Solv Auto Operation mode, ignore this change.

  If you are using Solv Manual Operation mode, please follow the instruction below:

  ```bash
  $ solv update && solv update -b
  ```

  Official Solana Testnet Instruction:

  https://github.com/anza-xyz/agave/wiki/2024-10-09-Testnet-Rollback-and-Restart

## 4.6.7

### Patch Changes

- [`3af615b`](https://github.com/EpicsDAO/solv/commit/3af615be8683e75c0d9960cfbc9239e13782c562) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update epochTimer

  - Update epochTimer to enable auto update

  Please update solv version to the v4.6.7 to enable auto update.

  ```bash
  $ solv update
  ```

## 4.6.6

### Patch Changes

- [#308](https://github.com/EpicsDAO/solv/pull/308) [`510c692`](https://github.com/EpicsDAO/solv/commit/510c69279054ee65a1fce3dcd1b4557b09747b66) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Downgrade Instruction for Testnet

  Solana Official Instructions: https://github.com/anza-xyz/agave/wiki/2024-10-09-Testnet-Rollback-and-Restart

  - For users who is using solv Auto Operation Mode: No action is required.

  ※ The name solv Mev mode will be changed to solv Auto Operation Mode.

  - For users who are not using solv Auto Operation Mode: Please follow the instructions below.

  ```bash
  $ solv update && solv update -b
  ```

  ## How to use solv Auto Operation Mode?

  Run the following command:

  ```bash
  $ solv auto
  ? Do you want to enable solv Auto Operation Mode?(You can change it again) (y/N)
  ? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
  ? Do you want to enable AUTO RESTART? (Recommended) (y/N)
  ※ Please turn off if you are using no-downtime migration.
  ? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
  ```

  1.  Enable solv Auto Operation Mode.
  2.  Enable AUTO UPDATE.
  3.  Enable AUTO RESTART.
      ※ Please turn off if you are using no-downtime migration.
      ※ No-downtime migration requires spare server and manual restart.
  4.  Enter your Discord Webhook URL.
      ※ You can receive notifications about the Solana/solv version update.
  5.  Enter RPC URL (Mainnet Only)
  6.  Enter Harvest Account (Mainnet Only)

  ## How to disable solv Auto Operation Mode?

  Run the following command:

  ```bash
  $ solv auto
  ? Do you want to enable solv Auto Operation Mode?(You can change it again) (y/N) n
  ✅ Cron Job successfully removed.
  ```

  ## Validator Auto Operation Service

  We are providing a validator auto-operation service for those who want to operate a validator without any hassle.

  Validators DAO: <https://dao.validators.solutions>

## 4.6.5

### Patch Changes

- [#305](https://github.com/EpicsDAO/solv/pull/305) [`cd15799`](https://github.com/EpicsDAO/solv/commit/cd1579960798e3005a454948b53ab92886ec26e4) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update EpochTimer for Testnet Update Instructions

  Official Instructions: https://gist.github.com/willhickey/0c90b7929550a08712cd9adeb8b693c1
  Release Schedule: https://github.com/anza-xyz/agave/wiki/v2.0-Release-Schedule

  If you already solv mev mode on, you don't need to do anything.

  If you don't, please follow the instructions below.

  solv epochTimer will stop the node when the epoch reaches 700 on the testnet.

  ## How to use solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N)
  ? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
  ? Do you want to enable AUTO RESTART? (Recommended) (y/N)
  ※ Please turn off if you are using no-downtime migration.
  ? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
  ```

  1.  Enable solv MEV Mode.
  2.  Enable AUTO UPDATE.
  3.  Enable AUTO RESTART.
      ※ Please turn off if you are using no-downtime migration.
      ※ No-downtime migration requires spare server and manual restart.
  4.  Enter your Discord Webhook URL.
      ※ You can receive notifications about the Solana/solv version update.
  5.  Enter RPC URL (Mainnet Only)
  6.  Enter Harvest Account (Mainnet Only)

  ## How to disable solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N) n
  ✅ Cron Job successfully removed.
  ```

  ## Validator Auto Operation Service

  We are providing a validator auto-operation service for those who want to operate a validator without any hassle.

  Validators DAO: <https://dao.validators.solutions>

## 4.6.4

### Patch Changes

- [#303](https://github.com/EpicsDAO/solv/pull/303) [`dabdd7d`](https://github.com/EpicsDAO/solv/commit/dabdd7d1c821aba57031e183c820baef0e60117b) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - ## Update Solana Mainnet Version v1.18.25

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

## 4.6.3

### Patch Changes

- [#301](https://github.com/EpicsDAO/solv/pull/301) [`873a77c`](https://github.com/EpicsDAO/solv/commit/873a77ceea50a08c6abdd672b6d7abc8605a707b) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update firedancer config

## 4.6.2

### Patch Changes

- [#294](https://github.com/EpicsDAO/solv/pull/294) [`602f0c3`](https://github.com/EpicsDAO/solv/commit/602f0c3aecc4125d02c563cb7eee71b3e703e52a) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - ## New Features - solv v4.6.x Release

  Now you can easily setup Yellowstone Geyser plugin and Firedancer!

  ### Yellowstone Geyser gRPC Interface Support

  ```bash
  solv setup --geyser
  ```

  - Yellowstone Geyser Doc - [https://github.com/rpcpool/yellowstone-grpc](https://github.com/rpcpool/yellowstone-grpc)

  ### Firedancer Setup Support (Frankendancer)

  ```bash
  solv setup --firedancer
  ```

  Please update the VALIDATOR_TYPE value to `frankendancer` in the `solv4.config.json` file.
  solv start will automatically read firedancer.service instead of solv.service.

  - Firedancer Doc - [https://firedancer-io.github.io/firedancer/](https://firedancer-io.github.io/firedancer/)

## 4.6.1

### Patch Changes

- [#292](https://github.com/EpicsDAO/solv/pull/292) [`22ec57d`](https://github.com/EpicsDAO/solv/commit/22ec57d386585c1e6901826cb89b869808ceca91) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update Solana Version v2.0.13 for Testnet Validator

## 4.6.0

### Minor Changes

- [#290](https://github.com/EpicsDAO/solv/pull/290) [`20728ed`](https://github.com/EpicsDAO/solv/commit/20728ed0b4f208fa2c2c70a4811840b10f1ddfd3) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Add Geyser/Firedancer Setup Option

  ## Setup Geyser Yellowstone

  ```
  solv setup --geyser
  ```

  ## Setup Firedancer (Frankendancer)

  ```
  solv setup --firedancer
  ```

## 4.5.9

### Patch Changes

- [`a51e3cd`](https://github.com/EpicsDAO/solv/commit/a51e3cd12bb69c76b895ff965a6d5c4e20de13e2) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update Solana Testnet Version v2.0.10

  If you are using solv MEV mode, ignore this step, It will be automatically updated.

  If you are NOT using solv MEV mode, you need to update with the following command:

  ```bash
  $ solv update && solv update -b
  ```

  ## How to use solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N)
  ? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
  ? Do you want to enable AUTO RESTART? (Recommended) (y/N)
  ※ Please turn off if you are using no-downtime migration.
  ? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
  ```

  1.  Enable solv MEV Mode.
  2.  Enable AUTO UPDATE.
  3.  Enable AUTO RESTART.
      ※ Please turn off if you are using no-downtime migration.
      ※ No-downtime migration requires spare server and manual restart.
  4.  Enter your Discord Webhook URL.
      ※ You can receive notifications about the Solana/solv version update.
  5.  Enter RPC URL (Mainnet Only)
  6.  Enter Harvest Account (Mainnet Only)

  ## How to disable solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N) n
  ✅ Cron Job successfully removed.
  ```

  ## Validator Auto Operation Service

  We are providing a validator auto-operation service for those who want to operate a validator without any hassle.

  Validators DAO Discord: <https://discord.gg/HDTy96Wr2W>

## 4.5.8

### Patch Changes

- [#285](https://github.com/EpicsDAO/solv/pull/285) [`7627876`](https://github.com/EpicsDAO/solv/commit/762787679adf98f600d6930132bbd879d34e534f) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - rm priority fee

  - small bug fix
  - added new option to `solv swap` command

## 4.5.7

### Patch Changes

- [#283](https://github.com/EpicsDAO/solv/pull/283) [`e204751`](https://github.com/EpicsDAO/solv/commit/e2047519b597d2b390d8713f567a1c6eadcd3194) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update Solana Version for Testnet v2.0.9

  ```bash
  solv update
  ```

  ```bash
  solv update --config
  ```

  ```bash
  solv restart
  ```

  or

  ```bash
  solv update && solv update -b
  ```

  Validators DAO:

  https://discord.gg/C7ZQSrCkYR

## 4.5.6

### Patch Changes

- [#279](https://github.com/EpicsDAO/solv/pull/279) [`1dfeedd`](https://github.com/EpicsDAO/solv/commit/1dfeedd21caa5f4fae9cda555e8e34b1856ff526) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - solv update --migrate-config

  ## Summary

  This PR adds a new command `solv update --migrate-config` to migrate the old config file to the new config file.

  `solv.config.json` to `solv4.config.json`

  You can migrate the old config file to the new config file by running the following command:

  ```bash
  solv update --migrate-config
  ```

  ## Config Update Command

  This command will update the config file to the latest version.

  ```bash
  solv update --config
  ```

  ## solv Discord Channel is now migrated to Validators DAO's Discord

  Due to the increasing number of users, the solv Discord channel has been migrated to Validators DAO's Discord.

  Now this community is more focused on Solana Validators and RPC Operators.

  Validators DAO: https://discord.gg/8dhnZnvzuw

## 4.5.5

### Patch Changes

- [#277](https://github.com/EpicsDAO/solv/pull/277) [`f4fa6d7`](https://github.com/EpicsDAO/solv/commit/f4fa6d754f161609b89a5b4745774d04223e7b4c) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - fix - solv log

## 4.5.4

### Patch Changes

- [#273](https://github.com/EpicsDAO/solv/pull/273) [`acf7b1a`](https://github.com/EpicsDAO/solv/commit/acf7b1a6771e7a950aecbcf0a9094bf4cf5e055d) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - small bug fix

## 4.5.3

### Patch Changes

- [#271](https://github.com/EpicsDAO/solv/pull/271) [`317e858`](https://github.com/EpicsDAO/solv/commit/317e8589b4bb2a95deaf1516388deab648efba6a) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Migrate solv.config.json cmd - solv update --config

## 4.5.2

### Patch Changes

- [#269](https://github.com/EpicsDAO/solv/pull/269) [`e3850de`](https://github.com/EpicsDAO/solv/commit/e3850dee92480fafe036a63751a514653295902b) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update solv.config.json to solv4.config.json

  solv.config.json will be deprecated in the future, please update your config file to solv4.config.json with the following command:

  ```bash
  solv update --config
  ```

## 4.5.1

### Patch Changes

- [`6718de8`](https://github.com/EpicsDAO/solv/commit/6718de89c621a0a68394b049b72327c0192347c6) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update Solana Version for Jito Mainnet

## 4.5.0

### Minor Changes

- [#266](https://github.com/EpicsDAO/solv/pull/266) [`3d1393e`](https://github.com/EpicsDAO/solv/commit/3d1393e754d327ce4539caa2582c509b4d802f46) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Minor Update - solv v4.5.0 Release

  Mainly We updated `solv setup` command!

  Now it's more user-friendly and easy to use. Easy to switch between different validators and RPC nodes.

  Since solana clients is updated, we also updated solv to be compatible with the latest solana clients.

  ## Update Install Script URL

  ```
  $ bash -c "$(curl -sSfL "https://solv-storage.validators.solutions/install")"
  ```

  ## This update includes Solana version update for mainnet-beta and testnet.

  To update your default solana version, run the following command:

  ```bash
  $ solv update && solv update --config
  ```

  To install the latest solana version, run the following command:

  ```bash
  $ solv i
  ```

  If you want to install a specific version, run the following command:

  ```bash
  $ solv i -v <version>
  ```

  To reflect the changes, restart the solana validator:

  ```bash
  $ solv restart
  ```

  ## New Features

  - `solv setup` command is now more user-friendly
  - `solv swap` command is now available
  - `solv jupiter` command is now available
  - `solv relayer` command is now available
  - `solv get ip` command is now available
  - `solv scp` command is now improved with new options
  - `solv balance` alias command `solv b` is now available
  - `solv monitor` alias command `solv m` is now available
  - `solv catchup` alias command `solv c` is now available
  - `solv rm:snapshot` removes all the `/mnt/ledger` and `/mnt/accounts` directories
  - `solv restart --rm` command uses `solv rm:snapshot` command above and restarts the validator

  ## Changes

  `solv.config.json` file is now updated with new fields.
  But this will be deprecated in the future.

  Now new config is migrating to `solv4.config.json` file.

  ## Bug Fixes

  - `solv switch` command now works as expected.
  - `bigint` warning message is now resolved.

## 4.4.16

### Patch Changes

- [`5e89d14`](https://github.com/EpicsDAO/solv/commit/5e89d14d822da860f6ea0dfc927b332df95a44a6) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Last release did not include the `--script` option yet.
  This patch release adds the `--script` option to the `solv setup` command.

  Added - solv setup --script

## 4.4.15

### Patch Changes

- [#263](https://github.com/EpicsDAO/solv/pull/263) [`1fe901d`](https://github.com/EpicsDAO/solv/commit/1fe901d3830285d28b4f7e71401937e0eada5d0a) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - solv setup --script, solv epochTimer

  - Added `solv setup --script` command to update `start-validator.sh`, remove old snapshot, and restart.

  ```bash
  solv setup --script
  ```

  Solana Official Restart Instructions:

  https://github.com/anza-xyz/agave/wiki/2024-08-26-Testnet-Restart

  - Updated `solv epochTimer` to use Rust CLI.

## 4.4.14

### Patch Changes

- [#261](https://github.com/EpicsDAO/solv/pull/261) [`e64f0d0`](https://github.com/EpicsDAO/solv/commit/e64f0d0e055c732556f7bb353e14e9f7a39fa357) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update epochTimer

  Fixes `solv epochTimer` for testnet

  Update `solv setup` for RPC to use agave client as default

## 4.4.13

### Patch Changes

- [#259](https://github.com/EpicsDAO/solv/pull/259) [`b449f68`](https://github.com/EpicsDAO/solv/commit/b449f6878501d387fbe2711ba982bcdfc76e31bd) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update Solana Testnet Version v2.0.7

  If you are using solv MEV mode, ignore this step, It will be automatically updated.

  If you are NOT using solv MEV mode, you need to update with the following command:

  ```bash
  $ solv update && solv update -b
  ```

  ## How to use solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N)
  ? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
  ? Do you want to enable AUTO RESTART? (Recommended) (y/N)
  ※ Please turn off if you are using no-downtime migration.
  ? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
  ```

  1.  Enable solv MEV Mode.
  2.  Enable AUTO UPDATE.
  3.  Enable AUTO RESTART.
      ※ Please turn off if you are using no-downtime migration.
      ※ No-downtime migration requires spare server and manual restart.
  4.  Enter your Discord Webhook URL.
      ※ You can receive notifications about the Solana/solv version update.
  5.  Enter RPC URL (Mainnet Only)
  6.  Enter Harvest Account (Mainnet Only)

  ## How to disable solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N) n
  ✅ Cron Job successfully removed.
  ```

  ## Added - solv update --config

  You can now update the solv configuration file with the following command:

  ```bash
  $ solv update --config
  ```

  This command will update the default Solana version.

  ## Validator Auto Operation Service

  We are providing a validator auto-operation service for those who want to operate a validator without any hassle.

  Epics DAO Discord: <https://discord.gg/HDTy96Wr2W>

## 4.4.12

### Patch Changes

- [#256](https://github.com/EpicsDAO/solv/pull/256) [`4bbf087`](https://github.com/EpicsDAO/solv/commit/4bbf0872ebd092a02d356f8ce4edf4a7cb506177) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - ## Update - solv relayer

  - Added solv relayer setup to setup separate Jito Relayer
  - Added solv relayer set:url to set Relayer URL on Validator
    This command will set the Relayer URL on the Validator
    Equivalent to `solana-validator --ledger /mnt/ledger set-relayer-config --relayer-url <relayer_url>` command
  - Added solv relayer log to show Relayer logs

  ```bash
  Usage: solv relayer [options] [command]

  Jito Relayer Commands

  Options:
    -h, --help         Display help for solv commands

  Commands:
    setup              Show Relayer Status
    status             Show Relayer Status
    start              Start Relayer
    stop               Stop Relayer
    log [options]      Show Relayer Logs
    restart            Restart Relayer
    set:url [options]  Set Relayer URL on Validator
    help [command]     display help for command
  ```

  ## Update - solv switch

  Testnet switch command is now available.
  Also, added validation of Validator keys before switching.

  ```bash
  Usage: solv switch [options]

  Switch Validator Identity with No Downtime

  Options:
    --ip <ip>                  IP Address of the New Validator (default: "")
    --switchType <switchType>  Switch Type (default: "")
    -h, --help                 Display help for solv commands
  ```

## 4.4.11

### Patch Changes

- [#254](https://github.com/EpicsDAO/solv/pull/254) [`5e8d471`](https://github.com/EpicsDAO/solv/commit/5e8d471aefcc78dede33eb36c995020b310a1a8c) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - ## Downgrade Solana Testnet Version to v2.0.5

  If you are using solv MEV mode, ignore this step, It will be automatically updated.

  If you are NOT using solv MEV mode, you need to update the Agave CLI with the following command:

  ```bash
  $ solv update && solv update -b
  ```

  ## How to use solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N)
  ? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
  ? Do you want to enable AUTO RESTART? (Recommended) (y/N)
  ※ Please turn off if you are using no-downtime migration.
  ? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
  ```

  1.  Enable solv MEV Mode.
  2.  Enable AUTO UPDATE.
  3.  Enable AUTO RESTART.
      ※ Please turn off if you are using no-downtime migration.
      ※ No-downtime migration requires spare server and manual restart.
  4.  Enter your Discord Webhook URL.
      ※ You can receive notifications about the Solana/solv version update.
  5.  Enter RPC URL (Mainnet Only)
  6.  Enter Harvest Account (Mainnet Only)

  ## How to disable solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N) n
  ✅ Cron Job successfully removed.
  ```

  ## Added - solv update --config

  You can now update the solv configuration file with the following command:

  ```bash
  $ solv update --config
  ```

  This command will update the default Solana version.

  ## Validator Auto Operation Service

  We are providing a validator auto-operation service for those who want to operate a validator without any hassle.

  Epics DAO Discord: <https://discord.gg/HDTy96Wr2W>

## 4.4.10

### Patch Changes

- [#252](https://github.com/EpicsDAO/solv/pull/252) [`f6e0c34`](https://github.com/EpicsDAO/solv/commit/f6e0c340047b6071410a75eaa6c26092e70f892b) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - ## Update Solana Version v2.0.6 for Testnet

  If you are using solv MEV mode, ignore this step, It will be automatically updated.

  If you are NOT using solv MEV mode, you need to update the Agave CLI with the following command:

  ```bash
  $ solv update && solv update -b
  ```

  ## How to use solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N)
  ? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
  ? Do you want to enable AUTO RESTART? (Recommended) (y/N)
  ※ Please turn off if you are using no-downtime migration.
  ? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
  ```

  1.  Enable solv MEV Mode.
  2.  Enable AUTO UPDATE.
  3.  Enable AUTO RESTART.
      ※ Please turn off if you are using no-downtime migration.
      ※ No-downtime migration requires spare server and manual restart.
  4.  Enter your Discord Webhook URL.
      ※ You can receive notifications about the Solana/solv version update.
  5.  Enter RPC URL (Mainnet Only)
  6.  Enter Harvest Account (Mainnet Only)

  ## How to disable solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N) n
  ✅ Cron Job successfully removed.
  ```

  ## Added - solv update --config

  You can now update the solv configuration file with the following command:

  ```bash
  $ solv update --config
  ```

  This command will update the default Solana version.

  ## Validator Auto Operation Service

  We are providing a validator auto-operation service for those who want to operate a validator without any hassle.

  Epics DAO Discord: [https://discord.gg/HDTy96Wr2W](https://discord.gg/HDTy96Wr2W)

## 4.4.9

### Patch Changes

- [#250](https://github.com/EpicsDAO/solv/pull/250) [`31efecb`](https://github.com/EpicsDAO/solv/commit/31efecb8227e4bc84a252a5b6b736f037a3bdc02) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - ## Add options - solv scp download/solv switch

  Now you can use the argument `--switchType` and `--ip` to specify the switch type.

  If this argument is not specified, the prompt will ask you to select the switch type.

  ```bash
  $ solv switch --ip <IP address> --switchType <switch type>
  ```

  Now you can use the argument `--ip` to specify the IP address of the node you want to download the SSH key from.

  If this argument is not specified, the prompt will ask you to select the switch type.

  ```bash
  $ solv scp download --ip <IP address>
  ```

  ```bash
  $ solv scp upload --ip <IP address>
  ```

  ## Migrate to Validator Auto Operation Support Service

  Discord: [EpicsDAO Discord](https://discord.gg/HDTy96Wr2W)

## 4.4.8

### Patch Changes

- [#247](https://github.com/EpicsDAO/solv/pull/247) [`e73103a`](https://github.com/EpicsDAO/solv/commit/e73103acf9bf1ac6bb1b8b583526fb49d1e91a2d) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - solv scp download

  Now solv scp download command will download the following files:

  - mainnet-validator-keypair.json
  - mainnet-vote-account-keypair.json
  - mainnet-authority-keypair.json
  - unstaked-identity.json
  - relayer-identity.json
  - testnet-validator-keypair.json
  - testnet-vote-account-keypair.json
  - testnet-authority-keypair.json

  It will ignore if the files are not found in the destination node.

## 4.4.7

### Patch Changes

- [`50d9167`](https://github.com/EpicsDAO/solv/commit/50d9167780604f379e2b3929aad757d0fab797b9) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - small bug fix

## 4.4.6

### Patch Changes

- [`4e9286d`](https://github.com/EpicsDAO/solv/commit/4e9286de09ab5e099139814b1b799fc5e1f495e5) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - fix - solv update --config

  You can now update the solv configuration file with the following command:

  ```bash
  $ solv update --config
  ```

  This will update the default Solana version.

## 4.4.5

### Patch Changes

- [#242](https://github.com/EpicsDAO/solv/pull/242) [`74d5d1b`](https://github.com/EpicsDAO/solv/commit/74d5d1b75632ef13dcf531ced8cf00d69ba8077f) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update Solana Version for mainnet/testnet

  If you are using solv MEV mode, ignore this step, It will be automatically updated.

  If you are NOT using solv MEV mode, you need to update the Agave CLI with the following command:

  ```bash
  $ solv update && solv update -b
  ```

  ## How to use solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N)
  ? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
  ? Do you want to enable AUTO RESTART? (Recommended) (y/N)
  ※ Please turn off if you are using no-downtime migration.
  ? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
  ```

  1.  Enable solv MEV Mode.
  2.  Enable AUTO UPDATE.
  3.  Enable AUTO RESTART.
      ※ Please turn off if you are using no-downtime migration.
      ※ No-downtime migration requires spare server and manual restart.
  4.  Enter your Discord Webhook URL.
      ※ You can receive notifications about the Solana/solv version update.
  5.  Enter RPC URL (Mainnet Only)
  6.  Enter Harvest Account (Mainnet Only)

  ## How to disable solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N) n
  ✅ Cron Job successfully removed.
  ```

  ## Added - solv update --config

  You can now update the solv configuration file with the following command:

  ```bash
  $ solv update --config
  ```

  This command will update the default Solana version.

## 4.4.4

### Patch Changes

- [#240](https://github.com/EpicsDAO/solv/pull/240) [`7b00e5e`](https://github.com/EpicsDAO/solv/commit/7b00e5e78060ba84adee6cf0f97d47a66e0c4ea3) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update Solana Version v2.0.4 for Testnet

  If you are using solv MEV mode, ignore this step, It will be automatically updated.

  If you are NOT using solv MEV mode, you need to update the Agave CLI with the following command:

  ```bash
  $ solv update && solv update -b
  ```

  ## How to use solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N)
  ? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
  ? Do you want to enable AUTO RESTART? (Recommended) (y/N)
  ※ Please turn off if you are using no-downtime migration.
  ? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
  ```

  1.  Enable solv MEV Mode.
  2.  Enable AUTO UPDATE.
  3.  Enable AUTO RESTART.
      ※ Please turn off if you are using no-downtime migration.
      ※ No-downtime migration requires spare server and manual restart.
  4.  Enter your Discord Webhook URL.
      ※ You can receive notifications about the Solana/solv version update.
  5.  Enter RPC URL (Mainnet Only)
  6.  Enter Harvest Account (Mainnet Only)

  ## How to disable solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N) n
  ✅ Cron Job successfully removed.
  ```

  ## Added - solv update --config

  You can now update the solv configuration file with the following command:

  ```bash
  $ solv update --config
  ```

  This command will update the default Solana version.

## 4.4.3

### Patch Changes

- [#238](https://github.com/EpicsDAO/solv/pull/238) [`ac2945a`](https://github.com/EpicsDAO/solv/commit/ac2945a7be326c5c20c502dfca75842a887832d3) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update Solana Version v1.18.20 for mainnet

  If you are using solv MEV mode, ignore this step, It will be automatically updated.

  If you are NOT using solv MEV mode, you need to update the Agave CLI with the following command:

  ```bash
  $ solv update && solv update -b
  ```

  ## How to use solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N)
  ? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
  ? Do you want to enable AUTO RESTART? (Recommended) (y/N)
  ※ Please turn off if you are using no-downtime migration.
  ? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
  ```

  1.  Enable solv MEV Mode.
  2.  Enable AUTO UPDATE.
  3.  Enable AUTO RESTART.
      ※ Please turn off if you are using no-downtime migration.
      ※ No-downtime migration requires spare server and manual restart.
  4.  Enter your Discord Webhook URL.
      ※ You can receive notifications about the Solana/solv version update.
  5.  Enter RPC URL (Mainnet Only)
  6.  Enter Harvest Account (Mainnet Only)

  ## How to disable solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N) n
  ✅ Cron Job successfully removed.
  ```

## 4.4.2

### Patch Changes

- [#236](https://github.com/EpicsDAO/solv/pull/236) [`01870b9`](https://github.com/EpicsDAO/solv/commit/01870b9f9e6355c90cff5d05a9e4b08310a0d2c6) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update Solana Version for Testnet v2.0.3

  If you are using solv MEV mode, ignore this step, It will be automatically updated.

  If you are NOT using solv MEV mode, you need to update the Agave CLI with the following command:

  ```bash
  $ solv update && solv update -b
  ```

  ## How to use solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N)
  ? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
  ? Do you want to enable AUTO RESTART? (Recommended) (y/N)
  ※ Please turn off if you are using no-downtime migration.
  ? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
  ```

  1.  Enable solv MEV Mode.
  2.  Enable AUTO UPDATE.
  3.  Enable AUTO RESTART.
      ※ Please turn off if you are using no-downtime migration.
      ※ No-downtime migration requires spare server and manual restart.
  4.  Enter your Discord Webhook URL.
      ※ You can receive notifications about the Solana/solv version update.
  5.  Enter RPC URL (Mainnet Only)
  6.  Enter Harvest Account (Mainnet Only)

  ## How to disable solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N) n
  ✅ Cron Job successfully removed.
  ```

## 4.4.1

### Patch Changes

- [#234](https://github.com/EpicsDAO/solv/pull/234) [`23214b7`](https://github.com/EpicsDAO/solv/commit/23214b782d9f97593d7365aa190add7a94eff4f7) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - solana version v1.18.18 for mainnet

  If you are running a validator on mainnet, please update your solana version to v1.18.18.

  Ignore this step if you are using solv mev mode - automatic update will take care of it.

  If you are not using solv mev mode, please run the following command:

  ```bash
  $ solv update && solv update -b
  ```

  This will update your solana version to v1.18.18 and restart the validator.

  If you want to use no-downtime migration, please refer to the [solv doc](https://solv.epics.dev/en/doc/quickstart/no-downtime-update/).

## 4.4.0

### Minor Changes

- [#232](https://github.com/EpicsDAO/solv/pull/232) [`b6a7ad1`](https://github.com/EpicsDAO/solv/commit/b6a7ad1e49048fc40d75c985d60514fc8387b9dc) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Migrate Solana CLI to Agave CLI for testnet

  It is time to upgrade testnet to v2.0.2.
  If you're running the Solana Labs client you will need to transition to Agave.
  More information here:

  https://github.com/anza-xyz/agave/wiki/Agave-Transition

  ## Breaking Changes for Testnet Validators from Agave v2.0.2

  If you are using solv MEV mode, ignore this step, It will be automatically updated.

  If you are NOT using solv MEV mode, you need to update the Solana CLI to Agave CLI with the following command:

  ```bash
  $ solv update && solv update -b
  ```

  ## How to use solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N)
  ? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
  ? Do you want to enable AUTO RESTART? (Recommended) (y/N)
  ※ Please turn off if you are using no-downtime migration.
  ? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
  ```

  1.  Enable solv MEV Mode.
  2.  Enable AUTO UPDATE.
  3.  Enable AUTO RESTART.
      ※ Please turn off if you are using no-downtime migration.
      ※ No-downtime migration requires spare server and manual restart.
  4.  Enter your Discord Webhook URL.
      ※ You can receive notifications about the Solana/solv version update.
  5.  Enter RPC URL (Mainnet Only)
  6.  Enter Harvest Account (Mainnet Only)

  ## How to disable solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N) n
  ✅ Cron Job successfully removed.
  ```

## 4.3.0

### Minor Changes

- [#227](https://github.com/EpicsDAO/solv/pull/227) [`d8c5219`](https://github.com/EpicsDAO/solv/commit/d8c52190fc36274b16633bd4a38e7b04b448e19f) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - ## No more SSH login required for Solana/solv version update!

  Auto Solana/solv version update by solv mev

  Updated `solv mev` Mode for Testnet & Mainnet

  Now solv mev mode will automatically update the Solana/solv version for you.
  You can now update the Solana/solv version without the need to SSH login to the server.

  ## How to use solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N)
  ? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
  ? Do you want to enable AUTO RESTART? (Recommended) (y/N)
  ※ Please turn off if you are using no-downtime migration.
  ? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
  ```

  1. Enable solv MEV Mode.
  2. Enable AUTO UPDATE.
  3. Enable AUTO RESTART.
     ※ Please turn off if you are using no-downtime migration.
     ※ No-downtime migration requires spare server and manual restart.
  4. Enter your Discord Webhook URL.
     ※ You can receive notifications about the Solana/solv version update.
  5. Enter RPC URL (Mainnet Only)
  6. Enter Harvest Account (Mainnet Only)

  ## How to disable solv mev mode?

  Run the following command:

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode?(You can change it again) (y/N) n
  ✅ Cron Job successfully removed.
  ```

  ## What is solv MEV Mode?

  solv MEV Mode is a feature that automatically checks/updates the Solana/solv status/version for you.
  solv epochTimer will be set to cron job and will automatically check the validator's health status and update the Solana/solv version.
  It will also send notifications to your Discord channel.

  solv epochTimer checks following items:

  - Check Validator Account Balance
    Send a notification if the balance is less than 0.5 SOL.
  - Check Validator Health Status
    Send a notification if the validator is not voting or is delinquent.
  - Check Solana/solv Version Update
    Send a notification if the Solana/solv version is not up-to-date.
    Update the Solana/solv version automatically.
    Restart validator if it is required.
    Send a notification after the Solana/solv version update.
  - Auto Harvest (Mainnet Only)
    Withdraw the rewards from vote account to the authority account.
    Calculate the balance needed for the next epoch.
    Transfer the balance from the validator account to the vote account.
    Convert SOL to LST(Liquid Staking Token) and send it to the harvest account.

## 4.2.10

### Patch Changes

- [#225](https://github.com/EpicsDAO/solv/pull/225) [`5b00ad8`](https://github.com/EpicsDAO/solv/commit/5b00ad89270b5077f66508a169b6e08228600c44) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update solv setup for cpu governor/sysctl.conf

  ## Update - solv setup for cpu governor/sysctl.conf

  ### CPU Governor

  The CPU governor is a driver that manages how the CPU scales frequency and voltage. The CPU governor can be set to performance, powersave, ondemand, conservative, schedutil, and userspace.
  solv setup will set the CPU governor to performance.

  - performance: The CPU runs at the maximum frequency.
  - powersave: The CPU runs at the minimum frequency.
  - ondemand: The CPU runs at the maximum frequency when the system is busy and at the minimum frequency when the system is idle.
  - conservative: The CPU runs at the maximum frequency when the system is busy and at the minimum frequency when the system is idle. It is more aggressive than ondemand.
  - schedutil: The CPU runs at the maximum frequency when the system is busy and at the minimum frequency when the system is idle. It is more aggressive than ondemand.

  If you are already running node,
  you can set the CPU governor to performance by running the following command.

  ```bash
  echo "performance" | sudo tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor
  ```

  Then, delete the existing ledger and snapshot files and restart the node.

  ```bash
  $ solv restart --rm
  ```

  ### Socket buffer sizes and TCP congestion control

  Depends on the kernel version, the sysctl.conf settings can be different.
  solv setup will set the following sysctl.conf settings if it's not set.

  ```bash
  # set default and maximum socket buffer sizes to 128MB
  net.core.rmem_default=134217728
  net.core.wmem_default=134217728
  net.core.rmem_max=134217728
  net.core.wmem_max=134217728

  # set minimum, default, and maximum tcp buffer sizes (10k, 87.38k (linux default), 128MB resp)
  net.ipv4.ttcp_rmem=10240 87380 134217728
  net.ipv4.tcp_wmem=10240 87380 134217728

  # Enable TCP westwood for kernels greater than or equal to 2.6.13
  net.ipv4.tcp_congestion_control=westwood
  ```

## 4.2.9

### Patch Changes

- [`efa7050`](https://github.com/EpicsDAO/solv/commit/efa70508071851e348c67d8657e7d4087f9977e1) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - fix - randomSleep

## 4.2.8

### Patch Changes

- [#221](https://github.com/EpicsDAO/solv/pull/221) [`17bf2a5`](https://github.com/EpicsDAO/solv/commit/17bf2a5ec10f44a77db77e956e97782d155c60d9) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - ## Update - epochTimer/solv restart

  ### Epoch Timer

  Epoch Timer will be set in cron job to check the epoch timer every 5 minutes.
  (※ You need solv mev to enable MEV mode)

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode? (y/N) y
  ? Enter your RPC URL (https://api.mainnet-beta.solana.com)
  ? Enter your Harvest Address (your solana address)
  ? Enter your Discord Webhook URL (https://discord.com/api/webhooks/11111111/xxxxxxxx)
  ```

  This will enable solv MEV Mode on your validator instance.
  MEV Mode will allow you to harvest your rewards to your authority account every right before the epoch ends.
  Then convert SOL to elSOL (LST) and send it to your desired account.

  ### Epoch Timer Sends Discord Notification

  Epoch Timer will send a Discord notification when the epoch is less than 1 day, 8 hours, 1 hour and the new epoch starts.

  - New Epoch
  - Less than 1 day
  - Less than 8 hours
  - Less than 1 hours
    solv harvest will be executed automatically if solv MEV Mode is enabled.

  Besides, the epoch timer checks the Validator Account Balance and sends a notification when the balance is less than 0.5 SOL.

  ### solv Harvest

  solv harvest will be executed automatically if solv MEV Mode is enabled.
  This will harvest your rewards to your authority account every right before the epoch ends.
  Then convert SOL to elSOL (LST) and send it to your desired account.

  1. Withdraw rewards from the Vote Account to the Validator Authority Account.
  2. Calculate the amount of SOL to be transferred from the Validator Account to the Authority Account.
  3. Convert the amount of SOL to elSOL (LST).
  4. Transfer the elSOL (LST) to the desired account.

  This strategy keeps the balance of SOL in your validator node low, enhancing security by mitigating the risk of large-scale SOL withdrawals. By immediately converting earned rewards to LST, it ensures high yield maintenance.

  ## solv restart --rm option

  This will remove the snapshot and restart the Solana Validator from the new snapshot.

  ```bash
  $ solv restart --rm
  ```

  equivalent to

  ```bash
  $ solv stop
  $ solv rm:snapshot
  $ solv get snapshot
  $ solv start
  ```

## 4.2.7

### Patch Changes

- [#219](https://github.com/EpicsDAO/solv/pull/219) [`b7eea28`](https://github.com/EpicsDAO/solv/commit/b7eea282e409a231660fed87653003b4ae559f73) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - # ⚠️ Security Patch

  If you are using other than the 1:8.9p1-3ubuntu0.10 version of OpenSSH, you should update it to the latest version.
  This version fixes a security vulnerability that allows an attacker to execute arbitrary code on the server.

  ## Update solv version

  ```bash
  $ solv update
  ```

  ## Check/Update OpenSSH - solv update --ssh

  This command will check the OpenSSH version and update it if necessary.
  ※ Recommended to run this command on the server to check the OpenSSH version.

  ```bash
  $ solv update --ssh
  ```

## 4.2.6

### Patch Changes

- [`8edc764`](https://github.com/EpicsDAO/solv/commit/8edc7649914cb6fc0179dfa93123148278fef34e) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - fix decimal

## 4.2.5

### Patch Changes

- [`dc7742e`](https://github.com/EpicsDAO/solv/commit/dc7742eed4a543136716a7048afe1198e33ee0d7) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - small bug fix

## 4.2.4

### Patch Changes

- [`fcc24d7`](https://github.com/EpicsDAO/solv/commit/fcc24d7bf991fec6dd72a47fa45c8d31a710bb4b) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update - solv hv

## 4.2.3

### Patch Changes

- [#214](https://github.com/EpicsDAO/solv/pull/214) [`5c2b014`](https://github.com/EpicsDAO/solv/commit/5c2b014423303e41d3ae93581482156c3cecc9c3) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Add - solv MEV Mode

  This will enable solv MEV Mode on your validator instance.
  MEV Mode will allow you to harvest your rewards to your authority account every right before the epoch ends.
  Then convert SOL to elSOL (LST) and send it to your desired account.

  ```bash
  $ solv mev
  ? Do you want to enable solv MEV Mode? (y/N) y
  ? Enter your RPC URL (https://api.mainnet-beta.solana.com)
  ? Enter your Harvest Address (your solana address)
  ? Enter your Discord Webhook URL (https://discord.com/api/webhooks/11111111/xxxxxxxx)
  ```

  This strategy keeps the balance of SOL in your validator node low, enhancing security by mitigating the risk of large-scale SOL withdrawals. By immediately converting earned rewards to LST, it ensures high yield maintenance.

## 4.2.2

### Patch Changes

- [#212](https://github.com/EpicsDAO/solv/pull/212) [`e716714`](https://github.com/EpicsDAO/solv/commit/e7167146aca72c71467a9cd4c5feeed600a1de69) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - fix - solv tr

## 4.2.1

### Patch Changes

- [#210](https://github.com/EpicsDAO/solv/pull/210) [`5c1451e`](https://github.com/EpicsDAO/solv/commit/5c1451e93695ce7364939967ccd43b2b03388c12) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - ## New Features - v4.2.0~v4.2.1

  - Added Solana Liquid Staking Command
  - Added Solana Transfer Command
  - Added Auto Reward Harvest Command
  - Added Epoch Timer
  - Improved setup command
  - Improved log command
  - Added solv df command
  - Migrated to ESM Module
  - Added Turbo Repo

  * You should set the SOLANA_RPC_URL in the .env file to use this feature effectively.

  ### Solana Liquid Staking Command

  ```bash
  $ solv stake --lst
  ```

  ### Solana Transfer Command

  ```bash
  $ solv transfer/tr
  ```

  ### Auto Reward Harvest Command

  This command collects all rewards into the authority account, converts the gathered SOL to elSOL, and then transfers the elSOL to an external harvest account.

  This ensures that, in the event of a node hack, assets are not held within the node. Additionally, it allows immediate staking of rewards, thereby enhancing performance.

  ※ To use this command, you must first set the harvest account in the solv.config.json file. During the initial execution, you can input this information interactively.

  Please ensure that this account information is never stored on the validator server.

  ```bash
  $ solv harvest/hv
  ```

  Soon, we will be adding the ability to run the harvest command by the epochTimer.

  ### Epoch Timer

  The epochTimer is a feature that allows you to set a specific time to run the some commands.
  This feature is especially useful for those who want to stake rewards at before the epoch change.

  - You need to set `DISCORD_WEBHOOK_URL` in the `.env` file to use this feature.

  ```bash
  $ solv epochTimer
  ```

  ### Improved setup command

  The setup command has been improved to allow you to set up without mounting the volume.

  ```bash
  $ solv setup
  ```

  ### Improved log command

  small bug fixes and improvements

  ```bash
  $ solv log
  ```

  ### Added solv df command

  This command shows the disk usage of the validator server.

  ```bash
  $ solv df
  ```

  ### Migrated to ESM Module

  solv has been migrated to ESM Module.

  ### Added Turbo Repo

  We have added a Turbo Repo to manage the solv package.

## 4.2.0

### Minor Changes

- [#204](https://github.com/EpicsDAO/solv/pull/204) [`bd8cf63`](https://github.com/EpicsDAO/solv/commit/bd8cf63feed2459ee1f467b3582e94153de7f74f) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update solv stake/setup/bal - added LST stake, improved solv setup, added solv bal --spl option

  - Added LST stake command

  ```bash
  $ solv stake --lst
  ? Enter Stake Pool Address(default: elSOL) So1vW4Bm6ZURzJJHZy1JpsjoVY68z4cDgF4tTLwYMa5
  mintPubkey: ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC
  ? 🪙  elSOL
  Name: Enhanced Linkage SOL
  Token Mint: ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC
  Is this the correct Stake Pool? Yes
  📗 Selected Wallet: LKnGHsjr7UYBXnzfbrz4k6QotCz56rMQTSiVwdRSyL9
  💰 Account Balance: 0.057570418 SOL
  ⚠️ 0.03 SOL will be remaining in the account if you just press enter.
  ? Enter amount of SOL to stake: (0.027570418) 0.01
  ? Enter amount of SOL to stake: 0.01
  ⠹ 🔄 Converting SOL to elSOL

  💰 You've got elSOL ✨

  Signature: 4mNRWK47J3SuMpE81fJGdvaKp53jr7zHYBt9Z4w8Qnc6XJt...
  ```

  - Added solv bal --spl option

  ```bash
  $ solv bal --spl
  Token                                         Balance
  ------------------------------------------------------------
  LSTxxxnJzKDFSLr4dUkPcmCf5VyryEqzPLz5j4bpxFp   0.007602296
  bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1   0.008774606
  vSoLxydx6akxyMD9XEcPvGYNGq6Nn66oqVb3UkGkei7   0.009848148
  BLZEEuZUBVqFhj8adcCFPJvPVCiCyVmh3hkJMrU8KuJA  2508.993638692
  ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC  150.316704143
  ```

  - Improved solv setup command

  Now solv setup reads the root dir's volume and set the default swap size depending on the available space.

  ```bash
  $ solv setup
  ```

## 4.1.17

### Patch Changes

- [#202](https://github.com/EpicsDAO/solv/pull/202) [`3b09abb`](https://github.com/EpicsDAO/solv/commit/3b09abb3f5a11323ca8b47109b72e80a47a462a9) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - solana version testnet

## 4.1.16

### Patch Changes

- [#200](https://github.com/EpicsDAO/solv/pull/200) [`3fb68b7`](https://github.com/EpicsDAO/solv/commit/3fb68b7cc1a1a5c3fec6878e66c28c59505be06d) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - solv change for testnet

## 4.1.15

### Patch Changes

- [#198](https://github.com/EpicsDAO/solv/pull/198) [`567b6fa`](https://github.com/EpicsDAO/solv/commit/567b6fa795d3eebc8a7f72e5fb9420fdd5b713f6) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - testnet setup

  Removed `--known-validator` flag due to the testnet entrypoint is having some problems with it.

  For now, download the snapshot and use the snapshot without the `--known-validator` flag and `--only-known-rpc`

## 4.1.14

### Patch Changes

- [#196](https://github.com/EpicsDAO/solv/pull/196) [`992cd1d`](https://github.com/EpicsDAO/solv/commit/992cd1d5fc802effb9c35fc6b91eec9ddfb29983) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - fix - solv stake

## 4.1.13

### Patch Changes

- [#194](https://github.com/EpicsDAO/solv/pull/194) [`e05a340`](https://github.com/EpicsDAO/solv/commit/e05a340f1b4ef482529841b949c9e20cddd42382) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - fix - solv stake

## 4.1.12

### Patch Changes

- [#192](https://github.com/EpicsDAO/solv/pull/192) [`5621656`](https://github.com/EpicsDAO/solv/commit/562165657731993f88ada0aba1ce49df6df9cca7) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Fix - solv stake

## 4.1.11

### Patch Changes

- [#190](https://github.com/EpicsDAO/solv/pull/190) [`f5f9712`](https://github.com/EpicsDAO/solv/commit/f5f97128a65c60ba6b30a166a89f3942dab4b9ed) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Updated - solv stake/bal
  Added - `--block-production-method` Option to start up script

  1. Updated solv stake Command

  ```bash
  $ solv stake
  ```

  2. Updated solv bal Command

  ```bash
  $ solv bal
  Validator Key: /home/solv/mainnet-validator-keypair.json
  Address: Kedrgergdfgefa77CurDSCnRDVGTMND9oyv74ZteE2
  Balance: 8.861048808 SOL
  Vote Key: /home/solv/mainnet-vote-account-keypair.json
  Address: Sfgerth6kjXVTTJb2nWbuK3mZQXnMrrbMPxYU7uhbL7
  Balance: 6.533068439 SOL
  Authority Key: /home/solv/mainnet-authority-keypair.json
  Address: GfeghhjJQ9EQ76hTYFXF3ohcFieSrUTSfoNXd
  Balance: 0.510711586 SOL
  Active Identity:
  Kedrgergdfgefa77CurDSCnRDVGTMND9oyv74ZteE2
  ```

  3. Added `--block-production-method` Option to start up script

  `/home/solv/start-validator.sh`

  ```bash
  ..
  --block-production-method central-scheduler \\
  ```

  ===============================================

  Beside, Added Turbo Repo to manage the Solv project

## 4.1.10

### Patch Changes

- [#188](https://github.com/EpicsDAO/solv/pull/188) [`c500e86`](https://github.com/EpicsDAO/solv/commit/c500e86eb40903023c09990d246a95694d34d378) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update solana version for testnet

## 4.1.9

### Patch Changes

- [#185](https://github.com/EpicsDAO/solv/pull/185) [`818aed9`](https://github.com/EpicsDAO/solv/commit/818aed976deb29aec95c1e72db8ff08b1b13a9c1) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update solana version for mainnet

  ```bash
  $ solv update && solv update -b
  ```

## 4.1.8

### Patch Changes

- [#183](https://github.com/EpicsDAO/solv/pull/183) [`ca2fdec`](https://github.com/EpicsDAO/solv/commit/ca2fdecbf8168953ad7ef4e40b1f1398029932e3) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - solv restart

  ```bash
  $ solv restart
  ```

  This command will do this command below;

  ```bash
  solana-validator --ledger /mnt/ledger exit --max-delinquent-stake 5
  ```

  You can change `--max-delinquent-stake` value as you edit the `solv` configuration file.

  `/home/solv/solv.config.json`

  ```json
  {
    ,...
    "maxDelinquentStake": 5
  }
  ```

## 4.1.7

### Patch Changes

- [#181](https://github.com/EpicsDAO/solv/pull/181) [`47fd22d`](https://github.com/EpicsDAO/solv/commit/47fd22d65837a2f47e8a7a98119adbb7ee43aa33) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update solana version for testnet

## 4.1.6

### Patch Changes

- [#179](https://github.com/EpicsDAO/solv/pull/179) [`afae6e3`](https://github.com/EpicsDAO/solv/commit/afae6e3d9e8c948ed3b120218fcd0d38734529ac) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update solv change inactive side

## 4.1.5

### Patch Changes

- [#177](https://github.com/EpicsDAO/solv/pull/177) [`1d208f8`](https://github.com/EpicsDAO/solv/commit/1d208f8dfa6dd6cb2d780b21754ff2e334e23c2f) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update solana version for testnet

## 4.1.4

### Patch Changes

- [#168](https://github.com/EpicsDAO/solv/pull/168) [`dcf0a7f`](https://github.com/EpicsDAO/solv/commit/dcf0a7f663ea3e8eb9dd3a1d5b6de1b9c0c8047a) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update solana version for testnet

  ## Update solv

  ```bash
  $ solv update
  $ solv -V
  4.1.4
  ```

  ## Update Solana Validator Version for testnet

  ```bash
  $ solv update -b
  ```

  You can always check the validator status by running the following command:

  ```bash
  $ solv monitor
  ```

## 4.1.3

### Patch Changes

- [#166](https://github.com/EpicsDAO/solv/pull/166) [`a148b48`](https://github.com/EpicsDAO/solv/commit/a148b48f076036c4fb3515633c70381c90261035) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - solv scp download

  fix small bug in scp download

  Update - solv get snapshot

  added minDownloadSpeed option

  ```bash
  solv get snapshot -m 45
  ```

## 4.1.2

### Patch Changes

- [#160](https://github.com/EpicsDAO/solv/pull/160) [`2618df8`](https://github.com/EpicsDAO/solv/commit/2618df89bbfd69a59f3e673792cf0d5c02728720) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update solv change alert

## 4.1.1

### Patch Changes

- [#158](https://github.com/EpicsDAO/solv/pull/158) [`fb61089`](https://github.com/EpicsDAO/solv/commit/fb61089e000178b936349fa0d2ee402c3821d2f2) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - fix - solv get snapshot

  Install script updated

  ```bash
  $ bash -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v4.1.16/install")"
  $ cd ~ && source ~/.profile
  $ solv setup
  ```

## 4.1.0

### Minor Changes

- [#156](https://github.com/EpicsDAO/solv/pull/156) [`39205e5`](https://github.com/EpicsDAO/solv/commit/39205e573877208ca8cfa643f4dd5de232cb2523) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - ## New Features - v4.0.0~v4.1.0

  - Jito Relayer Setup
  - Jito RPC Setup
  - No Downtime Migration
  - Snapshot Download Speed Improved 100x~ Faster

  ### Snapshot Download Speed Improved 100x~ Faster

  solv integrated with solana snapshot finders for Solana Mainnet and Testnet.
  This will improve the snapshot download speed 100x~ faster than before.
  Greatly reduce the time to start the Solana Validator.

  Special Thanks to c29r3 for the great OSS ⭐️

  - [Solana Snapshot Finder](https://github.com/c29r3/solana-snapshot-finder)

  If your node does not start, you can try the following command.

  ```bash
  $ solv stop
  $ solv rm:snapshot
  $ solv get snapshot
  $ solv start
  ```

  ### No Downtime Migration

  solv supports no downtime migration for Solana Validator.
  You can migrate your Solana Validator to other servers without restarting the Solana Validator.

  `solv change` command will help you to migrate your Solana Validator to other servers.

  Prepare your new server(Inactive) and current server(Active) with the latest slot.
  Then run the following command on new server(Inactive) and current server(Active).

  ※ Please make sure to backup your keys before running the command.
  ※ Please make sure to run the new server with solv4 as a dummy mode.
  ※ Please make sure running the current server with solv4 as NOT a dummy mode.

  Run the following command on the current server(Active).
  You will be asked to enter the new server IP address.

  ```bash
  $ solv change
  ```

  Then, you should quickly run the following command on the new server(Inactive).

  ```bash
  $ solv change
  ```

  This function was created with reference to the following link.

  Special Thanks to pumpkins-pool for the great OSS ⭐️

  - [Pumpkin's Pool - Identity Transition](https://pumpkins-pool.gitbook.io/pumpkins-pool)

  ## Jito MEV Setup

  You can select the mainnet for Jito MEV or RPC Jito Client🎉

  ![](https://storage.googleapis.com/epics-bucket/solv/assets/mainnet-select.png)

  Also you have option to select Jito Relayer.

## 4.0.2

### Patch Changes

- [#154](https://github.com/EpicsDAO/solv/pull/154) [`10a667f`](https://github.com/EpicsDAO/solv/commit/10a667f10913906eeed2626d8ae313c3e739613e) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update solana version for mainnet

      ## Update solv

      ```bash
      $ solv update
      $ solv -V
      4.0.2
      ```

      ## Update Solana Validator Version

      ```bash
      $ solv update -b
      ```

      You can always check the validator status by running the following command:

      ```bash
      $ solv monitor
      ```

## 4.0.1

### Patch Changes

- [#149](https://github.com/EpicsDAO/solv/pull/149) [`b98ad4d`](https://github.com/EpicsDAO/solv/commit/b98ad4d6b465b0f00ceedf598ef214091886b5a2) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update solana version for testnet

## 4.0.0

### Major Changes

- [#147](https://github.com/EpicsDAO/solv/pull/147) [`0043376`](https://github.com/EpicsDAO/solv/commit/0043376b943840960cc59b5ec9707c03c12dfa56) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - solv4

  ## New Features

  - No Downtime Migration
  - Jito RPC Setup
  - Jito Relayer Setup
  - Compatible with Google Cloud (※You need to setup firewall and disk settings yourself)
  - New solv CLI Commands

  ## How to Update

  ```bash
  $ solv update
  ```

  ## No Downtime Migration

  Now you can migrate your validator without downtime.
  You need to setup your new server with solv4.
  (solv4 uses symbolic link to define the validator keypair path.)

  1. Setup your new server with solv4 as Dummy Server (Inactive Side)
     Please upload your main keys to the new server before setup.

  - mainnet-validator-keypair.json
  - mainnet-vote-account-keypair.json
  - mainnet-authority-keypair.json

  Please create SSH connection between your old server and new server.

  Create SSH Public Key.

  ```bash
  $ solv scp init
  ```

  Create SSH Connection.

  ```bash
  $ solv scp create
  ```

  Upload your keys to the new server.

  ```bash
  $ solv scp upload
  ```

  Download your keys from the old server.

  ```bash
  $ solv scp download
  ```

  2. Setup your new server with solv4 as Active Side

  ```bash
  $ solv setup
  ```

  Then, Please select Dummy Mode.

  Once the new server is ready, you can run `solv change` command to switch the server on Active Side to make it Inactive.

  ```bash
  $ solv change
  ```

  Then, immidiately run `solv change` command on the new server to switch the server on Active Side.

  ```bash
  $ solv change
  ```

## 3.4.2

### Patch Changes

- [#143](https://github.com/EpicsDAO/solv/pull/143) [`17e62da`](https://github.com/EpicsDAO/solv/commit/17e62da9f0d8230bd2d30da1f4f54415b018596d) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update Solana Version for Testnet

  ## Update solv

  ```bash
  $ solv update
  $ solv -V
  3.4.2
  ```

  ## Update Solana Validator Version

  ```bash
  $ solv update -b
  ```

  You can always check the validator status by running the following command:

  ```bash
  $ solv get monitor
  ```

## 3.4.1

### Patch Changes

- [#139](https://github.com/EpicsDAO/solv/pull/139) [`174e1fc`](https://github.com/EpicsDAO/solv/commit/174e1fc9aed3b7a5c0e605acb956b7ea75edc962) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update Solana Mainnet Version

  ## Update solv

  ```bash
  $ solv update
  $ solv -V
  3.4.1
  ```

  ## Update Solana Validator Version

  ```bash
  $ solv update -b
  ```

  You can always check the validator status by running the following command:

  ```bash
  $ solv get monitor
  ```

## 3.4.0

### Minor Changes

- [`c2b1863`](https://github.com/EpicsDAO/solv/commit/c2b1863aa8cc845dc0c80c588e979e01ba6f0dbb) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Add Msg after setup

## 3.3.21

### Patch Changes

- [`a8f9299`](https://github.com/EpicsDAO/solv/commit/a8f929917e4c16b066675244e5e70da447c622b2) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Fix - solv withdraw

  ```bash
  $ solv withdraw
  💰 Current Vote Account Balance: 0.871961248 SOL
  ⚠️ 0.01 SOL will be left in the account if you just press enter.
  ? How many SOL? e.g. 0.861961248 (0.861961248)
  ```

## 3.3.20

### Patch Changes

- [#129](https://github.com/EpicsDAO/solv/pull/129) [`d30d3d9`](https://github.com/EpicsDAO/solv/commit/d30d3d9488f701e254c1e9b7a51f64e3a655e43b) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - solana testnet version to v1.18.12

  ```
  $ solv update && solv update -b
  ```

  Added new feature - solv CLI

  - `solv rm:log` - Delete validator logs
  - `solv rm:snapshot` - Delete Incremental snapshot and RocksDB
  - `solv withdraw` - Withdraw SOL from Vote Account to Authority Keypair

  Any feedback is welcome!

  [https://discord.gg/vQHfswHmWf](https://discord.gg/vQHfswHmWf)

## 3.3.19

### Patch Changes

- [`4999c70`](https://github.com/EpicsDAO/solv/commit/4999c70c633778cf3d6136336bd68a5c7420b620) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Fix - setup for latitude mainnet

- [`79a5be3`](https://github.com/EpicsDAO/solv/commit/79a5be3e181153d6062c4b26c13c94134dda86be) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - fix - setup for mainnet swapfile

## 3.3.18

### Patch Changes

- [`b9ad64c`](https://github.com/EpicsDAO/solv/commit/b9ad64c910b425ad547cca88621a794c1076b80f) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update solv setup for latitude

## 3.3.17

### Patch Changes

- [#124](https://github.com/EpicsDAO/solv/pull/124) [`7b41a2b`](https://github.com/EpicsDAO/solv/commit/7b41a2b3ce377a89d20d74f53fcc7759fa2dac51) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - Solana Validator Mainnet

  ## Update solv

  ```bash
  $ solv update
  $ solv -V
  3.3.17
  ```

  ## Update Solana Validator Version

  ```bash
  $ solv update -b
  ```

  You can always check the validator status by running the following command:

  ```bash
  $ solv get monitor
  ```

## 3.3.16

### Patch Changes

- [#121](https://github.com/EpicsDAO/solv/pull/121) [`e2ef168`](https://github.com/EpicsDAO/solv/commit/e2ef168da49900e6cc1f593db562b27775749d69) Thanks [@256hax](https://github.com/256hax)! - update solana version(1.18.11 on Testnet)

## 3.3.15

### Patch Changes

- [`56a56a9`](https://github.com/EpicsDAO/solv/commit/56a56a9d4f3ade5b76f99df1d7b91b8716fde9ce) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update - solv setup --swap

## 3.3.14

### Patch Changes

- [#118](https://github.com/EpicsDAO/solv/pull/118) [`46694f9`](https://github.com/EpicsDAO/solv/commit/46694f9c02a34a5ded45af6a1f64005e7798b846) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Add - solv setup --swap

  ※ This is for mainnet only.

  Added solv setup --swap to create `/swapfile` and enable swap on the system.
  This command will check if the current system has enough memory to create a swap file.
  If the system has enough memory, it will skip creating the swap file.
  If not, it will create a swap file and enable swap on the system.

  ```bash
  $ solv update
  $ solv -V
  3.3.14
  $ solv setup --swap
  ```

  Please check `/etc/fstab` to make sure the `/swapfile` is enabled on boot.
  Usually, no need to do anything as the default setup will enable the swap file on boot.

  ```bash
  cat /etc/fstab
  # /etc/fstab: static file system information.
  #
  # Use 'blkid' to print the universally unique identifier for a
  # device; this may be used with UUID= as a more robust way to name devices
  # that works even if disks are added and removed. See fstab(5).
  #
  # <file system> <mount point>   <type>  <options>       <dump>  <pass>
  # / was on /dev/vda2 during curtin installation
  /dev/disk/by-uuid/00f0ec87-743a-44b8-907a-418bbde80cab / ext4 defaults 0 1
  # /boot/efi was on /dev/vda1 during curtin installation
  /dev/disk/by-uuid/3BD4-D1A7 /boot/efi vfat defaults 0 1
  /swapfile swap swap defaults 0 0
  /dev/nvme1n1        /mnt/ledger     ext4 auto 0 0
  /dev/nvme0n1        /mnt/accounts     ext4 auto 0 0
  ```

## 3.3.13

### Patch Changes

- [`5b5d107`](https://github.com/EpicsDAO/solv/commit/5b5d10727d0aa724f8ac9a4270ac9b2eacefd774) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Fix - solv stake

## 3.3.12

### Patch Changes

- [#111](https://github.com/EpicsDAO/solv/pull/111) [`32f23dd`](https://github.com/EpicsDAO/solv/commit/32f23dd0a59acf90dc1dee07b4291be6c8f80c0b) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update - solv stake

## 3.3.11

### Patch Changes

- [#108](https://github.com/EpicsDAO/solv/pull/108) [`2bafc7e`](https://github.com/EpicsDAO/solv/commit/2bafc7e1f42c6fca34d43df2abac74732fb6542c) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Fix - solv setup for jitoMEV

  ```bash
  $ solv setup
  ```

## 3.3.10

### Patch Changes

- [`18a7eeb`](https://github.com/EpicsDAO/solv/commit/18a7eebf683ec1bbab3a1964dd7a9fb4dfaa90e5) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update Solana Version for Testnet

      ## Update solv

      ```bash
      $ solv update
      $ solv -V
      3.3.10
      ```

      ## Update Solana Validator Version

      ```bash
      $ solv update -b
      ```

      You can always check the validator status by running the following command:

      ```bash
      $ solv get monitor
      ```

## 3.3.9

### Patch Changes

- [`70980e7`](https://github.com/EpicsDAO/solv/commit/70980e780500e491ec93351d89581feb23457b8c) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Remove unnecessary dependencies

## 3.3.8

### Patch Changes

- [#103](https://github.com/EpicsDAO/solv/pull/103) [`bc8eb0a`](https://github.com/EpicsDAO/solv/commit/bc8eb0af632d7d2b5cc1ad1b2192cafc02dd64fb) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update solana version for mainnet/testnet

  ## Update solv

  ```bash
  $ solv update
  $ solv -V
  3.3.8
  ```

  ## Update Solana Validator Version

  ```bash
  $ solv update -b
  ```

  You can always check the validator status by running the following command:

  ```bash
  $ solv get monitor
  ```

## 3.3.7

### Patch Changes

- [`0b2cb2c`](https://github.com/EpicsDAO/solv/commit/0b2cb2c1aae8d4a995d594efb0acc3b7a156ed28) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - update changeset
