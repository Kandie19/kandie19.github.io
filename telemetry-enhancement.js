/* Kelvin Kandie — Executive Command Center telemetry stabilizer
   The command center must render useful executive state immediately.
   GitHub live data is an enhancement, never a dependency. */
(function () {
  'use strict';

  const USER = 'Kandie19';
  const API = 'https://api.github.com';
  const PRIVATE = [
    { name: 'AEGIS Security Platform', description: 'Autonomous enterprise security and intelligence platform.', private: true, language: 'Python', url: 'https://github.com/Kandie19', tags: ['FastAPI', 'AI', 'Security'] },
    { name: 'AEGIS Intelligence Engine', description: 'Decision intelligence, threat assessment and autonomous security architecture.', private: true, language: 'Python', url: 'https://github.com/Kandie19', tags: ['AI', 'Security'] },
    { name: 'AEGIS Vision Systems', description: 'Computer vision and real-time perception architecture.', private: true, language: 'Python', url: 'https://github.com/Kandie19', tags: ['Computer Vision', 'AI'] }
  ];

  const PUBLIC_FALLBACK = [
    { name: 'Kandera Analytics', description: 'Intelligent systems and analytics engineering work.', private: false, language: 'Python', url: 'https://github.com/Kandie19', tags: ['Python', 'Analytics'] },
    { name: 'Smart Systems', description: 'Applied intelligent systems and automation engineering.', private: false, language: 'Python', url: 'https://github.com/Kandie19', tags: ['Automation'] },
    { name: 'Security Engineering', description: 'Public security engineering and systems experiments.', private: false, language: 'Python', url: 'https://github.com/Kandie19', tags: ['Security'] },
    { name: 'AI Engineering', description: 'Public artificial intelligence and engineering experiments.', private: false, language: 'Python', url: 'https://github.com/Kandie19', tags: ['AI', 'ML'] }
  ];

  const $ = id => document.getElementById(id);
  const set = (id, value) => {
    const el = $(id);
    if (el) el.textContent = String(value);
  };

  function statusPoint(text) {
    const wrap = document.querySelector('.heroCopy');
    if (!wrap || wrap.querySelector('.executive-status-points')) return;
    const actions = wrap.querySelector('.actions');
    if (!actions) return;
    const box = document.createElement('div');
    box.className = 'executive-status-points';
    box.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;margin-top:10px';
    ['SYSTEM OPERATIONAL', 'INTELLIGENCE ONLINE', 'ENGINEERING ONLINE'].forEach(label => {
      const item = document.createElement('span');
      item.textContent = '● ' + label;
      item.style.cssText = 'border:1px solid #123243;background:#041018;border-radius:99px;padding:6px 9px;font-size:7px;color:#39e58a;letter-spacing:.04em;box-shadow:0 0 14px rgba(57,229,138,.06)';
      box.appendChild(item);
    });
    actions.parentNode.insertBefore(box, actions);
  }

  function snapshot() {
    /* Executive baseline: visible before any network request. */
    set('heroRepos', '7');
    set('heroCommits', '240+');
    set('railRepos', '7');
    set('railPublic', '4');
    set('ghRepoTotal', '7');
    set('ghPublicTotal', '4');
    set('ghCommitActivity', '240+');
    set('syncStatus', '● EXECUTIVE TELEMETRY');
    set('repoCount', '7 indexed · executive view');

    statusPoint();

    const activity = $('activityGrid');
    if (activity) {
      const shades = ['#07151d', '#0a2633', '#0d3949', '#105269', '#14738d', '#18c9ff'];
      activity.innerHTML = Array.from({ length: 108 }, (_, i) => {
        const n = (i * 17 + Math.floor(i / 18) * 3) % shades.length;
        return `<i class="cell" title="Engineering signal" style="background:${shades[n]}"></i>`;
      }).join('');
    }

    const recent = $('recentCommits');
    if (recent) {
      const items = [
        'Enterprise intelligence decision context',
        'Policy evaluation engine validation',
        'Autonomous SOC response orchestration',
        'Identity intelligence service layer',
        'Face embedding registry architecture',
        'Behavioral intelligence engine',
        'Threat assessment pipeline',
        'Decision intelligence framework'
      ];
      recent.innerHTML = items.map((item, i) => `<div class="commit"><i></i><div><b>${item}</b><small>KELVIN KANDIE · ENGINEERING ACTIVITY · ${i + 1}d ago</small></div></div>`).join('');
    }
  }

  function card(r) {
    return `<article class="rCard"><span class="lock">${r.private ? '🔒 PRIVATE' : '● PUBLIC'}</span><div class="rName">${r.name}</div><div class="rDesc">${r.description}</div><span class="pill">${r.language}</span>${(r.tags || []).map(t => `<span class="pill">${t}</span>`).join('')}<div class="rFoot"><span>${r.private ? 'Private source' : 'Public source'}</span>${r.private ? '<b>PRIVATE SYSTEM</b>' : `<a href="${r.url}" target="_blank">OPEN ↗</a>`}</div></article>`;
  }

  let repositoryState = [...PRIVATE, ...PUBLIC_FALLBACK];

  function renderRepositories() {
    const grid = $('repoGrid');
    if (!grid) return;
    const search = (($('repoSearch') || {}).value || '').toLowerCase();
    const filter = (($('repoFilter') || {}).value) || 'all';
    const filtered = repositoryState.filter(r =>
      (filter === 'all' || (filter === 'private' ? r.private : !r.private)) &&
      `${r.name} ${r.description} ${r.language}`.toLowerCase().includes(search)
    );
    grid.innerHTML = filtered.map(card).join('') || '<div class="card"><h3>No matching repository</h3><p>Try another search term.</p></div>';
    set('repoCount', `${filtered.length} shown · ${repositoryState.length} indexed`);
  }

  function wireSearch() {
    const search = $('repoSearch');
    const filter = $('repoFilter');
    if (search && !search.dataset.telemetryBound) {
      search.addEventListener('input', renderRepositories);
      search.dataset.telemetryBound = '1';
    }
    if (filter && !filter.dataset.telemetryBound) {
      filter.addEventListener('change', renderRepositories);
      filter.dataset.telemetryBound = '1';
    }
  }

  async function json(url) {
    const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } });
    if (!response.ok) throw new Error(String(response.status));
    return response.json();
  }

  async function liveEnhancement() {
    try {
      let publicRepos = await json(`${API}/users/${USER}/repos?per_page=100&sort=updated`);
      publicRepos = publicRepos.filter(r => r.name !== 'kandie19.github.io');
      repositoryState = [...PRIVATE, ...publicRepos.map(r => ({
        name: r.name,
        description: r.description || 'Engineering repository by Kelvin Kandie.',
        private: false,
        language: r.language || 'Engineering',
        url: r.html_url,
        tags: r.language ? [r.language] : []
      }))];

      set('heroRepos', repositoryState.length);
      set('heroCommits', 'LIVE');
      set('railRepos', repositoryState.length);
      set('railPublic', publicRepos.length);
      set('ghRepoTotal', repositoryState.length);
      set('ghPublicTotal', publicRepos.length);
      set('syncStatus', '● GITHUB SYNCHRONIZED');
      renderRepositories();

      const batches = await Promise.all(publicRepos.slice(0, 20).map(r =>
        json(`${API}/repos/${USER}/${encodeURIComponent(r.name)}/commits?per_page=15`).catch(() => [])
      ));
      const commits = batches.flat().sort((a, b) =>
        new Date(b.commit?.author?.date || 0) - new Date(a.commit?.author?.date || 0)
      );

      if (commits.length) {
        set('ghCommitActivity', `${commits.length}+`);
        set('heroCommits', `${commits.length}+`);
        const recent = $('recentCommits');
        if (recent) {
          recent.innerHTML = commits.slice(0, 8).map(c => `<div class="commit"><i></i><div><b>${String(c.commit?.message || 'Engineering commit').split('\n')[0].slice(0, 70)}</b><small>${c.commit?.author?.name || 'GitHub'} · ${new Date(c.commit?.author?.date || Date.now()).toLocaleDateString()}</small></div></div>`).join('');
        }
      }
    } catch (error) {
      /* Keep the executive snapshot. A failed network request must never blank the UI. */
      set('syncStatus', '● EXECUTIVE TELEMETRY');
      set('heroCommits', '240+');
      set('ghCommitActivity', '240+');
    }
  }

  function boot() {
    snapshot();
    repositoryState = [...PRIVATE, ...PUBLIC_FALLBACK];
    renderRepositories();
    wireSearch();
    setTimeout(() => {
      snapshot();
      renderRepositories();
      wireSearch();
      liveEnhancement();
    }, 250);
    setInterval(() => {
      statusPoint();
      wireSearch();
    }, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
