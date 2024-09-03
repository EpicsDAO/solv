---
'@epics-dao/solv': minor
---

Minor Update - solv v4.5.0 Release

Mainly We updated `solv setup` command!

Now it's more user-friendly and easy to use. Easy to switch between different validators and RPC nodes.

Since solana clients is updated, we also updated solv to be compatible with the latest solana clients.

## Update Install Script URL

```
$ bash -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v4.5.0/install")"
```

## This update includes Solana version update for mainnet-beta and testnet.

To update your default solana version, run the following command:

```bash
$ solv update && solv update --config
```

To install the latest solana version, run the following command:

```bash
$ solv i
```

If you want to install a specific version, run the following command:

```bash
$ solv i -v <version>
```

To reflect the changes, restart the solana validator:

```bash
$ solv restart
```

## New Features

- `solv setup` command is now more user-friendly
- `solv swap` command is now available
- `solv jupiter` command is now available
- `solv relayer` command is now available
- `solv get ip` command is now available
- `solv scp` command is now improved with new options
- `solv balance` alias command `solv b` is now available
- `solv monitor` alias command `solv m` is now available
- `solv catchup` alias command `solv c` is now available
- `solv rm:snapshot` removes all the `/mnt/ledger` and `/mnt/accounts` directories
- `solv restart --rm` command uses `solv rm:snapshot` command above and restarts the validator

## Changes

`solv.config.json` file is now updated with new fields.
But this will be deprecated in the future.

Now new config is migrating to `solv4.config.json` file.

## Bug Fixes

- `solv switch` command now works as expected.
- `bigint` warning message is now resolved.
