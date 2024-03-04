---
id: quickstart-update-to-v3
title: solv を Ver.3 にアップデートする
description: オープンソースのSolana バリデーター向けツールsolv - Ver.3 へのアップデート方法
---

## Solv3 の移行手順

![solv](https://storage.googleapis.com/epics-bucket/solv/assets/v3/solv3Released.jpg)

Solana 公式ドキュメントの最新の要件に対応するために、solv のバージョンを Ver.3 に更新しました。

⭐️ 改善点

- Solana 公式ドキュメントに準じたマウントポイント/ディレクトリの変更
- 不要なスワップファイルと RAM ディスクを削除することでパフォーマンスが向上しました
- 複数コマンドでのメンテナンスが不要な solv ダッシュボード用の solv s を追加

以下は、既存の solv ユーザー向けの移行ガイドです。（主に TDS 参加者向け）

```bash
$ solv update
```

solv ダッシュボードを開きます。

```bash
$ solv s
```

まずは初期設定のためにデフォルトの言語を設定します。

```bash
Solv Version: v3.2.0

? Select Language (Use arrow keys)
  en
❯ ja
```

言語が反映された solv ダッシュボードを再度開きます。

```bash
$ solv s
```

[![solv-s](https://storage.googleapis.com/epics-bucket/Validator/solv-s.jpeg)](https://storage.googleapis.com/epics-bucket/Validator/solv-s.jpeg)

5 を選んで solv v3.x.x にアップデートします。

これにより、ノードは Solana 公式ドキュメントの最新要件に自動的に更新されます。

ご質問がある場合は、Discord でお問い合わせください。

https://discord.gg/yxm5hJqRhg
