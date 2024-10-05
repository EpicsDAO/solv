---
id: quickstart-no-downtime-update
title: No Downtime Update
description: Quick Start Guide for Solv, an open-source tool for Solana validators - No Downtime Update
---

Minimizing downtime for validator nodes is crucial for maintaining the stability of the Solana network. Solv v4 introduces a new command that enables node migration without downtime.

As of August 2024, the `solv switch` command has been added to make the process even more user-friendly. The traditional `solv change` command has been replaced by `solv switch` and will be deprecated in the future.

With `solv change`, it was necessary to execute commands on both the source and destination nodes. However, with `solv switch`, node migration is completed by executing the command on only one node.

This no-downtime migration feature is important not only for routine updates but also for maintaining a high validator score and enhancing reliability. It contributes to the stability of the Solana network.

Furthermore, in cases of validator node relocation, the ability to migrate without downtime ensures more stable validator operations, whether in strategic or emergency situations.

# How to Use the Solv Switch Command

The `solv switch` command is essential for supporting no-downtime migration of validator nodes.  
Before executing this command, ensure that both the source and destination nodes are operating normally.

The `solv switch` command has two modes:

- **Incoming**: Switch from the source node to the destination node
- **Outgoing**: Switch from the destination node back to the source node

By using these modes appropriately, you can smoothly migrate nodes.

This document explains a typical Solana version upgrade procedure as an example:

1. Execute the `solv switch` Incoming mode from the inactive node.
2. Update Solana's version and restart.
3. Execute the `Outgoing` mode from the now-active node to return to the original state.

The `solv switch` command can be utilized in various scenarios, such as switching between active and spare nodes,  
moving validator nodes, and updating Solana versions.

## Prerequisites

Ensure that both the source and destination nodes are operating normally.  
In this explanation, the source node performing the voting is referred to as Active, and the destination node not yet performing the voting is referred to as Inactive.

To migrate using the `solv switch` command, the following conditions must be met:

- The node must be a Solana validator node started with Solv v4 or later.
- The node must be caught up with the latest block using `solv catchup`.
- SSH connection must be possible from the source (Active) to the destination (Inactive) for Outgoing mode.
- SSH connection must be possible from the destination (Inactive) to the source (Active) for Incoming mode.

The following describes the steps for when one node is already operational, and a second node is being newly launched.

## Setting Up SSH Connection (Inactive Node)

Download the key from the Active node and set it up on the new node.

First, configure the SSH key on the destination node.

```bash
$ solv scp init
Generating public/private rsa key pair.
Enter file in which to save the key (/home/solv/.ssh/id_rsa):
Created directory '/home/solv/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/solv/.ssh/id_rsa
Your public key has been saved in /home/solv/.ssh/id_rsa.pub
```

Then display the SSH public key.

```bash
$ solv scp cat
```

Copy the displayed content.

## Transferring the Key (Active Node)

Next, connect to the Active node and add the SSH public key to the destination node.

```bash
$ solv scp create
? Enter your SSH Public Key (xxxxxxxpubkeyxxxxxxxx)
```

Paste the public key you copied earlier.

## Launching the New Node (Inactive Node)

Then, connect to the destination node to download the key from the Active node and execute the following command.

```bash
$ solv scp download
? Enter your Ubuntu Server IP x.x.x.x
✔︎ Downloading mainnet-validator-keypair.json
✔︎ Downloading mainnet-vote-account-keypair.json
✔︎ Downloading mainnet-authority-keypair.json
```

Now, launch the new node at the destination.

```bash
$ solv setup
```

Check the logs to ensure it is running properly.

```bash
$ solv log
```

Wait for the new node to catch up to the latest block.

```bash
$ solv monitor
```

This waiting time depends on the network situation but usually takes several hours.  
If your computer's specs are low or the network is unstable, it may not catch up.  
In such cases, recheck the network or specifications.

You can also redo the snapshot download with the following command.  
If the startup is not successful, redo the snapshot download.

```bash
$ solv restart --rm
```

Proceed with the following steps.

## Executing the Solv Switch Command (Inactive Node)

Execute the Incoming mode of `solv switch`.

```bash
$ solv switch
? Which switch type do you want to perform?※Mainnet Only (Use arrow keys)
❯ Incoming
  Outgoing
? What is the IP address of the new validator? (1.1.1.1)
```

Enter the IP address of the Active node.

![Incoming Mode](https://storage.googleapis.com/epics-bucket/solv/assets/switch/solv-switch-incoming.png)

The inactive node has successfully switched to the active node!

## Updating Solana Version and Restart

After switching with `solv switch`, if the Solana version of the node that switched from Active to Inactive is not the latest,  
update the Solana version and restart with the following command.

```bash
$ solv update && solv update -b
```

This updates the node's Solana version to the latest and restarts it.  
To manually update the version, execute the following command.

```bash
$ solv update --config
$ solv i
```

This command updates the Solana version to the latest but does not restart it.

Wait until the Slot is up to date.

```bash
$ solv catchup
```

Once you have caught up to the latest Slot, return to the previous node and execute the `Outgoing` mode of `solv switch`.

## Executing the Solv Switch Command (Active Node)

Execute the Outgoing mode of `solv switch`.

```bash
$ solv switch
? Which switch type do you want to perform?※Mainnet Only (Use arrow keys)
  Incoming
❯ Outgoing
? What is the IP address of the new validator? (1.1.1.1)
```

Enter the IP address of the Inactive node.

![Outgoing Mode](https://storage.googleapis.com/epics-bucket/solv/assets/switch/solv-switch-outgoing.png)

The active node has successfully switched to the inactive node!

You can now safely remove the spare server.
