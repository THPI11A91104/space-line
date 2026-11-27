"use strict";

import QRCode from 'https://cdn.jsdelivr.net/npm/qrcode@1.5.4/+esm';

window.SpaceLineQR = {

  forCheckin(record) {
    return this.generate(record.username);
  },

  async generate(profile) {
    const textData = typeof profile === 'string' ? profile : JSON.stringify(profile);

    try {
      const dataUrl = await QRCode.toDataURL(textData, {
        width: 720,
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
