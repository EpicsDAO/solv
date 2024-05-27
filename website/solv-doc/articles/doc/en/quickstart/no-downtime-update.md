---
id: quickstart-no-downtime-update
title: No Downtime Update
description: Update solv without downtime - Open Source Solana Validator Tool
---

## Validator Node Downtime Requirements for Solana Network Stability

Maintaining uptime for validator nodes is crucial for ensuring the stability of the Solana network. With Solv v4, we have introduced a new command to support zero-downtime migration for validator nodes.

Performing zero-downtime migrations during daily updates helps keep validator scores high, increases reliability, and contributes to the stability of the Solana network.
This is also effective for moving validator nodes, whether strategically or in emergencies, allowing seamless migrations without downtime, thereby enhancing the stability of validator operations.

## Preparation

Ensure that both the source and destination nodes are operating normally.
The source node that is currently voting will be referred to as Active, and the destination node that is not yet voting will be referred to as Inactive.

To migrate using the solv change command, the following conditions must be met:

- The Solana validator node must be running on Solv v4.
  (It is possible to migrate from versions earlier than Solv v4; please contact us on Discord for more details.)

- The node must be caught up to the latest block using solv catchup.

- SSH connections must be possible from the source (Active) to the destination (Inactive) node.

- SSH connections from the destination (Inactive) to the source (Active) node (not mandatory but recommended for key replacement).

Below are the steps to follow when you have one node already running and need to set up a second node.

## YouTube Tutorial

You can check out the detailed steps by watching the YouTube tutorial linked below.

https://youtu.be/t4KHXqguTi8?si=HI0YJ0pKB72s671t

## Setting Up a New Node (Inactive Node)

Set up a new node and start it with Solv v4.

```bash
$ solv setup
Setting up Solana Validator ...
? Which solv types do you want to setup? (Use arrow keys)
  TESTNET_VALIDATOR
❯ MAINNET_VALIDATOR
  RPC_NODE
```

Select the type of Solv setup.
Then, select the Solana client.

```bash
? Which mainnet mode do you want to setup?
  SolanaClient
❯ JitoMev
  Firedancer
JITO MEV Setup Mode on!
? Do you want to setup as a dummy(Inactive) node?(※For Migration) (y/N)
```

When prompted to set up as a dummy node, select y.

```bash
? Enter commission bps 1000
? Select region (Use arrow keys)
❯ Amsterdam
  Frankfurt
  NewYork
  Tokyo
```

Set the commission bps and region.

```bash
? Do you want to setup Relayer Also?(※This requires more than 512GB RAM) (y/N)
```

Confirm whether to set up Jito Relayer as needed. This setup requires at least 512GB of RAM.

```bash
? What is your commission rate? You can change it later (default: 10%)
```

Set the commission rate.

```bash
? Enter swap size to create in MB: (256000)
```

Set the swap size.

After the initial setup, stop the node to replace the keys from the source node.

```bash
$ solv stop
```

## Setting Up SSH Connections (Inactive Node)

Set up SSH connections from the destination node to the source node.

Generate an SSH Key Pair on the new node.

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

Display the generated public key.

```bash
$ solv scp cat
Your SSH Public Key is:

ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDZ3EBp0IWcg9VvyKanqL+FiL4IY6u8mtrmarZrU25IzVTFxCNEnOeMzvUOnnWpIVJeVfJZSi0obrM8+emifGmHP1/qo4RNyo9RJnUpfdAfjHan0/tQ4lg4OHaKLWXm2d+snrSvLhIRUqevvbSHkrw4d/ZnpX4xTWbJ6tG1BUEX2J2kDDzHrPXmY4/hpJe0Ummd73bqB13p0uyts6E+inbIiV4OctQxXG5CTGKrudjIHjQXfe60I00USMp8yWFHNEs0D10kJGs+B0866pGEENWXCfD8NLn1zaDTj0MBv9RUlyIrOWbp8N+bgItm4nR/jpvRmerpGOxwVpaiz+d2Fr0qEPT+tW6SHeyjdiUiqVq2unIkqlAYyj2gyhSFwDDKELd0gYLnJ8L4Je73m/CqnLliyDwONwNYwBFB8uNQD/3LVNUaTP+Vucu8UWR8uDYsb11Cclvc3Lcikfic09tMHMw2Nnt/JnPoVDOFJJIWmLb/qgPmeDTbUy+DkC2pYsiJQ4S7PEWxJpTLFrQcIXPeQ3NCekYAo6EU9KJ3rJo6tkMlRB7ZBBxG7ezQ5tFMb8TBIqE+TVKxSvV/bSE3F8DZz/6S166Scd3+jhgmlrCIJ3cUaiFstUYOfL5qBB4lhzGPpOj+rjTN2/GqJGelw431SIMfhLeo0fzRzIBWSSYwzuMpHw== solv@c3-large-x86-ash-1
```

Copy this public key.

## SSH Connection Setup on the Source Node (Active Node)

Set up SSH connections from the source node to the destination node to replace the keys.

Add the copied public key on the source node.

```bash
$ solv scp create
? Enter your SSH Public Key (xxxxxxxpubkeyxxxxxxxx)
```

Paste the copied public key.

## Replacing Keys on the Destination Node (Inactive Node)

Replace the keys on the new node with the keys from the source node. Execute the following command to download the keys from the source node.
Enter the IP address of the source node.

```bash
solv scp download
? Enter your Ubuntu Server IP x.x.x.x
✔︎ Downloading mainnet-validator-keypair.json
✔︎ Downloading mainnet-vote-account-keypair.json
✔︎ Downloading mainnet-authority-keypair.json
```

After replacing the keys, start the new node that was previously stopped.

```bash
$ solv start
```

Wait for the new node to catch up to the latest block.

```bash
$ solv monitor
```

This waiting time depends on the network conditions and typically takes a few hours.
If the computer specs are low or the network is unstable, it might not catch up. In such cases, recheck the network and specs.

If the startup fails, you can retry downloading the snapshot with the following commands.

```bash
$ solv stop
$ solv rm:snapshot
$ solv get snapshot
$ solv start
```

Then proceed with the subsequent steps.

## Setting Up SSH Connections (Active Node)

Repeat the SSH setup steps as done for the Inactive node, but from the Active node to the Inactive node.

```bash
$ solv scp init
```

Display the generated public key.

```bash
$ solv scp cat
Your SSH Public Key is: xxxxxxxxpubkeyxxxxxxxx
```

Copy this public key.

## SSH Connection Setup on the Destination Node (Inactive Node)

Add the copied public key on the destination node.

```bash
$ solv scp create
? Enter your SSH Public Key (xxxxxxxpubkeyxxxxxxxx)
```

Paste the copied public key.

## SSH Connection from Source to Destination Node (Active Node)

SSH from the source node to the destination node.

```bash
$ ssh solv@<destination node IP address>
```

If the connection is successful, the SSH connection setup from the source node to the destination node is complete.

## Node Migration

Perform the migration from the source node to the destination node. Ensure both nodes are operating normally.

```bash
$ solv monitor
Run the solv change command in the order of source node -> destination node.
```

Open terminals for both nodes and follow the steps below for migration.

## Executing solv change (Active Node)

```bash
$ solv change
```

Enter the IP address of the destination node.
Select y to start the migration.
After the migration is complete, quickly switch to the Inactive node and execute the solv change command.

## Executing solv change (Inactive Node)

```bash
$ solv change
```

This completes the node migration.

```bash
$ solv monitor
```

Running the command above will show that the destination node is caught up to the latest block.

## EpicsDAO Discord

If you have any questions, please contact us in the EpicsDAO Solv channel on Discord.

https://discord.gg/yxm5hJqRhg
