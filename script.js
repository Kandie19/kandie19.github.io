document.addEventListener('DOMContentLoaded',()=>{
  if(window.lucide) lucide.createIcons();

  const toggle=document.getElementById('themeToggle');
  if(toggle){
    toggle.addEventListener('click',()=>{
      document.body.classList.toggle('light-preview');
      toggle.querySelector('.switch')?.classList.toggle('on');
    });
  }

  const allNav=[...document.querySelectorAll('.side-nav a,.topbar nav a')];
  const targets=[...document.querySelectorAll('main section[id],main article[id],main footer[id]')];
  const setActive=(id)=>allNav.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${id}`));

  allNav.forEach(a=>a.addEventListener('click',e=>{
    const href=a.getAttribute('href');
    const target=href ? document.querySelector(href) : null;
    if(target){
      e.preventDefault();
      setActive(target.id);
      target.scrollIntoView({behavior:'smooth',block:'start'});
      history.replaceState(null,'',href);
    }
  }));

  const observer=new IntersectionObserver(entries=>{
    const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(visible) setActive(visible.target.id);
  },{rootMargin:'-28% 0px -62% 0px',threshold:[0,.15,.35,.6]});
  targets.forEach(section=>observer.observe(section));

  const initial=location.hash ? document.querySelector(location.hash) : document.querySelector('#command');
  if(initial) setTimeout(()=>initial.scrollIntoView({block:'start'}),40);
});
