---
'@epics-dao/solv': patch
---

Update - solv setup --script, solv epochTimer

- Added `solv setup --script` command to update `start-validator.sh`, remove old snapshot, and restart.

```bash
solv setup --script
```

Solana Official Restart Instructions:

https://github.com/anza-xyz/agave/wiki/2024-08-26-Testnet-Restart

- Updated `solv epochTimer` to use Rust CLI.
