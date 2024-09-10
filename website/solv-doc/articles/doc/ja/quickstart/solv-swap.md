---
id: quickstart-solv-swap
title: solv SWAP コマンド
description: オープンソースのSolana バリデーター向けツールsolvのクイックスタート - SWAP コマンド
---

solv swap コマンドは、Solana トークンおよび SPL トークンのスワップをシンプルかつ直感的に行うことができるツールです。
対話形式でトークンを選択してスワップを実行したり、ワンライナーコマンドで素早くスワップを完了させることが可能で、
プログラムによるトークンのスワップ操作を簡便に実現します。

この solv swap は _手数料 0%_ で提供されており、
さらに Validators Solutions が提供するプライベート RPC と Jupiter API エンドポイントを利用することで、高速かつ信頼性の高い接続を確保しています。

これにより、スムーズで効率的なトレーディング体験を提供します。

## solv swap コマンドの初期設定

以下のコマンドを実行すると、プロンプトが表示され、

```bash
solv swap
? Enter Solana RPC URL https://rpc.validators.solutions/rpc?api-key=<YOUR_API_KEY>
? Enter Keypair Path /home/solv/mainnet-validator-keypair.json
? Enter Jupiter API Key(Optional)
```

以下の情報を入力することで `solv4.config.json` に設定が保存され、スワップが実行できるようになります。

- `RPC_URL` - Solana RPC URL

  この RPC URL は、Solana ネットワークに接続するための Solana RPC URL です。
  この URL は、Solana ノードに接続するために使用されます。

- `KEYPAIR_PATH` - Keypair ファイルのパス

  Keypair ファイルは、トークンのスワップに使用する Solana Keypair のファイルパスです。

- `API_KEY` - Jupiter API にアクセスするための API キー　（オプション）

  この API キーは、Jupiter API にアクセスするための Jupiter API キーです。
  空白でも使用できますが、API キーを取得することで、より高速で信頼性の高い接続を提供します。

## solv swap コマンドの実行

以下のコマンドを実行すると、プロンプトが表示され、
スワップするトークンの情報を入力することができます。

まずは Input Mint を選択し、

```bash
solv swap
? Select input mint
❯ SOL
  USDC
  elSOL
  JitoSOL
  mSOL
  bSOL
  EPCT
```

その次に Output Mint を選択します。

```bash
? Select output mint
❯ USDC
  elSOL
  JitoSOL
  mSOL
  bSOL
  EPCT
  JUP
```

Other を選択すると直接 Mint Address を入力することができます。

```bash
? Enter output mint address (ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC)
```

次に、スワップするトークンの量を入力します。

```bash
? Enter input amount in LAMPORTS. e.g. 0.01 SOL 10000000
```

この値は `lamports` で入力します。

トークンによっては decimal が異なるため、注意してください。

最後に、確認画面が表示され、スワップを実行するかどうかを確認します。

Yes を選択すると、スワップが実行されます。

![solv-swap](/doc/swap-quote.png)

トランザクションの送信が完了すると、
スワップが完了し、トランザクションのハッシュが表示されます。

トランザクションを確認してみると、スワップが完了していることが確認できます。

![solv-swap](/doc/swap-tx-solscan.png)

## solv swap ワンライナーコマンド

上記で実行したコマンドをワンライナーコマンドで実行することも可能です。

見積もり取得時に、ワンライナーで実行できるコマンドも表示されるため、

そのコマンドを実行することで、対話式のプロンプトを経由せずに即座にスワップを実行できます。

```bash
solv swap --input So11111111111111111111111111111111111111112 --output EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v --amount 10000000 --skip-confirm
```

このコマンドは、`--skip-confirm` オプションを追加しているため、確認画面が表示されずにスワップが実行されます。

BOT トレードなど、自動化したい場合に有効なオプションです。

_この solv swap は手数料 0 % で運営されており、
さらにプライベート RPC を利用することで高速で信頼性の高い接続を提供します_

## 🎁 Validators DAO コミュニティ限定の無料 API キー

私たちは、Validators DAO コミュニティ限定で無料の API キーを提供できることをとても嬉しく思います！🎉
コミュニティをサポートし、高速で信頼性の高い接続を提供することが私たちの目的です。⚡

無料の API キーを取得するには、以下のリンクから参加してください

🔗 Validators DAO:

https://discord.gg/8dhnZnvzuw

高速接続を手に入れて、あなたの体験をさらに向上させましょう！🚀

## RPC API キーの使い方

RPC API キー は、以下のように RPC URL に追加して使用します。

```bash
https://rpc.validators.solutions?api-key=<YOUR_API_KEY>
```

Solana CLI で 使用する場合は、以下のように `--url` オプションを追加して使用します。

```bash
solana balance --url https://rpc.validators.solutions?api-key=<YOUR_API_KEY>
```

## Jupiter API キーの使い方

Jupiter API キー は、以下のようにヘッダーの中に `Bearer トークン` としてリクエストを送信します。

Jupiter Quote API エンドポイント：

GET: `https://jup.validators.solutions/v1/jup/quote`

Jupiter Swap API エンドポイント：

POST: `https://jup.validators.solutions/v1/jup/swap`

Swap する見積もりの取得例：

0.01 SOL から USDC にスワップする見積もりを取得する場合

```bash
curl --location 'https://jup.validators.solutions/v1/jup/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&amount=10000000' \
--header 'Authorization: Bearer <YOUR-API-KEY>'
```

上記のように、`Authorization ヘッダー` に `Bearer <YOUR-API-KEY>` を追加してリクエストを送信します。

そして、クエリパラメーターに `inputMint`、`outputMint`、`amount` を追加してリクエストを送信します。

`amount` は、入力トークンの量を `lamports` で指定します。

トークンによっては decimal が異なるため、注意してください。

※ RPC API キーと Jupiter API キーは、同じ値ですが、それぞれの API に対して異なる使い方です。

## solv swap コマンドのオプション

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
