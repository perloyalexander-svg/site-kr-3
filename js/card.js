function renderCard(el, card) {
  const img = IMAGES.find(i => i.id === card.imageId) || IMAGES[0];
  const font = FONTS.find(f => f.id === card.fontId) || FONTS[0];
  const filterObj = FILTERS.find(f => f.id === card.filterId) || FILTERS[0];

  // === ПРИМЕНЕНИЕ РАЗМЕРА ===
  let maxW = '640px';
  let aspectRatio = '3/2';
  if (card.size === 'small') maxW = '400px';
  else if (card.size === 'large') maxW = '900px';
  else if (card.size === 'custom' && card.customWidth && card.customHeight) {
    maxW = Math.max(100, Math.min(card.customWidth, 2000)) + 'px';
    aspectRatio = `${card.customWidth} / ${card.customHeight}`;
  }
  el.style.maxWidth = maxW;
  el.style.aspectRatio = aspectRatio;
  // =========================

  el.style.background = '';
  el.style.backgroundImage = '';
  el.style.backgroundSize = '';
  el.style.backgroundPosition = '';
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

  let stickersContainer = el.querySelector('.ecard__stickers');
  if (!stickersContainer) {
    stickersContainer = document.createElement('div');
    stickersContainer.className = 'ecard__stickers';
    stickersContainer.style.position = 'absolute';
    stickersContainer.style.inset = '0';
    stickersContainer.style.pointerEvents = 'none';
    stickersContainer.style.zIndex = '5';
    
    const textEl = el.querySelector('.ecard__text');
    if (textEl) {
      el.insertBefore(stickersContainer, textEl);
    } else {
      el.appendChild(stickersContainer);
    }
  }
  stickersContainer.innerHTML = '';

  const stickers = card.stickers || [];
  stickers.forEach(s => {
    const stickerEl = document.createElement('div');
    stickerEl.className = 'ecard__sticker';
    stickerEl.style.left = s.x + '%';
    stickerEl.style.top = s.y + '%';
    stickerEl.style.width = (s.widthPercent || 20) + '%';
    stickerEl.style.pointerEvents = 'auto';

    const imgEl = document.createElement('img');
    imgEl.src = s.url;
    stickerEl.appendChild(imgEl);

    const delBtn = document.createElement('button');
    delBtn.className = 'sticker-delete';
    delBtn.innerHTML = '×';
    delBtn.onclick = (e) => {
      e.stopPropagation();
      const idx = card.stickers.findIndex(x => x.id === s.id);
      if (idx !== -1) {
        card.stickers.splice(idx, 1);
        stickerEl.remove();
      }
    };
    stickerEl.appendChild(delBtn);

    makeStickerDraggable(stickerEl, el, s);
    stickersContainer.appendChild(stickerEl);
  });
}

function makeStickerDraggable(stickerEl, cardEl, stickerObj) {
  stickerEl.addEventListener('pointerdown', e => {
    if (e.target.closest('.sticker-delete')) return;
    stickerEl.setPointerCapture(e.pointerId);
    
    const rect = cardEl.getBoundingClientRect();
    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = stickerObj.x;
    const initialY = stickerObj.y;
    
    const move = ev => {
      const dx = (ev.clientX - startX) / rect.width * 100;
      const dy = (ev.clientY - startY) / rect.height * 100;
      
      let newX = Math.min(100, Math.max(0, initialX + dx));
      let newY = Math.min(100, Math.max(0, initialY + dy));
      
      stickerObj.x = newX;
      stickerObj.y = newY;
      
      stickerEl.style.left = newX + '%';
      stickerEl.style.top = newY + '%';
    };
    
    const up = () => {
      stickerEl.removeEventListener('pointermove', move);
      stickerEl.removeEventListener('pointerup', up);
    };
    stickerEl.addEventListener('pointermove', move);
    stickerEl.addEventListener('pointerup', up);
  });
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
  // === ДИНАМИЧЕСКИЙ РАСЧЕТ РАЗМЕРА CANVAS ===
  let aspect = 3 / 2;
  if (card.size === 'custom' && card.customWidth && card.customHeight) {
    aspect = card.customWidth / card.customHeight;
  }
  let W = 1200;
  let H = W / aspect;
  if (H > 1200) { H = 1200; W = H * aspect; }
  // =============================================

  const img = IMAGES.find(i => i.id === card.imageId) || IMAGES[0];
  const font = FONTS.find(f => f.id === card.fontId) || FONTS[0];
  const filterObj = FILTERS.find(f => f.id === card.filterId) || FILTERS[0];
  const size = 60;

  await document.fonts.load(`${size}px ${font.family}`);

  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

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

  const stickers = card.stickers || [];
  for (const s of stickers) {
    await new Promise((resolve) => {
      const im = new Image();
      im.onload = () => {
        const w = s.widthPercent || 20;
        const dw = (w / 100) * W;
        const dh = dw * (s.aspectRatio || 1);
        const dx = (s.x / 100) * W - dw / 2;
        const dy = (s.y / 100) * H - dh / 2;
        ctx.drawImage(im, dx, dy, dw, dh);
        resolve();
      };
      im.onerror = () => resolve();
      im.src = s.url;
    });
  }

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