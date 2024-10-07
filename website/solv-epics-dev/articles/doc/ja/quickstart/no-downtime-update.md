---
id: quickstart-no-downtime-update
title: ノーダウンタイムアップデート
description: オープンソースのSolana バリデーター向けツールsolvのクイックスタート - ノーダウンタイムアップデート
---

バリデーターノードのダウンタイムを最小限に抑えることは、
Solana ネットワークの安定性を維持する上で非常に重要です。
Solv v4 では、ダウンタイムなしでノードを移行できる新しいコマンドが導入されました。

2024 年 8 月現在、solv switch コマンドが追加され、
さらに使いやすくなりました。従来の solv change コマンドは
solv switch に置き換えられ、今後廃止される予定です。

solv change では、移行前後の両方のノードでコマンドを実行する必要がありましたが、
solv switch では片方のノードでのコマンド実行のみでノードの移行が完了します。

このノーダウンタイム移行機能は、日々のアップデート作業だけでなく、
バリデータースコアを高く保ち、信頼性を向上させるためにも重要です。
それにより、Solana ネットワークの安定性にも貢献できます。

また、バリデーターノードの移動においても、
戦略的または緊急の状況でもダウンタイムなく移行が可能となり、
バリデーターの運用をより安定させることができます。

# Solv Switch コマンドの活用方法

`solv switch` コマンドは、バリデーターノードのノーダウンタイム移行をサポートするための重要なコマンドです。  
このコマンドを実行する前に、移行元と移行先のノードが正常に稼働していることを必ず確認してください。

`solv switch` コマンドには、次の 2 つのモードがあります。

- **Incoming**: 移行元のノードから移行先のノードへの切り替え
- **Outgoing**: 移行先のノードから移行元のノードへの切り替え

これらのモードを使い分けることで、ノードの移行をスムーズに行うことができます。

本ドキュメントでは、一般的な Solana のバージョンアップ手順を例に挙げ、次の流れを説明します。

1. Inactive ノードから `solv switch` の Incoming モードを実行します。
2. Solana のバージョンを更新し、再起動します。
3. Active になったノードから Outgoing モードを実行して、元の状態に戻します。

`solv switch` コマンドは、アクティブノードとスペアノードの切り替え、  
バリデーターノードの引っ越し、Solana バージョンのアップデートなど、  
様々なシナリオで活用することができます。

## 事前準備

移行元のノードと移行先のノードが正常に稼働していることを確認してください。
投票を行っている移行元を Active、まだ投票を行っていない移行先を Inactive として説明します。

solv switch コマンドを使って移行するためには、以下の条件を満たしている必要があります。

- solv v4 以降 で起動したソラナバリデーターノードであること
- solv catchup で最新のブロックに追いついていること
- SSH 接続が移行元（Active）から移行先（Inactive）へ可能であること（Outgoing の場合）
- SSH 接続が移行先（Inactive）から移行元（Active）へ可能であること(Incoming の場合)

以下、１台のノードがすでに稼働中で、２台目のノードを新たに立ち上げる場合の手順を説明します。

## SSH 接続の設定 (Inactive ノード)

鍵を Active ノードからダウンロードして、新規ノードに設定します。

まずは SSH キーを移行先のノードに設定します。

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

そして SSH 公開鍵を表示します。

```bash
$ solv scp cat
```

表示された内容をコピーしておきます。

## 鍵の移行 (Active ノード)

次に、Active ノードに接続して、SSH 公開鍵を移行先ノードに追加します。

```bash
$ solv scp create
? Enter your SSH Public Key (xxxxxxxpubkeyxxxxxxxx)
```

さきほどコピーした公開鍵を貼り付けます。

## 新規ノードの立ち上げ (Inactive ノード)

次に、Active ノードから鍵をダウンロードするために、
移行先ノードに接続して、以下のコマンドを実行します。

```bash
$ solv scp download
? Enter your Ubuntu Server IP x.x.x.x
✔︎ Downloading mainnet-validator-keypair.json
✔︎ Downloading mainnet-vote-account-keypair.json
✔︎ Downloading mainnet-authority-keypair.json
```

それでは移行先で新規ノードを立ち上げます。

```bash
$ solv setup
```

ログを確認して、正常に立ち上がっていることを確認してください。

```bash
$ solv log
```

そして、新規ノードが最新のブロックに追いつくまで待ちます。

```bash
$ solv monitor
```

この待ち時間はネットワーク状況によりますが、通常は数時間かかります。
コンピューターのスペックが低かったり、ネットワークが不安定な場合は、
追いつかない場合があります。その場合は、再度ネットワークやスペックを確認してください。

また、以下のコマンドで、スナップショットのダウンロードをやり直すことができます。
起動がうまくいっていない場合は、スナップショットのダウンロードをやり直してください。

```bash
$ solv restart --rm
```

それでは以降の手順に進みます。

## solv switch コマンドの実行 (Inactive ノード)

solv switch の Incoming モードを実行します。

```bash
$ solv switch
? Which switch type do you want to perform?※Mainnet Only (Use arrow keys)
❯ Incoming
  Outgoing
? What is the IP address of the new validator? (1.1.1.1)
```

Active ノードの IP アドレスを入力します。

![](https://storage.googleapis.com/epics-bucket/solv/assets/switch/solv-switch-incoming.png)

無事に Inactive ノードが Active ノードに切り替わりました！

## Solana バージョンの更新、再起動

solv switch 後、Active から Inactive へ切り替わったノードの Solana バージョンが最新でない場合は、
以下のコマンドで Solana バージョンを更新し、再起動します。

```bash
$ solv update && solv update -b
```

これで、ノードの Solana バージョンが最新に更新され、再起動されます。
手動でバージョンを更新する場合は、以下のコマンドを実行してください。

```bash
$ solv update --config
$ solv i
```

このコマンドは、Solana バージョンを最新に更新しますが、再起動は行いません。

Slot が最新の状態になるまで待ちます。

```bash
$ solv catchup
```

最新の Slot に追いついたら、再び先ほどのノードに戻り、`solv switch` の `Outgoing` モードを実行します。

## solv switch コマンドの実行 (Active ノード)

solv switch の Outgoing モードを実行します。

```bash
$ solv switch
? Which switch type do you want to perform?※Mainnet Only (Use arrow keys)
  Incoming
❯ Outgoing
? What is the IP address of the new validator? (1.1.1.1)
```

Inactive ノードの IP アドレスを入力します。

![](https://storage.googleapis.com/epics-bucket/solv/assets/switch/solv-switch-outgoing.png)

無事に Active ノードが Inactive ノードに切り替わりました！

これでスペアサーバーを削除しても問題ありません。
