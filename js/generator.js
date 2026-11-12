const state = { id: null, imageId: IMAGES[0].id, text: '', fontId: FONTS[0].id, x: 50, y: 50, filterId: 'original', stickers: [], size: 'medium', customWidth: 640, customHeight: 427 };
const cardEl = document.getElementById('card');
const statusEl = document.getElementById('status');

function generate() {
  state.id = null;
  state.imageId = pick(IMAGES).id;
  state.text = pick(QUOTES);
  state.fontId = pick(FONTS).id;
  state.filterId = pick(FILTERS).id;
  state.stickers = [];
  state.x = 50; state.y = 50;
  
  document.querySelectorAll('#filters .filter-btn').forEach(b => {
    b.classList.toggle('is-selected', b.dataset.id === state.filterId);
  });
  
  renderCard(cardEl, state);
  statusEl.textContent = '';
}

FILTERS.forEach(f => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'filter-btn';
  b.dataset.id = f.id;
  b.innerHTML = `<div class="filter-btn__preview" style="background:${f.preview}"></div><div class="filter-btn__name">${f.name}</div>`;
  b.onclick = () => {
    state.filterId = f.id;
    document.querySelectorAll('#filters .filter-btn').forEach(btn => {
      btn.classList.toggle('is-selected', btn.dataset.id === state.filterId);
    });
    renderCard(cardEl, state);
  };
  document.getElementById('filters').appendChild(b);
});

makeDraggable(cardEl, (x, y) => { state.x = x; state.y = y; });
document.getElementById('btn-generate').onclick = generate;
document.getElementById('btn-save').onclick = () => {
  if (!state.id) state.id = String(Date.now());
  saveCard({ ...state, date: new Date().toISOString() });
  statusEl.textContent = 'Открытка сохранена в «Мои работы» ✓';
};
generate();