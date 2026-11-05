const box = document.getElementById('gallery');

function draw() {
  const cards = getCards().reverse();
  box.innerHTML = '';
  if (!cards.length) {
    box.innerHTML = '<div class="col-12"><p class="text-secondary text-center py-5 mb-0">Пока пусто. Создай открытку в редакторе или генераторе.</p></div>';
    return;
  }
  cards.forEach(c => {
    const item = document.createElement('div');
    item.className = 'col-sm-6 col-xl-4';
    item.innerHTML =
      '<div class="gallery-item card h-100 p-2">' +
      '<div class="postcard"><div class="postcard-emoji"></div><p class="postcard-text"></p></div>' +
      '<div class="gallery-actions d-flex gap-2 mt-2">' +
      '<a class="btn btn-primary" href="index.html?edit=' + c.id + '">Открыть</a>' +
      '<button type="button" class="btn btn-danger js-delete">Удалить</button>' +
      '</div></div>';
    renderCard(item.querySelector('.postcard'), c);
    item.querySelector('.js-delete').onclick = () => {
      deleteCard(c.id);
      draw();
    };
    box.appendChild(item);
  });
}

draw();
