---
'@epics-dao/solv': patch
---

Update Solana Testnet Version v2.0.10

If you are using solv MEV mode, ignore this step, It will be automatically updated.

If you are NOT using solv MEV mode, you need to update with the following command:

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

## Validator Auto Operation Service

We are providing a validator auto-operation service for those who want to operate a validator without any hassle.

Validators DAO Discord: <https://discord.gg/HDTy96Wr2W>
