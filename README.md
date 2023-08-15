<p align="center">
  <a href="https://skeet.dev/en/">
    <img src="https://storage.googleapis.com/epics-bucket/Validator/solanaLogo.png" alt="Solv" />
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

## CLI Tool for Managing Solana Validators - Solv

Solv is a comprehensive command-line utility designed for Solana network
validators. It simplifies the process of setting up, monitoring, and
managing Solana validators, offering streamlined operations and enhanced
performance insights. Whether you're a seasoned Solana validator or just
getting started, Solv provides the tools you need to ensure optimal validator
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
           _
          | |
 ___  ___ | |_    __
/ __|/ _ \| |\ \ / /
\__ \ (_) | | \ V /
|___/\___/|_|  \_/

🔥 Welcome to Solana Validator Tool Solv 🔥

Solv is born and ready for running Solana Validator 🚀

$ source ~/.profile
$ solv i
$ solv setup
$ solv check
$ solv start
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

This command will automatically add `--no-incremental-snapshots` to your
`solana-validator.sh` command.

## Solana Delegation Program

https://solana.org/delegation-program

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/EpicsDAO/solv This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/EpicsDAO/solv/blob/master/CODE_OF_CONDUCT.md).
