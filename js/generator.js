const state={id:null,imageId:IMAGES[0].id,text:'',fontId:FONTS[0].id,x:50,y:50};
const cardEl=document.getElementById('card');
const statusEl=document.getElementById('status');
function generate(){
 state.id=null;
 state.imageId=pick(IMAGES).id;
 state.text=pick(QUOTES);
 state.fontId=pick(FONTS).id;
 state.x=50;state.y=50;
 renderCard(cardEl,state);
 statusEl.textContent='';
}
makeDraggable(cardEl,(x,y)=>{state.x=x;state.y=y});
document.getElementById('btn-generate').onclick=generate;
document.getElementById('btn-save').onclick=()=>{
 if(!state.id)state.id=String(Date.now());
 saveCard({...state,date:new Date().toISOString()});
 statusEl.textContent='Открытка сохранена в «Мои работы» ✓';
};
generate();
