<p align="center">
  <a href="https://solv.epics.dev/">
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

Discover the ease of setting up a Solana Validator Node on a Edgevana server using solv, a powerful tool designed to simplify blockchain interactions.

With just a single command, solv eliminates the usual complexities, enabling you to launch a Solana Validator swiftly.

This tool not only streamlines the setup process but also opens doors for more individuals to participate in the blockchain network, making the Solana ecosystem more accessible.

Whether you're a seasoned developer or a blockchain enthusiast stepping into the validator realm, solv on Edgevana server is your go-to solution for an uncomplicated, fast setup.

Dive into the world of Solana, explore the capabilities of solv, and be part of the blockchain revolution with minimal effort and maximum efficiency.

## 🔴 YouTube Video

https://youtu.be/rY4bajhRJgw

## 📖 Server Spec

- Linux Ubuntu 20.04 TS
- Linux Ubuntu 22.04 TS

## Solana Validator Setup

```bash
$ sh -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v1.6.2/install")"
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
$ solv config
```

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
  setup [options]                       Setup Solana Validator All-in-One
  df                                    Disk Free Command
  lsblk|ls                              Solana Disk Usage Command
  stake [options] <stakeAccountPubkey>  Solana Delegate Stake Command
  update|u [options]                    Solana Version Update, Restart and Monitoring Delinquent Stake
  log|l [options]                       tail logs
  help [command]                        display help for command
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/EpicsDAO/solv This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/EpicsDAO/solv/blob/master/CODE_OF_CONDUCT.md).
