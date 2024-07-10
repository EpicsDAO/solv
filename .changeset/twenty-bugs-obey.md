---
'@epics-dao/solv': minor
---

## No more SSH login required for Solana/solv version update!

Auto Solana/solv version update by solv mev

Updated `solv mev` Mode for Testnet & Mainnet

Now solv mev mode will automatically update the Solana/solv version for you.
You can now update the Solana/solv version without the need to SSH login to the server.

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

1. Enable solv MEV Mode.
2. Enable AUTO UPDATE.
3. Enable AUTO RESTART.
   ※ Please turn off if you are using no-downtime migration.
   ※ No-downtime migration requires spare server and manual restart.
4. Enter your Discord Webhook URL.
   ※ You can receive notifications about the Solana/solv version update.
5. Enter RPC URL (Mainnet Only)
6. Enter Harvest Account (Mainnet Only)

## How to disable solv mev mode?

Run the following command:

```bash
$ solv mev
? Do you want to enable solv MEV Mode?(You can change it again) (y/N) n
✅ Cron Job successfully removed.
```

## What is solv MEV Mode?

solv MEV Mode is a feature that automatically checks/updates the Solana/solv status/version for you.
solv epochTimer will be set to cron job and will automatically check the validator's health status and update the Solana/solv version.
It will also send notifications to your Discord channel.

solv epochTimer checks following items:

- Check Validator Account Balance
  Send a notification if the balance is less than 0.5 SOL.

- Check Validator Health Status
  Send a notification if the validator is not voting or is delinquent.

- Check Solana/solv Version Update
  Send a notification if the Solana/solv version is not up-to-date.
  Update the Solana/solv version automatically.
  Restart validator if it is required.
  Send a notification after the Solana/solv version update.

- Auto Harvest (Mainnet Only)
  Withdraw the rewards from vote account to the authority account.
  Calculate the balance needed for the next epoch.
  Transfer the balance from the validator account to the vote account.
  Convert SOL to LST(Liquid Staking Token) and send it to the harvest account.
