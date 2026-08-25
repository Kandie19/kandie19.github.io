document.addEventListener('DOMContentLoaded', () => {
  const css = `
    /* FINAL EXECUTIVE POLISH */
    html{scroll-padding-top:78px}
    body{overflow-x:hidden}
    .shell{align-items:start}
    .sidebar{position:sticky!important;top:5px!important;height:calc(100vh - 10px)!important;max-height:calc(100vh - 10px)!important;overflow-y:auto!important;overflow-x:hidden!important;display:flex!important;flex-direction:column!important;justify-content:flex-start!important;scrollbar-width:thin;scrollbar-color:#1d6872 #02070c;overscroll-behavior:contain}
    .sidebar::-webkit-scrollbar{width:5px}.sidebar::-webkit-scrollbar-track{background:#02070c}.sidebar::-webkit-scrollbar-thumb{background:#1d6872;border-radius:10px}
    .brand{flex:0 0 auto}.sidebar-spacer{display:none!important}
    .side-nav{flex:0 0 auto}.sidebar-lower{flex:0 0 auto;margin-top:16px!important;padding-bottom:2px!important}
    .theme-toggle{position:relative!important;left:auto!important;right:auto!important;bottom:auto!important;flex:0 0 auto;margin-top:13px!important;margin-bottom:2px!important}

    .brand-mark{width:46px!important;height:46px!important;display:grid!important;place-items:center!important;grid-template-columns:none!important;grid-template-rows:none!important;border-radius:7px;background:rgba(0,230,244,.025);border:1px solid rgba(6,230,244,.18)}
    .brand-mark img{width:40px;height:40px;display:block;object-fit:contain;filter:drop-shadow(0 0 8px rgba(0,230,244,.28))}
    .brand-mark .logo-fallback{font:900 17px/1 Inter,Arial,sans-serif;color:var(--cyan);letter-spacing:-.08em}

    .socials{z-index:20!important;gap:8px!important}
    .socials a{width:29px!important;height:29px!important;border:1px solid rgba(186,214,219,.55)!important;background:rgba(3,12,18,.92)!important;color:#f4f8f9!important;opacity:1!important;box-shadow:0 4px 12px rgba(0,0,0,.3)}
    .socials a svg,.socials .linkedin-mark,.socials .x-mark{color:#f4f8f9!important;fill:none;opacity:1!important}
    .socials a:hover{border-color:var(--cyan)!important;color:var(--cyan)!important;background:rgba(0,230,244,.09)!important}

    /* Replace the oversized decorative AEGIS stack with a contained architecture surface. */
    .aegis-inner{grid-template-columns:42% 58%!important;gap:14px!important;height:182px!important;align-items:stretch!important;overflow:hidden!important}
    .aegis-copy{display:flex;flex-direction:column;justify-content:center;min-width:0}
    .aegis-copy p{max-width:245px!important;margin:0 0 8px!important}
    .aegis-architecture{position:relative;height:148px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px;align-items:stretch;margin:auto 0;min-width:0}
    .aegis-flow{position:absolute;left:10%;right:10%;top:50%;height:1px;background:linear-gradient(90deg,transparent,var(--cyan),transparent);opacity:.55;z-index:0}
    .aegis-node{position:relative;z-index:1;min-width:0;overflow:hidden;border:1px solid rgba(6,230,244,.48);border-radius:7px;background:linear-gradient(160deg,rgba(0,230,244,.09),rgba(2,10,15,.96));padding:11px 8px;display:flex;flex-direction:column;justify-content:center;box-shadow:inset 0 0 18px rgba(0,224,255,.025)}
    .aegis-node:after{content:"";position:absolute;inset:5px;border:1px solid rgba(6,230,244,.08);border-radius:5px;pointer-events:none}
    .aegis-node .node-index{font:700 7px/1 "Space Mono",monospace;color:#78969d;margin-bottom:9px;letter-spacing:.08em}
    .aegis-node strong{font-size:8px;color:var(--cyan);letter-spacing:.03em;white-space:nowrap}
    .aegis-node span:not(.node-index){font-size:6.8px;line-height:1.45;color:#b8c7cb;margin-top:5px}
    .aegis-node.autonomy{border-color:rgba(255,230,0,.5)}.aegis-node.autonomy strong{color:var(--yellow)}

    /* Repository archive: enough breathing room to expose the broader body of work. */
    .repo-archive{margin-top:7px!important}
    .repo-archive-head{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-bottom:10px}
    .repo-archive-head a{color:var(--cyan);font:700 8px "Space Mono",monospace;text-decoration:none;white-space:nowrap}
    .repo-archive-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:7px}
    .repo-card{display:flex;flex-direction:column;justify-content:space-between;min-height:96px;padding:11px 12px;border:1px solid var(--line);border-radius:6px;background:linear-gradient(145deg,rgba(4,13,19,.95),rgba(1,7,11,.98));text-decoration:none;transition:.2s ease}
    .repo-card:hover{border-color:rgba(6,230,244,.65);transform:translateY(-1px);box-shadow:0 0 18px rgba(0,224,255,.06)}
    .repo-card strong{font-size:8.5px;line-height:1.35;color:#edf4f5;overflow-wrap:anywhere}.repo-card span{font-size:7px;line-height:1.4;color:#819298;margin-top:6px}.repo-card em{font:700 6px "Space Mono",monospace;color:var(--cyan);font-style:normal;margin-top:9px}
    .repo-card.private{cursor:default}.repo-card.private:hover{transform:none;border-color:var(--line)}

    .topbar nav{max-width:calc(100% - 150px);overflow-x:auto;scrollbar-width:none}.topbar nav::-webkit-scrollbar{display:none}
    .topbar nav a{flex:0 0 auto}
    .panel{overflow:hidden}
    .impact .map{min-width:0;min-height:0}

    @media(max-width:1200px){.repo-archive-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
    @media(max-width:1050px){.repo-archive-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.aegis-inner{grid-template-columns:45% 55%!important}}
    @media(max-width:760px){
      .sidebar{position:relative!important;top:auto!important;height:auto!important;max-height:none!important;overflow:visible!important}
      .shell{grid-template-columns:1fr}.side-nav{grid-template-columns:1fr 1fr}.sidebar-lower{margin-top:10px!important}
      .repo-archive-grid{grid-template-columns:1fr}.aegis-inner{grid-template-columns:1fr!important;height:auto!important;overflow:visible!important}.aegis-architecture{margin-top:12px;height:126px}.topbar{overflow:hidden}.topbar nav{max-width:100%;padding:0 90px 0 12px}
    }
  `;
  const style = document.createElement('style');
  style.id = 'final-executive-polish';
  style.textContent = css;
  document.head.appendChild(style);

  /* Brand: use the actual portfolio logo, with a guaranteed visual fallback. */
  const brand = document.querySelector('.brand-mark');
  if (brand) {
    brand.innerHTML = '<img src="Kelvin%20Kandie%20LOGO.png" alt="Kelvin Kandie logo"><span class="logo-fallback" aria-hidden="true">KK</span>';
    const logo = brand.querySelector('img');
    const fallback = brand.querySelector('.logo-fallback');
    fallback.style.display = 'none';
    logo.addEventListener('error', () => { logo.style.display = 'none'; fallback.style.display = 'block'; });
  }

  /* AEGIS: keep the architecture inside its dedicated card instead of allowing artwork to escape. */
  const aegisInner = document.querySelector('.aegis-inner');
  if (aegisInner) {
    aegisInner.innerHTML = `
      <div class="aegis-copy">
        <p>AEGIS is the central engineering initiative: an autonomous security platform designed to perceive situations, establish context, assess risk, support decisions, and enable controlled response.</p>
        <a class="mini-btn" href="#cases">EXPLORE AEGIS <span>→</span></a>
      </div>
      <div class="aegis-architecture" aria-label="AEGIS intelligence architecture">
        <div class="aegis-flow" aria-hidden="true"></div>
        <div class="aegis-node"><span class="node-index">01 / INPUT</span><strong>PERCEPTION</strong><span>Detect signals, events and entities.</span></div>
        <div class="aegis-node"><span class="node-index">02 / CONTEXT</span><strong>INTELLIGENCE</strong><span>Correlate evidence and assess risk.</span></div>
        <div class="aegis-node autonomy"><span class="node-index">03 / ACTION</span><strong>AUTONOMY</strong><span>Support controlled response.</span></div>
      </div>`;
  }

  /* Replace the limited repository strip with a real, curated public archive. */
  const techStrip = document.querySelector('#repositories');
  if (techStrip && !document.querySelector('.repo-archive')) {
    const repos = [
      ['aegis-security-platform','Autonomous security intelligence platform','PRIVATE / CORE',true],
      ['aegis-publication','Publication intelligence system','PUBLIC'],
      ['kandie19.github.io','Executive technology portfolio','PUBLIC'],
      ['Taskify_taskmanagement_app','Task management platform','PUBLIC'],
      ['Task_Manager_app','Task management application','PUBLIC'],
      ['AirBnB_clone_v4','Full-stack systems engineering','PUBLIC'],
      ['AirBnB_clone_v2','Backend systems engineering','PUBLIC'],
      ['alx-system_engineering-devops','Systems & DevOps engineering','PUBLIC'],
      ['alx-higher_level_programming','Python & higher-level engineering','PUBLIC'],
      ['alx-low_level_programming','C & low-level systems engineering','PUBLIC'],
      ['alx-react','React engineering work','PUBLIC'],
      ['simple_shell','C systems engineering','PUBLIC'],
      ['binary_trees','Algorithms & data structures','PUBLIC'],
      ['RSA-Factoring-Challenge','Algorithmic engineering','PUBLIC'],
      ['gifts4u','Product engineering project','PUBLIC'],
      ['alx-interview','Engineering interview work','PUBLIC'],
      ['alx-zero_day','Software engineering foundation','PUBLIC'],
      ['alx-pre_course','Engineering foundation','PUBLIC'],
      ['zero_day','Engineering foundation','PUBLIC']
    ];
    const section = document.createElement('section');
    section.className = 'panel repo-archive';
    section.innerHTML = `
      <div class="repo-archive-head">
        <div><div class="panel-title">REPOSITORY ARCHIVE</div><div class="panel-sub">Selected engineering work across systems, AI, software and infrastructure.</div></div>
        <a href="https://github.com/Kandie19?tab=repositories" target="_blank" rel="noopener">VIEW ALL ON GITHUB →</a>
      </div>
      <div class="repo-archive-grid">
        ${repos.map(([name,desc,status,isPrivate]) => isPrivate
          ? `<div class="repo-card private"><strong>${name}</strong><span>${desc}</span><em>${status}</em></div>`
          : `<a class="repo-card" href="https://github.com/Kandie19/${name}" target="_blank" rel="noopener"><strong>${name}</strong><span>${desc}</span><em>${status}</em></a>`
        ).join('')}
      </div>`;
    techStrip.insertAdjacentElement('afterend', section);
  }

  /* Navigation: one source of truth for sidebar + topbar + scrolling state. */
  const allNav = [...document.querySelectorAll('.side-nav a,.topbar nav a')];
  const targets = [...document.querySelectorAll('main section[id],main article[id],main footer[id]')];
  const setActive = id => allNav.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  allNav.forEach(a => a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    const target = href ? document.querySelector(href) : null;
    if (target) {
      e.preventDefault();
      setActive(target.id);
      target.scrollIntoView({behavior:'smooth',block:'start'});
      history.replaceState(null,'',href);
    }
  }));
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
    if (visible) setActive(visible.target.id);
  }, {rootMargin:'-25% 0px -65% 0px',threshold:[0,.15,.35,.6]});
  targets.forEach(section => observer.observe(section));

  const toggle = document.getElementById('themeToggle');
  if (toggle) toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-preview');
    toggle.querySelector('.switch')?.classList.toggle('on');
  });

  if (window.lucide) lucide.createIcons();
  const initial = location.hash ? document.querySelector(location.hash) : document.querySelector('#command');
  if (initial && location.hash) setTimeout(() => initial.scrollIntoView({block:'start'}), 40);
});
