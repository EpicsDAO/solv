---
id: chapter4
title: '第4章: 📊🔥 Firestore と Google スプレッドシートを活用した収益管理 - 効率的なデータ追跡と分析の実践ガイド 📈'
description: この章では、Firebase の Firestore と Google スプレッドシートを駆使して、Solana バリデーターとしての収益を効率的に管理する方法を解説します。
---

この章では、Firebase の Firestore と Google スプレッドシートを駆使して、Solana バリデーターとしての収益を効率的に管理する方法を解説します。データ収集から分析、報告までの全プロセスをカバーし、リアルタイムでのパフォーマンス追跡と意思決定の迅速化を目指します。Firestore の強力なデータベース機能と Google スプレッドシートのアクセシビリティを組み合わせることで、収益管理の自動化と最適化を実現します。本章を通じて、技術的な知識だけでなく、効果的なデータ活用方法を身につけることができます。

## 📝 Firestore のモデルを作成する

前回の章の状態だと、スケジューラーがチェックをするたびに重複するデータを通知してしまいます。
`Firestore` にデータを記録し、新しいデータが追加された時のみに通知するように改善していきます。

`Wallet` と `WalletStakeReward` という二つのモデルを以下に作成します。

`functions/skeet/src/models/walletModels.ts`

```ts
import { Timestamp, FieldValue } from '@skeet-framework/firestore'

// CollectionId: WalletPubkey
// DocumentId: walletPubkey - e.g. LKnGHsjr7UYBXnzfbrz4k6QotCz56rMQTSiVwdRSyL9
// Path: WalletPubkey
export const WalletPubkeyCN = 'WalletPubkey'
export const genWalletPubkeyPath = () => `${WalletPubkeyCN}`
export type WalletPubkey = {
  id?: string
  date: string
  walletPubkey: string
  totalSol: number
  totalRewardAmount: number
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
}

// CollectionId: StakeReward
// DocumentId: epoch - e.g. 420
// Path: StakeReward
export const StakeRewardCN = 'StakeReward'
export const genStakeRewardPath = (pubkey: string) =>
  `${WalletPubkeyCN}/${pubkey}/${StakeRewardCN}`
export type StakeReward = {
  id?: string
  date: string
  walletPubkey: string
  epoch: number
  totalRewardAmount: number
  totalBalance: number
  createdAt?: Timestamp | FieldValue
  updatedAt?: Timestamp | FieldValue
}
```

## 📌 管理するアドレスを登録する

TDS のリワードは毎月、`authority` アカウントに対してステイキングアカウントが発行されますが、ここでは `@skeet-framework/solana-utils` を使い、 `authority` アカウントのアドレスを登録すると、それに紐づくステイクアカウントの報酬をまとめて確認することができるように設定します。

以下のディレクトリに管理するウォレットの pubkey を Firestore に登録するスクリプトを作成します。
Firebase のブラウザから直接データを入力することもできるので、任意の方法でデータを追加して下さい。

`functions/skeet/src/script/addWallet.ts`

```ts
import { Wallet, WalletCN } from '@/models/walletModels'
import { add } from '@skeet-framework/firestore'
import { format } from '@skeet-framework/utils'
import admin from 'firebase-admin'
admin.initializeApp()
const db = admin.firestore()

export const addWallet = async (pubkey: string) => {
  const walletParams: Wallet = {
    date: format(new Date(), 'yyyy-MM-dd'),
    pubkey,
    totalSol: 0,
    totalRewardAmount: 0,
  }
  await add<Wallet>(db, WalletCN, walletParams, pubkey)
  console.log({ status: 'success' })
}

const run = async () => {
  const pubkey = 'your-authority-keypair'
  await addWallet(pubkey)
}

run()
```

`functions/skeet` ディレクトリに移動して、スクリプトを実行します。

```bash
cd functions/skeet && npx ts-node -r tsconfig-paths/register --transpile-only src/scripts/addWallet.ts
{ status: 'success' }
```

Firebase の Firestore を確認してみると、無事にデータが作成されました 🎉

![](https://storage.googleapis.com/zenn-user-upload/bd7e20abeb4b-20231123.png)

## 🔄 StakeMonitor を更新する

それでは `StakeMonitor` を以下のように更新します。

```ts
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { schedulePublicOption } from '@/routings/options'
import {
  RewardDataResponse,
  getAllStakeRewardsByPubkey,
  getCurrentEpoch,
} from '@skeet-framework/solana-utils'
import { defineSecret } from 'firebase-functions/params'
import { format, sendDiscord } from '@skeet-framework/utils'
import { add, get, query, update } from '@skeet-framework/firestore'
import {
  Wallet,
  WalletCN,
  WalletStakeReward,
  genWalletStakeRewardPath,
} from '@/models/walletModels'
import { db } from '@/index'

// Define secrets
const DISCORD_WEBHOOK_URL = defineSecret('DISCORD_WEBHOOK_URL')
const HELIUS_ENDPOINT = defineSecret('HELIUS_ENDPOINT')

export const stakeMonitor = onSchedule(
  { ...schedulePublicOption, secrets: [DISCORD_WEBHOOK_URL, HELIUS_ENDPOINT] },
  async (event) => {
    try {
      // Get all wallets
      const wallets = await query<Wallet>(db, WalletCN, [
        { field: 'pubkey', operator: '!=', value: '' },
      ])

      // If no wallet found, return
      if (wallets.length === 0) {
        console.log({ status: 'error', message: 'No wallet found' })
        return
      }

      // Check if already checked
      const lastEpoch = await getCurrentEpoch(HELIUS_ENDPOINT.value())
      const lastReward = await get<WalletStakeReward>(
        db,
        genWalletStakeRewardPath(wallets[0].pubkey),
        String(lastEpoch - 1)
      )

      // If already checked, return
      if (lastReward) {
        console.log({ status: 'ok', message: 'Already checked' })
        return
      }

      // Get wallet
      const wallet = await get<Wallet>(db, WalletCN, wallets[0].pubkey)
      if (!wallet) {
        console.log({ status: 'error', message: 'Wallet not found' })
        return
      }

      // Get all stake rewards
      for await (const wallet of wallets) {
        const walletPubkey = wallet.pubkey
        const result: RewardDataResponse = await getAllStakeRewardsByPubkey(
          HELIUS_ENDPOINT.value(),
          walletPubkey
        )
        const walletStakeRewardParams: WalletStakeReward = {
          date: format(new Date(), 'yyyy-MM-dd'),
          epoch: result.epoch,
          totalRewardAmount: result.totalRewardAmount,
          totalBalance: result.totalBalance,
        }

        // Add walletStakeReward
        await add<WalletStakeReward>(
          db,
          genWalletStakeRewardPath(walletPubkey),
          walletStakeRewardParams,
          String(result.epoch)
        )

        // Update wallet totalSol and totalRewardAmount
        await update<Wallet>(db, WalletCN, walletPubkey, {
          totalSol: wallet.totalSol + result.totalBalance,
          totalRewardAmount:
            wallet.totalRewardAmount + result.totalRewardAmount,
        })

        // Generate content
        const content = `Account: ${walletPubkey}
Epoch: ${result.epoch}
Reward: ${result.totalRewardAmount} SOL
Total SOL: ${result.totalBalance} SOL
`

        // Send discord message
        await sendDiscord(content, {
          webhookUrl: DISCORD_WEBHOOK_URL.value(),
          username: 'Skeet Staking Monitor',
        })
      }
      console.log({ status: 'success' })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  }
)
```

## 🚀 デプロイしてアプリを更新する

デプロイを行い変更を反映させます。

```bash
skeet deploy --function skeet:stakeMonitor
```

## ⏲️ Scheduler を実行する

同様に Scheduler から実行してみると

![](https://storage.googleapis.com/zenn-user-upload/8588406d71be-20231123.png)

![](https://storage.googleapis.com/zenn-user-upload/5898f8b4463a-20231123.png)

![](https://storage.googleapis.com/zenn-user-upload/24fe5c9f6e22-20231123.png)

無事に Firestore にデータが保存され、通知が届きました 🎉

もう一度、Scheduler を実行してみましょう。
Firestore にデータが保存されているので、同じ通知が届かなくなっています。

これで、管理したいウォレットのアドレスを同様に登録することで、
マルチプルにウォレットのステイキング報酬を管理することができるようになりました 🎉

## 📊 スプレッドシートを作成する

続いて、新規データ追加時に `Google スプレッドシート` にデータを同期するように設定したいと思います。

まずは以下のリンクより Google スプレッドシートを作成し、

スプレッドシート ID - `spreadsheetId`
シート名 - `sheetTitle` (ここでは StakeRewards)

をメモしておいてください。

ヘッダーには以下の値をコピーして貼り付けて下さい。

```bash
Date	Address	RewardAmount(SOL)	Epoch	PostBalance(SOL)
```

https://docs.google.com/spreadsheets

![](https://storage.googleapis.com/zenn-user-upload/845a9fad4bae-20231123.png)

そして右上の `Share` からあなたのサービスアカウントを追加します。

サービスアカウントはあなたが設定した `appName` と `project-id`に置き換えて下さい。

```bash
<appName>@<project-id>.iam.gserviceaccount.com
```

`appName` は `./skeet-cloud.config.json` の app:name と同じ値になります。

## 🔄 スプレッドシートと同期する機能を追加する

先ほど作成した `stakeMonitor` に機能を追加することもできますが、
多くのアドレスを管理する場合に処理が重くなってしまうため、ここでは、`Firestore` トリガーの `Cloud Functions for Firebase` に切り分けて追加したいと思います。

まずは `@skeet-framework/spreadsheet-utils` パッケージを追加します。

```bash
skeet yarn add -p @skeet-framework/spreadsheet-utils
```

`skeet add method` コマンドで `firestore` インスタンステンプレートを追加します。

```bash
skeet add method addSpreadsheet
? Select Instance Type to add firestore
✔ ./functions/skeet/src/routings/firestore/addSpreadsheet.ts created 🎉
✔ Successfully exported to ./functions/skeet/src/index.ts 🎉
```

そして以下のように `addSpreadsheet.ts` を編集します。

```ts
import { onDocumentCreated } from 'firebase-functions/v2/firestore'
import { firestoreDefaultOption } from '@/routings/options'
import { addDataToSheet } from '@skeet-framework/spreadsheet-utils'
import { sendDiscord } from '@skeet-framework/utils'
import { defineSecret } from 'firebase-functions/params'

const DISCORD_WEBHOOK_URL = defineSecret('DISCORD_WEBHOOK_URL')

export const addSpreadsheet = onDocumentCreated(
  {
    ...firestoreDefaultOption('Wallet/{pubkey}/WalletStakeReward/{epoch}'),
    secrets: [DISCORD_WEBHOOK_URL],
  },
  async (event) => {
    console.log(`addSpreadsheet triggered!`)
    try {
      // Define spreadsheet params
      const spreadsheetId = '1mLN3pUee-thUfys-UfpeHvnjVmZZX_KLWxp76-49COY'
      const sheetTitle = 'StakeRewards'
      const walletPubkey = event.params.pubkey
      const epoch = event.data?.get('epoch') as number
      const totalRewardAmount = event.data?.get('totalRewardAmount') as number
      const totalBalance = event.data?.get('totalBalance') as number

      // Add data to spreadsheet
      await addDataToSheet(spreadsheetId, sheetTitle, [
        [
          event.data?.get('date'),
          walletPubkey,
          totalRewardAmount,
          epoch,
          totalBalance,
        ],
      ])

      // Generate Message Content
      const content = `Account: ${walletPubkey}
Epoch: ${epoch}
Reward: ${totalRewardAmount} SOL
Total SOL: ${totalBalance} SOL`

      // Send discord message
      await sendDiscord(content, {
        webhookUrl: DISCORD_WEBHOOK_URL.value(),
        username: 'Skeet Staking Monitor',
      })
      console.log({ status: 'success' })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  }
)
```

Discord での通知も `stakeMonitor` から `addSpreadsheet` に移動し、
Google スプレッドシートに新しいデータが追加された時に通知するように変更します。

## 🛠️ stakeMonitor を更新する

なので、以下のように `stakeMonitor.ts` から Discord 通知部分を取り除きます。

```ts
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { schedulePublicOption } from '@/routings/options'
import {
  RewardDataResponse,
  getAllStakeRewardsByPubkey,
  getCurrentEpoch,
} from '@skeet-framework/solana-utils'
import { defineSecret } from 'firebase-functions/params'
import { format } from '@skeet-framework/utils'
import { add, get, query, update } from '@skeet-framework/firestore'
import {
  Wallet,
  WalletCN,
  WalletStakeReward,
  genWalletStakeRewardPath,
} from '@/models/walletModels'
import { db } from '@/index'

// Define secrets
const HELIUS_ENDPOINT = defineSecret('HELIUS_ENDPOINT')

export const stakeMonitor = onSchedule(
  { ...schedulePublicOption, secrets: [HELIUS_ENDPOINT] },
  async (event) => {
    try {
      // Get all wallets
      const wallets = await query<Wallet>(db, WalletCN, [
        { field: 'pubkey', operator: '!=', value: '' },
      ])

      // If no wallet found, return
      if (wallets.length === 0) {
        console.log({ status: 'error', message: 'No wallet found' })
        return
      }

      // Check if already checked
      const lastEpoch = await getCurrentEpoch(HELIUS_ENDPOINT.value())
      const lastReward = await get<WalletStakeReward>(
        db,
        genWalletStakeRewardPath(wallets[0].pubkey),
        String(lastEpoch - 1)
      )

      // If already checked, return
      if (lastReward) {
        console.log({ status: 'ok', message: 'Already checked' })
        return
      }

      // Get wallet
      const wallet = await get<Wallet>(db, WalletCN, wallets[0].pubkey)
      if (!wallet) {
        console.log({ status: 'error', message: 'Wallet not found' })
        return
      }

      // Get all stake rewards
      for await (const wallet of wallets) {
        const walletPubkey = wallet.pubkey
        const result: RewardDataResponse = await getAllStakeRewardsByPubkey(
          HELIUS_ENDPOINT.value(),
          walletPubkey
        )
        const walletStakeRewardParams: WalletStakeReward = {
          date: format(new Date(), 'yyyy-MM-dd'),
          epoch: result.epoch,
          totalRewardAmount: result.totalRewardAmount,
          totalBalance: result.totalBalance,
        }

        // Add walletStakeReward
        await add<WalletStakeReward>(
          db,
          genWalletStakeRewardPath(walletPubkey),
          walletStakeRewardParams,
          String(result.epoch)
        )

        // Update wallet totalSol and totalRewardAmount
        await update<Wallet>(db, WalletCN, walletPubkey, {
          totalSol: wallet.totalSol + result.totalBalance,
          totalRewardAmount:
            wallet.totalRewardAmount + result.totalRewardAmount,
        })
      }
      console.log({ status: 'success' })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  }
)
```

## 🚀 デプロイしてアプリを更新する

それでは再度デプロイを行い、アプリを更新します。

```bash
skeet deploy
? Select Functions to deploy (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter>
to proceed)
  = Functions =
 ◯ solvMonitor
 ◉ stakeMonitor
❯◉ addSpreadsheet
```

## ⏲️ Scheduler を実行する

もう一度 Firestore の `WalletStakeReward` のレコードを削除し、

Scheduler を実行します。

無事にスプレッドシートが更新され、
Discord に通知が届きました 🎉

![](https://storage.googleapis.com/zenn-user-upload/2bd77535a879-20231123.png)

これで定期チェック時に新規データがあった場合のみ、通知を行い、スプレッドシートと同期することができるようになりました。

## 🌐 ロードバランサーと Google Cloud Armor の組み合わせ

Webhook エンドポイントの強化

Firebase Functions は迅速かつ効率的に Webhook エンドポイントを構築する強力なツールですが、プロジェクトが成長するにつれて、そのインフラを強化する必要が出てきます。この点で、ロードバランサーの導入がキーとなります。ロードバランサーを使用することで、エンドポイントのパフォーマンスと信頼性が大幅に向上し、高いトラフィックや異常なアクセスパターンに対しても弾力的に対応することができます。

さらに、Google Cloud Armor の統合により、セキュリティ面でも大きな強化が図られます。Google Cloud Armor は、DDoS 攻撃やウェブ攻撃から保護するための強力なツールであり、ロードバランサーと併用することで、Webhook エンドポイントを様々な脅威から守る堅牢な防御層を提供します。これにより、エンドユーザーへのサービス提供がさらに安定し、ビジネスの信頼性も高まります。

初期段階ではシンプルなセットアップで問題なく開始できますが、プロジェクトの成長に伴い、ロードバランサーと Google Cloud Armor の導入を検討することで、ネットワークの安定性とセキュリティを大幅に強化することが可能です。この戦略的アプローチにより、ビジネスがスケールアップする過程でのニーズに迅速に対応し、エンドユーザーに対して一貫して高品質なサービスを提供することができるようになります。

ロードバランサーと Google Cloud Armor の設定方法については、
以下のリンクで詳細をご確認いただけます。

https://skeet.dev/ja/doc/skeet-firestore/initial-deploy/

## 🎉 まとめ：Solana バリデーターの旅路の完結と EpicsDAO コミュニティへの招待

本書を通じて、Solana ネットワークのバリデーターとしての道を歩むための包括的なガイドを提供しました。初心者から上級者まで、Solana バリデーターの設定、運用、更新に至るまでの全ステップをわかりやすく解説し、読者一人ひとりがこの分野で成功するための知識とツールを手に入れることを目指しました。

特に重要なのは、'solv' というオープンソースツールの導入です。このツールにより、Solana バリデーターの設定と運用が大幅に簡素化され、より迅速かつ効率的になりました。安全なシークレットキーの管理から、ノードの効率的な再構築まで、本書はあなたが Solana バリデーターとして活躍するための確固たる支援となるでしょう。

第 1 章から第 4 章にわたる旅は、ただの技術的な学習にとどまらず、ブロックチェーンの未来を切り拓く大きな一歩となります。本書を手にしたあなたは、Solana ネットワークの一員として、新たな価値を創造し、ブロックチェーン技術の進化に貢献することができるのです。

このガイドを終えた今、さらなる交流と学習のために、EpicsDAO の Discord チャンネルへの参加をお勧めします。ここでは、同じ志を持つ開発者たちが集まり、経験と知識を共有し、互いに支援し合っています。あなたの一歩が、ブロックチェーンの未来に新たな章を刻むことになるでしょう。

EpicsDAO Discord チャンネルへの招待リンク:

https://discord.gg/jZQ33byATb

一緒に学び、成長し、新たなプロジェクトの可能性を探求しましょう。あなたの参加を心よりお待ちしています。
