---
id: solv4-solana-validator-complete-guide
title: Complete Guide to Launching New Solana Validator Nodes and Seamless Transition Without Downtime
category: Press Release
thumbnail: /news/2024/05/24/SolanaValidatorCompleteGuideEN.jpg
---

ELSOUL LABO B.V. (Headquarters: Amsterdam, Netherlands, CEO: Fumitake Kawasaki), together with Epics DAO, which it established to operate a Web3 NFT card game supporting open-source software development, is driving innovation and sustainable development in blockchain technology through the development and operation of 'solv', an open-source tool for Solana blockchain validators. This tool has proven its performance and reliability over approximately one year of operation and is now extensively used by many users on both the mainnet and testnet of the Solana blockchain.

We are pleased to announce the release of the Complete Guide for easily starting Solana validator operations using solv.

Those who are already operating Solana validators can also easily transition to solv for the benefits of no-downtime migration and faster snapshot downloads.

## Solana Validator Operations Complete Guide Overview

### Table of Contents:

1. Steps to Launch a New Node
   - How to launch a new node using solv4
   - Explanation of necessary settings and commands
2. Steps for No-Downtime Migration
   - How to perform no-downtime migration with solv4
   - Settings and verification of the source and destination

### Detailed Steps:

1. At 00:16, use the 3 steps on the solv documentation site to install solv on a server, set an arbitrary password, and create a solv user.
2. At 00:35, enter the password of the user you created and load the settings.
3. At 00:38, execute `solv setup` and launch as a dummy node (enter "y").
4. At 01:02, if starting with the Jito Client, set the commission and region, and if hosting a Relayer, choose "y" (select "N" this time).
5. At 01:11, enter the capacity of the swap memory (default is 256GB), and after setup completion, run the `solv log` command to confirm the node is operating correctly.
6. At 01:40, when migrating the node, stop the node once with `solv stop`, swap the validator keys with those from the source, and restart.
7. At 01:48, use `solv monitor` to wait until you catch up to the latest slot.
8. At 02:06, launch windows for both the source and destination to confirm that both nodes have caught up to the latest slot.
9. At 02:28, check the necessary keys for the validator with the `solv balance` command and verify the keys displayed at both the source and destination.
10. At 03:01, set up an SSH connection and execute the `solv change` command to switch the node.

For more details, please watch the video on YouTube via the link below.

Easy Solana Validator Node Setup and Migration with Solv4 | Complete Guide to No-Downtime Migration (YouTube): https://www.youtube.com/watch?v=t4KHXqguTi8

## ELSOUL LABO and Epics DAO

ELSOUL LABO and Epics DAO's core teams are actively involved in open-source software development.

They operate two open-source software projects, "solv" and "Skeet."

![solv](/news/2024/03/12/solvEN.jpg)

"solv" is an open-source tool simplifying the setup and operation of Solana validators and RPC nodes. To earn rewards as a blockchain validator, machine resources of proper specifications are needed, and validator software installation and setup should be completed per documentation, followed by several updates each week.

With "solv," Solana validators can be easily launched with just three commands. Updates require only one command, utilizing the open-source nature so that a single person worldwide can manage the update, and others can download it. solv documentation: https://solv.epics.dev/

![Skeet](/news/2024/03/12/SkeetV2EN.jpg)

"Skeet" is an open-source, serverless app development tool using TypeScript, offering a modern application framework for infrastructure management, rapid app development, AI support, and dApp/Web3 development.

Skeet documentation: https://skeet.dev/

The Skeet development team's paper, "Skeet: Towards a Lightweight Serverless Framework Supporting Modern AI-Driven App Development," was presented at ENASE 2024, an international software engineering conference held in Angers, France, on April 28-29, 2024. Dr. James represented the team and received high acclaim for his presentation.

ENASE 2024: https://enase.scitevents.org/

![ENASE 2024 - Skeet](/news/2024/05/10/SkeetENASE2024ResearchPaperPublished.jpg)

![ENASE 2024 - Skeet Dev](/news/2024/05/02/ENASEelsoulTeam.jpg)

This study proposes a lightweight serverless framework for modern AI-driven application development. The research was published in the conference proceedings and indexed in Google Scholar, Scopus, and other major databases, making it widely accessible to the research community.

「Skeet: Towards a Lightweight Serverless Framework Supporting Modern AI-Driven App Development」 - SciTePress: https://www.scitepress.org/PublicationsDetail.aspx?ID=Rza3TGE30Xw=&t=1

![ENASE 2024 - Skeet paper](/news/2024/04/24/ENASE2024AfterTheConference.jpg)

We will continue promoting innovation, engaging in open-source software development, and supporting the overall development environment of open-source projects.

**Company Overview**

- Name: ELSOUL LABO B.V.
- CEOs: Fumitake Kawasaki, Shota Kishi
- Business: Software research and development (AI, cloud, blockchain)
- Founded: September 2020
- Location: Weteringschans 165, 1017XD Amsterdam, Netherlands
- Accreditations: WBSO (Advanced R&D) from the Dutch government, Google Cloud Build partner, ENASE2024 paper selection
- URL: https://labo.elsoul.nl
- Discord: https://discord.gg/H2HeqRq54J
- Press Kit: https://labo.elsoul.nl/en/press-kits

**DAO Overview**

- DAO Name: Epics DAO
- Founders: Fumitake Kawasaki, Shota Kishi
- Business: Research, development, and operation of blockchain games for social impact
- Founded: June 2022
- Award: 5th place, Solana Summer Camp Hackathon 2022
- URL: https://epics.dev
- Twitter: https://twitter.com/EpicsDAO2
- Discord: https://discord.gg/GmHYfyRamx

※ This article is not intended for investment advice. The information contained in this article is based on the situation at the time of writing. Please check for the most current information. Always NFA/DYOR.
