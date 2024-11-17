# !
- nodaridaisai-2024-LINEbot
- 2024年度野田地区理大祭公式LINE向けのBot
- ざっくりいうと公式LINEに送られたメッセージを受け取って、その内容に合った定型のメッセージを返す
- Cloudflare Workers + Honoで作成

# SetUp
0. 前提
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

4. プロジェクト名の変更
- `wrangler.toml`から、`name`の値を設定したい値に変更

5. deploy
```bash
yarn deploy
```
- サブドメインを何にするか聞かれると思うので、自由に設定してください


6. webhookURLの登録
- deployするとURLが発行されると思います（`~~~workers.dev`）
- そのURLに`/api/webhook` をくっつけたURL（例：`https://nodaridaisai-2024-line.nodaridaisai-2024-line.workers.dev/api/webhook`）をDevelopersコンソールのMessaging API設定から、WebhookURLに設定する。（検証を押してOKか確認）

7. 動作確認
- 下記のコマンドをターミナルで実行
```bash
yarn tail
```
- 公式LINEにメッセージを送ってみる（なんでもよい）
- ターミナルになんか色々表示されてOKだったらOK
- （登録されたキーワードを送って返ってくるかでもよい）

# Custom
- 自由にしてください
- 基本的には `/src/messages` 内をいじればOKだと思う
- LLMとか追加しちゃってください

# その他
- Messageはボタン4つまでっぽい
- なにかあれば Twitter/X : @akiranishimur まで
