---
'@epics-dao/solv': patch
---

## added LEDGER_PATH in solv.config.json

Update solv version

```bash
pnpm add -g @epics-dao/solv
```

To set custom ledger path, add LEDGER_PATH in solv.config.json

```~/solv.config.json
{
  "LEDGER_PATH": "path/to/ledger",
  ..
}
```

Default ledger path is `/mnt/ledger`
