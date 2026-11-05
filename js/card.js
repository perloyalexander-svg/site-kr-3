function renderCard(el,card){
 const img=IMAGES.find(i=>i.id===card.imageId)||IMAGES[0];
 const font=FONTS.find(f=>f.id===card.fontId)||FONTS[0];
 el.style.background=img.css;
 el.querySelector('.ecard__emoji').textContent=img.emoji;
 const t=el.querySelector('.ecard__text');
 t.textContent=card.text;
 t.style.fontFamily=font.family;
 t.style.left=card.x+'%';
 t.style.top=card.y+'%';
}
function makeDraggable(el,onChange){
 const t=el.querySelector('.ecard__text');
 t.addEventListener('pointerdown',e=>{
  t.setPointerCapture(e.pointerId);
  const move=ev=>{
   const r=el.getBoundingClientRect();
   const x=Math.min(95,Math.max(5,(ev.clientX-r.left)/r.width*100));
   const y=Math.min(95,Math.max(5,(ev.clientY-r.top)/r.height*100));
   t.style.left=x+'%';t.style.top=y+'%';
   onChange(x,y);
  };
  const up=()=>{t.removeEventListener('pointermove',move);t.removeEventListener('pointerup',up)};
  t.addEventListener('pointermove',move);
  t.addEventListener('pointerup',up);
 });
}
function pick(arr){return arr[Math.floor(Math.random()*arr.length)]}
