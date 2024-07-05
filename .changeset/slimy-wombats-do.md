---
'@epics-dao/solv': patch
---

## Update - epochTimer/solv restart

### Epoch Timer

Epoch Timer will be set in cron job to check the epoch timer every 5 minutes.
(※ You need solv mev to enable MEV mode)

```bash
$ solv mev
? Do you want to enable solv MEV Mode? (y/N) y
? Enter your RPC URL (https://api.mainnet-beta.solana.com)
? Enter your Harvest Address (your solana address)
? Enter your Discord Webhook URL (https://discord.com/api/webhooks/11111111/xxxxxxxx)
```

This will enable solv MEV Mode on your validator instance.
MEV Mode will allow you to harvest your rewards to your authority account every right before the epoch ends.
Then convert SOL to elSOL (LST) and send it to your desired account.

### Epoch Timer Sends Discord Notification

Epoch Timer will send a Discord notification when the epoch is less than 1 day, 8 hours, 1 hour and the new epoch starts.

- New Epoch
- Less than 1 day
- Less than 8 hours
- Less than 1 hours
  solv harvest will be executed automatically if solv MEV Mode is enabled.

Besides, the epoch timer checks the Validator Account Balance and sends a notification when the balance is less than 0.5 SOL.

### solv Harvest

solv harvest will be executed automatically if solv MEV Mode is enabled.
This will harvest your rewards to your authority account every right before the epoch ends.
Then convert SOL to elSOL (LST) and send it to your desired account.

1. Withdraw rewards from the Vote Account to the Validator Authority Account.
2. Calculate the amount of SOL to be transferred from the Validator Account to the Authority Account.
3. Convert the amount of SOL to elSOL (LST).
4. Transfer the elSOL (LST) to the desired account.

This strategy keeps the balance of SOL in your validator node low, enhancing security by mitigating the risk of large-scale SOL withdrawals. By immediately converting earned rewards to LST, it ensures high yield maintenance.

## solv restart --rm option

This will remove the snapshot and restart the Solana Validator from the new snapshot.

```bash
$ solv restart --rm
```

equivalent to

```bash
$ solv stop
$ solv rm:snapshot
$ solv get snapshot
$ solv start
```
