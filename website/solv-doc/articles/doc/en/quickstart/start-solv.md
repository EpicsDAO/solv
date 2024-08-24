---
id: quickstart-start-solv
title: Quickstart
description: Quickstart of solv, an open-source tool for Solana validator
---

## CLI Tool for Managing Solana Validators - "solv"

The utility tool for Solana Validators

solv is an open-source tool designed to simplify the setup and operation of Solana validators and RPC nodes.

## 📖 Server Spec

- Linux Ubuntu 20.04 LTS
- Linux Ubuntu 22.04 LTS

## Solana Validator Setup

Login in to your Validator server by ssh and run the following command.

```bash
$ bash -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v4.4.12/install")"
$ cd ~ && source ~/.profile
$ solv setup
```

[![solv](https://storage.googleapis.com/epics-bucket/Validator/solv-install-top.gif)](https://youtu.be/rY4bajhRJgw)

And then, select the type of node you want to target.

![](https://storage.googleapis.com/zenn-user-upload/949db29fc401-20240131.png)

- `TESTNET_VALIDATOR`
- `MAINNET_VALIDATOR`
- `RPC_NODE`

Then

After startup, the snapshot download will start automatically.
The Solana validator will start 🎊

If your node does not start, you can try the following command.

```bash
$ solv stop
$ solv rm:snapshot
$ solv get snapshot
$ solv start
```

## New Jito MEV Setup

You can select the mainnet for Jito MEV or RPC Jito Client🎉

![](https://storage.googleapis.com/epics-bucket/solv/assets/mainnet-select.png)

Also you have option to select Jito Relayer.

## Run solv Server CLI - from your validator server

```bash
$ solv s
```

![solv s](https://storage.googleapis.com/epics-bucket/solv/assets/solv-s.png)

### Solana Delegation Program

https://solana.org/delegation-program

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

💎 Solana Validator All-in-One CLI 💎

Options:
  -V                   Output the current version
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
  unstake              Solana Delegate Stake
  get <cmd>            Get Solana Validator Info Commands
  scp <cmd>            Download/Upload Solana Validator Keypairs
  cron <cmd>           Run Schedule Tasks
  setup [options]      Setup Solana Validator
  client|c             Open solv Client Dashboard
  balance|bal          Show Keypairs Balance
  mtr                  Mount Reload Command
  disks                Show unmounted disks
  relayer              Jiro Relayer Commands
  rm:log               Remove Logs
  rm:snapshot          Remove Snapshot
  withdraw             Withdraw SOL from Vote Account to Authority Account
  login                Login to Validatoors Cloud
  change               Change Identity of Validator to New Validator
  monitor|m            Monitor Solana Node
  catchup|ca           Check Solana Catchup Status
  config               Show Solv Config
  help [cmd]           Display help for solv commands
```
