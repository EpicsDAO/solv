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

Documentation: [https://solv.epics.dev/](https://solv.epics.dev/)

## 📖 Server Spec

- Linux Ubuntu 22.04 LTS
- Linux Ubuntu 24.04 LTS

## Solana Validator Setup

Login in to your Validator server by ssh and run the following command.

```bash
$ bash -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v4.5.0/install")"
$ cd ~ && source ~/.profile
$ solv setup
```

![](https://storage.googleapis.com/zenn-user-upload/949db29fc401-20240131.png)

- Choose Language
- Choose Network
- Choose Node Type
- Choose RPC Type or Validator Type

Then prompt will ask you for the initial setup.

After startup, the snapshot download will start automatically.
The Solana validator will start 🎊

[![solv](https://storage.googleapis.com/epics-bucket/Validator/solv-install-top.gif)](https://youtu.be/rY4bajhRJgw)

If your node does not start, you can try the following command.

```bash
$ solv restart --rm
```

This will remove the snapshot and restart the Solana Validator from the new snapshot.
If snapshot download freezes, you can try Ctrl + C.
Then setup will continue.

## New Features - solv v4.5.0 Release

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

## What is solv MEV Mode?

solv MEV Mode is a feature designed to automate the maintenance of your Solana validator by regularly checking and updating the Solana/solv status and version.

## How it works

- solv epochTimer: This function will be set as a cron job to automatically monitor the health status of your validator and perform updates as needed.

- Automatic Restarts: If necessary, solv epochTimer will restart the validator to ensure optimal performance.

## solv epochTimer Monitors:

epochTimer will monitor the following aspects of your validator:

### Check Validator Account Balance

- Send a notification if the balance is less than 0.5 SOL.

### Check Validator Health Status

- Send a notification if the validator is not voting or is delinquent.

### Check Solana/solv Version Update

- Send a notification if the Solana/solv version is not up-to-date.
- Update the Solana/solv version automatically.
- Restart validator if it is required.
- Send a notification after the Solana/solv version update.

### Auto Harvest (Mainnet Only)

- Withdraw the rewards from vote account to the authority account.
- Calculate the balance needed for the next epoch.
- Transfer the balance from the validator account to the authority account.
- Convert SOL to LST(Liquid Staking Token) and send it to the harvest account.

By implementing solv MEV mode, you can maintain high security, ensure optimal performance, and enjoy the convenience of automated updates and reward management.

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

※ Please DO NOT keep harvest account in the validator node.

## How to disable solv mev mode?

Run the following command:

```bash
$ solv mev
? Do you want to enable solv MEV Mode?(You can change it again) (y/N) n
✅ Cron Job successfully removed.
```

## Run solv Server CLI - from your validator server

```bash
$ solv s
```

![solv s](https://storage.googleapis.com/epics-bucket/solv/assets/solv-s.png)

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
$ solv config
```

## Solana Delegation Program

https://solana.org/delegation-program

## solv CLI

```bash
$ solv --help
Usage: solv [options] [command]

💎 Solana Validator All-in-One CLI 💎

Options:
  -V                     Output the current version
  -h, --help             Display help for solv commands

Commands:
  server|s               Open solv Dashboard
  start                  Start Solana Validator
  restart [options]      Restart Solana Validator
  stop                   Stop Solana Validator
  status                 Show Solana Validator Status
  update|u [options]     Update Solana Validator Version
  log|l [options]        tail logs
  install|i [options]    Install/Update Solana Version
  stake [options]        Solana Delegate Stake
  unstake                Solana Delegate Stake
  get <cmd>              Get Solana Validator Info Commands
  scp <cmd>              Download/Upload Solana Validator Keypairs
  cron <cmd>             Run Schedule Tasks
  setup [options]        Setup Solana Validator
  balance|bal [options]  Show Keypairs Balance
  mtr                    Mount Reload Command
  disks                  Show unmounted disks
  relayer                Jito Relayer Commands
  transfer|tr [options]  Transfer Solana Tokens/SPL Tokens
  withdraw [options]     Withdraw SOL from Vote Account to Authority Account
  harvest|hv             Harvest SOL from Validator Account to Authority Account
  mev                    Enable MEV Mode
  df                     Disk Free Command
  swap [options]         Swap tokens
  epochTimer             Check Solana Epoch Timer
  switch [options]       Switch Validator Identity with No Downtime
  jupiter                Jupiter API Commands
  rm:log                 Remove Logs
  rm:snapshot            Remove Snapshot
  create:snapshot        Create Snapshot
  monitor|m              Monitor Solana Node
  catchup|c              Check Solana Catchup Status
  config                 Show Solv Config
  help [cmd]             Display help for solv commands
```

## Website

Validators Solutions: https://validators.solutions
Validator DAO: https://dao.validators.solutions
elSOL: https://elsol.app/

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/EpicsDAO/solv This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/EpicsDAO/solv/blob/master/CODE_OF_CONDUCT.md).
