---
id: quickstart-backup
title: バックアップ
description: オープンソースのSolana バリデーター向けツールsolvのクイックスタート - バックアップ
---

Solana Validator のためのウォレットの秘密鍵は、大切に保管してください。秘密鍵を紛失した場合は、あなたの Solana Validator にアクセスすることができなくなります。

ここでは SSH でサーバーに接続し、ローカルコンピューターに秘密鍵をダウンロードする方法を説明します。

## SSH 接続の設定

ローカルコンピューターからサーバーへ SSH 接続するために、SSH パブリックキーをサーバーへ追加します。

### Key Pair の生成

```bash
$ ssh-keygen -t rsa -b 4096
```

### SSH パブリックキーの表示

```bash
$ cat ~/.ssh/id_rsa.pub
```

表示された SSH パブリックキーをコピーしておきます。

### サーバーへ SSH 接続

```bash
$ ssh -i ~/.ssh/id_rsa <username>@<server-ip>
```

## Solana Validator へパブリックキーを追加

サーバーへ接続後、`solv` ユーザーへ切り替えます。
そしてホームディレクトリへ移動します。

```bash
$ su solv
$ cd ~
```

solv scp コマンドで、ローカルコンピューターからサーバーへ SSH パブリックキーを追加します。

```bash
$ solv scp create
? Enter your SSH Public Key (xxxxxxxpubkeyxxxxxxxx)
```

さきほどコピーした SSH パブリックキーを貼り付けます。

そして、一度サーバーから切断し、ローカルコンピューターへ戻ります。

## バックアップ

上記の設定が完了したら、バックアップを行います。
接続設定が完了したローカルコンピューターから、以下のコマンドを実行します。

```bash
$ solv scp keypair
? Enter your Ubuntu Server Username (solv)
? Enter your Ubuntu Server IP (1.1.1.1)
```

username（solv） と IP を入力します。

これにより、サーバー上の秘密鍵がローカルコンピューターの現在いるディレクトリへダウンロードされます。
