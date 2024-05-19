---
id: solv-v4-released
title: Solana バリデーターツール solv v4 リリース。Jito MEV 報酬を最大化する Relayer やノーダウンタイム移行等、新機能を多数追加
category: プレスリリース
thumbnail: /news/2024/05/20/solv4.jpg
---

ELSOUL LABO B.V.（エルソウルラボ、本社: オランダ・アムステルダム、代表取締役 CEO: 川崎文武）および、同社が設立したオープンソースソフトウェア開発を支援する Web3 NFT カードゲームを運営する Epics DAO は、Solana ブロックチェーンのバリデーター向けオープンソースツール「solv」の開発と運用を通じて、ブロックチェーン技術のイノベーションと持続可能な開発を推進しています。このツールは約 1 年にわたる運用を経てその性能と信頼性を証明し、現在は多くのユーザーにより Solana ブロックチェーンのメインネット及びテストネット上で幅広く利用されています。

この度は、solv の新バージョン となる v4 リリースについて発表いたします。

v4 アップデートにより、Jito MEV 報酬を最大化し、ネットワークの分散化にも貢献する Relayer の起動設定や、バリデーターノードのノーダウンタイム移行等、役立つ新機能を多数追加しました。

## solv v4 アップデートについて

solv v4 アップデートでは、以下の新機能が追加されています。

- **Jito MEV 報酬を最大化する Relayer の起動設定:** Jito MEV 報酬の最大化及びネットワークの分散化に貢献する Relayer の起動設定を追加しました。
- **バリデーターノードのノーダウンタイム移行:** バリデーターノードのノーダウンタイム移行をサポートするための新しいコマンドを追加しました。
- **Jito RPC のセットアップ:** Jito RPC のセットアップサポートを追加しました。
- **Google Cloud でのセットアップを更に自動化:** Google Cloud にて Solana バリデーターを行う際に必要な設定を更に自動化しました。
- **便利コマンドの追加:** バリデーター運用をより便利にするための新しいコマンドを追加しました。

特に、Jito MEV 報酬を最大化し、かつネットワークの分散化にも貢献する Relayer の起動設定ですが、ドキュメントが上級者向けで煩雑なため、実装が避けられることが多かった機能です。solv v4 では、この機能を簡単に設定できるようになりました。

バリデーターノードのダウンタイム要件は、Solana ネットワークの安定性を維持するために非常に重要です。solv v4 では、バリデーターノードのノーダウンタイム移行をサポートするための新しいコマンドを追加しました。

日々のアップデート作業においてもノーダウンタイム移行を行うことで、バリデータースコアを高く保ち信頼性を上げ、Solana ネットワークの安定性にも貢献できます。また、バリデーターノードの引っ越しにも有効で、戦略的・もしくは緊急の場合のノード移行においてもダウンタイム無く移行が可能なため、バリデーターの運用をより安定させることができます。

詳しくは下記リリースノートを御覧ください。

solv v4 - リリースノート (GitHub): https://github.com/EpicsDAO/solv/releases/tag/%40epics-dao%2Fsolv%404.0.0

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
