function renderCard(el, card) {
  const img = IMAGES.find(i => i.id === card.imageId) || IMAGES[0];
  const font = FONTS.find(f => f.id === card.fontId) || FONTS[0];
  const filterObj = FILTERS.find(f => f.id === card.filterId) || FILTERS[0];

  // Сброс старых стилей фона
  el.style.background = '';
  el.style.backgroundImage = '';
  el.style.backgroundSize = '';
  el.style.backgroundPosition = '';
  
  // Применяем фильтр
  el.style.filter = filterObj.filter;

  if (img.url) {
    el.style.background = `#222 url("${img.url}") center/cover no-repeat`;
  } else {
    el.style.background = img.css;
  }

  const emojiEl = el.querySelector('.ecard__emoji');
  if (emojiEl) {
    if (img.url) {
      emojiEl.style.display = 'none';
    } else {
      emojiEl.style.display = '';
      emojiEl.textContent = img.emoji;
    }
  }

  const t = el.querySelector('.ecard__text');
  t.textContent = card.text;
  t.style.fontFamily = font.family;
  t.style.left = card.x + '%';
  t.style.top = card.y + '%';
}

function makeDraggable(el, onChange) {
  const t = el.querySelector('.ecard__text');
  t.addEventListener('pointerdown', e => {
    t.setPointerCapture(e.pointerId);
    const move = ev => {
      const r = el.getBoundingClientRect();
      const x = Math.min(95, Math.max(5, (ev.clientX - r.left) / r.width * 100));
      const y = Math.min(95, Math.max(5, (ev.clientY - r.top) / r.height * 100));
      t.style.left = x + '%'; t.style.top = y + '%';
      onChange(x, y);
    };
    const up = () => { t.removeEventListener('pointermove', move); t.removeEventListener('pointerup', up) };
    t.addEventListener('pointermove', move);
    t.addEventListener('pointerup', up);
  });
}
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)] }

async function downloadCard(card) {
  const W = 1200, H = 800;
  const img = IMAGES.find(i => i.id === card.imageId) || IMAGES[0];
  const font = FONTS.find(f => f.id === card.fontId) || FONTS[0];
  const filterObj = FILTERS.find(f => f.id === card.filterId) || FILTERS[0];
  const size = 60;

  await document.fonts.load(`${size}px ${font.family}`);

  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Применяем фильтр к контексту Canvas
  ctx.filter = filterObj.filter;

  if (img.url) {
    await new Promise((resolve) => {
      const im = new Image();
      im.crossOrigin = 'anonymous';
      im.onload = () => {
        const scale = Math.max(W / im.width, H / im.height);
        const dw = im.width * scale, dh = im.height * scale;
        ctx.drawImage(im, (W - dw) / 2, (H - dh) / 2, dw, dh);
        resolve();
      };
      im.onerror = () => {
        ctx.fillStyle = '#222'; ctx.fillRect(0, 0, W, H); resolve();
      };
      im.src = img.url;
    });
    ctx.fillStyle = 'rgba(0,0,0,.25)';
    ctx.fillRect(0, 0, W, H);
  } else {
    const colors = img.css.match(/#[0-9a-fA-F]{6}/g);
    const a = 160 * Math.PI / 180;
    const dx = Math.sin(a), dy = -Math.cos(a);
    const half = (Math.abs(W * dx) + Math.abs(H * dy)) / 2;
    const g = ctx.createLinearGradient(W / 2 - dx * half, H / 2 - dy * half, W / 2 + dx * half, H / 2 + dy * half);
    colors.forEach((c, i) => g.addColorStop(i / (colors.length - 1), c));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    ctx.globalAlpha = 0.35;
    ctx.font = '200px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(img.emoji, W / 2, H / 2);
    ctx.globalAlpha = 1;
  }

  // Отключаем фильтр для текста, чтобы он был четким
  ctx.filter = 'none';

  ctx.font = `${size}px ${font.family}`;
  ctx.fillStyle = '#fff';
  ctx.shadowColor = 'rgba(0,0,0,.55)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 4;
  const maxW = W * 0.85;
  const lines = [];
  let line = '';
  card.text.split(' ').forEach(word => {
    const test = line ? line + ' ' + word : word;
    if (ctx.measureText(test).width > maxW && line) { lines.push(line); line = word; }
    else line = test;
  });
  lines.push(line);

  const lh = size * 1.2;
  let y = card.y / 100 * H - (lines.length * lh) / 2 + lh / 2;
  lines.forEach(l => {
    ctx.fillText(l, card.x / 100 * W, y);
    y += lh;
  });

  canvas.toBlob(blob => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'otkrytka.png';
    link.click();
    URL.revokeObjectURL(link.href);
  }, 'image/png');
}