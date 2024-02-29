---
id: chapter1
title: 'Chapter 1: 🚀 The Complete Guide to Solana Validators — Setting Up from Scratch, Efficient Node Startup Techniques 🛠️'
description: In this chapter, we take the first steps towards success as a Solana validator. Centering around an innovative open-source tool named solv, we’ll thoroughly explain the entire process of setting up and operating a Solana validator node. solv simplifies complex processes, enabling efficient node setup and operation.
---

In this chapter, we take the first steps towards success as a Solana validator. Centering around an innovative open-source tool named solv, we’ll thoroughly explain the entire process of setting up and operating a Solana validator node. solv simplifies complex processes, enabling efficient node setup and operation.

First, we’ll learn about the recommended environment settings for Solana validators. Next, we introduce how to install solv CLI and explain how to create the necessary keys for a Solana validator. We also touch upon the rewards for validators in the Solana Testnet and preparing SOL for use in the testnet.

(\* Added & updated on 2024/01/30 - Supports mainnet RPC nodes 🎊)

https://solv.epics.dev/en/doc/tutorial/chapter5

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

https://docs.solana.com/running-validator/validator-reqs

## 🔧 Installing solv CLI

First, install `solv CLI` in your local environment.
With the following one-liner command, you can install:

- `solana CLI`
- `nodenv`
- `node`
- `solv CLI`

```bash
sh -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv-cli/v3.2.0/install")"
```

## Running solv CLI

```bash
solv c
```

![Generate Keys](https://storage.googleapis.com/epics-bucket/solv/assets/generate-keys.png)

## 🔑 Creating Necessary Keys for Solana Validators

Start the solv client and

Choose: `3) Generate Validator Keyfiles`

```bash
Generated keypairs - /Users/fumi/solvKeys/upload
Config File: /Users/fumi/.config/solana/cli/config.yml
RPC URL: https://api.mainnet-beta.solana.com
WebSocket URL: wss://api.mainnet-beta.solana.com/ (computed)
Keypair Path: /Users/fumi/solvKeys/upload/mainnet-validator-keypair.json
Commitment: confirmed
Updated /Users/fumi/solv.config.json with new values.
```

Six keys will be created in the `~/solvKeys` directory as shown below.
Please use different keys as necessary.

```bash
ls ~/solvKeys/upload
mainnet-authority-keypair.json    testnet-authority-keypair.json
mainnet-validator-keypair.json    testnet-validator-keypair.json
mainnet-vote-account-keypair.json testnet-vote-account-keypair.json
```

## 💰 Rewards for Solana Testnet Validators

Details about the rewards for testnet validators can be found at the following link. Roughly speaking, you can earn rewards equivalent to twice the cost of the server in SOL.

Tour de Sol (TDS) Program
https://solana.org/tds22

Server Program
https://solana.org/server-program

To earn rewards on the testnet, you need to contract server resources from the server companies recommended in the above programs.

Solana Delegation Program
https://solana.org/delegation-program

By participating in this program, it seems you can receive delegated stakes from the foundation.

Eligibility Criteria
https://solana.org/delegation-criteria

Solana Foundation Delegation Program Command-line Utility
https://github.com/solana-foundation/stake-o-matic/tree/master/cli

Furthermore, you need to sign your Pubkey with the following command (this step must be done on Ubuntu only):

Installation

```bash
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
$ source "$HOME/.cargo/env"
$ sudo apt install build-essential libssl-dev pkg-config libudev-dev libhidapi-dev
$ cargo install solana-foundation-delegation-program-cli
$ solana-foundation-delegation-program --version
```

Since the signing is done on the mainnet, a small amount of SOL is required.

```bash
$ solana config set --url https://api.mainnet-beta.solana.com
$ solana -um balance
```

Execution

```bash
$ solana-foundation-delegation-program apply --mainnet ~/solvKeys/upload/mainnet-validator-keypair.json --testnet ~/solvKeys/upload/testnet-validator-keypair.json
```

## 🌐 Preparing Testnet SOL

To participate in voting with a testnet validator, you will need approximately 315 test SOL per year.
Additionally, staking any amount of SOL from any account to your own testnet validator can accelerate progress. Staking on this testnet can be done by changing the network to testnet in the developer settings of the Phantom wallet.
(Staking to the address in `testnet-vote-account-keypair.json`)

```bash
$ solana airdrop 1
```

You can use the above command to airdrop testnet SOL, but depending on the network conditions, it may be difficult to obtain.

If we have stock, we distribute it in the EpicsDAO Discord channel, so please feel free to drop by!
https://discord.gg/bDKMfWRsnk

## 🖥️ Connecting to the Server

Let's proceed with installing `solv` on the server.
First, establish an SSH connection to the server.
Please modify the following command with your own connection settings.

```bash
$ ssh username@<your-server-ip-address>
```

## 🚀 Step 1 - Installing solv

![](https://storage.googleapis.com/epics-bucket/solv/assets/solv-top-en.png)

Next, copy and paste the code from Step 1 on the solv documentation page and execute it.

There are versions for Edgevana and Latitude, so please select the type you want to use by clicking on the appropriate tab.

Here, we assume participation in TDS and select `Edgevana`.

```bash
$ sh -c "$(curl -sSfL "https://storage.googleapis.com/epics-bucket/resource/solv/v3.2.0/install")"
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
```

This time, select `TESTNET_VALIDATOR`.

Supported mainnet RPC_NODE from solv3.
For this, please refer to Chapter 5 on how to build a Solana RPC node.

https://solv.epics.dev/en/doc/tutorial/chapter5/

After startup, the snapshot download will start automatically.
The Solana validator will start 🎊

Do not actually use the key created in this flow, but replace it with the key created from the solv client.

Once you have stopped the server, please refer to the next chapter 2 for uploading the key.

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
solv get monitor
```

## ⏹️ Stopping the Validator

To exchange the default created keys with existing ones, you need to stop the validator node once.

```bash
solv stop
```

In the next chapter, we will discuss how to exchange and update the keys.

## 🔴 YouTube solv Hands-On Video

YouTube: "Launch a Solana Validator in 3 Steps! Easily and Effortlessly Operate a Blockchain Validator on Edgevana using solv" - Now supports TDS 🎉
https://www.youtube.com/watch?v=7nloPjyrk_8
(The content of this video is the previous version of solv2 or lower.)
