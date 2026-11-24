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
  const [planet, qr, logo] = await Promise.all([
    loadImage(`assets/planet-preview-hd/${record.planetId}.webp`),
    loadImage(qrDataUrl),
    loadImage("assets/space-line-logo.png"),
  ]);
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  const ctx = canvas.getContext('2d');
  const family = '"Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans CJK JP", sans-serif';
  const setFont = (size, weight = 500) => { ctx.font = `${weight} ${size}px ${family}`; };
  const layout = (value, initial, maxLines, weight = 500) => {
    let size = initial;
    let lines;
    do {
      setFont(size, weight);
      lines = wrapText(ctx, String(value || '').replace(/\s+/g, ' ').trim(), 920);
      if (lines.length <= maxLines) break;
      size--;
    } while (size > 36);
    return { lines, size, weight, height: lines.length * Math.ceil(size * 1.35) };
  };
  const name = layout(record.username, 68, 3, 700);
  const message = layout(record.message, 42, 4);
  const region = layout(record.region ? '出発地　' + record.region : '', 38, 2);
  const date = record.visitDate ? '来場予約日　' + record.visitDate.replaceAll('-', '.') : '';
  const panelTop = 1300;
  const padding = 48;
  const nameTop = panelTop + padding + 46;
  const timeTop = nameTop + name.height + 24;
  const detailTop = timeTop + 196;
  const messageTop = detailTop + (region.height ? region.height + 12 : 0) + (date ? 52 : 0);
  canvas.height = messageTop + (message.height ? 78 + message.height : 0) + padding;
  const text = (value, x, y, size, color = '#ffffff', weight = 500, align = 'left') => {
    setFont(size, weight);
    ctx.textAlign = align;
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = color;
    ctx.fillText(value, x, y);
  };
  const block = (item, top, color) => {
    item.lines.forEach((line, i) => text(line, 80, top + item.size + i * Math.ceil(item.size * 1.35), item.size, color, item.weight));
    return top + item.height;
  };
  const background = ctx.createLinearGradient(0, 0, 1080, panelTop);
  background.addColorStop(0, '#103c6b');
  background.addColorStop(0.45, '#0b274a');
  background.addColorStop(1, '#195183');
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, 1080, panelTop);
  for (let i = 0; i < 140; i++) {
    ctx.fillStyle = i % 7 === 0 ? '#e4f5ffb0' : '#c7e7ff55';
    ctx.fillRect((i * 677 + 47) % 1080, (i * 383 + 109) % panelTop, i % 7 === 0 ? 2 : 1, i % 7 === 0 ? 2 : 1);
  }
  const scene = document.createElement('canvas');
  scene.width = 1080;
  scene.height = 1200;
  const sceneCtx = scene.getContext('2d');
  const halo = sceneCtx.createRadialGradient(540, 830, 330, 540, 830, 570);
  halo.addColorStop(0, accent + '00');
  halo.addColorStop(0.75, accent + '4d');
  halo.addColorStop(1, accent + '00');
  sceneCtx.fillStyle = halo;
  sceneCtx.fillRect(0, 0, 1080, 1200);
  sceneCtx.drawImage(planet, 35, 405, 1010, 1010);
  sceneCtx.globalCompositeOperation = 'destination-in';
  const mask = sceneCtx.createLinearGradient(0, 390, 0, 1200);
  mask.addColorStop(0, '#ffffff00');
  mask.addColorStop(0.08, '#ffffff');
  mask.addColorStop(0.85, '#ffffff');
  mask.addColorStop(1, '#ffffff00');
  sceneCtx.fillStyle = mask;
  sceneCtx.fillRect(0, 0, 1080, 1200);
  ctx.drawImage(scene, 0, 0);

  const logoWidth = 400;
  ctx.drawImage(logo, 80, 67, logoWidth, logoWidth * logo.naturalHeight / logo.naturalWidth);
  text('22世紀の宇宙交通', 80, 158, 36, '#e4f4ff');
  ctx.fillStyle = '#b6e3ff88';
  ctx.fillRect(80, 195, 920, 2);
  text(record.planetId.toUpperCase(), 540, 295, 82, '#ffffff', 700, 'center');
  text(planetJapaneseName, 540, 359, 48, '#eaf8ff', 600, 'center');

  const size = 720, x = 180, y = 460;
  ctx.save();
  ctx.shadowColor = '#02102399';
  ctx.shadowBlur = 28;
  ctx.fillStyle = '#e9f7ff';
  ctx.beginPath();
  ctx.roundRect(x - 18, y - 18, size + 36, size + 36, 20);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = '#9cddff';
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(x, y, size, size);
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(qr, x, y, size, size);
  ctx.restore();
  text('QRコードをカメラにかざしてください', 540, 1258, 36, '#ffffff', 600, 'center');

  const paper = ctx.createLinearGradient(0, panelTop, 1080, canvas.height);
  paper.addColorStop(0, '#f5fbff');
  paper.addColorStop(1, '#d9edff');
  ctx.fillStyle = paper;
  ctx.fillRect(0, panelTop, 1080, canvas.height - panelTop);
  ctx.fillStyle = '#3ab4ff';
  ctx.fillRect(0, panelTop, 1080, 8);
  const ink = '#0a2b50';
  const secondary = '#305778';
  const highlight = '#075a99';
  text('お名前', 80, nameTop - 12, 32, secondary, 600);
  block(name, nameTop, ink);
  text('チェックイン日時', 80, timeTop + 29, 32, secondary, 600);
  text(`${voyageDate} JST`, 80, timeTop + 85, 49, highlight, 700);
  text('着陸座標', 80, timeTop + 128, 32, secondary, 600);
  text(coordinates, 80, timeTop + 175, 43, ink, 700);
  if (region.height) block(region, detailTop, secondary);
  if (date) text(date, 80, messageTop - 14, 38, secondary, 500);
  if (message.height) {
    ctx.fillStyle = '#9ebed8';
    ctx.fillRect(80, messageTop + 20, 920, 2);
    text('宇宙へのメッセージ', 80, messageTop + 62, 32, secondary, 600);
    block(message, messageTop + 78, ink);
  }
  return { url: canvas.toDataURL('image/png'), hasQR: true };
}
