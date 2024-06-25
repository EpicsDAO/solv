---
'@epics-dao/solv': minor
'solv-doc': patch
---

Update solv stake/setup/bal - added LST stake, improved solv setup, added solv bal --spl option

- Added LST stake command

```bash
$ solv stake --lst
? Enter Stake Pool Address(default: elSOL) So1vW4Bm6ZURzJJHZy1JpsjoVY68z4cDgF4tTLwYMa5
mintPubkey: ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC
? 🪙  elSOL
Name: Enhanced Linkage SOL
Token Mint: ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC
Is this the correct Stake Pool? Yes
📗 Selected Wallet: LKnGHsjr7UYBXnzfbrz4k6QotCz56rMQTSiVwdRSyL9
💰 Account Balance: 0.057570418 SOL
⚠️ 0.03 SOL will be remaining in the account if you just press enter.
? Enter amount of SOL to stake: (0.027570418) 0.01
? Enter amount of SOL to stake: 0.01
⠹ 🔄 Converting SOL to elSOL

💰 You've got elSOL ✨

Signature: 4mNRWK47J3SuMpE81fJGdvaKp53jr7zHYBt9Z4w8Qnc6XJt...
```

- Added solv bal --spl option

```bash
$ solv bal --spl
Token                                         Balance
------------------------------------------------------------
LSTxxxnJzKDFSLr4dUkPcmCf5VyryEqzPLz5j4bpxFp   0.007602296
bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1   0.008774606
vSoLxydx6akxyMD9XEcPvGYNGq6Nn66oqVb3UkGkei7   0.009848148
BLZEEuZUBVqFhj8adcCFPJvPVCiCyVmh3hkJMrU8KuJA  2508.993638692
ELSoL1owwMWQ9foMsutweCsMKbTPVBD9pFqxQGidTaMC  150.316704143
```

- Improved solv setup command

Now solv setup reads the root dir's volume and set the default swap size depending on the available space.

```bash
$ solv setup
```
