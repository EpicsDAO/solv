---
'@epics-dao/solv': patch
---

fix - remove solana client

`solv i` had a dependency on the solana client, which is not needed for v2.x.x.
This change removes the dependency on the solana client.
