document.addEventListener('DOMContentLoaded', () => {
  const css = `
    .sidebar{overflow-y:auto!important;overflow-x:hidden!important;scrollbar-width:thin;scrollbar-color:#1d6872 #02070c}
    .sidebar::-webkit-scrollbar{width:5px}.sidebar::-webkit-scrollbar-track{background:#02070c}.sidebar::-webkit-scrollbar-thumb{background:#1d6872;border-radius:10px}
    .sidebar-spacer{flex:0 0 8px!important;min-height:8px!important}
    .brand-mark{width:46px!important;height:46px!important;display:grid!important;place-items:center!important;grid-template-columns:none!important;grid-template-rows:none!important}
    .brand-mark img{width:46px;height:46px;display:block;object-fit:contain;filter:drop-shadow(0 0 7px rgba(0,230,244,.22))}
    .socials a{background:rgba(7,19,25,.9)!important;border-color:rgba(170,205,211,.52)!important;color:#f1f7f8!important;opacity:1!important;box-shadow:0 0 10px rgba(0,0,0,.18)}
    .socials a svg,.socials .linkedin-mark,.socials .x-mark{color:#f1f7f8!important;opacity:1!important}
    .socials a:hover{border-color:var(--cyan)!important;color:var(--cyan)!important;background:rgba(0,230,244,.08)!important}
    .aegis-inner{grid-template-columns:43% 57%!important;height:182px!important;gap:14px!important;overflow:hidden!important}
    .aegis-copy{min-width:0}.aegis-copy p{max-width:250px}
    .aegis-architecture{height:148px;display:grid;grid-template-columns:repeat(3,1fr);gap:8px;align-items:stretch;position:relative}
    .aegis-node{position:relative;border:1px solid rgba(6,230,244,.48);border-radius:7px;background:linear-gradient(160deg,rgba(0,230,244,.09),rgba(2,10,15,.92));padding:13px 8px 10px;display:flex;flex-direction:column;justify-content:center;min-width:0;overflow:hidden}
    .aegis-node:after{content:"";position:absolute;inset:6px;border:1px solid rgba(6,230,244,.08);border-radius:5px;pointer-events:none}
    .aegis-node .node-index{font:700 7px/1 "Space Mono",monospace;color:#78969d;margin-bottom:10px;letter-spacing:.08em}
    .aegis-node strong{font-size:9px;color:var(--cyan);letter-spacing:.03em}.aegis-node span{font-size:7px;line-height:1.45;color:#b8c7cb;margin-top:5px}
    .aegis-node.autonomy{border-color:rgba(255,230,0,.48)}.aegis-node.autonomy strong{color:var(--yellow)}
    .aegis-flow{position:absolute;left:32%;right:32%;top:50%;height:1px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);opacity:.5;z-index:0}
    .repo-archive{margin-top:7px}.repo-archive-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:10px}.repo-archive-head a{color:var(--cyan);font:700 8px "Space Mono",monospace;text-decoration:none;white-space:nowrap}
    .repo-archive-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
    .repo-card{display:flex;flex-direction:column;justify-content:space-between;min-height:92px;padding:11px 12px;border:1px solid var(--line);border-radius:6px;background:linear-gradient(145deg,rgba(4,13,19,.95),rgba(1,7,11,.98));text-decoration:none;transition:.2s ease}
    .repo-card:hover{border-color:rgba(6,230,244,.65);transform:translateY(-1px);box-shadow:0 0 18px rgba(0,224,255,.05)}
    .repo-card strong{font-size:9px;line-height:1.3;color:#edf4f5}.repo-card span{font-size:7px;line-height:1.4;color:#819298;margin-top:6px}.repo-card em{font:700 6px "Space Mono",monospace;color:var(--cyan);font-style:normal;margin-top:9px}
    @media(max-width:1050px){.repo-archive-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.aegis-inner{grid-template-columns:46% 54%!important}}
    @media(max-width:700px){.repo-archive-grid{grid-template-columns:1fr}.aegis-inner{grid-template-columns:1fr!important;height:auto!important}.aegis-architecture{margin-top:12px;height:130px}.sidebar{position:relative;top:auto;height:auto;max-height:none}.shell{grid-template-columns:1fr}.side-nav{grid-template-columns:1fr 1fr}.sidebar-lower{margin-top:10px}}
  `;
  const style=document.createElement('style'); style.id='command-center-v2'; style.textContent=css; document.head.appendChild(style);

  const brand=document.querySelector('.brand-mark');
  if(brand) brand.innerHTML='<img src="Kelvin%20Kandie%20LOGO.png" alt="Kelvin Kandie logo">';

  const aegisInner=document.querySelector('.aegis-inner');
  if(aegisInner){
    aegisInner.innerHTML=`<div class="aegis-copy"><p>AEGIS is the central engineering initiative: an autonomous security platform designed to perceive situations, establish context, assess risk, support decisions, and enable controlled response.</p><a class="mini-btn" href="#cases">EXPLORE AEGIS <span>→</span></a></div><div class="aegis-architecture" aria-label="AEGIS intelligence pipeline"><div class="aegis-flow"></div><div class="aegis-node"><span class="node-index">01</span><strong>PERCEPTION</strong><span>See everything. Detect signals, events and entities.</span></div><div class="aegis-node"><span class="node-index">02</span><strong>INTELLIGENCE</strong><span>Establish context, correlate evidence and assess risk.</span></div><div class="aegis-node autonomy"><span class="node-index">03</span><strong>AUTONOMY</strong><span>Support controlled, accountable response.</span></div></div>`;
  }

  const techStrip=document.querySelector('#repositories');
  if(techStrip&&!document.querySelector('.repo-archive')){
    const repos=[['aegis-security-platform','AI security platform','PRIVATE / CORE'],['aegis-publication','Publication intelligence','PUBLIC'],['kandie19.github.io','Executive portfolio','PUBLIC'],['Taskify_taskmanagement_app','Task management platform','PUBLIC'],['Task_Manager_app','Task management application','PUBLIC'],['AirBnB_clone_v4','Full-stack systems project','PUBLIC'],['AirBnB_clone_v2','Backend systems project','PUBLIC'],['alx-system_engineering-devops','Systems & DevOps engineering','PUBLIC'],['alx-higher_level_programming','Higher-level programming','PUBLIC'],['alx-low_level_programming','Low-level programming','PUBLIC'],['alx-react','React engineering work','PUBLIC'],['simple_shell','C systems engineering','PUBLIC'],['binary_trees','Algorithms & data structures','PUBLIC'],['RSA-Factoring-Challenge','Algorithmic engineering','PUBLIC'],['gifts4u','Product engineering project','PUBLIC'],['alx-interview','Interview preparation','PUBLIC'],['alx-zero_day','Software engineering foundation','PUBLIC'],['alx-pre_course','Engineering foundation','PUBLIC'],['zero_day','Engineering foundation','PUBLIC']];
    const section=document.createElement('section'); section.className='panel repo-archive';
    section.innerHTML=`<div class="repo-archive-head"><div><div class="panel-title">REPOSITORY ARCHIVE</div><div class="panel-sub">Selected engineering work across systems, AI, software and infrastructure.</div></div><a href="https://github.com/Kandie19?tab=repositories" target="_blank" rel="noopener">VIEW ALL ON GITHUB →</a></div><div class="repo-archive-grid">${repos.map(([name,desc,status])=>`<a class="repo-card" href="https://github.com/Kandie19/${name}" target="_blank" rel="noopener"><strong>${name}</strong><span>${desc}</span><em>${status}</em></a>`).join('')}</div>`;
    techStrip.insertAdjacentElement('afterend',section);
  }

  const allNav=[...document.querySelectorAll('.side-nav a,.topbar nav a')];
  const targets=[...document.querySelectorAll('main section[id],main article[id],main footer[id]')];
  const setActive=id=>allNav.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${id}`));
  allNav.forEach(a=>a.addEventListener('click',e=>{const href=a.getAttribute('href');const target=href?document.querySelector(href):null;if(target){e.preventDefault();setActive(target.id);target.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'',href);}}));
  const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible)setActive(visible.target.id);},{rootMargin:'-28% 0px -62% 0px',threshold:[0,.15,.35,.6]});
  targets.forEach(section=>observer.observe(section));
  const toggle=document.getElementById('themeToggle'); if(toggle) toggle.addEventListener('click',()=>{document.body.classList.toggle('light-preview');toggle.querySelector('.switch')?.classList.toggle('on');});
  if(window.lucide) lucide.createIcons();
  const initial=location.hash?document.querySelector(location.hash):document.querySelector('#command'); if(initial)setTimeout(()=>initial.scrollIntoView({block:'start'}),40);
});
