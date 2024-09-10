---
id: quickstart-solv-swap
title: solv SWAP コマンド
description: オープンソースのSolana バリデーター向けツールsolvのクイックスタート - SWAP コマンド
---

solv swap コマンドは、Solana Token 及び SPL Token のスワップを行うためのコマンドです。

### solv swap コマンドの使い方

まずは ~/solv4.config.json ファイルに以下の２つの情報を設定してください。

- RPC_URL - Solana RPC URL
- KEYPAIR_PATH - Keypair ファイルのパス

例：

`solv4.config.json`

```json
{
  ...
  "RPC_URL": "https://rpc.validators.solutions?api-key=<YOUR_API_KEY>",
  "KEYPAIR_PATH": "/home/solv/mainnet-validator-keypair.json",
}
```

Solana RPC URL は、Solana ネットワークの RPC サーバーの URL です。

Validators DAO では誰もが無料で利用できる RPC サーバーの API キーを提供しています

```bash
https://rpc.validators.solutions?api-key=<YOUR_API_KEY>
```

API キーを取得するには、以下のリンクから登録してください。

Solana RPC API キー取得: https://discord.gg/8dhnZnvzuw

### solv swap コマンドの実行

以下のコマンドを実行すると、プロンプトが表示され、
スワップするトークンの情報を入力することができます。

```bash
solv swap
```

![](https://solv-storage.validators.solutions/solv/solv-swap.png)

### solv swap コマンドのオプション

```bash
solv swap --help
Usage: solv swap [options]

Swap tokens

Options:
  -i, --input <input>    Input token mint (default: "")
  -o, --output <output>  Output token mint (default: "")
  -a, --amount <amount>  Input amount in lamports (default: "0")
  -s, --skip-confirm     Skip confirmation (default: false)
  -h, --help             Display help for command
```
