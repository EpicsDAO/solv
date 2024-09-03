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
$ bash -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v4.5.0/install")"
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

If your node does not start, you can try the following command.

This will remove the snapshot and restart the Solana Validator from the new snapshot.

```bash
$ solv restart --rm
```

equivalent to

```bash
$ solv stop
$ solv rm:snapshot
$ solv get snapshot
$ solv start
```

## solv MEV Mode

This will enable solv MEV Mode on your validator instance.
MEV Mode will allow you to harvest your rewards to your authority account every right before the epoch ends.
Then convert SOL to elSOL (LST) and send it to your desired account.

```bash
$ solv mev
? Do you want to enable solv MEV Mode? (y/N) y
? Enter your RPC URL (https://api.mainnet-beta.solana.com)
? Enter your Harvest Address (your solana address)
? Enter your Discord Webhook URL (https://discord.com/api/webhooks/11111111/xxxxxxxx)
```

## New Feature: solv switch - v4.4.5~

`solv switch` command is better version of `solv change`.

```bash
$ solv switch
? Which switch type do you want to perform?※Mainnet Only (Use arrow keys)
❯ Incoming
  Outgoing
? What is the IP address of the new validator? (1.1.1.1)
```

`solv change` required to connect both servers.
Now you only need to connect one server with `solv switch`

This command has 2 types

You choose the type of switch you want to perform.
Then put IP address of anothor side of server.

- Incoming
  Run at Active Server. Active Validator Identity switches from this server to a remote server.

- Outgoing
  Run at Inactive Server. Active Validator Identity switches to this server from a remote server.

This command executes migration commands on both servers.

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
  -V                   Output the current version
  -h, --help           Display help for solv commands

Commands:
  server|s               Open solv Dashboard
  start                  Start Solana Validator
  restart                Restart Solana Validator
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
  relayer                Jiro Relayer Commands
  transfer|tr [options]  Transfer Solana Tokens/SPL Tokens
  withdraw [options]     Withdraw SOL from Vote Account to Authority Account
  harvest|hv             Harvest SOL from Validator Account to Authority Account
  mev                    Enable MEV Mode
  df                     Disk Free Command
  swap [options]         Swap Solana Tokens
  epochTimer             Check Solana Epoch Timer
  rm:log                 Remove Logs
  rm:snapshot            Remove Snapshot
  change                 Change Identity of Validator to New Validator
  monitor|m              Monitor Solana Node
  catchup|c              Check Solana Catchup Status
  config                 Show Solv Config
  help [cmd]             Display help for solv commands
```

If you have any questions, please contact us on Discord.

https://discord.gg/yxm5hJqRhg

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/EpicsDAO/solv This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

## License

The package is available as open source under the terms of the [Apache-2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

## Code of Conduct

Everyone interacting in the SKEET project’s codebases, issue trackers, chat rooms and mailing lists is expected to follow the [code of conduct](https://github.com/EpicsDAO/solv/blob/master/CODE_OF_CONDUCT.md).
