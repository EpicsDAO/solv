---
id: chapter3
title: '第3章: 🌐💰 クラウド活用の全貌: Solana バリデーターの効率的モニタリングとステイキングリワードの管理 🚀🔍'
description: この章では、クラウドの力を最大限に活用して、Solana バリデーターのモニタリングとステイキングリワードの管理を効率的に行う方法を探ります。
---

この章では、クラウドの力を最大限に活用して、Solana バリデーターのモニタリングとステイキングリワードの管理を効率的に行う方法を探ります。私たちは、`Firebase Functions` の無料枠内で実装を行うことを目標に、`Skeet Framework` という革新的なサーバーレスフレームワークを使用します。このフレームワークを用いることで、リソースの最適化を図りつつ、バリデーターのパフォーマンス監視やリワード追跡をより簡単かつコスト効率よく行うことが可能になります。章を進めるにつれて、`Firebase` と `Skeet Framework` を駆使して、これらの重要なプロセスをどのように実装するかを、実例を交えて詳細に解説していきます。

この章では `Cloud Functions for Firebase` とサーバーレスフレームワーク `Skeet` を使用します。

https://firebase.google.com/docs/functions

https://skeet.dev/ja

## 🚀 Firebase Functions のデプロイ

まずは `Cloud Functions for Firebase` をデプロイします。
この開発環境の準備は以下の章を参考にデプロイをしてください。

https://zenn.dev/fumisouls/books/a27314e5a8428d/viewer/fdeb74

## 📩 Discord ウェブフック URL の取得

通知を受信したいチャンネルを右クリックして Webhook を作成します。
そして、Webhook URL をメモしておきます。

![](https://storage.googleapis.com/zenn-user-upload/da936f953ead-20231122.png)

## 🛰️ バリデーター監視用のエンドポイントの追加

作成した `skeet framework` のルートディレクトリで、
`skeet add method` コマンドを実行します。

定期実行を行うので `schedule` を選択します。

```bash
skeet add method solvMonitor
? Select Instance Type to add
   = Instance Type =
  http
  firestore
  pubsub
❯ schedule
  auth
✔ ./functions/skeet/src/routings/schedule/solvMonitor.ts created 🎉
✔ Successfully exported to ./functions/skeet/src/index.ts 🎉
```

`solvMonitor` という `Cloud Functions for Firebase` のテンプレートが作成されました。

`solvMonitor.ts`

```ts
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { scheduleDefaultOption } from '@/routings/options'

export const solvMonitor = onSchedule(scheduleDefaultOption, async (event) => {
  try {
    console.log({ status: 'success' })
  } catch (error) {
    console.log({ status: 'error', message: String(error) })
  }
})
```

## 🧠 バリデーター監視用のロジックの追加

まずは必要な npm パッケージを追加します。

```bash
skeet yarn add -p @skeet-framework/solana-utils
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to
proceed)
  = Services =
❯◯ skeet
```

スペースキーで追加する functions ディレクトリを選択します。

次に先ほど取得した Discord の Webhook URL を Secret Manager へ追加します。

```bash
skeet add secret DISCORD_WEBHOOK_URL
? Enter a value for DISCORD_WEBHOOK_URL [hidden]
✔  Created a new secret version projects/1012380258xx/secrets/DISCORD_WEBHOOK_URL/versions/1
```

そして以下のように、`solvMonitor` を更新します。

```ts
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { scheduleDefaultOption } from '@/routings/options'
import { defineSecret } from 'firebase-functions/params'
import {
  ValidatorStatusParams,
  isValidatorActive,
} from '@skeet-framework/solana-utils'
import { sendDiscord } from '@skeet-framework/utils'

const DISCORD_WEBHOOK_URL = defineSecret('DISCORD_WEBHOOK_URL')

export const solvMonitor = onSchedule(
  { ...scheduleDefaultOption, secrets: [DISCORD_WEBHOOK_URL] },
  async (event) => {
    try {
      const endpoint = 'https://api.testnet.solana.com'
      const voteAccountPubkey = '<your-vote-account-pubkey>'
      const result: ValidatorStatusParams = await isValidatorActive(
        endpoint,
        voteAccountPubkey
      )
      const content = `Validator: ${voteAccountPubkey}\nStatus${
        result.isActive ? 'active' : 'inactive'
      }\nMessage: ${result.reason}`
      await sendDiscord(content, {
        webhookUrl: DISCORD_WEBHOOK_URL.value(),
        username: 'Skeet Solana Monitor',
      })
      console.log({ result })
      console.log({ status: 'success' })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  }
)
```

バリデーター監視用のロジックを以下のように追加します。

## 🚀 バリデーター監視用のロジックのデプロイ

そして `skeet deploy` コマンドでモニターアプリをデプロイします。

```bash
? Select Functions to deploy (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Functions =
 ◯ root
❯◉ solvMonitor
```

`solvMonitor`を選択し、`Cloud Functions for Firebase` へデプロイします。

次に以下の `Cloud Scheduler` のコンソールから実行します。

https://console.cloud.google.com/cloudscheduler

右にある`Actions`から `Force run` をクリックすることでテストすることができます。

![](https://storage.googleapis.com/zenn-user-upload/b7e5b17d4be5-20231122.png)

無事に成功すると、

![](https://storage.googleapis.com/zenn-user-upload/5125848e30dd-20231122.png)

ディスコードに通知が届きました 🎉

## ⏲️ 定期実行時間の設定

デフォルトでは以下のディレクトリに設定オプションが定義されています。

`functions/skeet/src/routings/options/scheduleOptions.ts`

```ts
import { ScheduleOptions } from 'firebase-functions/v2/scheduler'
import skeetOptions from '../../../skeetOptions.json'

const appName = skeetOptions.name
const project = skeetOptions.projectId
const region = skeetOptions.region
const serviceAccount = `${appName}@${project}.iam.gserviceaccount.com`
const vpcConnector = `${appName}-con`

export const scheduleDefaultOption: ScheduleOptions = {
  region,
  schedule: 'every 1 hours',
  timeZone: 'UTC',
  retryCount: 3,
  maxRetrySeconds: 60,
  minBackoffSeconds: 1,
  maxBackoffSeconds: 10,
  serviceAccount,
  timeoutSeconds: 540,
  labels: {
    skeet: 'schedule',
  },
}
```

デフォルトでは 毎時間に実行されるようになっているので、
`schedule` の値を任意のものへ変更してください。

schedule 設定の詳細

https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules

## 🌐 ステイキング報酬監視用のエンドポイントの追加

同様に、今度はステイキング報酬の確認用に新しい機能を追加します。

```bash
skeet add method stakeMonitor
? Select Instance Type to add
   = Instance Type =
  http
  firestore
  pubsub
❯ schedule
  auth
✔ ./functions/skeet/src/routings/schedule/stakeMonitor.ts created 🎉
✔ Successfully exported to ./functions/skeet/src/index.ts 🎉
```

`stakingMonitor` という `Cloud Functions for Firebase` のテンプレートが作成されました。

`stakingMonitor.ts`

```ts
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { scheduleDefaultOption } from '@/routings/options'

export const stakingMonitor = onSchedule(
  scheduleDefaultOption,
  async (event) => {
    try {
      console.log({ status: 'success' })
    } catch (error) {
      console.log({ status: 'error', message: String(error) })
    }
  }
)
```

## 🔗 Solana の RPC エンドポイントについて

Solana の公式 RPC エンドポイント `https://api.mainnet-beta.solana.com` はレート制限が設けられているため、より安定したデータアクセスを実現するにはプライベート RPC の使用が推奨されます。
この目的のために、私たちは Helius の RPC サービスを利用し、そのエンドポイント情報をシークレットマネージャーに安全に保存する方法を紹介します。

https://www.helius.dev/

以下のコマンドを使用して、Helius RPC エンドポイントをシークレットマネージャーに登録します：

```bash
skeet add secret HELIUS_ENDPOINT
? Enter a value for HELIUS_ENDPOINT [hidden]
```

この手順により、アプリケーションは Helius のプライベート RPC を通じて、より効率的に Solana ネットワークにアクセスし、レート制限の影響を受けずに安定したデータを取得できるようになります。

## 💡 ステイキング報酬監視用のロジックの追加

そして以下のように、`stakingMonitor` を更新します。

```ts
import { onSchedule } from 'firebase-functions/v2/scheduler'
import { schedulePublicOption } from '@/routings/options'
import {
  RewardDataResponse,
  getAllStakeRewardsByPubkey,
} from '@skeet-framework/solana-utils'
import { defineSecret } from 'firebase-functions/params'
import { sendDiscord } from '@skeet-framework/utils'

const DISCORD_WEBHOOK_URL = defineSecret('DISCORD_WEBHOOK_URL')
const HELIUS_ENDPOINT = defineSecret('HELIUS_ENDPOINT')

export const stakeMonitor = onSchedule(
  { ...schedulePublicOption, secrets: [DISCORD_WEBHOOK_URL, HELIUS_ENDPOINT] },
  async (event) => {
    try {
      const walletPubkey = 'LKnGHsjr7UYBXnzfbrz4k6QotCz56rMQTSiVwdRSyL9'
      const result: RewardDataResponse = await getAllStakeRewardsByPubkey(
        HELIUS_ENDPOINT.value(),
        walletPubkey
      )
      const content = `Account: ${walletPubkey}
Epoch: ${result.epoch}
Reward: ${result.totalRewardAmount} SOL
Total SOL: ${result.totalBalance} SOL
`
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

## 📤 ステイキング報酬監視用のロジックのデプロイ

同様に `skeet deploy` コマンドでモニターアプリをデプロイします。

```bash
skeet deploy --function skeet:stakeMonitor
```

`--function` オプションをつけてデプロイする functions を指定することもできます。

同様に、Cloud Scheduler から実行してみます。

![](https://storage.googleapis.com/zenn-user-upload/446a191fdf48-20231123.png)

無事に通知が届きました 🎉

![](https://storage.googleapis.com/zenn-user-upload/7ba0331573c5-20231123.png)

次の章では `Firestrore`　と `Google スプレッドシート`　を使ってより便利にデータを管理していきたいと思います。
