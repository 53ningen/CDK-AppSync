# TypeScript + CDK で理解する AppSync

* TypeScript + AWS CDK で AppSync を理解するためのシンプルな学習用サンプルコード
* 次の内容が含まれます
  * AppSync GraphQL API + Resolver + None Type Data Source の CDK での定義
  * 作成した GraphQL API を curl で呼び出す
  * 作成した GraphQL API を Node.js から呼び出す
  * 作成した GraphQL API を React アプリケーションから呼び出す
* 解説記事はこちら: [TypeScript + CDK で理解する AppSync: はじめの一歩](https://zenn.dev/gomi_ningen/articles/df9a4a6ea28ab1)

## 使い方

AppSync および関連リソースのデプロイは次のようなコマンドにて実行します

```bash
$ cd ./backend
$ yarn install
$ cdk deploy --outputs-file ../outputs.json
```

デプロイ成功後 GraphQL API の URL や API キーの情報が含まれた `./outputs.json` が作成され、このファイルは API コールを行う際に利用されます。

* curl で GraphQL API を呼び出す際には `backend` ディレクトリより `./src/etc/hello.sh` を実行します
  * `jq` のインストールが必要です
* Node.js から GraphQL API を呼び出す際には `backend` ディレクトリより `ts-node ./src/etc/hello.ts` を実行します
  * `ts-node` のインストールが必要です
* React アプリケーション から GraphQL API を呼び出す際には `frontend` ディレクトリより `yarn install && yarn start` を実行しブラウザで http://localhost:3000 を開きます
