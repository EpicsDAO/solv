---
'@epics-dao/solv': patch
---

Downgrade Instruction for Testnet

Solana Official Instructions: https://github.com/anza-xyz/agave/wiki/2024-10-09-Testnet-Rollback-and-Restart

- For users who is using solv Auto Operation Mode: No action is required.

※ The name solv Mev mode will be changed to solv Auto Operation Mode.

- For users who are not using solv Auto Operation Mode: Please follow the instructions below.

```bash
$ solv update && solv update -b
```

## How to use solv Auto Operation Mode?

Run the following command:

```bash
$ solv auto
? Do you want to enable solv Auto Operation Mode?(You can change it again) (y/N)
? Do you want to enable AUTO UPDATE? (Recommended) (y/N)
? Do you want to enable AUTO RESTART? (Recommended) (y/N)
※ Please turn off if you are using no-downtime migration.
? Enter your Discord Webhook URL (https://discord.com/api/webhooks/1234)
```

1.  Enable solv Auto Operation Mode.
2.  Enable AUTO UPDATE.
3.  Enable AUTO RESTART.
    ※ Please turn off if you are using no-downtime migration.
    ※ No-downtime migration requires spare server and manual restart.
4.  Enter your Discord Webhook URL.
    ※ You can receive notifications about the Solana/solv version update.
5.  Enter RPC URL (Mainnet Only)
6.  Enter Harvest Account (Mainnet Only)

## How to disable solv Auto Operation Mode?

Run the following command:

```bash
$ solv auto
? Do you want to enable solv Auto Operation Mode?(You can change it again) (y/N) n
✅ Cron Job successfully removed.
```

## Validator Auto Operation Service

We are providing a validator auto-operation service for those who want to operate a validator without any hassle.

Validators DAO: <https://dao.validators.solutions>
