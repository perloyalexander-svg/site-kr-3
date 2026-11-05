function toast(msg){
 let t=document.querySelector('.app-toast');
 if(!t){t=document.createElement('div');t.className='app-toast';document.body.appendChild(t)}
 t.textContent=msg;t.classList.add('show');
 setTimeout(()=>t.classList.remove('show'),2000);
}
document.addEventListener('DOMContentLoaded',()=>{
 const page=location.pathname.split('/').pop()||'index.html';
 document.querySelectorAll('.sidebar__link').forEach(a=>{
  if(a.getAttribute('href')===page)a.classList.add('active');
 });
 const shareBtn=document.getElementById('btn-share');
 if(shareBtn){
  shareBtn.addEventListener('click',async()=>{
   if(typeof state==='undefined'){
    toast('Открой редактор или генератор, чтобы скачать открытку');
    return;
   }
   await downloadCard(state);
   toast('Открытка скачана');
  });
 }
});
