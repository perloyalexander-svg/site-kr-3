const box=document.getElementById('gallery');
function draw(){
 const cards=getCards().reverse();
 box.innerHTML='';
 if(!cards.length){box.outerHTML='<div class="empty w-100" id="gallery">Пока пусто. Создай открытку в редакторе или генераторе.</div>';return}
 cards.forEach(c=>{
  const col=document.createElement('div');
  col.className='col-12 col-sm-6 col-xl-4';
  col.innerHTML='<div class="gallery__item h-100"><div class="ecard"><div class="ecard__emoji"></div><p class="ecard__text"></p></div><div class="d-flex gap-2 mt-3 gallery__actions"><a class="btn btn-brand btn-sm" href="editor.html?edit='+c.id+'">Открыть</a><button class="btn btn-danger btn-sm" data-del>Удалить</button></div></div>';
  renderCard(col.querySelector('.ecard'),c);
  col.querySelector('[data-del]').onclick=()=>{deleteCard(c.id);location.reload()};
  box.appendChild(col);
 });
}
draw();
