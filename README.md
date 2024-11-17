# !
- nodaridaisai-2024-LINEbot
- 2024年度野田地区理大祭公式LINE向けのBot
- ざっくりいうと公式LINEに送られたメッセージを受け取って、その内容に合った定型のメッセージを返す
- Cloudflare Workers + Honoで作成

# SetUp
## 前提
- node.jsが入っている
- Cloudflare アカウントを取得している

1. wranglerのインストール（やってない場合は）
- wranglerはCloudflare Workers用のCLIツール
- 以下のコマンドをterminalで実行
```bash
npm install -g wrangler
```
- ログインする

```bash
wrangler login
```

2. モジュールのインストール
```bash
yarn install

```

3. 環境変数の設定
- LINE Developers コンソール（https://developers.line.biz/console/） からMessaging API設定 -> チャンネルアクセストークン（長期）をコピー
- 以下のコマンドを実行後、ペーストしてEnter
```bash
wrangler secret put CHANNEL_ACCESS_TOKEN
```

4. deploy
```bash
yarn deploy
```



