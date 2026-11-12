// Картинки: либо CSS-градиент (emoji + css), либо реальное фото (url + emoji для превью)
const IMAGES=[
 // --- существующие градиенты (оставлены как были) ---
 {id:'sunset',name:'Закат',emoji:'🌅',css:'linear-gradient(160deg,#ff9a56,#ff4e72 60%,#6a3d9a)'},
 {id:'ocean',name:'Океан',emoji:'🌊',css:'linear-gradient(160deg,#4facfe,#00c6c3)'},
 {id:'forest',name:'Лес',emoji:'🌲',css:'linear-gradient(160deg,#56ab2f,#1b5e3b)'},
 {id:'night',name:'Ночь',emoji:'🌙',css:'linear-gradient(160deg,#141e30,#35577d)'},
 {id:'flowers',name:'Цветы',emoji:'🌸',css:'linear-gradient(160deg,#ffd1dc,#f78fb3)'},
 {id:'sun',name:'Солнце',emoji:'☀️',css:'linear-gradient(160deg,#fddb92,#f6a623)'},
 {id:'party',name:'Праздник',emoji:'🎉',css:'linear-gradient(160deg,#a18cd1,#fbc2eb)'},
 {id:'heart',name:'Сердце',emoji:'❤️',css:'linear-gradient(160deg,#e52d27,#b31217)'},

 // --- реальные фотографии (unsplash, стабильные прямые ссылки) ---
 {id:'photo-sunset',name:'Закат (фото)',emoji:'🌅',url:'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=1200&q=80&auto=format&fit=crop'},
 {id:'photo-ocean',name:'Океан (фото)',emoji:'🌊',url:'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=80&auto=format&fit=crop'},
 {id:'photo-forest',name:'Лес (фото)',emoji:'🌲',url:'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80&auto=format&fit=crop'},
 {id:'photo-night',name:'Ночь (фото)',emoji:'🌙',url:'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80&auto=format&fit=crop'},
 {id:'photo-flowers',name:'Цветы (фото)',emoji:'🌸',url:'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1200&q=80&auto=format&fit=crop'},
 {id:'photo-party',name:'Праздник (фото)',emoji:'🎉',url:'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80&auto=format&fit=crop'},
 {id:'photo-heart',name:'Сердце (фото)',emoji:'❤️',url:'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&q=80&auto=format&fit=crop'},
 {id:'photo-mountains',name:'Горы',emoji:'🏔️',url:'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80&auto=format&fit=crop'},
 {id:'photo-spring',name:'Весна',emoji:'🌷',url:'https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=1200&q=80&auto=format&fit=crop'},
 {id:'photo-autumn',name:'Осень',emoji:'🍁',url:'https://images.unsplash.com/photo-1507371341162-763b5e419408?w=1200&q=80&auto=format&fit=crop'},
 {id:'photo-winter',name:'Зима',emoji:'❄️',url:'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=1200&q=80&auto=format&fit=crop'},
 {id:'photo-sky',name:'Небо',emoji:'☁️',url:'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1200&q=80&auto=format&fit=crop'},
 {id:'photo-birthday',name:'День рождения',emoji:'🎂',url:'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&q=80&auto=format&fit=crop'},
 {id:'photo-coffee',name:'Кофе',emoji:'☕',url:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80&auto=format&fit=crop'},
 {id:'photo-city',name:'Город',emoji:'🌃',url:'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80&auto=format&fit=crop'},
 {id:'photo-pets',name:'Питомцы',emoji:'🐶',url:'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=1200&q=80&auto=format&fit=crop'}
];

const QUOTES=[
 // --- существующие ---
 'С днём рождения! Пусть сбываются мечты',
 'Спасибо тебе за всё!',
 'Улыбайся — это заразно',
 'Каждый день — новый шанс',
 'Счастье начинается с малого',
 'Ты — лучший!',
 'С праздником! Тепла и радости',
 'Верь в себя, и всё получится',
 'Добро всегда возвращается',
 'Пусть этот день будет особенным',
 'Мечтай смело, действуй уверенно',
 'Жизнь прекрасна, когда рядом друзья',
 // --- новые ---
 'Люби, живи, мечтай!',
 'Ты сияешь ярче звёзд ✨',
 'Пусть всё складывается наилучшим образом',
 'От всего сердца — счастья и удачи',
 'Ты делаешь этот мир добрее',
 'Пусть каждый день приносит радость',
 'Свети, вдохновляй, твори!',
 'Здоровья, любви и вдохновения',
 'Новых побед и ярких моментов',
 'Ты на верном пути, продолжай!',
 'Пусть мечты сбываются, а планы сходятся',
 'Обнимаю крепко и желаю тепла',
 'Пусть рядом всегда будут близкие',
 'Смелости и веры в себя',
 'Мир улыбается тебе — улыбнись в ответ',
 'Спасибо, что ты есть',
 'Ты — моя вселенная 🌌',
 'Всё получится, даже если не сразу',
 'Главное — начать, дальше будет легче',
 'Пускай удача держит тебя за руку',
 'Самые тёплые слова — тебе',
 'Успехов, радости, любви и вдохновения',
 'Пусть ангел хранит тебя',
 'Ты способен на большее, чем думаешь',
 'Сегодня — идеальный день для мечты',
 'С любовью и наилучшими пожеланиями',
 'Празднуй жизнь каждый день!',
 'Пусть сбудутся самые смелые мечты'
];

// Шрифты: добавлены новые (Google Fonts), family строкой
const FONTS=[
 {id:'pacifico',name:'Pacifico',family:"'Pacifico', cursive"},
 {id:'caveat',name:'Caveat',family:"'Caveat', cursive"},
 {id:'playfair',name:'Playfair',family:"'Playfair Display', serif"},
 // --- новые ---
 {id:'lobster',name:'Lobster',family:"'Lobster', cursive"},
 {id:'comfortaa',name:'Comfortaa',family:"'Comfortaa', cursive"},
 {id:'marck',name:'Marck Script',family:"'Marck Script', cursive"},
 {id:'badscript',name:'Bad Script',family:"'Bad Script', cursive"},
 {id:'pattaya',name:'Pattaya',family:"'Pattaya', cursive"},
 {id:'cormorant',name:'Cormorant',family:"'Cormorant Garamond', serif"},
 {id:'merriweather',name:'Merriweather',family:"'Merriweather', serif"},
 {id:'montserrat',name:'Montserrat',family:"'Montserrat', sans-serif"},
 {id:'oswald',name:'Oswald',family:"'Oswald', sans-serif"},
 {id:'russo',name:'Russo One',family:"'Russo One', sans-serif"},
 {id:'kelly',name:'Kelly Slab',family:"'Kelly Slab', cursive"}
];

const TEMPLATES=[
 {id:'t1',name:'День рождения',imageId:'party',text:'С днём рождения!',fontId:'pacifico',x:50,y:50},
 {id:'t2',name:'Спасибо',imageId:'flowers',text:'Спасибо тебе за всё!',fontId:'caveat',x:50,y:75},
 {id:'t3',name:'Тёплые слова',imageId:'sunset',text:'Пусть этот день будет особенным',fontId:'playfair',x:50,y:30},
 // --- новые (используют фото и новые шрифты) ---
 {id:'t4',name:'Романтика',imageId:'photo-sunset',text:'Ты — моя вселенная 🌌',fontId:'lobster',x:50,y:70},
 {id:'t6',name:'Просто так',imageId:'photo-flowers',text:'Спасибо, что ты есть',fontId:'marck',x:50,y:75},
 {id:'t7',name:'Вдохновение',imageId:'photo-mountains',text:'Верь в себя, и всё получится',fontId:'montserrat',x:50,y:25},
 {id:'t8',name:'Новогоднее',imageId:'photo-winter',text:'С Новым годом! Тепла и радости',fontId:'pattaya',x:50,y:80}
];

// Динамическая подгрузка Google Fonts, чтобы не менять <head> на всех страницах
(function loadFonts(){
 const families=[
  'Caveat','Pacifico','Playfair+Display',
  'Lobster','Comfortaa','Marck+Script','Bad+Script','Pattaya',
  'Cormorant+Garamond','Merriweather','Montserrat','Oswald',
  'Russo+One','Kelly+Slab'
 ].map(f=>f.replace(/ /g,'+')).join('&family=');
 const href=`https://fonts.googleapis.com/css2?family=${families}&display=swap`;
 if(!document.querySelector(`link[href="${href}"]`)){
  const link=document.createElement('link');
  link.rel='stylesheet';
  link.href=href;
  document.head.appendChild(link);
 }
})();

// ... (остальной код IMAGES, QUOTES, FONTS, TEMPLATES без изменений) ...

const FILTERS = [
 { id: 'original', name: 'Оригинал', preview: 'linear-gradient(45deg, #ff9a9e, #fecfef)', filter: 'none' },
 { id: 'vivid', name: 'Яркий', preview: 'linear-gradient(45deg, #f6d365, #fda085)', filter: 'saturate(1.5) contrast(1.1)' },
 { id: 'vivid-warm', name: 'Яркий тёплый', preview: 'linear-gradient(45deg, #f6d365, #fda085)', filter: 'saturate(1.5) contrast(1.1) sepia(0.2)' },
 { id: 'vivid-cool', name: 'Яркий холодный', preview: 'linear-gradient(45deg, #a1c4fd, #c2e9fb)', filter: 'saturate(1.5) contrast(1.1) hue-rotate(-10deg)' },
 { id: 'dramatic', name: 'Эффектный', preview: 'linear-gradient(45deg, #13547a, #80d0c7)', filter: 'contrast(1.3) brightness(0.9)' },
 { id: 'dramatic-warm', name: 'Эффектный тёплый', preview: 'linear-gradient(45deg, #13547a, #80d0c7)', filter: 'contrast(1.3) brightness(0.9) sepia(0.3)' },
 { id: 'dramatic-cool', name: 'Эффектный холодный', preview: 'linear-gradient(45deg, #13547a, #80d0c7)', filter: 'contrast(1.3) brightness(0.9) hue-rotate(-15deg)' },
 { id: 'bw', name: 'Ч/Б', preview: 'linear-gradient(45deg, #444, #ccc)', filter: 'grayscale(1) contrast(1.1)' }
];

// ... (код загрузки шрифтов loadFonts без изменений) ...