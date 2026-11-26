"use strict";

import QRCode from 'https://cdn.jsdelivr.net/npm/qrcode@1.5.4/+esm';

window.SpaceLineQR = {

  forCheckin(record) {
    return this.generate({
      version: 1,
      id: record.id,
      ticketId: record.ticketId,
      username: record.username,
      avatarId: record.avatarId,
      checkin: { planetId: record.planetId, spotId: record.slotId },
      message: record.message,
    });
  },

  async generate(profile) {
    const textData = typeof profile === 'string' ? profile : JSON.stringify(profile);

    try {
      const dataUrl = await QRCode.toDataURL(textData, {
        scale: 8,
        margin: 4,
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