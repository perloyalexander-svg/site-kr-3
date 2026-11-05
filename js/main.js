function toast(msg){
 let t=document.querySelector('.toast');
 if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}
 t.textContent=msg;t.classList.add('show');
 setTimeout(()=>t.classList.remove('show'),2000);
}
document.addEventListener('DOMContentLoaded',()=>{
 const page=location.pathname.split('/').pop()||'index.html';
 document.querySelectorAll('.sidebar__link').forEach(a=>{
  if(a.getAttribute('href')===page)a.classList.add('sidebar__link--current');
 });
  const shareBtn = document.getElementById('btn-share');
 if (shareBtn) {
  shareBtn.textContent = 'Скачать';
  shareBtn.addEventListener('click', async () => {
   if (typeof state === 'undefined') {
    toast('Открой редактор или генератор, чтобы скачать открытку');
    return;
   }
   await downloadCard(state);
   toast('Открытка скачана');
  });
 }
 document.getElementById('btn-share')?.addEventListener('click',async()=>{
  const data={title:'FreePages — открытки',text:'Создай свою открытку!',url:location.href};
  try{
   if(navigator.share){await navigator.share(data)}
   else{await navigator.clipboard.writeText(location.href);toast('Ссылка скопирована')}
  }catch(e){}
 });
});
