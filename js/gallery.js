const box=document.getElementById('gallery');
function draw(){
 const cards=getCards().reverse();
 box.innerHTML='';
 if(!cards.length){box.outerHTML='<div class="empty" id="gallery">Пока пусто. Создай открытку в редакторе или генераторе.</div>';return}
 cards.forEach(c=>{
  const item=document.createElement('div');item.className='gallery__item';
  item.innerHTML='<div class="card"><div class="card__emoji"></div><p class="card__text"></p></div><div class="gallery__actions"><a class="btn" href="index.html?edit='+c.id+'">Открыть</a><button class="btn btn--danger">Удалить</button></div>';
  renderCard(item.querySelector('.card'),c);
  item.querySelector('.btn--danger').onclick=()=>{deleteCard(c.id);location.reload()};
  box.appendChild(item);
 });
}
draw();
