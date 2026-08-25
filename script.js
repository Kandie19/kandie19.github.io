document.addEventListener('DOMContentLoaded',()=>{
  if(window.lucide) lucide.createIcons();
  const toggle=document.getElementById('themeToggle');
  if(toggle) toggle.addEventListener('click',()=>{document.body.classList.toggle('light-preview');toggle.querySelector('.switch')?.classList.toggle('on');});
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
    const el=document.querySelector(a.getAttribute('href'));
    if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'start'});}
  }));
  const sections=[...document.querySelectorAll('main section[id],main article[id]')];
  const navLinks=[...document.querySelectorAll('.topbar nav a,.side-nav a')];
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting) navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));
  }),{rootMargin:'-35% 0px -55% 0px',threshold:0});
  sections.forEach(s=>observer.observe(s));
});
