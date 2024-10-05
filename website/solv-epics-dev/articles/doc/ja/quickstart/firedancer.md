---
id: quickstart-firedancer
title: Firedancer
description: solv - Firedancer のクイックスタート
---

## Firedancer セットアップサポート (Frankendancer)

```bash
solv setup --firedancer
```

solv4.config.json ファイル内の `VALIDATOR_TYPE` の値を `frankendancer` に更新してください。これにより、`solv start` コマンドが自動的に `solv.service` ではなく `firedancer.service` を読み込むようになります。

Firedancer ドキュメント - https://firedancer-io.github.io/firedancer/
