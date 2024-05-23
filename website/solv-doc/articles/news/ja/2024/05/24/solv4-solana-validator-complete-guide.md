---
id: solv4-solana-validator-complete-guide
title: Solana バリデーターノードの新規立ち上げとノーダウンタイム移行の完全ガイドが公開
category: プレスリリース
thumbnail: /news/2024/05/24/SolanaValidatorCompleteGuideJA.jpg
---

ELSOUL LABO B.V.（エルソウルラボ、本社: オランダ・アムステルダム、代表取締役 CEO: 川崎文武）および、同社が設立したオープンソースソフトウェア開発を支援する Web3 NFT カードゲームを運営する Epics DAO は、Solana ブロックチェーンのバリデーター向けオープンソースツール「solv」の開発と運用を通じて、ブロックチェーン技術のイノベーションと持続可能な開発を推進しています。このツールは約 1 年にわたる運用を経てその性能と信頼性を証明し、現在は多くのユーザーにより Solana ブロックチェーンのメインネット及びテストネット上で幅広く利用されています。

この度は、solv を活用し簡単に Solana バリデーター運用を始めるための完全ガイドを公開いたしました。

すでに Solana バリデーターを運用中の方も、ノーダウンタイム移行やスナップショットダウンロードの高速化のメリットのため、solv に簡単に移行していただくことが可能です。

## Solana バリデーター運用完全ガイドについて

目次:

1. 新規ノードの立ち上げ手順
   - solv4 を使って新規ノードを立ち上げる方法
   - 必要な設定とコマンドの解説
2. ノーダウンタイム移行のステップ
   - solv4 でのノーダウンタイム移行方法
   - 移行元と移行先の設定と確認

詳細な手順:

1. 00:16 solv ドキュメントサイトの 3 ステップを使って、solv をサーバーにインストールし、任意のパスワードを設定して solv ユーザーを作成します。
2. 00:35 作成したユーザーのパスワードを入力し、設定を読み込みます。
3. 00:38 `solv setup`を実行し、ダミーノードとして立ち上げます（"y"を入力）。
4. 01:02 Jito Client で起動する場合はコミッションとリージョンを設定し、Relayer をホスティングする場合は"y"を選択します（今回は"N"を選択）。
5. 01:11 スワップメモリの容量を入力し（デフォルトは 256GB）、セットアップ完了後、`solv log`コマンドを実行してノードが正常に起動していることを確認します。
6. 01:40 ノードの移行時には、一度`solv stop`でノードを停止し、バリデーターの鍵を移行元のものに入れ替えて再起動します。
7. 01:48 `solv monitor`で最新のスロットまで追いつくのを待ちます。
8. 02:06 移行元と移行先のウィンドウを立ち上げ、両方のノードが最新のスロットに追いついていることを確認します。
9. 02:28 `solv balance`コマンドでバリデーターに必要な鍵を確認し、移行元と移行先で表示される鍵を確認します。
10. 03:01 SSH 接続を設定し、`solv change`コマンドを実行してノードのスイッチを行います。

詳しくは下記リンクより YouTube 動画にて御覧ください。

solv4 で簡単！ソラナバリデーターノードの新規立ち上げと移行ガイド｜ノーダウンタイム移行の完全解説 (YouTube): https://www.youtube.com/watch?v=Hivsa0cgFqU

## エルソウルラボ及び Epics DAO について

エルソウルラボ及び Epics DAO のコアチームもオープンソースソフトウェアの開発に積極的に携わっております。

「solv」、「Skeet」という 2 つのオープンソースソフトウェアを開発し、これらのオープンソースプロジェクトを運営しています。

![solv](/news/2024/03/12/solvJA.jpg)

「solv」 は Solana バリデータ及び RPC ノードのセットアップと運用を簡略化するためのオープンソースツールです。

一般にブロックチェーンバリデータとして報酬を得るためには、適切なスペックのマシンリソースを用意して、ドキュメントに従ってバリデータ用のソフトウェアをインストール・セットアップを完了させ、週に何回かあるアップデート作業を行う必要があります。

この一連の作業はバリデータ全員が同じ作業をしなければならないなか、サーバー管理者としての専門知識が求められることで、インセンティブを得たいユーザーがいてもその高い参入障壁が問題となっていました。

solv を使えば、たった 3 つのコマンドをコピペするだけで簡単に Solana バリデーターが立ち上がります。オープンソース開発の特性を活かし、アップデートも世界で一人が行えば、あとはそれをダウンロードするだけで完了するようになります。solv ユーザーは、日々のアップデート作業もワンコマンドで終了させることができます。

solv 公式ドキュメント: https://solv.epics.dev/

![Skeet](/news/2024/03/12/SkeetV2JA.jpg)

「Skeet」は、TypeScript を使用したオープンソースのサーバーレスアプリ開発ツールであり、インフラ設計や管理の省略、迅速なアプリケーション開発、必要な機能のみを迅速に開発する柔軟性、AI サポートの充実による学習コストの削減、そして dApps や Web3 アプリの開発に対応するなど、現代的なアプリケーションフレームワークを提供します。

Skeet 公式ドキュメント: https://skeet.dev/

エルソウルラボの Skeet 開発チームによる研究論文「Skeet: Towards a Lightweight Serverless Framework Supporting Modern AI-Driven App Development」が、2024 年 4 月 28 日と 29 日にフランス・Angers で開催された国際ソフトウェアエンジニアリングカンファレンス、ENASE 2024 で発表されました。ジェームス博士が代表として登壇し、その発表は多くの参加者から高い評価を受けました。

ENASE 2024: https://enase.scitevents.org/

![ENASE 2024 - Skeet](/news/2024/05/10/SkeetENASE2024ResearchPaperPublished.jpg)

![ENASE 2024 - Skeet Dev](/news/2024/05/02/ENASEelsoulTeam.jpg)

この研究は、現代の AI 駆動型アプリケーション開発をサポートするための軽量なサーバーレスフレームワークを提案しており、学会のプロシーディングに掲載・出版されました。また、Google Scholar や Scopus をはじめとする複数の主要な学術文献検索サービスにもインデックスされ、広く研究コミュニティに対して利用可能となっています。

研究論文「Skeet: Towards a Lightweight Serverless Framework Supporting Modern AI-Driven App Development」 - SciTePress: https://www.scitepress.org/PublicationsDetail.aspx?ID=Rza3TGE30Xw=&t=1

![ENASE 2024 - Skeet paper](/news/2024/04/24/ENASE2024AfterTheConference.jpg)

今後も様々なイノベーションを促進するべく、積極的にオープンソースソフトウェアの開発に携わり、そしてオープンソースプロジェクトの開発環境全体を応援してまいります。

引き続き応援の程、何卒よろしくお願いいたします。

**■ 会社概要**

- 社名: ELSOUL LABO B.V.
- 代表取締役: 川崎 文武、岸 正太
- 事業内容: ソフトウェア研究開発 (AI・クラウド・ブロックチェーン)
- 設立: 2020 年 9 月
- 所在地: Weteringschans 165, 1017XD Amsterdam, Netherlands
- 認定: オランダ政府より WBSO(先端研究開発) 、Google Cloud Build パートナー 、国際学術会議 ENASE2024 研究論文採択
- 企業 URL: https://labo.elsoul.nl
- 公式 Discord: https://discord.gg/H2HeqRq54J
- プレスキット：https://labo.elsoul.nl/ja/press-kits

**■ DAO 概要**

- DAO 名: Epics DAO
- Founders: 川崎 文武、岸 正太
- 事業内容: 社会貢献型ブロックチェーンゲームの研究開発・運営
- 設立: 2022 年 6 月
- 受賞: Solana Summer Camp Hackathon 2022 5 位
- DAO URL: https://epics.dev
- Twitter URL: https://twitter.com/EpicsDAO2
- 公式 Discord: https://discord.gg/GmHYfyRamx

![Epics Platform Buidlers Guild](/news/2024/04/19/AboutOpenSourceProblemJA.jpg)

※ 本記事は投資助言などを目的としたものではありません。また、本記事に記載された情報は、執筆時点のものです。最新の情報をご確認ください。常に NFA / DYOR でお願いいたします。
