---
id: quickstart-update-to-v3
title: Update solv to Ver.3
description: Update solv to Ver.3 - Open Source Solana Validator Tool
---

## Migrate Solv3 Instructions

![solv](https://storage.googleapis.com/epics-bucket/solv/assets/v3/solv3Released.jpg)

We updated the solv version to Ver.3 to support the latest requirements of Solana Official Docs.

⭐️ Improved

- Changed Mountpoint/Directory as the solana official docs
- Removed unnecessary swapfile and ramdisk made performance better
- Added solv s for solv Dashboard (no command maintenance)

Below is the migration guide for existing solv users.(Mainly TDS attendees)

```bash
$ solv update
```

Open solv Dashboard

```bash
$ solv s
```

Set your default Language for initial setup

```bash
Solv Version: v3.2.0

? Select Language (Use arrow keys)
❯ en
  ja
```

Open solv Dashboard again to reflect the language change

```bash
$ solv s
```

[![solv-s](https://storage.googleapis.com/epics-bucket/Validator/solv-s.jpeg)](https://storage.googleapis.com/epics-bucket/Validator/solv-s.jpeg)

Select 5 to migrate to solv v3.x.x

This will automatically update your node to the latest requirements of Solana Official Docs.

If you have any questions, please contact us on Discord.

https://discord.gg/yxm5hJqRhg
