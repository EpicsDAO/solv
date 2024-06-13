---
'@epics-dao/solv': patch
---

Updated - solv stake/bal
Added - `--block-production-method` Option to start up script

1. Updated solv stake Command

```bash
$ solv stake
```

2. Updated solv bal Command

```bash
$ solv bal
Validator Key: /home/solv/mainnet-validator-keypair.json
Address: Kedrgergdfgefa77CurDSCnRDVGTMND9oyv74ZteE2
Balance: 8.861048808 SOL
Vote Key: /home/solv/mainnet-vote-account-keypair.json
Address: Sfgerth6kjXVTTJb2nWbuK3mZQXnMrrbMPxYU7uhbL7
Balance: 6.533068439 SOL
Authority Key: /home/solv/mainnet-authority-keypair.json
Address: GfeghhjJQ9EQ76hTYFXF3ohcFieSrUTSfoNXd
Balance: 0.510711586 SOL
Active Identity:
Kedrgergdfgefa77CurDSCnRDVGTMND9oyv74ZteE2
```

3. Added `--block-production-method` Option to start up script

`/home/solv/start-validator.sh`

```bash
..
--block-production-method central-scheduler \\
```

===============================================

Beside, Added Turbo Repo to manage the Solv project
