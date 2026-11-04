"use strict";

import QRCode from 'https://cdn.jsdelivr.net/npm/qrcode@1.5.4/+esm';

window.SpaceLineQR = {
  // QR生成をここに追加。PNGのData URLを返す。
  async generate(profile) {
    const textData = typeof profile === 'string' ? profile : JSON.stringify(profile);

    try {
      const dataUrl = await QRCode.toDataURL(textData, {
        width: 256,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      });
      return dataUrl;
    } catch (err) {
      console.error("QRコードの生成に失敗しました:", err);
      return null;
    }
  },
};