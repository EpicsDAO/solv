<p align="center">
  <a href="https://solv.epics.dev/">
    <img src="https://storage.googleapis.com/epics-bucket/solv/assets/solven.jpg" alt="solv" />
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

Discover the ease of setting up a Solana Validator Node server using solv, a powerful tool designed to simplify blockchain interactions.

With just a single command, solv eliminates the usual complexities, enabling you to launch a Solana Validator swiftly.

This tool not only streamlines the setup process but also opens doors for more individuals to participate in the blockchain network, making the Solana ecosystem more accessible.

Whether you're a seasoned developer or a blockchain enthusiast stepping into the validator realm, solv is your go-to solution for an uncomplicated, fast setup.

Dive into the world of Solana, explore the capabilities of solv, and be part of the blockchain revolution with minimal effort and maximum efficiency.

## 📖 Server Spec

- Linux Ubuntu 20.04 TS
- Linux Ubuntu 22.04 TS

## Solana Validator Setup

```bash
$ sh -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v3.0.0/install")"
$ cd ~ && source ~/.profile
$ solv setup
```

[![solv](https://storage.googleapis.com/epics-bucket/Validator/solv-install-top.gif)](https://youtu.be/rY4bajhRJgw)

## Start Solana Validator

```bash
$ solv start
```

## Stop Solana Validator

```bash
$ solv stop
```

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

## Solana Validator Status

```bash
$ solv status
```

## Solana Validator Logs

```bash
$ solv log
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
- Added solv s for solv Dashboard (no coding maintenance)

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
  check                Check Solana Validator
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
