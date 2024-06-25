# solv-doc

## 0.2.1

### Patch Changes

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

## 0.2.0

### Minor Changes

- [#170](https://github.com/EpicsDAO/solv/pull/170) [`2e88696`](https://github.com/EpicsDAO/solv/commit/2e886961c66d6c4e93c482fbafeb3167917e46df) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - add - nodowntime and modify tutorial

## 0.1.2

### Patch Changes

- [#158](https://github.com/EpicsDAO/solv/pull/158) [`fb61089`](https://github.com/EpicsDAO/solv/commit/fb61089e000178b936349fa0d2ee402c3821d2f2) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - fix - solv get snapshot

  Install script updated

  ```bash
  $ bash -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v4.1.16/install")"
  $ cd ~ && source ~/.profile
  $ solv setup
  ```

## 0.1.1

### Patch Changes

- [#98](https://github.com/EpicsDAO/solv/pull/98) [`1fded57`](https://github.com/EpicsDAO/solv/commit/1fded570b9ae6edfaa1656baa3867a4153a286ef) Thanks [@POPPIN-FUMI](https://github.com/POPPIN-FUMI)! - Update install script

  ```bash
  $ bash -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v4.1.16/install")"
  $ cd ~ && source ~/.profile
  $ solv setup
  ```
