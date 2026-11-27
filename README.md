# SPACE LINE

未来創造展で使う、宇宙旅行のチェックインシステムです。
名前やアバターを入力して星を選ぶと、QRコード付きの記念ポスターを作れます。

[デモを開く](https://thpi11a91104.github.io/space-line/SPACE_LINE/)

## 起動方法

Node.js をインストールして、次のコマンドで起動します。

```sh
cd SPACE_LINE
npm start
```

ブラウザーで `http://localhost:3000` を開いてください。
Windows は `start.cmd` からも起動できます。

GitHub Pages ではブラウザー内に記録を保存します。
サーバーを起動すると、同じサーバーに接続した端末で記録を共有できます。
QRコードの生成にはインターネット接続が必要です。

## 主なファイル

ファイルは `SPACE_LINE` フォルダーに入っています。

- `index.html`：入口ページ
- `css/app.css`：画面のデザイン
- `js/app.js`：入力、画面の切り替え、チェックイン
- `js/qr-adapter.js`：QRコードの生成
- `js/planet-qr-poster.js`：ポスター画像の生成
- `js/poster-page.js`：ポスターの表示と保存
- `solar/solar.js`：太陽系の3D表示
- `server.js`：記録の保存と共有

## 変更するとき

`solar/solar.js` を変更した場合は、`SPACE_LINE` フォルダーでビルドします。

```sh
npm ci
npm run build:solar
```

QRコードの項目を変えるときは、読み取り側と合わせて確認してください。
3D体験のリンクは `index.html` の `space-line-3d-url` に設定します。

参加者の記録は `data/checkins.json` に保存されます。このデータは GitHub にアップロードしないでください。

素材の出典は [credits.html](SPACE_LINE/credits.html) に記載しています。
