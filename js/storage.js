const STORAGE_KEY='ecards';
function getCards(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY))||[]}catch(e){return[]}}
function saveCard(card){
 const cards=getCards();
 const i=cards.findIndex(c=>c.id===card.id);
 if(i>=0)cards[i]=card;else cards.push(card);
 localStorage.setItem(STORAGE_KEY,JSON.stringify(cards));
}
function deleteCard(id){localStorage.setItem(STORAGE_KEY,JSON.stringify(getCards().filter(c=>c.id!==id)))}
