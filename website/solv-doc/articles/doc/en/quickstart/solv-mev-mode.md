---
id: quickstart-solv-mev-mode
title: solv MEV Mode
description: Quickstart guide for solv, an open-source Solana validator tool - MEV Mode
---

🌱 No more SSH login required for Solana/solv version update 🌱

Introducing the new solv MEV mode that takes care of Solana/solv version updates seamlessly. Now, you can update the Solana/solv version without the need for SSH login to the server.

Key Features:

- Automated Updates: solv MEV mode will automatically update the Solana/solv version for you, ensuring you are always running the latest version without manual intervention.

- Monitoring: solv MEV mode will monitor the health status of your validator and balance, sending notifications to Discord.

- Automated Reward Harvesting: This mode will harvest your rewards to your authority account right before the epoch ends, optimizing your yield.

- Automated Staking: After harvesting, rewards will be converted from SOL to LST(Liquid Staking Token - elSOL) and sent to your desired account.

- Enhanced Security: By keeping the balance of SOL in your validator node low and converting rewards to LST, this strategy mitigates the risk of large-scale SOL withdrawals, ensuring high yield maintenance.

## What is solv MEV Mode?

solv MEV Mode is a feature designed to automate the maintenance of your Solana validator by regularly checking and updating the Solana/solv status and version.

## How it works

- solv epochTimer: This function will be set as a cron job to automatically monitor the health status of your validator and perform updates as needed.

- Automatic Restarts: If necessary, solv epochTimer will restart the validator to ensure optimal performance.

## solv epochTimer Monitors:

epochTimer will monitor the following aspects of your validator:

### Check Validator Account Balance

- Send a notification if the balance is less than 0.5 SOL.

![solv](/doc/alert-balance-msg.png)

### Check Validator Health Status

- Send a notification if the validator is not voting or is delinquent.

![solv](/doc/alert-inactive-msg.png)

### Check Solana/solv Version Update

- Send a notification if the Solana/solv version is not up-to-date.
- Update the Solana/solv version automatically.
- Restart validator if it is required.
- Send a notification after the Solana/solv version update.

![solv](/doc/restart-msg.png)

### Auto Harvest (Mainnet Only)

- Withdraw the rewards from vote account to the authority account.
- Calculate the balance needed for the next epoch.
- Transfer the balance from the validator account to the authority account.
- Convert SOL to LST(Liquid Staking Token) and send it to the harvest account.

![solv](/doc/harvest-msg.png)

By implementing solv MEV mode, you can maintain high security, ensure optimal performance, and enjoy the convenience of automated updates and reward management.

## How to use solv mev mode?

Run the following command:

```bash
$ solv mev
? Do you want to enable solv MEV Mode?(You can change it again) (y/N)
? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
? Do you want to enable AUTO RESTART? (Recommended) (y/N)
※ Please turn off if you are using no-downtime migration.
? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
```

1.  Enable solv MEV Mode.
2.  Enable AUTO UPDATE.
3.  Enable AUTO RESTART.

※ Please turn off if you are using no-downtime migration.
※ No-downtime migration requires spare server and manual restart.

4.  Enter your Discord Webhook URL.

※ You can receive notifications about the Solana/solv version update.

5.  Enter RPC URL (Mainnet Only)
6.  Enter Harvest Account (Mainnet Only)

※ Please DO NOT keep harvest account in the validator node.

## How to disable solv mev mode?

Run the following command:

```bash
$ solv mev
? Do you want to enable solv MEV Mode?(You can change it again) (y/N) n
✅ Cron Job successfully removed.
```
