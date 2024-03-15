---
id: chapter1
title: '第1章: 🚀 Solana バリデーターの完全ガイド - ゼロからの設定、ノードの効率的起動術 🛠️'
description: この章では、Solana バリデーターとして成功するための第一歩を踏み出します。私たちは、solvという革新的なオープンソースツールを中心に、Solana バリデーターの設定と運用の全プロセスを詳細に解説します。solvは複雑なプロセスを簡単にし、効率的なノードの設定と運用を可能にします。
---

この章では、Solana バリデーターとして成功するための第一歩を踏み出します。私たちは、solv という革新的なオープンソースツールを中心に、Solana バリデーターの設定と運用の全プロセスを詳細に解説します。solv は複雑なプロセスを簡単にし、効率的なノードの設定と運用を可能にします。

まずは、Solana バリデーターとして推奨される環境設定について学びます。次に、solv CLI のインストール方法を紹介し、Solana バリデーターのために必要なキーの作成方法を説明します。また、Solana Testnet でのバリデーターとしての報酬と、テストネットで使用する SOL の準備についても触れます。

（※2024/01/30 追記&更新 - メインネット RPC ノードに対応 🎊）

https://solv.epics.dev/ja/doc/tutorial/chapter5

本章の内容は、サーバーへの接続方法から始まり、solv のインストール、設定の更新、そして solv セットアップまでの具体的なステップを含んでいます。実際のログの確認方法、スナップショットのダウンロード手順、さらに YouTube での solv ハンズオン動画への案内も提供します。この章を通じて、Solana バリデーターとしての道のりを確実に歩むための知識とツールを身につけることができます。

📗 solv 公式ドキュメント：
https://solv.epics.dev/ja

## 🌌 背景

ブロックチェーンという最先端のテクノロジーの世界では、進化のスピードが早く、ドキュメントが追いつかないことがよくあります。私が Solana のバリデーターに興味を持った当初、手順が散らばっており、どの情報が正確か判断するのは一苦労でした。

しかし、その挑戦は実り多きものでした。今や、私はアムステルダム、東京、ニューヨークの３つの異なるリージョンに Solana Testnet バリデーターサーバーを設置し、運用しています。Solana のテストネットバリデーターには報酬があり、効果的な運用と定期的なメンテナンスが不可欠です。

この経験から、更新作業を効率化するためのスクリプトを開発しました。そして、これをコミュニティに還元するために、Solv というパッケージとしてオープンソース化しました。

「solv」は、技術的な知識がなくても、誰でも簡単に Solana バリデーターノードを構築できるよう設計されています。このガイドでは、solv を使用してバリデーターノードを構築する 3 つの簡単なステップを紹介します。私たちのビジョンは、真の分散型ネットワークを実現すること。それには、技術的な背景に関わらず、誰もが参加できる環境の提供が不可欠です。

本章では `ローカルコンピューター` と `バリデーターサーバー` の 2 つのコンピューターを使うことを想定しています。

ローカルコンピューターでは MacOS を使用していますが、Linux Ubuntu を用いることも可能です。また、Windows を使用している方は、WSL2 を利用して Ubuntu 環境を構築することを推奨します。

https://learn.microsoft.com/ja-jp/windows/wsl/install

## 💻 推奨環境

Solana Validator に必要なコンピューター環境は、他のブロックチェーンプラットフォームと比較しても、非常に高い要件を求められます。この高いシステム要件が、Solana のトランザクション処理能力の秘密の一つとなっています。Solana ネットワークはその高速性で知られており、これは強力なハードウェアと最適化された設定によって支えられています。

最小な SOL の要件

| 要件                                             | 数値            |
| ------------------------------------------------ | --------------- |
| 合意参加に必要な投票アカウントのリザーブ         | 0.02685864 SOL  |
| 各ブロックごとの投票トランザクション送信のコスト | 最大 1.1 SOL/日 |

ハードウェアの推奨事項
以下のハードウェアの推奨事項はガイドとして提供されています。オペレータは独自のパフォーマンス テストを行うことが推奨されます。

#### CPU

- 12 コア/24 スレッド以上
- 2.8GHz の基本クロック速度以上
- SHA 拡張命令のサポート(AMD Gen 3 以降/Intel Ice Lake 以降)

#### RAM

- 256GB 以上
- 512GB 容量のマザーボードを推奨

#### ディスク

- PCIe Gen3 x4 NVME SSD 以降
- Accounts: 500GB 以上。高い TBW (総書き込みバイト数)
- Ledger: 1TB 以上。高い TBW を推奨
- OS: (オプション) 500GB 以上。 SATA OK
  ※ OS はレジャー ディスクにインストールされる可能性がありますが、テストではレジャーを専用のディスクに置いた方がパフォーマンスが向上することが示されています。
  アカウントと台帳を同じディスクに保存できますが、IOPS が高いため、これはお勧めできません。
  Samsung 970 および 980 Pro シリーズ SSD は検証コミュニティで人気があります

#### GPU

現時点では必要ありません

こちら詳細リンクになります。

必要最低条件

https://docs.solana.com/running-validator/validator-reqs

## 🔧 solv CLI のインストール

ますはローカル環境に `solv CLI` をインストールします。

以下のワンコマンドで

- `solana CLI` のインストール
- `nodenv` のインストール
- `node` のインストール
- `solv CLI` のインストール

を行います。

```bash
sh -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv-cli/v3.0.1/install")"
```

## solv Client の起動

```bash
solv c
```

![](https://storage.googleapis.com/zenn-user-upload/313f2c82514f-20240130.png)

## 🔑 Solana バリデーターのために必要なキーを作成する

solv クライアントを起動し、

`3)バリデーターの鍵を作成`

を選択します。

```bash
Generated keypairs - /Users/fumi/solvKeys/upload
Config File: /Users/fumi/.config/solana/cli/config.yml
RPC URL: https://api.mainnet-beta.solana.com
WebSocket URL: wss://api.mainnet-beta.solana.com/ (computed)
Keypair Path: /Users/fumi/solvKeys/upload/mainnet-validator-keypair.json
Commitment: confirmed
Updated /Users/fumi/solv.config.json with new values.
```

`~/solvKeys` ディレクトリに下記のように６つ鍵が作成されます。
必要に応じて鍵を使い分けてください。

```bash
ls ~/solvKeys/upload
mainnet-authority-keypair.json    testnet-authority-keypair.json
mainnet-validator-keypair.json    testnet-validator-keypair.json
mainnet-vote-account-keypair.json testnet-vote-account-keypair.json
```

## 💰 Solana Testnet バリデーターの報酬について

こちらのリンクにテストネットバリデーター報酬の詳細があります。
ざっくり サーバー代２倍分の SOL が報酬としてもらえるというものです。

Tour de Sun（TDS） プログラム
https://solana.org/tds22

サーバープログラム
https://solana.org/server-program

テストネットで報酬を得るには上記のプログラムで推奨されているサーバー会社から、
サーバーリソースを契約する必要があります。

Solana Delegation プログラム
https://solana.org/delegation-program

このプログラムに参加すると、財団から委任ステークを受取ることができるようです。

必要な条件
https://solana.org/delegation-criteria

さらに、以下のコマンドで Pubkey に署名を行う必要があります。(このフローのみ Ubuntu で行う必要があります）

インストール

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
sudo apt install build-essential libssl-dev pkg-config libudev-dev libhidapi-dev
cargo install solana-foundation-delegation-program-cli
solana-foundation-delegation-program --version
```

署名を行うのにはメインネットで行うため、
多少の SOL が必要です。

```bash
$ solana config set --url https://api.mainnet-beta.solana.com
$ solana -um balance
```

実行

```bash
$ solana-foundation-delegation-program apply --mainnet ~/solvKeys/upload/mainnet-validator-keypair.json --testnet ~/solvKeys/upload/testnet-validator-keypair.json
```

これを行なっていないと以下のフォームで弾かれます
https://solana.org/delegation-program

## 🌐 テストネット SOL の準備

テストネットバリデーターで投票に参加するには、年間およそ 315 テスト SOL 必要になります。
その他に、自分のテストネットバリデーターにどのアカウントからでも数 SOL で良いのでステーキングを行うと進行が早まります。このテストネットでのステイキングは Phantom ウォレットのディベロッパー設定からネットワークをテストネットに変更することで行えます。
(`vote-account-keypair.json`のアドレスにステイキング)

```bash
$ solana airdrop 1
```

上記のコマンドでテストネットの SOL を Airdrop することができますが、
ネットワークの状況により、手に入りにくいことがあります。

EpicsDAO のディスコードチャンネルで、在庫があれば配布しておりますので、
お気軽にお立ち寄りください！
https://discord.gg/bDKMfWRsnk

## 🖥️ サーバーへ接続

それでは `solv` をサーバーにインストールしていきます。
まずはサーバーに SSH 接続します。
各自の接続設定に変更してください。

```bash
$ ssh username@<your-server-ip-address>
```

## 🚀 ステップ１ - solv のインストール

![](https://storage.googleapis.com/zenn-user-upload/100005a6fe39-20240130.png)

そして solv ドキュメントページにあるステップ１のコードをコピー&ペーストして実行します。

```bash
sh -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v3-/install")"
```

このコマンドで最初に solv ユーザーを作成するので、
パスワードを設定します。

インストール完了後、solv ユーザーに切り替えるためのパスワードを聞かれるので、
設定したパスワードを入力し、ユーザーを切り替えます。

## ⚙️ ステップ 2 - 設定の更新

次に、ステップ２のコードを実行し、設定を反映させます。

```bash
$ cd ~ && source ~/.profile
```

## 🛠️ ステップ 3 - solv セットアップ

最後にステップ３のコードを実行すれば完了です！

```bash
$ solv setup
```

![](https://storage.googleapis.com/zenn-user-upload/949db29fc401-20240131.png)

今回は `TESTNET_VALIDATOR` を選択します。

solv3 からメインネットの RPC_NODE に対応しました。
こちらは５章の Solana RPC ノードの建て方を参考にしてみてください。

https://zenn.dev/fumisouls/books/971a5ba1212303/viewer/201fd5

起動後、スナップショットのダウンロードが自動で始まり、
Solana バリデーターが起動します 🎊

実際にこのフローで作成した鍵は使わずに solv クライアントから作成した鍵に書き換えます。

一度サーバーを停止後に、次の 2 章の鍵のアップロードを参考にしてください。

```bash
solv stop
```

https://zenn.dev/fumisouls/books/971a5ba1212303/viewer/f10404

## 📜 ログの確認

Solana バリデーターのログを確認します。

```bash
$ solv log
```

異常なログを出力するには

```bash
$ solv log -e
```

## 🖥️ モニターコマンド

以下のコマンドで現在のバリデーターの状態を確認することができます。

```bash
solv get monitor
```

## ⏹️ バリデーターの停止

デフォルトで作成された鍵と既存の鍵を交換するために一度、
バリデーターノードを停止します。

```bash
solv stop
```

それでは次の章で鍵の交換、更新について解説したいと思います。

## 🔴 YouTube solv ハンズオン動画

YouTube: 「3 ステップで Solana バリデーター立ち上げ！solv を使って Edgevana 上でブロックチェーンバリデーターを簡単に手間なく運用」- TDS に対応しました 🎉
https://www.youtube.com/watch?v=7nloPjyrk_8
（この動画の内容は過去の solv2 以下のバージョンとなっております。）
