const THEMES = {
  mercury: '#b4d3ed', venus: '#e8c78f', moon: '#b5dcff', mars: '#ecaa90',
  jupiter: '#e0c3a4', saturn: '#e4d29f', uranus: '#8de1e6', neptune: '#83acff',
};

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Image unavailable: ' + src));
    image.src = src;
  });
}

function wrapText(ctx, value, width) {
  const lines = [];
  let line = '';
  const tokens = String(value).match(/[\p{L}\p{N}'’\-]+|\s+|[^]/gu) || [];
  const segments = text => typeof Intl.Segmenter === 'function'
    ? [...new Intl.Segmenter('ja', { granularity: 'grapheme' }).segment(text)].map(item => item.segment)
    : Array.from(text);
  for (const token of tokens) {
    if (ctx.measureText(line + token).width > width && line.trim()) {
      lines.push(line.trim());
      line = '';
    }
    for (const character of segments(token)) {
      if (!line && !character.trim()) continue;
      if (line && ctx.measureText(line + character).width > width) {
        lines.push(line.trim());
        line = '';
      }
      line += character;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

export async function createPlanetQrPoster({ record, qrDataUrl, coordinates = '', voyageDate = '', planetJapaneseName = '' }) {
  const accent = THEMES[record.planetId];
  if (!accent || !qrDataUrl) throw new Error('Poster data unavailable');
  if (document.fonts?.ready) await document.fonts.ready;
  const [planet, qr] = await Promise.all([
    loadImage(`assets/planet-preview-hd/${record.planetId}.webp`),
    loadImage(qrDataUrl),
  ]);
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1920;
  const ctx = canvas.getContext('2d');
  const family = '"Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans CJK JP", sans-serif';
  const setFont = (size, weight = 500) => { ctx.font = `${weight} ${size}px ${family}`; };
  const text = (value, x, y, size, color = '#f5faff', weight = 500, align = 'left') => {
    setFont(size, weight);
    ctx.textAlign = align;
    ctx.fillStyle = color;
    ctx.fillText(value, x, y);
  };
  const block = (value, y, initial, maxLines, weight = 500) => {
    let size = initial;
    let lines;
    do {
      setFont(size, weight);
      lines = wrapText(ctx, value, 920);
      if (lines.length <= maxLines) break;
      size--;
    } while (size > 24);
    lines.forEach((line, i) => text(line, 80, y + i * size * 1.3, size, '#f5faff', weight));
    return lines.length * size * 1.3;
  };
  ctx.fillStyle = '#030a16';
  ctx.fillRect(0, 0, 1080, 1920);
  const background = ctx.createRadialGradient(540, 740, 100, 540, 740, 850);
  background.addColorStop(0, '#10325b');
  background.addColorStop(0.6, '#07182d');
  background.addColorStop(1, '#030a16');
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, 1080, 1920);
  for (let i = 0; i < 135; i++) {
    const x = (i * 677 + 47) % 1080;
    const y = (i * 383 + 109) % 1290;
    ctx.fillStyle = i % 7 === 0 ? '#c7e7ff88' : '#9bbde03b';
    ctx.fillRect(x, y, i % 7 === 0 ? 2 : 1, i % 7 === 0 ? 2 : 1);
  }
  text('SPACE LINE', 80, 105, 43, '#ffffff', 700);
  text('22世紀の宇宙交通', 80, 153, 29, '#c6dbed');
  ctx.fillStyle = '#8bb8dc55';
  ctx.fillRect(80, 184, 920, 1);
  text(record.planetId.toUpperCase(), 540, 279, 74, '#ffffff', 700, 'center');
  text(planetJapaneseName, 540, 331, 37, accent, 600, 'center');

  const halo = ctx.createRadialGradient(540, 800, 300, 540, 800, 600);
  halo.addColorStop(0, accent + '00');
  halo.addColorStop(0.78, accent + '35');
  halo.addColorStop(1, accent + '00');
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, 1080, 1920);
  ctx.drawImage(planet, 35, 310, 1010, 1010);
  const fade = ctx.createLinearGradient(0, 1060, 0, 1340);
  fade.addColorStop(0, '#030a1600');
  fade.addColorStop(1, '#030a16');
  ctx.fillStyle = fade;
  ctx.fillRect(0, 1060, 1080, 350);

  const size = 720, x = 180, y = 456;
  ctx.save();
  ctx.shadowColor = '#299fff55';
  ctx.shadowBlur = 34;
  ctx.fillStyle = '#0c1e31e8';
  ctx.beginPath();
  ctx.roundRect(x - 22, y - 22, size + 44, size + 44, 23);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = accent;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x, y, size, size);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(qr, x, y, size, size);
  ctx.restore();
  text('QRコードをカメラにかざしてください', 540, 1244, 29, '#d6eaff', 500, 'center');

  const message = String(record.message || '').replace(/\s+/g, ' ').trim();
  const messageHeight = message ? block(message, 1338, 43, 3) : 0;
  const dividerY = message ? Math.max(1420, 1338 + messageHeight - 16) : 1350;
  ctx.fillStyle = '#80afd74d';
  ctx.fillRect(80, dividerY, 920, 1);
  const nameY = dividerY + 88;
  block(String(record.username || ''), nameY, 53, 2, 700);
  const region = String(record.region || '').replace(/\s+/g, ' ').trim();
  if (region) {
    let size = 34;
    setFont(size);
    while (ctx.measureText('出発地  ' + region).width > 920 && size > 24) setFont(--size);
    text('出発地  ' + region, 80, 1704, size, '#d6e5f4');
  }
  text('着陸座標', 80, 1763, 27, '#a8c9e5');
  text(coordinates, 80, 1810, 39, '#ffffff', 600);
  text(`${voyageDate} JST`, 80, 1876, 34, '#e0efff');
  return { url: canvas.toDataURL('image/png'), hasQR: true };
}
