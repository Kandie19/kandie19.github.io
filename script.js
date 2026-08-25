document.addEventListener('DOMContentLoaded', () => {
  const finalCss = 'final.css';
  if (!document.querySelector(`link[href="${finalCss}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = finalCss;
    document.head.appendChild(link);
  }

  const style = document.createElement('style');
  style.id = 'final-command-center-polish';
  style.textContent = `
    .sidebar{position:sticky!important;top:5px!important;height:calc(100vh - 10px)!important;max-height:calc(100vh - 10px)!important;overflow-y:auto!important;overflow-x:hidden!important}
    .sidebar::-webkit-scrollbar{width:5px}.sidebar::-webkit-scrollbar-track{background:#02070c}.sidebar::-webkit-scrollbar-thumb{background:#1d6872;border-radius:10px}
    .sidebar-spacer{display:none!important}.sidebar-lower{margin-top:16px!important}.theme-toggle{position:relative!important;left:auto!important;right:auto!important;bottom:auto!important;margin-top:13px!important}
    .brand-mark{display:grid!important;place-items:center!important;grid-template-columns:none!important;grid-template-rows:none!important;background:rgba(0,230,244,.025)!important;border:1px solid rgba(6,230,244,.18)!important;border-radius:7px!important}
    .brand-mark img{width:40px!important;height:40px!important;display:block!important;object-fit:contain!important;filter:drop-shadow(0 0 8px rgba(0,230,244,.28))}.logo-fallback{font:900 17px/1 Inter,Arial,sans-serif;color:#06e6f4;letter-spacing:-.08em}
    .socials{z-index:20!important;gap:8px!important}.socials a{width:29px!important;height:29px!important;border:1px solid rgba(186,214,219,.55)!important;background:rgba(3,12,18,.92)!important;color:#f4f8f9!important;opacity:1!important;box-shadow:0 4px 12px rgba(0,0,0,.3)}
    .socials a img{width:15px!important;height:15px!important;display:block!important;object-fit:contain}.socials a:hover{border-color:#06e6f4!important;color:#06e6f4!important;background:rgba(0,230,244,.09)!important}
    .panel{overflow:hidden}
    /* AEGIS: all three stages must remain inside the card and all copy must remain readable. */
    .aegis-inner{width:100%!important;max-width:100%!important;height:auto!important;min-height:176px!important;display:grid!important;grid-template-columns:minmax(0,39fr) minmax(0,61fr)!important;gap:12px!important;align-items:stretch!important;overflow:visible!important}
    .aegis-copy{min-width:0!important;max-width:100%!important;overflow:visible!important;display:flex!important;flex-direction:column!important;justify-content:center!important}.aegis-copy p{max-width:100%!important;overflow-wrap:anywhere!important;margin:0 0 9px!important}
    .aegis-architecture{position:relative!important;width:100%!important;min-width:0!important;max-width:100%!important;height:auto!important;min-height:158px!important;display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:8px!important;align-items:stretch!important;overflow:visible!important;margin:auto 0!important}
    .aegis-flow{left:4%!important;right:4%!important;top:50%!important}.aegis-node{min-width:0!important;width:100%!important;max-width:100%!important;min-height:148px!important;height:auto!important;overflow:hidden!important;padding:11px 9px!important;justify-content:flex-start!important}
    .aegis-node .node-index{white-space:normal!important;overflow-wrap:anywhere!important;flex:0 0 auto!important}.aegis-node strong{display:block!important;max-width:100%!important;white-space:normal!important;overflow-wrap:anywhere!important;word-break:normal!important;line-height:1.15!important;font-size:clamp(7px,.62vw,10px)!important;letter-spacing:.015em!important}
    .aegis-node span:not(.node-index){display:block!important;max-width:100%!important;white-space:normal!important;overflow-wrap:anywhere!important;line-height:1.45!important}.aegis-card .aegis-inner .aegis-node strong{white-space:normal!important}
    .repo-archive{margin-top:7px!important}.repo-archive-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px}.repo-card{min-width:0}.repo-card strong,.repo-card span{overflow-wrap:anywhere}
    .topbar nav{max-width:calc(100% - 150px);overflow-x:auto;scrollbar-width:none}.topbar nav::-webkit-scrollbar{display:none}.topbar nav a{flex:0 0 auto}
    @media(max-width:1200px){.repo-archive-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
    @media(max-width:1050px){.aegis-inner{grid-template-columns:minmax(0,38fr) minmax(0,62fr)!important;gap:10px!important}.repo-archive-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.aegis-node{padding:10px 8px!important}.aegis-node strong{font-size:7.5px!important}}
    @media(max-width:760px){.sidebar{position:relative!important;top:auto!important;height:auto!important;max-height:none!important;overflow:visible!important}.aegis-inner{grid-template-columns:1fr!important;min-height:0!important}.aegis-architecture{grid-template-columns:1fr!important;min-height:0!important}.aegis-node{min-height:100px!important}.aegis-flow{display:none!important}.repo-archive-grid{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);

  const icon = slug => `https://cdn.simpleicons.org/${slug}/FFFFFF`;

  const brand = document.querySelector('.brand-mark');
  if (brand) {
    brand.innerHTML = '<img src="Kelvin%20Kandie%20LOGO.png" alt="Kelvin Kandie logo"><span class="logo-fallback" aria-hidden="true">KK</span>';
    const logo = brand.querySelector('img');
    const fallback = brand.querySelector('.logo-fallback');
    fallback.style.display = 'none';
    logo.addEventListener('error', () => { logo.style.display = 'none'; fallback.style.display = 'block'; });
  }

  const socials = document.querySelector('.socials');
  if (socials) {
    const links = [
      ['https://github.com/Kandie19','github','GitHub'],
      ['https://www.linkedin.com/in/kelvin-kandie/','linkedin','LinkedIn'],
      ['https://x.com/kandiemasasabi','x','X'],
      ['https://www.instagram.com/kandie_masasabi/?hl=en','instagram','Instagram']
    ];
    socials.innerHTML = links.map(([href,slug,label]) => `<a href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label}" title="${label}"><img src="${icon(slug)}" alt="${label} icon"></a>`).join('');
  }

  const aegisInner = document.querySelector('.aegis-inner');
  if (aegisInner) {
    aegisInner.innerHTML = `
      <div class="aegis-copy">
        <p>AEGIS is the central engineering initiative: an autonomous security platform designed to perceive situations, establish context, assess risk, support decisions, and enable controlled response.</p>
        <a class="mini-btn" href="#repository-evidence">EXPLORE AEGIS <span>→</span></a>
      </div>
      <div class="aegis-architecture" aria-label="AEGIS intelligence architecture">
        <div class="aegis-flow" aria-hidden="true"></div>
        <div class="aegis-node"><span class="node-index">01 / INPUT</span><strong>PERCEPTION</strong><span>Detect signals, events and entities.</span></div>
        <div class="aegis-node"><span class="node-index">02 / CONTEXT</span><strong>INTELLIGENCE</strong><span>Correlate evidence and assess risk.</span></div>
        <div class="aegis-node autonomy"><span class="node-index">03 / ACTION</span><strong>AUTONOMY</strong><span>Support controlled response.</span></div>
      </div>`;
  }

  const techStrip = document.querySelector('#repositories');
  if (techStrip) {
    const technologies = [['amazonaws','AWS'],['kubernetes','Kubernetes'],['terraform','Terraform'],['postgresql','PostgreSQL'],['redis','Redis'],['python','Python'],['typescript','TypeScript'],['nodedotjs','Node.js'],['react','React'],['go','Go'],['docker','Docker'],['cplusplus','C++']];
    let strip = techStrip.querySelector('.tech-names');
    if (!strip) { strip = document.createElement('div'); strip.className = 'tech-names'; techStrip.appendChild(strip); }
    strip.innerHTML = technologies.map(([slug,name]) => `<a class="tech-item" href="https://simpleicons.org/?q=${encodeURIComponent(name)}" target="_blank" rel="noopener noreferrer" title="${name}"><img src="${icon(slug)}" alt="${name}"><span>${name}</span></a>`).join('');
  }

  if (!document.querySelector('.repo-archive')) {
    const anchor = document.querySelector('#repositories');
    if (anchor) {
      const repos = [
        ['aegis-security-platform','Autonomous security intelligence platform','PRIVATE / CORE',true],['aegis-publication-library','Publication intelligence system','PUBLIC'],['kandie19.github.io','Executive technology portfolio','PUBLIC'],['Taskify_taskmanagement_app','Task management platform','PUBLIC'],['Task_Manager_app','Task management application','PUBLIC'],['AirBnB_clone_v4','Full-stack systems engineering','PUBLIC'],['AirBnB_clone_v2','Backend systems engineering','PUBLIC'],['alx-system_engineering-devops','Systems & DevOps engineering','PUBLIC'],['alx-higher_level_programming','Python & higher-level engineering','PUBLIC'],['alx-low_level_programming','C & low-level systems engineering','PUBLIC'],['alx-react','React engineering work','PUBLIC'],['simple_shell','C systems engineering','PUBLIC'],['binary_trees','Algorithms & data structures','PUBLIC'],['RSA-Factoring-Challenge','Algorithmic engineering','PUBLIC'],['gifts4u','Product engineering project','PUBLIC'],['alx-interview','Engineering interview work','PUBLIC'],['alx-zero_day','Software engineering foundation','PUBLIC'],['alx-pre_course','Engineering foundation','PUBLIC']
      ];
      const section = document.createElement('section');
      section.className='panel repo-archive'; section.id='repository-evidence';
      section.innerHTML=`<div class="repo-archive-head"><div><div class="panel-title">REPOSITORY EVIDENCE</div><div class="panel-sub">Selected engineering work across systems, AI, software and infrastructure.</div></div><a href="https://github.com/Kandie19?tab=repositories" target="_blank" rel="noopener noreferrer">VIEW ALL ON GITHUB →</a></div><div class="repo-controls" role="toolbar" aria-label="Repository filters"><button class="repo-filter active" data-filter="all">ALL</button><button class="repo-filter" data-filter="public">PUBLIC</button><button class="repo-filter" data-filter="core">CORE / PRIVATE</button><span class="repo-count" aria-live="polite"></span></div><div class="repo-archive-grid">${repos.map(([name,desc,status,isPrivate])=>isPrivate?`<div class="repo-card private" data-kind="core"><div class="repo-top"><span class="repo-mark">AE</span><em>${status}</em></div><strong>${name}</strong><span>${desc}</span></div>`:`<a class="repo-card" data-kind="public" href="https://github.com/Kandie19/${name}" target="_blank" rel="noopener noreferrer"><div class="repo-top"><span class="repo-mark">GH</span><em>${status}</em></div><strong>${name}</strong><span>${desc}</span><i aria-hidden="true">↗</i></a>`).join('')}</div>`;
      anchor.insertAdjacentElement('afterend',section);
      const filters=[...section.querySelectorAll('.repo-filter')],cards=[...section.querySelectorAll('.repo-card')],count=section.querySelector('.repo-count');
      const applyFilter=filter=>{cards.forEach(card=>{card.hidden=!(filter==='all'||card.dataset.kind===filter)});filters.forEach(button=>button.classList.toggle('active',button.dataset.filter===filter));if(count)count.textContent=`${cards.filter(card=>!card.hidden).length} EVIDENCE ITEMS`};
      filters.forEach(button=>button.addEventListener('click',()=>applyFilter(button.dataset.filter))); applyFilter('all');
    }
  }

  const heroVisual=document.querySelector('.hero-visual');
  if(heroVisual&&!heroVisual.querySelector('.globe-orbit')){
    const orbit=document.createElement('div'); orbit.className='globe-orbit'; orbit.setAttribute('aria-hidden','true'); orbit.innerHTML='<span></span><span></span><span></span>'; heroVisual.appendChild(orbit);
  }

  const allNav=[...document.querySelectorAll('.side-nav a,.topbar nav a')];
  const setActive=id=>allNav.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${id}`));
  allNav.forEach(a=>a.addEventListener('click',e=>{const href=a.getAttribute('href'),target=href?document.querySelector(href):null;if(target){e.preventDefault();setActive(target.id);target.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'',href)}}));
  if('IntersectionObserver' in window){const targets=[...document.querySelectorAll('main section[id],main article[id],main footer[id]')];const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible)setActive(visible.target.id)},{rootMargin:'-24% 0px -64% 0px',threshold:[0,.15,.35,.6]});targets.forEach(section=>observer.observe(section))}

  const toggle=document.getElementById('themeToggle');
  if(toggle)toggle.addEventListener('click',()=>{document.body.classList.toggle('light-preview');toggle.querySelector('.switch')?.classList.toggle('on')});
  if(window.lucide)window.lucide.createIcons();
});
