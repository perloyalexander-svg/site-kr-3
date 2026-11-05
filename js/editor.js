const state = { id: null, imageId: IMAGES[0].id, text: 'Напиши своё пожелание', fontId: FONTS[0].id, x: 50, y: 50 };
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
}

IMAGES.forEach(i => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'thumb';
  b.dataset.id = i.id;
  b.title = i.name;
  b.style.background = i.css;
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
  if (c) Object.assign(state, c);
}
refresh();
