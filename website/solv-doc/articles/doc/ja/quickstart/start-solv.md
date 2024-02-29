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
$ sh -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v3.2.0/install")"
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

## インストール solv CLI - ローカルコンピューター

solv CLI は、ローカルコンピューターから Solana バリデーターを管理するためのツールです。

```bash
$ sh -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv-cli/v3.2.0/install")"
```

solv CLI ダッシュボードを開く - ローカルコンピューター

```bash
$ solv c
```

![Generate Keys](https://storage.googleapis.com/epics-bucket/solv/assets/generate-keys.png)

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

## Solana バリデーターの再起動

```bash
$ solv restart
```

デフォルトのコマンドは--no-incremental-snapshots です。

スナップショットをダウンロードしたい場合は、以下のコマンドを使用できます。

```bash
$ solv restart --snapshot
```

## Solana バリデータのステータス確認

```bash
$ solv status
```

## Solana バリデーターのログ確認

```bash
$ solv log
```

## Solana バリデーターの設定確認

このコマンドは、solana バリデーターに使用されるすべての設定パスを表示します。

```bash
$ solv get config
```

## solv CLI

```bash
$ solv --help
使用法: solv [オプション] [コマンド]

💎 Solana バリデーター管理用 CLI 💎

オプション:
  -v, --version        現在のバージョンを表示
  -h, --help           solvコマンドのヘルプを表示

コマンド:
  server|s             solvダッシュボードを開く
  start                Solanaバリデーターを開始
  restart [オプション]  Solanaバリデーターを再起動
  stop                 Solanaバリデーターを停止
  status               Solanaバリデーターのステータスを表示
  update|u [オプション] Solanaバリデーターのバージョンを更新
  log|l [オプション]    ログを表示
  install|i [オプション] Solanaのバージョンをインストール/更新
  stake                Solanaデリゲートステーク
  get <cmd>            Solanaバリデーター情報を取得
  scp <cmd>            Solanaバリデーターキーペアをダウンロード/アップロード
  cron <cmd>           スケジュールされたタスクを実行
  setup [オプション]     Solanaバリデーターを設定
  help [cmd]           solvコマンドのヘルプを表示
```
