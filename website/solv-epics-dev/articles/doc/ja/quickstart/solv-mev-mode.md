---
id: quickstart-solv-mev-mode
title: solv 自動更新モード
description: オープンソースのSolana バリデーター向けツールsolvのクイックスタート - 自動更新モード
---

![solv MEV Mode](/news/2024/07/11/solvMEVMode.jpg)

🌱 Solana/solv バージョン更新のための SSH ログイン不要 🌱

新しい solv 自動更新モードの導入により、Solana/solv バージョンの更新がシームレスに行えるようになりました。これにより、サーバーへの SSH ログインなしで Solana/solv バージョンを更新できるようになります。

主な特徴:

- 自動更新: solv 自動更新モードは Solana/solv バージョンを自動的に更新し、手動の介入なしで常に最新バージョンを実行できるようにします。

- モニタリング: solv 自動更新モードは、バリデータの健康状態と残高を監視し、Discord に通知を送信します。

- 報酬の自動収穫: このモードでは、エポック終了直前に報酬を権限アカウントに収穫し、利回りを最適化します。

- 自動ステイキング: 報酬の収穫後、報酬は SOL から LST（流動性ステーキングトークン - elSOL） に変換され、指定したアカウントに送信されます。

- セキュリティの強化: バリデータノードの SOL 残高を低く保ち、報酬を LST に変換することで、大規模な SOL 引き出しのリスクを軽減し、高い利回りを維持します。

## solv 自動更新モードとは？

solv 自動更新モードは、Solana バリデータのメンテナンスを自動化するために設計された機能で、Solana/solv の状態とバージョンを定期的にチェックおよび更新します。

## 仕組み

- solv epochTimer: この機能は cron ジョブとして設定され、バリデータの健康状態を自動的に監視し、必要に応じて更新を行います。

- 自動再起動: 必要に応じて、solv epochTimer はバリデータを再起動し、最適なパフォーマンスを確保します。

## solv epochTimer の監視項目:

epochTimer は次の項目についてバリデータを監視します:

### バリデータアカウントの残高チェック

- 残高が 0.5 SOL 未満の場合、通知を送信します。

![solv](/doc/alert-balance-msg.png)

### バリデータの健康状態チェック

- バリデータが投票していない場合や不良状態の場合、通知を送信します。

![solv](/doc/alert-inactive-msg.png)

### Solana/solv バージョンの更新チェック

- Solana/solv バージョンが最新でない場合、通知を送信します。
- Solana/solv バージョンを自動的に更新します。
- 必要に応じてバリデータを再起動します。
- Solana/solv バージョンの更新後、通知を送信します。

![solv](/doc/restart-msg.png)

### 自動収穫（メインネットのみ）

- 報酬を投票アカウントから権限アカウントに引き出します。
- 次のエポックに必要な残高を計算します。
- バリデータアカウントから権限アカウントに残高を転送します。
- SOL を LST（流動性ステーキングトークン）に変換し、収穫アカウントに送信します。

![solv](/doc/harvest-msg.png)

solv 自動更新モードを実装することで、高いセキュリティを維持し、最適なパフォーマンスを確保し、自動更新および報酬管理の利便性を享受することができます。

## solv 自動更新モードを有効にする方法

以下のコマンドを実行します:

```bash
$ solv mev
? Do you want to enable solv Auto Update Mode?(You can change it again) (y/N)
? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
? Do you want to enable AUTO RESTART? (Recommended) (y/N)
※ Please turn off if you are using no-downtime migration.
? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
```

1.  solv 自動更新モードを有効にします。
2.  AUTO UPDATE を有効にします。
3.  AUTO RESTART を有効にします。

※ ノーダウンタイム移行を使用している場合は無効にしてください。
※ ノーダウンタイム移行には予備サーバーと手動による作業が必要です。

4.  Discord Webhook URL を入力します。

※ Solana/solv バージョンの更新に関する通知を受け取ることができます。

5.  RPC URL を入力します（メインネットのみ）
6.  Harvest Account を入力します（メインネットのみ）

※ バリデーターノードにハーベストアカウントを保持しないでください。

## solv 自動更新モードを無効にする方法

以下のコマンドを実行します:

```bash
$ solv auto
? Do you want to enable solv Auto Update Mode?(You can change it again) (y/N) n
✅ Cron Job successfully removed.
```

## elSOL とは？

![elSOL](/news/2024/07/05/elSOLlst.jpg)

elSOL は、solv 開発チームによって管理されている高品質なバリデータープールに基づくステークアカウントをトークン化したもの(LST: Liquid Staking Token)です。このプールは経験豊富で高品質なバリデーター複数台によって構成されており、日頃のソフトウェアアップデートもノーダウンタイムで行われ、高いバリデータースコアと安定性を実現します。このプールを支えるバリデーター達はユーザー手数料 0% で運用されており、効率的でコスト効果の高いステーキングソリューションを提供します。

elSOL - SOLscan: https://solscan.io/token/ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC

elSOL は Solana 公式の Stake Pool プログラムを利用しており、各エポックの後に基礎となるステークアカウントの価値が増加し、それに伴い各 elSOL が表す SOL の量も増加します。

Solana Stake Pool プログラム: https://spl.solana.com/stake-pool

## なぜ elSOL？

elSOL の主な利点は、そのコンポーザビリティ（相互運用性）です。トークン化されたステークアカウントは、トークンを操作する任意のプログラムで使用できるようになります。これにより、elSOL は Jupiter のような他の Solana DeFi プロトコルと統合され、さまざまな金融サービスを提供することが可能となります。

Jupiter: https://jup.ag/swap/SOL-ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC

Orca にも流動性プールが上場されており、SOL をステーキングして elSOL にしながら、さらにその elSOL を流動性プールに供給することで、報酬を最大化することができます。

Orca elSOL 流動性プール (LP): https://www.orca.so/pools?tokens=ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC

elSOL を保有することで、SOL の価値が増加するアセットを保持しながら、ほぼすべての Solana プログラムを利用できます。これにより、ステークされた資産を活用する新しい機会が生まれます。

## elSOL を保持する利点

1. **即時流動性の確保:** elSOL を使えば、エポックの終了を待つことなくすぐに流動性を確保できます。例えば、NFT を購入するために 5 SOL が必要な場合、elSOL を SOL と即座に交換し、残りの elSOL は引き続き報酬を獲得します。
2. **自動的な MEV 報酬の収集と複利化:** elSOL は自動的に MEV 報酬を収集し、複利化するため、SOL に対する価値が増加します。これは、MEV 報酬を手動で収集して再投資するよりも効率的です。

現在 elSOL は solv CLI を使用してワンコマンドで簡単にステーキングできます。近日中に elSOL アプリケーションをリリースし、UI でのステーキングも可能にする予定となっております。

※ 本記事は投資助言などを目的としたものではありません。また、本記事に記載された情報は、執筆時点のものです。最新の情報をご確認ください。常に NFA / DYOR でお願いいたします。
