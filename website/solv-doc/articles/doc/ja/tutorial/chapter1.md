---
id: chapter1
title: '第1章: 🚀 Solana バリデーターの完全ガイド - ゼロからの設定、ノードの効率的起動術 🛠️'
description: この章では、Solana バリデーターとして成功するための第一歩を踏み出します。私たちは、solvという革新的なオープンソースツールを中心に、Solana バリデーターの設定と運用の全プロセスを詳細に解説します。solvは複雑なプロセスを簡単にし、効率的なノードの設定と運用を可能にします。
---

この章では、Solana バリデーターとして成功するための第一歩を踏み出します。私たちは、solv という革新的なオープンソースツールを中心に、Solana バリデーターの設定と運用の全プロセスを詳細に解説します。solv は複雑なプロセスを簡単にし、効率的なノードの設定と運用を可能にします。

まずは、Solana バリデーターとして推奨される環境設定について学びます。次に、solv CLI のインストール方法を紹介し、Solana バリデーターのために必要なキーの作成方法を説明します。また、Solana Testnet でのバリデーターとしての報酬と、テストネットで使用する SOL の準備についても触れます。

（※2024/05/26 追記&更新 - ノーダウンタイム移行 & スナップショット DLx100 高速化 🎊）

https://solv.epics.dev/ja/doc/quickstart/no-downtime-update/

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

## 🌐 SOL の準備

テストネット/メインネット バリデーターで投票に参加するには、年間およそ 315 SOL 必要になります。
その他に、自分のバリデーターにどのアカウントからでも数 SOL で良いのでステーキングを行うと進行が早まります。
テストネットでのステイキングの場合は Phantom ウォレットのディベロッパー設定からネットワークをテストネットに変更することで行えます。
(`vote-account-keypair.json`のアドレスにステイキング)

また、テストネットの SOL は Airdrop で手に入れることができます。

```bash
$ solana airdrop 1
```

上記のコマンドでテストネットの SOL を Airdrop することができますが、
ネットワークの状況により、手に入りにくいことがあります。

メインネットの SOL は取引所から購入することができます。

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
sh -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v4.1.2/install")"
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
Setting up Solana Validator ...
? Which solv types do you want to setup? (Use arrow keys)
  TESTNET_VALIDATOR
❯ MAINNET_VALIDATOR
  RPC_NODE
```

![](https://storage.googleapis.com/zenn-user-upload/949db29fc401-20240131.png)

solv のタイプを選択します。
そして、Solana のクライアントを選択します。
(ここでは MAINNET_VALIDATOR の JitoMev を例として選択しています)

```bash
? Which mainnet mode do you want to setup?
  SolanaClient
❯ JitoMev
  Firedancer
JITO MEV Setup Mode on!
? Do you want to setup as a dummy(Inactive) node?(※For Migration) (y/N)
```

ダミーノードかどうかを対話式で確認されますので、N を選択してください。

```bash
? Enter commission bps 1000
? Select region (Use arrow keys)
❯ Amsterdam
  Frankfurt
  NewYork
  Tokyo
```

bps コミッションとリージョンを設定します。

```bash
? Do you want to setup Relayer Also?(※This requires more than 512GB RAM) (y/N)
```

Jito Relayer を設定するかどうかを確認されます。必要に応じて y を選択してください。
この設定は、最低でも 512GB 以上の RAM を必要とします。

```bash
? What is your commission rate? You can change it later (default: 10%)
```

そして、コミッションレートを設定します。

```bash
? Enter swap size to create in MB: (256000)
```

スワップサイズを設定します。
スワップの書き込みには、多少の時間がかかることがあります。

これでセットアップが完了しました。

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
solv monitor
```

## ⏹️ バリデーターの停止

デフォルトで作成された鍵と既存の鍵を交換するために一度、
バリデーターノードを停止します。

```bash
solv stop
```

それでは次の章で鍵の交換、更新について解説したいと思います。

## 🔴 YouTube solv ハンズオン動画

YouTube: 「solv4 で簡単！ソラナバリデーターノードの新規立ち上げと移行ガイド｜ノーダウンタイム移行の完全解説」

https://youtu.be/Hivsa0cgFqU?si=g2m_XVCkThli2geB
