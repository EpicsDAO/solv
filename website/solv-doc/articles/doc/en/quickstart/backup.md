---
id: quickstart-backup
title: Backup
description: Quickstart of solv, an open-source tool for Solana validator - Backup
---

## Setting up SSH Connection

To establish an SSH connection from your local computer to the server, add your SSH public key to the server.

### Generating Key Pair

```bash
$ ssh-keygen -t rsa -b 4096
```

### Displaying SSH Public Key

```bash
$ cat ~/.ssh/id_rsa.pub
```

Copy the displayed SSH public key for future use.

### SSH Connection to the Server

```bash
$ ssh -i ~/.ssh/id_rsa <username>@<server-ip>
```

## Adding a Public Key to Solana Validator

After connecting to the server, switch to the `solv` user and move to the home directory.

```bash
$ su solv
$ cd ~
```

Use the solv scp command to add an SSH public key from your local computer to the server.

```bash
$ solv scp create
? Enter your SSH Public Key (xxxxxxxpubkeyxxxxxxxx)
```

Paste the SSH public key you copied earlier.

Then, disconnect from the server and return to your local computer.

## Backup

Once the above settings are complete, perform a backup. From the local computer where the connection settings have been completed, execute the following command.

```bash
$ solv scp keypair
? Enter your Ubuntu Server Username (solv)
? Enter your Ubuntu Server IP (1.1.1.1)
```

Enter username（solv）and your server IP.

This will download the private key on the server to the current directory on your local computer.
