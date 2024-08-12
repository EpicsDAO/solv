---
'@epics-dao/solv': patch
---

Update - solv scp download

Now solv scp download command will download the following files:

- mainnet-validator-keypair.json
- mainnet-vote-account-keypair.json
- mainnet-authority-keypair.json
- unstaked-identity.json
- relayer-identity.json
- testnet-validator-keypair.json
- testnet-vote-account-keypair.json
- testnet-authority-keypair.json

It will ignore if the files are not found in the destination node.
