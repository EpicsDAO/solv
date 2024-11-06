---
'@epics-dao/solv': patch
---

update solv swap

Added new default options to the `solv swap` command.

The new options are as follows:

```
dynamicComputeUnitLimit: true,
prioritizationFeeLamports: 'auto'
dynamicSlippage: { 'maxBps': 300 }
```

Jupiter Swap API v6
https://station.jup.ag/docs/apis/swap-api#setting-priority-fee-for-your-transaction
