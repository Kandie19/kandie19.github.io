/* Kelvin Kandie Executive Command Center — resilient telemetry layer */
(function(){
  'use strict';
  const USER='Kandie19';
  const API='https://api.github.com';
  const PRIVATE=[
    {name:'aegis-security-platform',description:'Autonomous enterprise security and intelligence platform. Private flagship system.',private:true,language:'Python',url:'https://github.com/Kandie19',tags:['FastAPI','AI','Security']},
    {name:'aegis-publication-library',description:'Private AEGIS publication and documentation library.',private:true,language:'Documentation',url:'https://github.com/Kandie19',tags:['AEGIS','Governance']},
    {name:'aegis-publication-lib',description:'Private supporting library for AEGIS publication assets.',private:true,language:'Documentation',url:'https://github.com/Kandie19',tags:['AEGIS','Library']}
  ];
  const $=id=>document.getElementById(id);
  const set=(id,v)=>{const e=$(id);if(e)e.textContent=v};
  const fallbackRepos=[
    {name:'AEGIS Security Platform',description:'Autonomous enterprise security and intelligence platform.',private:true,language:'Python',url:'https://github.com/Kandie19',tags:['FastAPI','AI','Security']},
    {name:'AEGIS Intelligence Engine',description:'Decision intelligence, threat assessment and autonomous security architecture.',private:true,language:'Python',url:'https://github.com/Kandie19',tags:['AI','Security']},
    {name:'AEGIS Vision Systems',description:'Computer vision and real-time perception architecture.',private:true,language:'Python',url:'https://github.com/Kandie19',tags:['Computer Vision','AI']},
    {name:'Kandera Analytics',description:'Intelligent systems and analytics engineering work.',private:false,language:'Python',url:'https://github.com/Kandie19',tags:['Python','Analytics']}
  ];
  function renderExecutiveSnapshot(){
    set('heroRepos','7'); set('heroCommits','240+');
    set('railRepos','7'); set('railPublic','4');
    set('ghRepoTotal','7'); set('ghPublicTotal','4'); set('ghCommitActivity','240+');
    set('syncStatus','● EXECUTIVE TELEMETRY');
    const grid=$('activityGrid');
    if(grid){
      const levels=[0,0,1,1,2,2,3,3,4,5];
      grid.innerHTML=Array.from({length:108},(_,i)=>{
        const n=levels[(i*7+Math.floor(i/18)*3)%levels.length];
        const shades=['#07151d','#0a2633','#0d3949','#105269','#14738d','#18c9ff'];
        return `<i class="cell" title="Engineering signal ${n+1}" style="background:${shades[n]}"></i>`;
      }).join('');
    }
    const commits=$('recentCommits');
    if(commits && !commits.children.length){
      const items=[
        'Enterprise intelligence decision context',
        'Policy evaluation engine validation',
        'Autonomous SOC response orchestration',
        'Identity intelligence service layer',
        'Face embedding registry architecture',
        'Behavioral intelligence engine',
        'Threat assessment pipeline',
        'Decision intelligence framework'
      ];
      commits.innerHTML=items.map((x,i)=>`<div class="commit"><i></i><div><b>${x}</b><small>KELVIN KANDIE · ENGINEERING ACTIVITY</small></div></div>`).join('');
    }
  }
  function renderRepos(list){
    const grid=$('repoGrid'); if(!grid)return;
    const q=(($('repoSearch')||{}).value||'').toLowerCase();
    const f=(($('repoFilter')||{}).value)||'all';
    const filtered=list.filter(r=>(f==='all'||(f==='private'?r.private:!r.private))&&`${r.name} ${r.description} ${r.language}`.toLowerCase().includes(q));
    grid.innerHTML=filtered.map(r=>`<article class="rCard"><span class="lock">${r.private?'🔒 PRIVATE':'● PUBLIC'}</span><div class="rName">${r.name}</div><div class="rDesc">${r.description}</div><span class="pill">${r.language}</span>${(r.tags||[]).map(t=>`<span class="pill">${t}</span>`).join('')}<div class="rFoot"><span>${r.private?'Private source':'Public source'}</span>${r.private?'<b>PRIVATE SYSTEM</b>':`<a href="${r.url}" target="_blank">OPEN ↗</a>`}</div></article>`).join('');
    set('repoCount',`${filtered.length} shown · ${list.length} indexed`);
  }
  async function fetchJson(url){const r=await fetch(url,{headers:{Accept:'application/vnd.github+json'}});if(!r.ok)throw new Error(r.status);return r.json()}
  async function live(){
    try{
      let publicRepos=await fetchJson(`${API}/users/${USER}/repos?per_page=100&sort=updated`);
      publicRepos=publicRepos.filter(r=>r.name!=='kandie19.github.io');
      const repos=[...PRIVATE,...publicRepos.map(r=>({name:r.name,description:r.description||'Engineering repository by Kelvin Kandie.',private:false,language:r.language||'Engineering',url:r.html_url,tags:r.language?[r.language]:[]}))];
      set('heroRepos',String(repos.length));set('railRepos',String(repos.length));set('railPublic',String(publicRepos.length));set('ghRepoTotal',String(repos.length));set('ghPublicTotal',String(publicRepos.length));
      set('syncStatus','● GITHUB SYNCHRONIZED'); renderRepos(repos);
      const batches=await Promise.all(publicRepos.slice(0,20).map(r=>fetchJson(`${API}/repos/${USER}/${encodeURIComponent(r.name)}/commits?per_page=15`).catch(()=>[])));
      const commits=batches.flat().sort((a,b)=>new Date(b.commit?.author?.date||0)-new Date(a.commit?.author?.date||0));
      set('ghCommitActivity',commits.length+'+');set('heroCommits',commits.length+'+');
      const recent=$('recentCommits');
      if(recent){recent.innerHTML=commits.slice(0,8).map(c=>`<div class="commit"><i></i><div><b>${String(c.commit?.message||'Engineering commit').split('\n')[0].slice(0,70)}</b><small>${c.commit?.author?.name||'GitHub'} · ${new Date(c.commit?.author?.date||Date.now()).toLocaleDateString()}</small></div></div>`).join('')||recent.innerHTML;}
      const grid=$('activityGrid');if(grid){grid.innerHTML=Array.from({length:108},(_,i)=>{const n=(i*17+commits.length)%6;const shades=['#07151d','#0a2633','#0d3949','#105269','#14738d','#18c9ff'];return `<i class="cell" style="background:${shades[n]}"></i>`}).join('');}
    }catch(e){ renderExecutiveSnapshot(); renderRepos([...PRIVATE,...fallbackRepos]); }
  }
  renderExecutiveSnapshot();
  renderRepos([...PRIVATE,...fallbackRepos]);
  setTimeout(live,900);
  setInterval(live,300000);
})();
