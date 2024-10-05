---
id: general-getting-started
title: Getting Started
description: solv is an open-source tool designed to simplify the setup and operation of Solana validators and RPC nodes.
---

![solv](https://solv-storage.validators.solutions/ogp.jpg)

## CLI Tool for Managing Solana Validators - "solv"

By using solv, setting up a Solana validator node server becomes much easier. This powerful tool simplifies blockchain operations and allows you to start a Solana validator with just a single command.

By eliminating the complexity of setting up and managing a validator, solv opens the door for more individuals to participate in the blockchain network, making the Solana ecosystem more accessible.

Whether you're an experienced developer or a blockchain enthusiast venturing into the world of validators, solv provides a solution for simple and fast setup.

Dive into the world of Solana, explore the capabilities of solv, and become a part of the blockchain revolution with minimal effort and maximum efficiency.

## 📖 Server Spec

- Linux Ubuntu 20.04 LTS
- Linux Ubuntu 22.04 LTS
- Linux Ubuntu 24.04 LTS

## Solana Validator Setup

```bash
$ bash -c "$(curl -sSfL "https://solv-storage.validators.solutions/install")"
$ cd ~ && source ~/.profile
$ solv setup
```

When you run the `solv setup` command, a prompt like the following will appear.
Select the network, node type, and either RPC type or validator type.

Example: For an RPC node

![](https://storage.googleapis.com/epics-bucket/solv/assets/setup-rpc.png)

Example: For a Validator

![](https://storage.googleapis.com/epics-bucket/solv/assets/setup-jito-v.png)

For the validator type, you can also set options like commission here.

Once the setup is complete, the snapshot download will automatically begin,
and your Solana validator will start 🎊

If the snapshot download doesn't complete, press Ctrl + C to stop,
and then run the `solv restart --rm` command again.

Starting a new Solana validator can take anywhere from several minutes to several hours.
You can check the logs using the following command:

```bash
solv log
```

or

```bash
solv m
```

`m` is an alias for the `monitor` command.

※`solv monitor` does not work until the snapshot download is complete.

## solv setup Options

solv setup command has the following options:

```
solv setup --help
Usage: solv setup [options]

Setup Solana Validator

Options:
  --vote              Setup Vote Account (default: false)
  --key               Setup Validator Keypairs (default: false)
  --relayer           Setup Jito Relayer (default: false)
  --jupiter           Setup Jupiter Swap API (default: false)
  --skip-init-config  Skip Initial Config (default: false)
  --migrate-config    Migrate Config (default: false)
  --skip-mount        Skip Mount (default: false)
  -h, --help          Display help for command
```

## Start Solana Validator

```bash
$ solv start
```

## Stop Solana Validator

```bash
$ solv stop
```

## Monitor Solana Validator

```bash
$ solv monitor
```

## Solana Validator Status

```bash
$ solv status
```

## Solana Validator Logs

```bash
$ solv log
```

## Show Solana Balance and Keypairs

```bash
$ solv balance
```

## Show Solana Validator Catchup Status

```bash
$ solv catchup
```

## Show Solana Validator Config

This command will show your all config paths which are used by solana validator.

```bash
$ solv config
```

## solv CLI

```bash
$ solv --help
Usage: solv [options] [command]

🪄  solv - Solana Validator Tool ✨

Options:
  -V                     Display version
  -h, --help             Display help for command

Commands:
  start                  Start Solana Validator
  restart [options]      Restart Solana Validator
  stop                   Stop Solana Validator
  status                 Check Solana Validator Status
  update|u [options]     Update Command
  log|l [options]        tail logs
  install|i [options]    Install Solana Client
  stake [options]        Stake SOL
  unstake                Unstake SOL
  get <cmd>              Get Solana Validator's Information
  scp <cmd>              Scp Commands
  cron                   Cron Job Commands
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
  help [cmd]             Display help for command
```

### Solana Foudation Delegation Program

By participating in the Solana Foundation Delegation Program, you can receive the SOL delegation to operate as a Solana validator, just as many other validators do.

For more details, please check the following link:

https://solana.org/delegation-program
