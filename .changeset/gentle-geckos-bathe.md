---
'@epics-dao/solv': minor
---

Migrate Solana CLI to Agave CLI for testnet

It is time to upgrade testnet to v2.0.2.
If you're running the Solana Labs client you will need to transition to Agave.
More information here:

https://github.com/anza-xyz/agave/wiki/Agave-Transition

## Changes

If you are using solv MEV mode, ignore this step, It will be automatically updated.

If you are NOT using solv MEV mode, you need to update the Solana CLI to Agave CLI withe the following command:

```bash
$ solv update && solv update -b
```

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

## How to disable solv mev mode?

Run the following command:

```bash
$ solv mev
? Do you want to enable solv MEV Mode?(You can change it again) (y/N) n
✅ Cron Job successfully removed.
```
