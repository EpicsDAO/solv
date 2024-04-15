# @epics-dao/solv

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
