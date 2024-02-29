---
id: chapter3
title: 'Chapter 3: 🌐💰 The Full Scope of Cloud Utilization: Efficient Monitoring of Solana Validators and Management of Staking Rewards 🚀'
description: In this chapter, we explore how to efficiently monitor Solana validators and manage staking rewards by fully leveraging the power of the cloud.
---

In this chapter, we explore how to efficiently monitor Solana validators and manage staking rewards by fully leveraging the power of the cloud. We aim to implement within the free tier of Firebase Functions using an innovative serverless framework called Skeet Framework. This framework allows us to optimize resources while making it easier and more cost-effective to monitor validator performance and track rewards. As we progress through the chapter, we will explain in detail how to implement these critical processes using Firebase and Skeet Framework, including practical examples.

This chapter utilizes Cloud Functions for Firebase and the serverless framework Skeet.

## 🚀 Deploying Firebase Functions

First, deploy `Cloud Functions for Firebase`.
Please refer to the following section for setting up this development environment and deployment.

https://link.medium.com/Jvrjbv2uZEb

## 📩 Obtaining Discord Webhook URL

Right-click on the channel where you want to receive notifications and create a Webhook.
Then, make a note of the Webhook URL.

![](https://storage.googleapis.com/zenn-user-upload/da936f953ead-20231122.png)

## 🛰️ Adding an Endpoint for Validator Monitoring

In the root directory of your `skeet framework`, execute the `skeet add method` command.

Since you want to perform a periodic execution, select `schedule`.

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

A template for `Cloud Functions for Firebase` named `solvMonitor` has been created.

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

## 🧠 Adding Logic for Validator Monitoring

First, add the necessary npm package.

```bash
skeet yarn add -p @skeet-framework/solana-utils
? Select Services to run yarn command (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Services =
❯◯ skeet
```

Select the functions directory to add by pressing the space key.

Next, add the Discord Webhook URL you obtained earlier to the Secret Manager.

```bash
skeet add secret DISCORD_WEBHOOK_URL
? Enter a value for DISCORD_WEBHOOK_URL [hidden]
✔  Created a new secret version projects/1012380258xx/secrets/DISCORD_WEBHOOK_URL/versions/1
```

Then, update `solvMonitor` as follows.

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

Add the logic for validator monitoring as shown above.

## 🚀 Deploying Logic for Validator Monitoring

Deploy your monitoring app using the `skeet deploy` command.

```bash
? Select Functions to deploy (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
  = Functions =
 ◯ root
❯◉ solvMonitor
```

Select `solvMonitor` and deploy it to `Cloud Functions for Firebase`.

Next, execute it from the following `Cloud Scheduler` console:

https://console.cloud.google.com/cloudscheduler

You can test it by clicking `Force run` from the `Actions` on the right.

![](https://storage.googleapis.com/zenn-user-upload/b7e5b17d4be5-20231122.png)

If it succeeds, you will see:

![](https://storage.googleapis.com/zenn-user-upload/5125848e30dd-20231122.png)

A notification will be sent to Discord 🎉

## ⏲️ Setting Scheduled Execution Time

By default, the configuration options are defined in the following directory:

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

By default, it is set to execute every hour. Please change the value of `schedule` to your desired setting.

For more details on schedule settings:

https://cloud.google.com/scheduler/docs/configuring/cron-job-schedules

## 🌐 Adding an Endpoint for Staking Rewards Monitoring

Similarly, we are now adding a new feature for checking staking rewards.

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

A template for `Cloud Functions for Firebase` named `stakingMonitor` has been created.

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

## 🔗 About Solana's RPC Endpoints

The official Solana RPC endpoint `https://api.mainnet-beta.solana.com` has rate limits, so using a private RPC is recommended for more stable data access. To this end, we introduce the use of Helius's RPC service and how to securely store its endpoint information in a secret manager.

https://www.helius.dev/

Use the following command to register the Helius RPC endpoint with the secret manager:

```bash
skeet add secret HELIUS_ENDPOINT
? Enter a value for HELIUS_ENDPOINT [hidden]
```

By following this procedure, your application will be able to access the Solana network more efficiently through Helius's private RPC, obtaining stable data without being affected by rate limits.

## 💡 Adding Logic for Staking Reward Monitoring

Update `stakingMonitor` as follows:

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

## 📤 Deploying Logic for Staking Rewards Monitoring

Similarly, deploy the monitoring app using the `skeet deploy` command.

```bash
skeet deploy --function skeet:stakeMonitor
```

You can also specify which functions to deploy by using the `--function` option.

Likewise, let's try executing it from Cloud Scheduler.

![](https://storage.googleapis.com/zenn-user-upload/446a191fdf48-20231123.png)

The notification has been successfully received 🎉

![](https://storage.googleapis.com/zenn-user-upload/7ba0331573c5-20231123.png)

In the next chapter, we will manage data more conveniently using `Firestore` and `Google Sheets`.
