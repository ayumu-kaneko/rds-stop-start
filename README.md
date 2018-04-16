# rds-stop-start
RDSを日次で停止、起動するためのLambdaをServerless Frameworkで実装してみました。
## 用意するもの
- 対象のRDSインスタンス(停止の要件を満たすもの)
- Lambda関数のためのIAMロール(RDSの停止、再開ができるもの)
## セットアップ
1. このリポジトリをclone `git clone git@github.com:ayumu-kaneko/rds-stop-start.git`
1. `npm install`
1. serverless.yml.sample を serverless.yml に rename `mv serverless.yml.sample serverless.yml`
1. serverless.yml を利用する環境にあわせて編集

serverless.yml の主な編集ポイントは下記の通りです。
- provider.region リージョン
- custom.stage.develop.IAMRoleForLambda 実行するLambdaのロール(RDSの停止、起動ができるもの)
- custom.stage.develop.StopSchedule 停止のスケジュール
- custom.stage.develop.StartSchedule 起動のスケジュール
