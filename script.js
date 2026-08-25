document.addEventListener('DOMContentLoaded',()=>{
  if(window.lucide) lucide.createIcons();
  const links=[...document.querySelectorAll('.side-nav a,.topbar a')];
  const targets=[...new Set(links.map(a=>a.getAttribute('href')).filter(h=>h&&h.startsWith('#')))].map(h=>document.querySelector(h)).filter(Boolean);
  const setActive=id=>links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+id));
  links.forEach(a=>a.addEventListener('click',e=>{
    const href=a.getAttribute('href');
    if(!href||!href.startsWith('#')) return;
    const target=document.querySelector(href);
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});setActive(target.id);history.replaceState(null,'',href);}
  }));
  const observer=new IntersectionObserver(entries=>{
    const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
    if(visible) setActive(visible.target.id);
  },{rootMargin:'-18% 0px -65% 0px',threshold:[0,.15,.35,.6]});
  targets.forEach(t=>observer.observe(t));
  const toggle=document.getElementById('themeToggle');
  if(toggle) toggle.addEventListener('click',()=>{
    document.body.classList.toggle('light-preview');
    const sw=toggle.querySelector('.switch'); if(sw) sw.classList.toggle('on');
  });
});
