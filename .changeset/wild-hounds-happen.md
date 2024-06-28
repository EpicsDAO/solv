---
'@epics-dao/solv': patch
---

## New Features - v4.2.0~v4.2.1

- Added Solana Liquid Staking Command
- Added Solana Transfer Command
- Added Auto Reward Harvest Command
- Added Epoch Timer
- Improved setup command
- Improved log command
- Added solv df command
- Migrated to ESM Module
- Added Turbo Repo

* You should set the SOLANA_RPC_URL in the .env file to use this feature effectively.

### Solana Liquid Staking Command

```bash
$ solv stake --lst
```

### Solana Transfer Command

```bash
$ solv transfer/tr
```

### Auto Reward Harvest Command

This command collects all rewards into the authority account, converts the gathered SOL to elSOL, and then transfers the elSOL to an external harvest account.

This ensures that, in the event of a node hack, assets are not held within the node. Additionally, it allows immediate staking of rewards, thereby enhancing performance.

※ To use this command, you must first set the harvest account in the solv.config.json file. During the initial execution, you can input this information interactively.

Please ensure that this account information is never stored on the validator server.

```bash
$ solv harvest/hv
```

Soon, we will be adding the ability to run the harvest command by the epochTimer.

### Epoch Timer

The epochTimer is a feature that allows you to set a specific time to run the some commands.
This feature is especially useful for those who want to stake rewards at before the epoch change.

- You need to set `DISCORD_WEBHOOK_URL` in the `.env` file to use this feature.

```bash
$ solv epochTimer
```

### Improved setup command

The setup command has been improved to allow you to set up without mounting the volume.

```bash
$ solv setup
```

### Improved log command

small bug fixes and improvements

```bash
$ solv log
```

### Added solv df command

This command shows the disk usage of the validator server.

```bash
$ solv df
```

### Migrated to ESM Module

solv has been migrated to ESM Module.

### Added Turbo Repo

We have added a Turbo Repo to manage the solv package.
