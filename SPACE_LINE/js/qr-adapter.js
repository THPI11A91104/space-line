"use strict";
// 王さん用：この関数の中だけQRコード生成処理に差し替えます。
// 入力：{ version, id, ticketId, username, avatarId, checkin, message }
// checkin：{ planetId, spotId }。生年月日・端末IDは渡しません。
// 出力：余白を含む正方形PNGのData URL。未接続の場合はnull。
// 例：return QRCode.toDataURL(JSON.stringify(profile), { margin: 4 });
window.SpaceLineQR = {
  async generate(profile) {
    return null;
  },
};
