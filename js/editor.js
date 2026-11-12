const state = { id: null, imageId: IMAGES[0].id, text: 'Напиши своё пожелание', fontId: FONTS[0].id, x: 50, y: 50, filterId: 'original', stickers: [], size: 'medium', customWidth: 640, customHeight: 427 };
const cardEl = document.getElementById('card');
const textInput = document.getElementById('text-input');
const statusEl = document.getElementById('status');

function refresh() {
  renderCard(cardEl, state);
  textInput.value = state.text;
  document.querySelectorAll('#images .thumb').forEach(b => {
    b.classList.toggle('is-selected', b.dataset.id === state.imageId);
  });
  document.querySelectorAll('#fonts button').forEach(b => {
    b.classList.toggle('active', b.dataset.id === state.fontId);
  });
  document.querySelectorAll('#filters .filter-btn').forEach(b => {
    b.classList.toggle('is-selected', b.dataset.id === (state.filterId || 'original'));
  });
  
  // Обновление активной кнопки размера
  document.querySelectorAll('#sizes button').forEach(b => {
    b.classList.toggle('active', b.dataset.size === (state.size || 'medium'));
  });
  
  // Показ/скрытие полей кастомного размера
  const customBox = document.getElementById('custom-size-box');
  if (state.size === 'custom') {
    customBox.style.display = 'flex';
    document.getElementById('size-w').value = state.customWidth || 640;
    document.getElementById('size-h').value = state.customHeight || 427;
  } else {
    customBox.style.display = 'none';
  }
}

IMAGES.forEach(i => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'thumb';
  b.dataset.id = i.id;
  b.title = i.name;
  if (i.url) {
    b.style.background = `#222 url("${i.url}") center/cover no-repeat`;
  } else {
    b.style.background = i.css;
  }
  b.onclick = () => { state.imageId = i.id; refresh(); };
  document.getElementById('images').appendChild(b);
});

FONTS.forEach(f => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'btn btn-sm btn-outline-secondary';
  b.dataset.id = f.id;
  b.textContent = f.name;
  b.style.fontFamily = f.family;
  b.onclick = () => { state.fontId = f.id; refresh(); };
  document.getElementById('fonts').appendChild(b);
});

TEMPLATES.forEach(t => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'btn btn-sm btn-outline-secondary';
  b.textContent = t.name;
  b.onclick = () => {
    Object.assign(state, { imageId: t.imageId, text: t.text, fontId: t.fontId, x: t.x, y: t.y });
    refresh();
  };
  document.getElementById('templates').appendChild(b);
});

FILTERS.forEach(f => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'filter-btn';
  b.dataset.id = f.id;
  b.innerHTML = `<div class="filter-btn__preview" style="background:${f.preview}"></div><div class="filter-btn__name">${f.name}</div>`;
  b.onclick = () => { state.filterId = f.id; refresh(); };
  document.getElementById('filters').appendChild(b);
});

// === РАЗМЕРЫ (навешиваем события на существующие кнопки из HTML) ===
document.querySelectorAll('#sizes button').forEach(b => {
  b.onclick = () => { 
    state.size = b.dataset.size; 
    refresh(); 
  };
});

document.getElementById('size-w').addEventListener('input', (e) => {
  state.customWidth = parseInt(e.target.value) || 640;
  renderCard(cardEl, state);
});

document.getElementById('size-h').addEventListener('input', (e) => {
  state.customHeight = parseInt(e.target.value) || 427;
  renderCard(cardEl, state);
});
// =================================================================

// === ДОБАВЛЕНИЕ PNG ===
document.getElementById('btn-add-png').onclick = () => {
  document.getElementById('png-input').click();
};

document.getElementById('png-input').onchange = (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    const url = ev.target.result;
    const img = new Image();
    img.onload = () => {
      const defaultWidthPercent = 25; // 25% от ширины открытки
      const ratio = img.height / img.width;
      
      if (!state.stickers) state.stickers = [];
      state.stickers.push({
        id: 'sticker-' + Date.now(),
        url: url,
        x: 50,
        y: 50,
        widthPercent: defaultWidthPercent,
        aspectRatio: ratio
      });
      refresh();
    };
    img.src = url;
  };
  reader.readAsDataURL(file);
  e.target.value = ''; // Сброс, чтобы можно было выбрать ту же картинку снова
};
// =======================

textInput.addEventListener('input', () => {
  state.text = textInput.value;
  renderCard(cardEl, state);
});
makeDraggable(cardEl, (x, y) => { state.x = x; state.y = y; });

document.getElementById('btn-save').onclick = () => {
  if (!state.id) state.id = String(Date.now());
  saveCard({ ...state, date: new Date().toISOString() });
  statusEl.textContent = 'Открытка сохранена в «Мои работы» ✓';
};

const editId = new URLSearchParams(location.search).get('edit');
if (editId) {
  const c = getCards().find(c => c.id === editId);
  if (c) {
    Object.assign(state, c);
    if (!state.stickers) state.stickers = [];
  }
}
refresh();