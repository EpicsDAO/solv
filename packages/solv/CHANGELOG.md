# @epics-dao/solv

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
  $ bash -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v4.1.2/install")"
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
