function toast(msg){
 let t=document.querySelector('.app-toast');
 if(!t){t=document.createElement('div');t.className='app-toast';document.body.appendChild(t)}
 t.textContent=msg;t.classList.add('show');
 setTimeout(()=>t.classList.remove('show'),2000);
}

// ===== ТЕМА =====
const THEME_KEY='ecards-theme';

function applyTheme(theme){
 document.documentElement.setAttribute('data-theme',theme);
 const btn=document.getElementById('theme-toggle');
 if(btn){
  btn.textContent=theme==='dark'?'☀️':'🌙';
  btn.setAttribute('aria-label',theme==='dark'?'Включить светлую тему':'Включить тёмную тему');
  btn.title=theme==='dark'?'Светлая тема':'Тёмная тема';
 }
}

function initTheme(){
 let theme=localStorage.getItem(THEME_KEY);
 if(!theme){
  theme=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
 }
 applyTheme(theme);

 // создаём кнопку и вставляем в навбар
 const nav=document.querySelector('.site-header .navbar-collapse');
 if(nav&&!document.getElementById('theme-toggle')){
  const btn=document.createElement('button');
  btn.type='button';
  btn.id='theme-toggle';
  btn.className='btn btn-light btn-sm theme-toggle';
  // на страницах редактора/генератора/галереи есть .d-flex с печатью/скачать —
  // ставим кнопку ПЕРЕД ними, на остальных страницах просто в правый край навбара
  const actions=nav.querySelector('.d-flex');
  if(actions){
   actions.insertBefore(btn,actions.firstChild);
  }else{
   const wrap=document.createElement('div');
   wrap.className='d-flex ms-auto';
   wrap.appendChild(btn);
   nav.appendChild(wrap);
  }
  btn.addEventListener('click',()=>{
   const current=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';
   localStorage.setItem(THEME_KEY,current);
   applyTheme(current);
  });
  applyTheme(theme);
 }
}

document.addEventListener('DOMContentLoaded',()=>{
 initTheme();

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