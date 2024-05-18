---
'@epics-dao/solv': major
---

Update - solv4

## New Features

- No Downtime Migration
- Jito RPC Setup
- Jito Relayer Setup
- Compatible with Google Cloud (※You need to setup firewall and disk settings yourself)
- New solv CLI Commands

## How to Update

```bash
$ solv update
```

## No Downtime Migration

Now you can migrate your validator without downtime.
You need to setup your new server with solv4.
(solv4 uses symbolic link to define the validator keypair path.)

1. Setup your new server with solv4 as Dummy Server (Inactive Side)
   Please upload your main keys to the new server before setup.

- mainnet-validator-keypair.json
- mainnet-vote-account-keypair.json
- mainnet-authority-keypair.json

Please create SSH connection between your old server and new server.

Create SSH Public Key.

```bash
$ solv scp init
```

Create SSH Connection.

```bash
$ solv scp create
```

Upload your keys to the new server.

```bash
$ solv scp upload
```

Download your keys from the old server.

```bash
$ solv scp download
```

2. Setup your new server with solv4 as Active Side

```bash
$ solv setup
```

Then, Please select Dummy Mode.

Once the new server is ready, you can run `solv change` command to switch the server on Active Side to make it Inactive.

```bash
$ solv change
```

Then, immidiately run `solv change` command on the new server to switch the server on Active Side.

```bash
$ solv change
```
