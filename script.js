document.addEventListener('DOMContentLoaded',()=>{
  if(window.lucide) lucide.createIcons();
  const pageRoutes={
    '#overview':'overview.html',
    '#aegis':'aegis.html',
    '#architecture':'architecture.html',
    '#engineering':'engineering.html',
    '#repositories':'repositories.html',
    '#dossier':'dossier.html',
    '#contact':'contact.html'
  };
  document.querySelectorAll('.side-nav a').forEach(link=>{
    const href=link.getAttribute('href');
    if(pageRoutes[href]){
      link.addEventListener('click',e=>{
        e.preventDefault();
        window.location.href=pageRoutes[href];
      });
    }
  });
  document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{
    const href=a.getAttribute('href');
    if(pageRoutes[href] && a.closest('.side-nav')) return;
    const target=document.querySelector(href);
    if(target){e.preventDefault();target.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'',href);}
  }));
  const toggle=document.getElementById('themeToggle');
  if(toggle)toggle.addEventListener('click',()=>{
    document.body.classList.toggle('light-preview');
    const sw=toggle.querySelector('.switch');if(sw)sw.classList.toggle('on');
  });
  if(document.querySelector('.impact')){
    const fix=document.createElement('link');
    fix.rel='stylesheet';fix.href='impact-fix.css';
    document.head.appendChild(fix);
  }
});
