---
id: chapter1
title: 'Chapter 1: 🚀 The Complete Guide to Solana Validators — Setting Up from Scratch, Efficient Node Startup Techniques 🛠️'
description: In this chapter, we take the first steps towards success as a Solana validator. Centering around an innovative open-source tool named solv, we’ll thoroughly explain the entire process of setting up and operating a Solana validator node. solv simplifies complex processes, enabling efficient node setup and operation.
---

In this chapter, we take the first steps towards success as a Solana validator. Centering around an innovative open-source tool named solv, we’ll thoroughly explain the entire process of setting up and operating a Solana validator node. solv simplifies complex processes, enabling efficient node setup and operation.

First, we’ll learn about the recommended environment settings for Solana validators. Next, we introduce how to install solv CLI and explain how to create the necessary keys for a Solana validator. We also touch upon the rewards for validators in the Solana Testnet and preparing SOL for use in the testnet.

(\*2024/05/26 addition & update - No downtime migration & snapshot DL x100 speedup 🎊)

https://solv.epics.dev/en/doc/quickstart/no-downtime-update/

The content of this chapter includes concrete steps starting from how to connect to the server, install solv, update settings, and finally set up solv. We also provide guidance on how to check real logs, download snapshots, and guide you to solv hands-on videos on YouTube. Through this chapter, you will acquire the knowledge and tools needed to confidently embark on your journey as a Solana validator.

📗 Official solv Documentation:

https://solv.epics.dev/en

## 🌌 Background

In the world of cutting-edge technology like blockchain, the pace of evolution is fast, and documentation often struggles to keep up. When I first became interested in becoming a Solana validator, the procedures were scattered, and it was a real challenge to determine which information was accurate.

However, that challenge proved to be fruitful. Now, I have set up and am operating Solana Testnet validator servers in three different regions: Amsterdam, Tokyo, and New York. There are rewards for being a Solana testnet validator, and effective operation and regular maintenance are essential.

From this experience, I developed scripts to streamline the update process. To give back to the community, I have open-sourced these as a package called Solv.

'solv' is designed to allow anyone, even without technical knowledge, to easily set up a Solana validator node. In this guide, I will introduce three simple steps to build a validator node using solv. Our vision is to realize a truly decentralized network. To achieve this, it is crucial to provide an environment where everyone can participate, regardless of their technical background.

In this chapter, we assume the use of two computers: a `local computer` and a `validator server`.

On the local computer, we are using MacOS, but it is also possible to use Linux Ubuntu. For those using Windows, we recommend setting up an Ubuntu environment using WSL2.

https://learn.microsoft.com/en-us/windows/wsl/install

## 💻 Recommended Environment

The computer environment required for a Solana Validator is very demanding, even when compared to other blockchain platforms. These high system requirements are one of the secrets behind Solana's transaction processing capabilities. The Solana network is known for its speed, which is supported by powerful hardware and optimized settings.

Minimum SOL Requirements

| Requirement                                         | Value             |
| --------------------------------------------------- | ----------------- |
| Reserve for the voting account needed for consensus | 0.02685864 SOL    |
| Cost of sending a vote transaction per block        | Up to 1.1 SOL/day |

#### CPU

- 12 cores/24 threads or more
- 2.8GHz base clock speed or higher
- Support for SHA extension instructions (AMD Gen 3 and later/Intel Ice Lake and later)

#### RAM

- 256GB or more
- 512GB capacity motherboard recommended

#### Disc

- PCIe Gen3 x4 NVME SSD or later
- Accounts: 500GB or more. High TBW (total bytes written)
- Ledger: 1TB or more. High TBW recommended
- OS: (Optional) 500GB or more. SATA OK
  _The OS may be installed on the ledger disk, but testing has shown that placing the ledger on its own disk provides better performance._
  _Although it is possible to store accounts and ledgers on the same disk, this is not recommended due to high IOPS._
  _Samsung 970 and 980 Pro series SSDs are popular in the verification community_

#### GPU

Not needed at this time

Here is the detailed link.

Minimum requirements

https://docs.solana.com/running-validator/validator-reqs

## 🌐 Preparing SOL

To participate in voting as a Testnet/Mainnet validator, you will need approximately 315 SOL annually.
Additionally, staking a few SOL to your validator from any account can speed up the progress.
For staking on the testnet, you can change the network to testnet in the developer settings of the Phantom wallet.
(Staking to the address in vote-account-keypair.json)

Testnet SOL can also be obtained via Airdrop.

```bash
$ solana airdrop 1
```

The command above allows you to airdrop Testnet SOL, but it may be difficult to obtain depending on the network status.

Mainnet SOL can be purchased from exchanges.

## 🖥️ Connecting to the Server

Let's proceed with installing `solv` on the server.
First, establish an SSH connection to the server.
Please modify the following command with your own connection settings.

```bash
$ ssh username@<your-server-ip-address>
```

## 🚀 Step 1 - Installing solv

![](/doc/solvEN.jpg)

Next, copy and paste the code from Step 1 on the solv documentation page and execute it.

There are versions for Edgevana and Latitude, so please select the type you want to use by clicking on the appropriate tab.

Here, we assume participation in TDS and select `Edgevana`.

```bash
$ bash -c "$(curl -sSfL "https://solv-storage.validators.solutions/install")"
```

This command will initially create a solv user, so you will need to set a password.

After the installation is complete, you will be prompted for the password to switch to the solv user.
Enter the password you set to switch users.

## ⚙️ Step 2 - Updating the Configuration

Next, execute the code for Step 2 to apply the configuration.

```bash
$ cd ~ && source ~/.profile
```

## 🛠️ Step 3 - solv Setup

Finally, execute the code for Step 3 to complete the setup!

```bash
$ solv setup
Setting up Solana Validator ...
? Which solv types do you want to setup? (Use arrow keys)
  TESTNET_VALIDATOR
❯ MAINNET_VALIDATOR
  RPC_NODE
```

https://solv.epics.dev/en/doc/tutorial/chapter5/

Select the type of Solv setup.
Then, select the Solana client.
(In this example, MAINNET_VALIDATOR and JitoMev are selected)

```bash
? Which mainnet mode do you want to setup?
  SolanaClient
❯ JitoMev
  Firedancer
JITO MEV Setup Mode on!
? Do you want to setup as a dummy(Inactive) node?(※For Migration) (y/N)
```

When prompted to set up as a dummy node, select N.

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
Writing the swap may take some time.

This completes the setup.

## 📜 Checking Logs

Check the logs for Solana validators.

```bash
$ solv log
```

To output abnormal logs, use:

```bash
$ solv log -e
```

## 🖥️ Monitor Command

You can check the current status of the validators with the following command.

```bash
solv monitor
```

## ⏹️ Stopping the Validator

To exchange the default created keys with existing ones, you need to stop the validator node once.

```bash
solv stop
```

In the next chapter, we will discuss how to exchange and update the keys.

## 🔴 YouTube solv Hands-On Video

YouTube: Easy Solana Validator Node Setup and Migration with Solv4 | Complete Guide to No-Downtime Migration 🎉

https://youtu.be/t4KHXqguTi8?si=HI0YJ0pKB72s671t
