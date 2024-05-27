---
id: quickstart-no-downtime-update
title: ノーダウンタイムアップデート
description: オープンソースのSolana バリデーター向けツールsolvのクイックスタート - ノーダウンタイムアップデート
---

バリデーターノードのダウンタイム要件は、Solana ネットワークの安定性を維持するために非常に重要です。
solv v4 では、バリデーターノードのノーダウンタイム移行をサポートするための新しいコマンドを追加しました。

日々のアップデート作業においてもノーダウンタイム移行を行うことで、バリデータースコアを高く保ち信頼性を上げ、Solana ネットワークの安定性にも貢献できます。
また、バリデーターノードの引っ越しにも有効で、戦略的・もしくは緊急の場合のノード移行においてもダウンタイム無く移行が可能なため、バリデーターの運用をより安定させることができます。

## 事前準備

移行元のノードと移行先のノードが正常に稼働していることを確認してください。
投票を行っている移行元を Active、まだ投票を行っていない移行先を Inactive として説明します。

solv change コマンドを使って移行するためには、以下の条件を満たしている必要があります。

- solv v4 で起動したソラナバリデーターノードであること
  (solv v4 以前のバージョンからも移行可能ですが、詳しくは Discord でお問い合わせください。)

- solv catchup で最新のブロックに追いついていること
- SSH 接続が移行元（Active）から移行先（Inactive）へ可能であること
- SSH 接続が移行先（Inactive）から移行元（Active）へ可能であること(※必須ではありませんが、鍵入れ替えのため)

以下、１台のノードがすでに稼働中で、２台目のノードを新たに立ち上げる場合の手順を説明します。

## YouTube チュートリアル

以下の YouTube チュートリアルをご覧いただくことで、手順をより詳しく確認することができます。

https://youtu.be/Hivsa0cgFqU?si=g2m_XVCkThli2geB

## 新規ノードの立ち上げ (Inactive ノード)

新規ノードを立ち上げ、solv v4 で起動します。

```bash
$ solv setup
Setting up Solana Validator ...
? Which solv types do you want to setup? (Use arrow keys)
  TESTNET_VALIDATOR
❯ MAINNET_VALIDATOR
  RPC_NODE
```

solv のタイプを選択します。
そして、Solana のクライアントを選択します。

```bash
? Which mainnet mode do you want to setup?
  SolanaClient
❯ JitoMev
  Firedancer
JITO MEV Setup Mode on!
? Do you want to setup as a dummy(Inactive) node?(※For Migration) (y/N)
```

ダミーノードかどうかを対話式で確認されますので、y を選択してください。

```bash
? Enter commission bps 1000
? Select region (Use arrow keys)
❯ Amsterdam
  Frankfurt
  NewYork
  Tokyo
```

bps コミッションとリージョンを設定します。

```bash
? Do you want to setup Relayer Also?(※This requires more than 512GB RAM) (y/N)
```

Jito Relayer を設定するかどうかを確認されます。必要に応じて y を選択してください。
この設定は、最低でも 512GB 以上の RAM を必要とします。

```bash
? What is your commission rate? You can change it later (default: 10%)
```

そして、コミッションレートを設定します。

```bash
? Enter swap size to create in MB: (256000)
```

スワップサイズを設定します。

そして起動開始直後、一度ノードを停止して、移行元の鍵に入れ替えます。

```bash
$ solv stop
```

## SSH 接続の設定 (Inactive ノード)

移行先ノードから移行元ノードへの SSH 接続を設定します。

新規ノードに SSH Key Pair を生成します。

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

作成した公開鍵を表示します。

```bash
$ solv scp cat
Your SSH Public Key is:

ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDZ3EBp0IWcg9VvyKanqL+FiL4IY6u8mtrmarZrU25IzVTFxCNEnOeMzvUOnnWpIVJeVfJZSi0obrM8+emifGmHP1/qo4RNyo9RJnUpfdAfjHan0/tQ4lg4OHaKLWXm2d+snrSvLhIRUqevvbSHkrw4d/ZnpX4xTWbJ6tG1BUEX2J2kDDzHrPXmY4/hpJe0Ummd73bqB13p0uyts6E+inbIiV4OctQxXG5CTGKrudjIHjQXfe60I00USMp8yWFHNEs0D10kJGs+B0866pGEENWXCfD8NLn1zaDTj0MBv9RUlyIrOWbp8N+bgItm4nR/jpvRmerpGOxwVpaiz+d2Fr0qEPT+tW6SHeyjdiUiqVq2unIkqlAYyj2gyhSFwDDKELd0gYLnJ8L4Je73m/CqnLliyDwONwNYwBFB8uNQD/3LVNUaTP+Vucu8UWR8uDYsb11Cclvc3Lcikfic09tMHMw2Nnt/JnPoVDOFJJIWmLb/qgPmeDTbUy+DkC2pYsiJQ4S7PEWxJpTLFrQcIXPeQ3NCekYAo6EU9KJ3rJo6tkMlRB7ZBBxG7ezQ5tFMb8TBIqE+TVKxSvV/bSE3F8DZz/6S166Scd3+jhgmlrCIJ3cUaiFstUYOfL5qBB4lhzGPpOj+rjTN2/GqJGelw431SIMfhLeo0fzRzIBWSSYwzuMpHw== solv@c3-large-x86-ash-1
```

この公開鍵をコピーしておきます。

## 新規ノード、移行元ノード間の SSH 接続設定 (Active ノード)

移行元のノードから移行先のノードへ

- mainnet-validator-keypair.json
- mainnet-vote-account-keypair.json
- mainnet-authority-keypair.json

入れ替えるために、SSH 接続を設定します。

移行元ノードで、公開鍵を追加します。

```bash
$ solv scp create
? Enter your SSH Public Key (xxxxxxxpubkeyxxxxxxxx)
```

先ほどコピーした公開鍵を貼り付けます。

## 移行元ノードの鍵の入れ替え (Inactive ノード)

新規ノードに移行元ノードの鍵を入れ替えます。
以下のコマンドを実行して、移行元ノードの鍵をダウンロードします。
IP アドレスは移行元ノードの IP アドレスを入力してください。

```bash
solv scp download
? Enter your Ubuntu Server IP x.x.x.x
✔︎ Downloading mainnet-validator-keypair.json
✔︎ Downloading mainnet-vote-account-keypair.json
✔︎ Downloading mainnet-authority-keypair.json
```

鍵の交換後、先ほど停止した新規ノードを起動します。

```bash
$ solv start
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
$ solv stop
$ solv rm:snapshot
$ solv get snapshot
$ solv start
```

それでは以降の手順に進みます。

## SSH 接続の設定 (Active ノード)

Inactive ノードで行った手順と同様に、

移行元ノードから移行先ノードへの SSH 接続を設定します。

```bash
$ solv scp init
```

作成した公開鍵を表示します。

```bash
$ solv scp cat
Your SSH Public Key is:
```

この公開鍵をコピーしておきます。

## 移行先ノードへの SSH 接続設定 (Inactive ノード)

移行先ノードで、公開鍵を追加します。

```bash
$ solv scp create
? Enter your SSH Public Key (xxxxxxxpubkeyxxxxxxxx)
```

先ほどコピーした公開鍵を貼り付けます。

## 移行元ノードから移行先ノードへの SSH 接続 (Active ノード)

移行元ノードから移行先ノードへ SSH 接続します。

```bash
$ ssh solv@<移行先ノードのIPアドレス>
```

接続が成功したら、移行元ノードから移行先ノードへの SSH 接続設定は完了です。

## ノードの移行

移行元ノードから移行先ノードへの移行を行います。
この時、両方のノードが正常に稼働していることを確認してください。

```bash
$ solv monitor
```

`solv change` コマンドは

移行元 -> 移行先

という順番で実行します。

それでは、移行元と移行先に接続しているターミナルをそれぞれ開いた状態で、以下の手順に従って移行を行います。

## solv change の実行 (Active ノード)

```bash
$ solv change
```

移行先の IP アドレスを入力してください。
y を選択すると、移行が開始されます。
移行完了後、素早く Inactive ノードに移動して、
`solv change` コマンドを実行してください。

## solv change の実行 (Inactive ノード)

```bash
$ solv change
```

これで、ノードの移行が完了しました。

```bash
$ solv monitor
```

を実行すると、
移行先ノードが最新のブロックに追いついていることを確認できます。

## EpicsDAO Discord チャンネル

ご質問がある場合は、EpicsDAO の solv チャンネルでお問い合わせください。

https://discord.gg/yxm5hJqRhg
