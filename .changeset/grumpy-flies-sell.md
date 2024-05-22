---
'@epics-dao/solv': minor
---

## New Features - v4.0.0~v4.1.0

- Jito Relayer Setup
- Jito RPC Setup
- No Downtime Migration
- Snapshot Download Speed Improved 100x~ Faster

### Snapshot Download Speed Improved 100x~ Faster

solv integrated with solana snapshot finders for Solana Mainnet and Testnet.
This will improve the snapshot download speed 100x~ faster than before.
Greatly reduce the time to start the Solana Validator.

Special Thanks to c29r3 for the great OSS ⭐️

- [Solana Snapshot Finder](https://github.com/c29r3/solana-snapshot-finder)

If your node does not start, you can try the following command.

```bash
$ solv stop
$ solv rm:snapshot
$ solv get snapshot
$ solv start
```

### No Downtime Migration

solv supports no downtime migration for Solana Validator.
You can migrate your Solana Validator to other servers without restarting the Solana Validator.

`solv change` command will help you to migrate your Solana Validator to other servers.

Prepare your new server(Inactive) and current server(Active) with the latest slot.
Then run the following command on new server(Inactive) and current server(Active).

※ Please make sure to backup your keys before running the command.
※ Please make sure to run the new server with solv4 as a dummy mode.
※ Please make sure running the current server with solv4 as NOT a dummy mode.

Run the following command on the current server(Active).
You will be asked to enter the new server IP address.

```bash
$ solv change
```

Then, you should quickly run the following command on the new server(Inactive).

```bash
$ solv change
```

This function was created with reference to the following link.

Special Thanks to pumpkins-pool for the great OSS ⭐️

- [Pumpkin's Pool - Identity Transition](https://pumpkins-pool.gitbook.io/pumpkins-pool)

## Jito MEV Setup

You can select the mainnet for Jito MEV or RPC Jito Client🎉

![](https://storage.googleapis.com/epics-bucket/solv/assets/mainnet-select.png)

Also you have option to select Jito Relayer.
