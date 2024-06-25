---
id: quickstart-start-solv
title: クイックスタート
description: オープンソースの Solana バリデーター向けツール solv クイックスタート
---

## Solana バリデーターの管理用 CLI ツール - "solv"

solv を使用することで、Solana バリデーターノードサーバーの設定が容易になります。この強力なツールは、ブロックチェーンの操作を単純化し、わずか 1 つのコマンドで Solana バリデーターの起動を可能にします。

バリデーターのセットアップや運用の複雑さを排除することで、より多くの個人がブロックチェーンネットワークに参加するための扉を開き、Solana エコシステムをよりアクセスしやすくします。

経験豊富な開発者であろうと、バリデーター領域に足を踏み入れるブロックチェーン愛好家であろうと、solv は簡単で迅速なセットアップのためのソリューションです。

Solana の世界に飛び込み、solv の機能を探求し、努力を最小限にして最大の効率でブロックチェーン革命の一部となりましょう。

## 📖 サーバー仕様

- Linux Ubuntu 20.04 LTS
- Linux Ubuntu 22.04 LTS

## Solana バリデーターのセットアップ

```bash
$ bash -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v4.1.16/install")"
$ cd ~ && source ~/.profile
$ solv setup
```

![](https://storage.googleapis.com/zenn-user-upload/949db29fc401-20240131.png)

そして、対象となるノードの種類を選択します。

- `TESTNET_VALIDATOR`
- `MAINNET_VALIDATOR`
- `RPC_NODE`

起動後、スナップショットのダウンロードが自動で始まり、
Solana バリデーターが起動します 🎊

## New Jito MEV Setup

Jito MEV のメインネットを選択できるようになりました 🎉

![](https://storage.googleapis.com/epics-bucket/solv/assets/mainnet-select.png)

## solv Server CLI を実行 - バリデーターサーバー

```bash
$ solv s
```

![solv s](https://storage.googleapis.com/epics-bucket/solv/assets/solv-s.png)

### Solana Delegation Program

https://solana.org/delegation-program

## Solana バリデーターの開始

```bash
$ solv start
```

## Solana バリデーターの停止

```bash
$ solv stop
```

## Solana モニターの開始

```bash
$ solv monitor
```

## Solana バリデータのステータス確認

```bash
$ solv status
```

## Solana バリデーターのログ確認

```bash
$ solv log
```

## SOL の残高確認

```bash
$ solv balance
```

## Solana バリデーターのキャッチアップステータス確認

```bash
$ solv catchup
```

## Solana バリデーターの設定確認

このコマンドは、solana バリデーターに使用されるすべての設定パスを表示します。

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
