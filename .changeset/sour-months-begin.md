---
'@epics-dao/solv': patch
---

Update - solv restart

```bash
$ solv restart
```

This command will do this command below;

```bash
solana-validator --ledger /mnt/ledger exit --max-delinquent-stake 5
```

You can change `--max-delinquent-stake` value as you edit the `solv` configuration file.

`/home/solv/solv.config.json`

```json
{
  ,...
  "maxDelinquentStake": 5
}
```
