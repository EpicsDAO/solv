---
'@epics-dao/solv': patch
---

Add - solv MEV Mode

This will enable solv MEV Mode on your validator instance.
MEV Mode will allow you to harvest your rewards to your authority account every right before the epoch ends.
Then convert SOL to elSOL (LST) and send it to your desired account.

```bash
$ solv mev
? Do you want to enable solv MEV Mode? (y/N) y
? Enter your RPC URL (https://api.mainnet-beta.solana.com)
? Enter your Harvest Address (your solana address)
? Enter your Discord Webhook URL (https://discord.com/api/webhooks/11111111/xxxxxxxx)
```

This strategy keeps the balance of SOL in your validator node low, enhancing security by mitigating the risk of large-scale SOL withdrawals. By immediately converting earned rewards to LST, it ensures high yield maintenance.
