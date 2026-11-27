# SPACE LINE

未来創造展向けの宇宙旅行チェックインシステムです。名前・アバター・来場日を入力し、星と地点を選んで、QRコード付きの記念ポスターを作成します。

[公開デモ](https://thpi11a91104.github.io/space-line/SPACE_LINE/)

## 起動方法

Node.js を使用します。今回の動作確認環境は Node.js 24 です。

```sh
cd SPACE_LINE
npm start
```

ブラウザーで `http://localhost:3000` を開きます。Windows では `SPACE_LINE/start.cmd` からも起動できます。起動には外部の Node.js パッケージは不要です。

同じ Wi-Fi の端末から接続する場合は、`http://PCのIPアドレス:3000` を使用します。PC のファイアウォールで接続を許可する必要があります。

QRコードのライブラリは CDN から読み込むため、インターネット接続が必要です。ファイルを直接ダブルクリックする `file://` での起動は使用しません。

## データの保存先

| 起動方法 | 保存先 | 他の端末との共有 |
| --- | --- | --- |
| GitHub Pages | ブラウザーの localStorage | なし |
| `npm start` | `SPACE_LINE/data/checkins.json` | 同じサーバーに接続した端末間で共有 |

入力途中のプロフィールやメッセージは sessionStorage に保存します。Pages と共有サーバーのデータは自動で移行されません。

初回のサーバー接続に失敗するとローカル保存に切り替わります。その後サーバーを起動した場合はページを再読み込みし、共有モードで接続できたことを確認してください。

`data/checkins.json` には実行時の記録が入ります。実際の参加者データを GitHub にコミットしないでください。バックアップはサーバーを停止してから行います。

## 主なファイル

| ファイル・フォルダー | 内容 |
| --- | --- |
| `SPACE_LINE/index.html` | ページの入口、外部3D体験URLの設定 |
| `SPACE_LINE/css/app.css` | フォーム、星の選択、ポスター表示などのスタイル |
| `SPACE_LINE/js/app.js` | 入力、画面遷移、チェックイン、データ取得 |
| `SPACE_LINE/js/flow.js` | 戻る操作・再読み込み時の画面判定 |
| `SPACE_LINE/js/landing-coordinates.js` | チェックイン地点と座標表示 |
| `SPACE_LINE/js/qr-adapter.js` | QRコードのデータ作成・生成 |
| `SPACE_LINE/js/planet-qr-poster.js` | Canvas によるポスター画像の生成 |
| `SPACE_LINE/js/poster-page.js` | ポスター表示、画像保存、QR拡大 |
| `SPACE_LINE/solar/solar.js` | 太陽系の描画、カメラ操作、地点表示 |
| `SPACE_LINE/solar/solar.bundle.js` | ブラウザーで読み込むビルド済みファイル |
| `SPACE_LINE/solar/style.css` | 太陽系画面の基本スタイル |
| `SPACE_LINE/assets/` | ロゴ、アバター、星のプレビュー画像 |
| `SPACE_LINE/textures/` | 3D用のテクスチャ |
| `SPACE_LINE/server.js` | 共有用APIと静的ファイル配信 |
| `SPACE_LINE/credits.html`・`licenses/` | 素材の出典とライセンス |

`js/planet-viewer.js` と `js/planet-viewer.bundle.js` は以前の単体表示用です。現在の `app.js` からは使用していません。`ticket.html` と `checkins.html` は入口ページへの転送用として残しています。

## 3Dソースを変更した場合

```sh
cd SPACE_LINE
npm ci
npm run build:solar
```

変更したソースと生成された `solar.bundle.js` を一緒にコミットします。bundle ファイルを直接編集しないでください。旧単体表示のビルドコマンドは `npm run build:viewer` です。

## QRコード

QRコードには次の JSON を格納します。

```json
{
  "version": 1,
  "id": "チェックインのUUID",
  "ticketId": "SL-0001",
  "username": "そら",
  "avatarId": 42,
  "checkin": { "planetId": "moon", "spotId": "moon-01" },
  "message": "また来たい！"
}
```

読み取り側と項目名を合わせる必要があります。形式を変更するときは、生成側と読み取り側を同時に確認してください。予約日・チェックイン日時・座標はポスターに表示しますが、現在の QR データには含めていません。

`ticketId` は保存先ごとの連番です。複数端末の Pages 版では重複するため、照合には `id` を使用してください。QRの読み取り画面はこのリポジトリには含まれていません。

## 展示用の設定

- 星は8種類、各星の地点は128個です。地球は出発地です。
- 来場日の選択肢は `2127-01-23` と `2127-01-24` です。変更する場合は `app.js` と `server.js` の両方を更新します。
- 表示上のチェックイン日時は日本時間で、年だけ2127に置き換えます。保存される `createdAt` は実際の日時です。
- 座標はシステム内の地点に対応する展示用の値です。実在する着陸地点を示すものではありません。
- URL に `?test=0` を付けると「もう一度体験する」を非表示にします。通常はテスト用に表示します。
- `index.html` の `space-line-3d-url` に HTTPS のURLを設定すると、3D体験ボタンが有効になります。
- iPhone の画像保存は対応環境で共有メニューを開きます。通常のダウンロードはPNGファイルの保存で、写真アプリへの自動追加ではありません。

## 変更後の確認

1. 入力 → 星の選択 → チェックイン → メッセージ → ポスターを一通り操作する。
2. 再読み込み・ブラウザーの戻る操作で記録が失われないか確認する。
3. 共有モードでは別端末にも記録が表示されるか確認する。
4. 実際の展示用カメラで、スマートフォンに保存したポスターを読み取る。
5. 長い名前・60文字のメッセージでも文字が重ならないか確認する。

現在の共有サーバーは展示用の簡易実装です。管理者ログイン・予約枠の上限管理・使用済みチケットの検証は実装していません。CSSには過去のデザイン変更による上書きが残っているため、整理する際は各画面の表示を確認してください。
