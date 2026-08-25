document.addEventListener('DOMContentLoaded', () => {
  const FINAL_CSS = 'final.css';
  if (!document.querySelector(`link[href="${FINAL_CSS}"]`)) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FINAL_CSS;
    document.head.appendChild(link);
  }

  const microStyle = document.createElement('style');
  microStyle.textContent = `
    .repo-controls{display:flex;align-items:center;gap:6px;margin:-2px 0 8px}
    .repo-filter{appearance:none;border:1px solid #29404a;background:#071219;color:#8ea2a9;border-radius:999px;padding:5px 8px;font:700 6px/1 "Space Mono",monospace;letter-spacing:.05em;cursor:pointer;transition:.18s ease}
    .repo-filter:hover,.repo-filter.active{color:#02070b;background:#00f5ea;border-color:#00f5ea;box-shadow:0 0 12px rgba(0,245,234,.12)}
    .repo-count{margin-left:auto;color:#6e858d;font:700 6px "Space Mono",monospace;letter-spacing:.06em}
    .repo-card[hidden]{display:none}
    .repo-top{display:flex;align-items:center;justify-content:space-between;gap:6px;position:relative;z-index:1}
    .repo-mark{width:20px;height:20px;border:1px solid rgba(0,245,234,.32);border-radius:5px;display:grid;place-items:center;color:#00f5ea;font:900 6px Inter,Arial,sans-serif;background:rgba(0,245,234,.045)}
    .repo-card.private .repo-mark{color:#ffe600;border-color:rgba(255,230,0,.35);background:rgba(255,230,0,.035)}
    .repo-card i{position:absolute;right:8px;bottom:7px;color:#00f5ea;font-style:normal;font-size:11px;opacity:.75;transition:.18s ease}
    .repo-card:hover i{transform:translate(2px,-2px);opacity:1}
    .globe-orbit{position:absolute;z-index:3;right:-10%;top:3%;width:78%;height:91%;border:1px solid rgba(0,245,234,.18);border-radius:50%;transform:rotate(-13deg);pointer-events:none;box-shadow:0 0 22px rgba(0,190,255,.05)}
    .globe-orbit:before,.globe-orbit:after{content:"";position:absolute;inset:11% -5%;border:1px solid rgba(0,245,234,.12);border-radius:50%;transform:rotate(24deg)}
    .globe-orbit:after{inset:23% -10%;transform:rotate(-36deg);border-color:rgba(0,190,255,.1)}
    .globe-orbit span{position:absolute;width:5px;height:5px;border-radius:50%;background:#00f5ea;box-shadow:0 0 10px #00f5ea}
    .globe-orbit span:nth-child(1){left:15%;top:20%}.globe-orbit span:nth-child(2){right:12%;top:42%;background:#19e6a0;box-shadow:0 0 10px #19e6a0}.globe-orbit span:nth-child(3){left:35%;bottom:8%;background:#ffe600;box-shadow:0 0 10px #ffe600}
    @media(max-width:760px){.repo-controls{overflow-x:auto;padding-bottom:2px}.repo-count{display:none}.globe-orbit{width:105%;right:-25%;height:95%}}
  `;
  document.head.appendChild(microStyle);

  const icon = (slug) => `https://cdn.simpleicons.org/${slug}/FFFFFF`;

  /* ------------------------------------------------------------------
     BRAND + SOCIALS
     ------------------------------------------------------------------ */
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
      ['https://github.com/Kandie19', 'github', 'GitHub'],
      ['https://www.linkedin.com/in/kelvin-kandie/', 'linkedin', 'LinkedIn'],
      ['https://x.com/kandiemasasabi', 'x', 'X'],
      ['https://www.instagram.com/kandie_masasabi/?hl=en', 'instagram', 'Instagram']
    ];
    socials.innerHTML = links.map(([href, slug, label]) => `
      <a href="${href}" target="_blank" rel="noopener noreferrer" aria-label="${label}" title="${label}">
        <img src="${icon(slug)}" alt="${label} icon">
      </a>`).join('');
  }

  /* ------------------------------------------------------------------
     AEGIS ARCHITECTURE
     ------------------------------------------------------------------ */
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

  /* ------------------------------------------------------------------
     TECHNOLOGIES — recognizable brand marks rather than text substitutes
     ------------------------------------------------------------------ */
  const techStrip = document.querySelector('#repositories');
  if (techStrip) {
    const technologies = [
      ['amazonaws', 'AWS'], ['kubernetes', 'Kubernetes'], ['terraform', 'Terraform'],
      ['postgresql', 'PostgreSQL'], ['redis', 'Redis'], ['python', 'Python'],
      ['typescript', 'TypeScript'], ['nodedotjs', 'Node.js'], ['react', 'React'],
      ['go', 'Go'], ['docker', 'Docker'], ['cplusplus', 'C++']
    ];
    const label = techStrip.querySelector('.tech-label');
    const strip = techStrip.querySelector('.tech-names') || document.createElement('div');
    strip.className = 'tech-names';
    strip.innerHTML = technologies.map(([slug, name]) => `
      <a class="tech-item" href="https://simpleicons.org/?q=${encodeURIComponent(name)}" target="_blank" rel="noopener noreferrer" title="${name}">
        <img src="${icon(slug)}" alt="${name}">
        <span>${name}</span>
      </a>`).join('');
    if (!strip.parentElement) techStrip.appendChild(strip);
    if (label) label.textContent = 'TECHNOLOGIES & TOOLS';
  }

  /* ------------------------------------------------------------------
     REPOSITORY EVIDENCE WALL — clickable, filterable, deliberately prominent
     ------------------------------------------------------------------ */
  if (!document.querySelector('.repo-archive')) {
    const anchor = document.querySelector('#repositories');
    if (anchor) {
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
        ['alx-pre_course','Engineering foundation','PUBLIC']
      ];

      const section = document.createElement('section');
      section.className = 'panel repo-archive';
      section.id = 'repository-evidence';
      section.innerHTML = `
        <div class="repo-archive-head">
          <div><div class="panel-title">REPOSITORY EVIDENCE</div><div class="panel-sub">Selected engineering work across systems, AI, software and infrastructure.</div></div>
          <a href="https://github.com/Kandie19?tab=repositories" target="_blank" rel="noopener noreferrer">VIEW ALL ON GITHUB →</a>
        </div>
        <div class="repo-controls" role="toolbar" aria-label="Repository filters">
          <button class="repo-filter active" data-filter="all">ALL</button>
          <button class="repo-filter" data-filter="public">PUBLIC</button>
          <button class="repo-filter" data-filter="core">CORE / PRIVATE</button>
          <span class="repo-count" aria-live="polite"></span>
        </div>
        <div class="repo-archive-grid">
          ${repos.map(([name, desc, status, isPrivate]) => isPrivate
            ? `<div class="repo-card private" data-kind="core"><div class="repo-top"><span class="repo-mark">AE</span><em>${status}</em></div><strong>${name}</strong><span>${desc}</span></div>`
            : `<a class="repo-card" data-kind="public" href="https://github.com/Kandie19/${name}" target="_blank" rel="noopener noreferrer"><div class="repo-top"><span class="repo-mark">GH</span><em>${status}</em></div><strong>${name}</strong><span>${desc}</span><i aria-hidden="true">↗</i></a>`
          ).join('')}
        </div>`;
      anchor.insertAdjacentElement('afterend', section);

      const filters = [...section.querySelectorAll('.repo-filter')];
      const cards = [...section.querySelectorAll('.repo-card')];
      const count = section.querySelector('.repo-count');
      const applyFilter = filter => {
        cards.forEach(card => { card.hidden = !(filter === 'all' || card.dataset.kind === filter); });
        filters.forEach(button => button.classList.toggle('active', button.dataset.filter === filter));
        const visible = cards.filter(card => !card.hidden).length;
        if (count) count.textContent = `${visible} EVIDENCE ITEMS`;
      };
      filters.forEach(button => button.addEventListener('click', () => applyFilter(button.dataset.filter)));
      applyFilter('all');
    }
  }

  /* ------------------------------------------------------------------
     HERO MAP / GLOBE
     ------------------------------------------------------------------ */
  const worldMap = document.querySelector('.world-map');
  if (worldMap) {
    worldMap.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    worldMap.setAttribute('aria-label', 'Global systems map');
    worldMap.querySelectorAll('circle').forEach((node, index) => node.setAttribute('r', index % 2 === 0 ? '5' : '3'));
  }
  const heroVisual = document.querySelector('.hero-visual');
  if (heroVisual && !heroVisual.querySelector('.globe-orbit')) {
    const orbit = document.createElement('div');
    orbit.className = 'globe-orbit';
    orbit.setAttribute('aria-hidden', 'true');
    orbit.innerHTML = '<span></span><span></span><span></span>';
    heroVisual.appendChild(orbit);
  }

  /* ------------------------------------------------------------------
     NAVIGATION + INTERSECTION STATE
     ------------------------------------------------------------------ */
  const allNav = [...document.querySelectorAll('.side-nav a,.topbar nav a')];
  const targets = [...document.querySelectorAll('main section[id],main article[id],main footer[id]')];
  const setActive = id => allNav.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
  allNav.forEach(a => a.addEventListener('click', e => {
    const href = a.getAttribute('href');
    const target = href ? document.querySelector(href) : null;
    if (!target) return;
    e.preventDefault(); setActive(target.id); target.scrollIntoView({behavior:'smooth',block:'start'}); history.replaceState(null,'',href);
  }));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio-a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, {rootMargin:'-24% 0px -64% 0px',threshold:[0,.15,.35,.6]});
    targets.forEach(section => observer.observe(section));
  }

  const toggle = document.getElementById('themeToggle');
  if (toggle) toggle.addEventListener('click', () => {
    document.body.classList.toggle('light-preview');
    toggle.querySelector('.switch')?.classList.toggle('on');
  });

  document.querySelectorAll('.footer').forEach(footer => {
    if (/©\s*\d{4}/.test(footer.textContent || '')) footer.innerHTML = footer.innerHTML.replace(/©\s*\d{4}/, `© ${new Date().getFullYear()}`);
  });

  if (window.lucide) window.lucide.createIcons();
  const initial = location.hash ? document.querySelector(location.hash) : null;
  if (initial) setTimeout(() => initial.scrollIntoView({block:'start'}), 60);
});
