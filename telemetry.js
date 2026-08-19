/* Kelvin Kandie — live GitHub engineering telemetry */
(function(){
  const USER='Kandie19', API='https://api.github.com', cache={repos:null,commits:{}};
  const put=(id,v)=>{const e=document.getElementById(id);if(e)e.textContent=v};
  const fmt=n=>Number(n||0).toLocaleString();
  async function repos(){if(cache.repos)return cache.repos;const r=await fetch(`${API}/users/${USER}/repos?per_page=100&sort=updated`);if(!r.ok)throw Error();cache.repos=(await r.json()).filter(x=>!['Kandie19','kandie19.github.io'].includes(x.name));return cache.repos}
  async function commits(repo){if(cache.commits[repo])return cache.commits[repo];const r=await fetch(`${API}/repos/${USER}/${encodeURIComponent(repo)}/commits?per_page=100`);if(!r.ok)return[];cache.commits[repo]=await r.json();return cache.commits[repo]}
  async function refresh(){try{const rs=await repos(),a=rs.find(x=>x.name==='aegis-security-platform');put('ghRepoTotal',fmt(rs.length+3));put('ghPublicTotal',fmt(rs.length));put('ghPrivateTotal','3');put('ghLastSync',new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',second:'2-digit'}));if(a){put('aegisUpdated',new Date(a.updated_at).toLocaleDateString([], {year:'numeric',month:'short',day:'numeric'}));const c=await commits(a.name);put('aegisCommits',fmt(c.length)+'+');put('aegisLastCommit',c[0]?.commit?.message?.split('\n')[0]||'Repository active')}let total=0;for(const r of rs.slice(0,20))total+=(await commits(r.name)).length;put('ghCommitActivity',fmt(total)+'+')}catch(e){put('ghLastSync','OFFLINE CACHE')}}
  window.KelvinGitHubTelemetry={refresh,repos,commits};refresh();setInterval(refresh,300000);
})();
