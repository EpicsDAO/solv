---
id: quickstart-solv-mev-mode
title: solv MEV モード
description: オープンソースのSolana バリデーター向けツールsolvのクイックスタート - MEV モード
---

🌱 Solana/solv バージョン更新のための SSH ログイン不要 🌱

新しい solv MEV モードの導入により、Solana/solv バージョンの更新がシームレスに行えるようになりました。これにより、サーバーへの SSH ログインなしで Solana/solv バージョンを更新できるようになります。

主な特徴:

- 自動更新: solv MEV モードは Solana/solv バージョンを自動的に更新し、手動の介入なしで常に最新バージョンを実行できるようにします。

- モニタリング: solv MEV モードは、バリデータの健康状態と残高を監視し、Discord に通知を送信します。

- 報酬の自動収穫: このモードでは、エポック終了直前に報酬を権限アカウントに収穫し、利回りを最適化します。

- 自動ステイキング: 報酬の収穫後、報酬は SOL から LST（流動性ステーキングトークン - elSOL） に変換され、指定したアカウントに送信されます。

- セキュリティの強化: バリデータノードの SOL 残高を低く保ち、報酬を LST に変換することで、大規模な SOL 引き出しのリスクを軽減し、高い利回りを維持します。

## solv MEV モードとは？

solv MEV モードは、Solana バリデータのメンテナンスを自動化するために設計された機能で、Solana/solv の状態とバージョンを定期的にチェックおよび更新します。

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

solv MEV モードを実装することで、高いセキュリティを維持し、最適なパフォーマンスを確保し、自動更新および報酬管理の利便性を享受することができます。

## solv MEV モードを有効にする方法

以下のコマンドを実行します:

```bash
$ solv mev
? Do you want to enable solv MEV Mode?(You can change it again) (y/N)
? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
? Do you want to enable AUTO RESTART? (Recommended) (y/N)
※ Please turn off if you are using no-downtime migration.
? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
```

1.  solv MEV モードを有効にします。
2.  AUTO UPDATE を有効にします。
3.  AUTO RESTART を有効にします。

※ ノーダウンタイム移行を使用している場合は無効にしてください。
※ ノーダウンタイム移行には予備サーバーと手動による作業が必要です。

4.  Discord Webhook URL を入力します。

※ Solana/solv バージョンの更新に関する通知を受け取ることができます。

5.  RPC URL を入力します（メインネットのみ）
6.  Harvest Account を入力します（メインネットのみ）

※ バリデーターノードにハーベストアカウントを保持しないでください。

## solv MEV モードを無効にする方法

以下のコマンドを実行します:

```bash
$ solv mev
? Do you want to enable solv MEV Mode?(You can change it again) (y/N) n
✅ Cron Job successfully removed.
```
