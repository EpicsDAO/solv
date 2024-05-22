---
id: quickstart-start-solv
title: Quickstart
description: Quickstart of solv, an open-source tool for Solana validator
---

## CLI Tool for Managing Solana Validators - "solv"

Discover the ease of setting up a Solana Validator Node server using solv, a powerful tool designed to simplify blockchain interactions.

With just a single command, solv eliminates the usual complexities, enabling you to launch a Solana Validator swiftly.

This tool not only streamlines the setup process but also opens doors for more individuals to participate in the blockchain network, making the Solana ecosystem more accessible.

Whether you're a seasoned developer or a blockchain enthusiast stepping into the validator realm, solv is your go-to solution for an uncomplicated, fast setup.

Dive into the world of Solana, explore the capabilities of solv, and be part of the blockchain revolution with minimal effort and maximum efficiency.

## 📖 Server Spec

- Linux Ubuntu 20.04 LTS
- Linux Ubuntu 22.04 LTS

## Solana Validator Setup

```bash
$ bash -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v4.1.1/install")"
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

## New Jito MEV Setup

Now you can select the mainnet for Jito MEV 🎉

![](https://storage.googleapis.com/epics-bucket/solv/assets/mainnet-select.png)

## Install solv CLI on your local machine

solv CLI is a tool for managing Solana Validators from your local machine.

```bash
$ bash -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v4.1.1/install")"
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
