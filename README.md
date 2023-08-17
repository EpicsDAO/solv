<p align="center">
  <a href="https://skeet.dev/en/">
    <img src="https://storage.googleapis.com/epics-bucket/Validator/solvOverview.png" alt="solv" />
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

solv is a comprehensive command-line utility designed for Solana network
validators. It simplifies the process of setting up, monitoring, and
managing Solana validators, offering streamlined operations and enhanced
performance insights. Whether you're a seasoned Solana validator or just
getting started, solv provides the tools you need to ensure optimal validator
operations on the Solana blockchain.

# Solana Validator Setup

Linux Ubuntu 20.04 TS

User: solv

```bash
$ sudo adduser solv
$ sudo usermod -aG sudo solv
$ su solv
$ sudo add-apt-repository ppa:epics-dao/solv
$ sudo apt update
$ sudo apt install solv
```

![solv](https://storage.googleapis.com/epics-bucket/Validator/apt-install-solv.gif)

Please mount fileSystem that has more than 1TB to `/mt` directory.

Edgevana's Ubuntu AMD Server's default mountpoint is `/dev/vdb`.

unmount if it is mounted to other directory.

```bash
$ solv umt <mountedPoint>
```

and mount to `/mt` directory.

```bash
$ solv mt <fileSystem>
```

if you haven't setup swap, you can use the following command.

```bash
$ solv setup --swap --path <fileSystem>
```

## Install/Update Solana Version

```bash
$ solv i -v 1.16.7
```

## Generate Solana Validator Keys and Config

```bash
$ solv setup
```

## Check Solana Validator Preparation Status

```bash
$ solv check
```

If it is not ready, you can check;

- Mounted disk
- Swap size
- Memory size

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

## Solana Validator Status

```bash
$ solv status
```

## Solana Validator Logs

```bash
$ solv log
```

## Show Solana Validator Config

```bash
$ solv config
```

## Discord Notification

set `DISCORD_WEBHOOK_URL` in `~/.profile`

```bash
DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/...your-webhook-url"
```

This command will automatically add `--no-incremental-snapshots` to your
`solana-validator.sh` command.

## Solana Delegation Program

https://solana.org/delegation-program

## solv CLI

```bash
$ solv --help
Usage: solv [options] [command]

CLI for Solana Validators

Options:
  -V, --version                         output the version number
  -h, --help                            display help for command

Commands:
  solv                                  Show Solv AA
  epoch                                 Get Current Epoch
  slot                                  Get Current Slot
  config|c                              Show Solv Validator Config
  status                                Show Solana Validator Status
  start                                 Start Solana Validator
  restart [options]                     Restart Solana Validator
  stop                                  Stop Solana Validator
  check                                 Check Solana Validator Environment
  install|i [options]                   Solana Install/Update Command
  mt [options]                          Linux Mount Command
  umt [options]                         Solana Umount Command
  mtr                                   Mount Reload Command
  cron                                  Cron Task Command
  setup [options]                       Setup Solana Validator All-in-One
  df                                    Disk Free Command
  lsblk|ls                              Solana Disk Usage Command
  stake [options] <stakeAccountPubkey>  Solana Delegate Stake Command
  update|u [options]                    Solana Version Update, Restart and Monitoring Delinquent Stake
  log|l [options]                       tail logs
  release|r [options] <version>         publish release
  help [command]                        display help for command
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/EpicsDAO/solv This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/EpicsDAO/solv/blob/master/CODE_OF_CONDUCT.md).
