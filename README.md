<p align="center">
  <a href="https://solv.epics.dev/">
    <img src="https://storage.googleapis.com/epics-bucket/solv/assets/v3/solvEN.png" alt="solv" />
  </a>

  <a href="https://twitter.com/intent/follow?screen_name=EpicsDAO2">
    <img src="https://img.shields.io/twitter/follow/EpicsDAO2.svg?label=Follow%20@EpicsDAO2" alt="Follow @EpicsDAO2" />
  </a>
  <br/>
  <a aria-label="npm version" href="https://www.npmjs.com/package/@epics-dao/solv">
    <img alt="" src="https://badgen.net/npm/v/@epics-dao/solv">
  </a>
  <a aria-label="Downloads Number" href="https://www.npmjs.com/package/@epics-dao/solv">
    <img alt="" src="https://badgen.net/npm/dt/@epics-dao/solv">
  </a>
  <a aria-label="License" href="https://github.com/EpicsDAO/solv/blob/master/LICENSE.txt">
    <img alt="" src="https://badgen.net/badge/license/Apache/blue">
  </a>
    <a aria-label="Code of Conduct" href="https://github.com/EpicsDAO/solv/blob/master/CODE_OF_CONDUCT.md">
    <img alt="" src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg">
  </a>
</p>

## CLI Tool for Managing Solana Validators - "solv"

The utility tool for Solana Validators

solv is an open-source tool designed to simplify the setup and operation of Solana validators and RPC nodes.

## 📖 Server Spec

- Linux Ubuntu 20.04 LTS
- Linux Ubuntu 22.04 LTS

## Solana Validator Setup

Login in to your Validator server by ssh and run the following command.

```bash
$ sh -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v4.1/install")"
$ cd ~ && source ~/.profile
$ solv setup
```

![](https://storage.googleapis.com/zenn-user-upload/949db29fc401-20240131.png)

Then, select the type of node you want to target.

- `TESTNET_VALIDATOR`
- `MAINNET_VALIDATOR`
- `RPC_NODE`

Then

After startup, the snapshot download will start automatically.
The Solana validator will start 🎊

[![solv](https://storage.googleapis.com/epics-bucket/Validator/solv-install-top.gif)](https://youtu.be/rY4bajhRJgw)

## New Features - v4.0.0~v4.1.0

### Snapshot Download Speed Improved 100x~ Faster

solv integrated with solana snapshot finders for Solana Mainnet and Testnet.
This will improve the snapshot download speed 100x~ faster than before.
Greatly reduce the time to start the Solana Validator.

Thanks to c29r3 for the great work ⭐️

- [Solana Snapshot Finder](https://github.com/c29r3/solana-snapshot-finder)

### No Downtime Migration

solv supports no downtime migration for Solana Validator.
You can migrate your Solana Validator to other servers without restarting the Solana Validator.

`solv change` command will help you to migrate your Solana Validator to other servers.

```bash
$ solv change
```

This function was created with reference to the following link.

Thanks to pumpkins-pool for the great work ⭐️

- [Pumpkin's Pool - Identity Transition](https://pumpkins-pool.gitbook.io/pumpkins-pool)

## Jito MEV Setup

You can select the mainnet for Jito MEV or RPC Jito Client🎉

![](https://storage.googleapis.com/epics-bucket/solv/assets/mainnet-select.png)

## Install solv CLI on your local machine

solv CLI is a tool for managing Solana Validators from your local machine.

```bash
$ sh -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv-cli/v3.0.0/install")"
```

Start solv CLI Dashboard - from your local machine

```bash
$ solv c
```

![Generate Keys](https://storage.googleapis.com/epics-bucket/solv/assets/generate-keys.png)

## Run solv Server CLI - from your validator server

```bash
$ solv s
```

![solv s](https://storage.googleapis.com/epics-bucket/solv/assets/solv-s.png)

## Restart Solana Validator

```bash
$ solv restart
```

Default `solana-validator.sh` command is `--no-incremental-snapshots`.

If you want to download snapshot, you can use the following command.

```bash
$ solv restart --snapshot
```

This command will automatically remove `--no-incremental-snapshots` and add `--no-genesis-fetch`, `--no-snapshot-fetch` to yoursolana-validator.sh command.

## Solana Validator Logs

```bash
$ solv log
```

or

Show only error logs

```bash
$ solv log -e
```

## Show Solana Validator Config

This command will show your all config paths which are used by solana validator.

```bash
$ solv get config
```

## Migrate Solv3 Instructions

We updated the solv version to v3.0.0 to support the latest requirements of Solana Official Docs.

⭐️ Improved

- Changed Mountpoint/Directory as the solana official docs
- Removed unnecessary swapfile and ramdisk
- Added solv s for solv Dashboard (no command maintenance)

Below is the migration guide for existing solv users.(Mainly TDS attendees)

```bash
$ solv update
```

Open solv Dashboard

```bash
$ solv s
```

Set your default Language for initial setup

```bash
Solv Version: v3.0.0

? Select Language (Use arrow keys)
❯ en
  ja
```

Open solv Dashboard again to reflect the language change

```bash
$ solv s
```

[![solv-s](https://storage.googleapis.com/epics-bucket/Validator/solv-s.jpeg)](https://storage.googleapis.com/epics-bucket/Validator/solv-s.jpeg)

Select 5 to migrate to solv v3.x.x

This will automatically update your node to the latest requirements of Solana Official Docs.

If you have any questions, please contact us on Discord.

https://discord.gg/yxm5hJqRhg

## Solana Delegation Program

https://solana.org/delegation-program

## solv CLI

```bash
$ solv --help
Usage: solv [options] [command]

💎 Solana Validator All-in-One CLI 💎

Options:
  -v, --version        Output the current version
  -h, --help           Display help for solv commands

Commands:
  server|s             Open solv Dashboard
  start                Start Solana Validator
  restart [options]    Restart Solana Validator
  stop                 Stop Solana Validator
  status               Show Solana Validator Status
  update|u [options]   Update Solana Validator Version
  log|l [options]      tail logs
  install|i [options]  Install/Update Solana Version
  stake                Solana Delegate Stake
  get <cmd>            Get Solana Validator Info
  scp <cmd>            Download/Upload Solana Validator Keypairs
  cron <cmd>           Run Schedule Tasks
  setup [options]      Setup Solana Validator
  help [cmd]           Display help for solv commands
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/EpicsDAO/solv This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/EpicsDAO/solv/blob/master/CODE_OF_CONDUCT.md).
