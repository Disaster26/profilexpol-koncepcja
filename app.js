(function(){
  var top=document.getElementById('top'),bg=document.getElementById('burger');
  function sc(){top.classList.toggle('sc',window.scrollY>8)}
  window.addEventListener('scroll',sc,{passive:true});sc();
  bg.addEventListener('click',function(){var o=top.classList.toggle('open');bg.setAttribute('aria-expanded',o);bg.setAttribute('aria-label',o?'Zamknij menu':'Otwórz menu')});
  document.querySelectorAll('.menu a').forEach(function(a){a.addEventListener('click',function(){top.classList.remove('open');bg.setAttribute('aria-expanded','false')})});
  // aktywna pozycja menu
  var links=[].slice.call(document.querySelectorAll('.menu a[href^="#"]'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){links.forEach(function(l){l.classList.toggle('on',l.getAttribute('href')==='#'+e.target.id)})}})},{rootMargin:'-45% 0px -50% 0px'});
    links.forEach(function(l){var t=document.querySelector(l.getAttribute('href'));if(t)io.observe(t)});
  }
  // karty: przeciaganie mysza + strzalki
  var tor=document.getElementById('tor');
  if(tor){
    var down=false,sx=0,sl=0,moved=false;
    tor.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=tor.scrollLeft});
    window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;tor.classList.add('drag')}tor.scrollLeft=sl-dx});
    window.addEventListener('pointerup',function(){if(!down)return;down=false;if(moved){var w=tor.querySelector('.karta').getBoundingClientRect().width+24;var t=Math.round(tor.scrollLeft/w)*w;tor.classList.remove('drag');tor.scrollTo({left:t,behavior:'smooth'})}else tor.classList.remove('drag')});
    tor.addEventListener('dragstart',function(e){e.preventDefault()});
    document.querySelectorAll('.nav button').forEach(function(b){b.addEventListener('click',function(){var w=tor.querySelector('.karta').getBoundingClientRect().width+24;tor.scrollBy({left:w*(+b.dataset.k),behavior:'smooth'})})});
  }
  // mapa przy przewinieciu
  var m=document.getElementById('mapa');
  function load(){if(m.dataset.ok)return;m.dataset.ok=1;var f=document.createElement('iframe');f.src=m.dataset.src;f.title='Mapa dojazdu - ul. Władysława Łokietka 5, Szczecin';f.loading='lazy';f.referrerPolicy='no-referrer-when-downgrade';m.appendChild(f)}
  if(m){if('IntersectionObserver' in window){var mo=new IntersectionObserver(function(es){if(es[0].isIntersecting){load();mo.disconnect()}},{rootMargin:'300px'});mo.observe(m)}else load()}
})();
(function(){var f=document.getElementById('form'),m=document.getElementById('msg');if(f)f.addEventListener('submit',function(e){e.preventDefault();m.hidden=false})})();
