---
id: chapter4
title: 'Chapter 4: 📊🔥 Utilizing Firestore and Google Spreadsheets for Revenue Management — A Guide to Efficient Data Tracking and Analysis 📈'
description: In this chapter, we will explain how to efficiently manage earnings as a Solana validator using Firebase’s Firestore and Google Spreadsheets.
---

In this chapter, we will explain how to efficiently manage earnings as a Solana validator using Firebase’s Firestore and Google Spreadsheets. We cover the entire process from data collection to analysis and reporting, aiming for real-time performance tracking and faster decision-making. By combining Firestore’s powerful database capabilities with the accessibility of Google Spreadsheets, we achieve automation and optimization in revenue management. Through this chapter, you can gain not only technical knowledge but also effective data utilization methods.

## 📝 Creating Firestore Models

As it stands from the previous chapter, the scheduler will notify about duplicate data every time it checks. We will improve this by recording data in `Firestore` and only notifying when new data is added.

We will create two models called `Wallet` and `WalletStakeReward` as follows.

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

## 📌 Registering Managed Addresses

TDS rewards are issued monthly to the `authority` account by staking accounts, but here we will use `@skeet-framework/solana-utils` to register the address of the `authority` account. By doing so, you can collectively check the rewards for the associated stake accounts.

Create a script in the following directory to register the pubkey of the managed wallet in Firestore. You can also enter data directly from the Firebase browser, so please add the data by any preferred method.

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

Move to the `functions/skeet` directory and execute the script.

```bash
cd functions/skeet && npx ts-node -r tsconfig-paths/register --transpile-only src/scripts/addWallet.ts
{ status: 'success' }
```

Upon checking Firebase's Firestore, the data has been successfully created 🎉

![](https://storage.googleapis.com/epics-bucket/solv2/solv-wallet.png)

## 🔄 Updating StakeMonitor

Let's update `StakeMonitor` as follows.

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

## 🚀 Deploy and Update the App

Deploy to apply changes.

```bash
skeet deploy --function skeet:stakeMonitor
```

## ⏲️ Running the Scheduler

Similarly, when executed from the Scheduler:

![](https://storage.googleapis.com/zenn-user-upload/8588406d71be-20231123.png)

![](https://storage.googleapis.com/epics-bucket/solv2/solv-firestore-epoch.png)

![](https://storage.googleapis.com/zenn-user-upload/24fe5c9f6e22-20231123.png)

The data has been successfully saved to Firestore, and a notification has been received 🎉

Let's run the Scheduler again.
Since the data is already saved in Firestore, the same notification will not be received again.

Now, by registering the addresses of the wallets you want to manage in the same way,
you can start managing the staking rewards of multiple wallets 🎉

## 📊 Creating a Spreadsheet

Next, let's set up synchronization of data to a `Google Spreadsheet` when new data is added.

First, create a Google Spreadsheet using the link below, and take note of the following:

Spreadsheet ID - `spreadsheetId`
Sheet Name - `sheetTitle` (here we use StakeRewards)

Copy and paste the following values into the header:

```bash
Date	Address	RewardAmount(SOL)	Epoch	PostBalance(SOL)
```

https://docs.google.com/spreadsheets

![](https://storage.googleapis.com/zenn-user-upload/845a9fad4bae-20231123.png)

Then, add your service account by clicking `Share` in the top right corner.

Replace `appName` and `project-id` with the ones you have set up:

```bash
<appName>@<project-id>.iam.gserviceaccount.com
```

`appName` should match the value of app:name in `./skeet-cloud.config.json`.

## 🔄 Adding Synchronization with Spreadsheets

While you can add features to the previously created `stakeMonitor`, managing many addresses can become cumbersome due to heavy processing. Therefore, we will add the functionality by separating it into `Cloud Functions for Firebase` with a `Firestore` trigger.

First, add the `@skeet-framework/spreadsheet-utils` package.

```bash
skeet yarn add -p @skeet-framework/spreadsheet-utils
```

Use the `skeet add method` command to add a `firestore` instance template.

```bash
skeet add method addSpreadsheet
? Select Instance Type to add firestore
✔ ./functions/skeet/src/routings/firestore/addSpreadsheet.ts created 🎉
✔ Successfully exported to ./functions/skeet/src/index.ts 🎉
```

Then, edit `addSpreadsheet.ts` as follows.

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

Move the Discord notification from `stakeMonitor` to `addSpreadsheet`, and change it to notify when new data is added to the Google Spreadsheet.

## 🛠️ Updating stakeMonitor

Therefore, remove the Discord notification part from `stakeMonitor.ts` as follows.

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

## 🚀 Deploy and Update the App

Let's deploy again to update the app.

```bash
skeet deploy
? Select Functions to deploy (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter>
to proceed)
  = Functions =
 ◯ solvMonitor
 ◉ stakeMonitor
❯◉ addSpreadsheet
```

## ⏲️ Running the Scheduler

Once again, delete the records from Firestore's `WalletStakeReward`,

and run the Scheduler.

The spreadsheet has been successfully updated, and
a notification has been sent to Discord 🎉

![](https://storage.googleapis.com/zenn-user-upload/2bd77535a879-20231123.png)

Now, notifications will only be sent during regular checks if there is new data, allowing for synchronization with the spreadsheet.

## 🌐 Combining Load Balancer with Google Cloud Armor

Enhancing Webhook Endpoints

Firebase Functions are a powerful tool for quickly and efficiently building webhook endpoints, but as your project grows, there comes a need to bolster its infrastructure. This is where the introduction of a load balancer becomes key. By using a load balancer, you can significantly improve the performance and reliability of your endpoints, making them resilient to high traffic and unusual access patterns.

Furthermore, integrating Google Cloud Armor greatly enhances security. Google Cloud Armor is a robust tool designed to protect against DDoS and web attacks, and when used in conjunction with a load balancer, it provides a strong defensive layer to safeguard your webhook endpoints from various threats. This ensures more stable service delivery to end-users and increases the trustworthiness of your business.

While a simple setup may suffice in the early stages, as your project grows, considering the implementation of a load balancer and Google Cloud Armor can greatly strengthen network stability and security. This strategic approach allows you to swiftly meet the evolving needs as your business scales up, ensuring consistent delivery of high-quality services to end-users.

For instructions on how to configure a load balancer and Google Cloud Armor, please refer to the following link:

https://skeet.dev/en/doc/skeet-firestore/initial-deploy/
