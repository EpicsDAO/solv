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
$ bash -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v4.5.0/install")"
$ cd ~ && source ~/.profile
$ solv setup
```

- 新しいインストール写真

![](url)

`solv setup` コマンドを実行すると、以下のようなプロンプトが表示されます。
ネットワーク、ノードタイプ、RPC タイプまたはバリデータータイプを選択してください。

```
? Choose Network (Use arrow keys)
❯ mainnet-beta
  testnet
? Choose Node Type (Use arrow keys)
❯ rpc
  validator
? Choose RPC Type (Use arrow keys)
❯ agave
  jito
```

バリデータータイプの場合は、コミッションなどもここで設定できます。

設定完了後、スナップショットのダウンロードが自動で始まり、
Solana バリデーターが起動します 🎊

スナップショットのダウンロードが完了しない場合は、Ctrl + C を押して中断し、
その後、再度 `solv restart --rm` コマンドを実行してください。

Solana バリデーターは、新規起動してから数十分から数時間かかる場合があります。
以下のコマンドでログを確認してください。

```bash
solv log
```

または

```bash
solv m
```

## solv setup のオプション

solv setup のオプションを使用して、特定の機能を有効にすることができます。

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
  --skip-mount        Skip Mount (default: false)
  -h, --help          Display help for command
```

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

### Solana Foudation デリゲーションプログラム

Solana Foundation デリゲーションプログラムに参加することで、多くのバリデーターが利用しているように、Solana バリデーターとしての運用に必要な SOL の委任を受けることが可能です。

詳細については、以下のリンクをご確認ください。

https://solana.org/delegation-program
