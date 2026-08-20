/* Kelvin Kandie — Executive Command Center recovery + telemetry layer */
(function () {
  'use strict';
  function revealShell() {
    try {
      var boot = document.querySelector('.boot'), shell = document.querySelector('.shell');
      if (boot) { boot.style.display = 'none'; boot.setAttribute('aria-hidden', 'true'); }
      if (shell) { shell.style.display = 'block'; shell.style.visibility = 'visible'; shell.style.opacity = '1'; }
      var home = document.getElementById('home');
      if (home) home.classList.add('active');
      document.querySelectorAll('.view').forEach(function (v) { if (v.id !== 'home') v.classList.remove('active'); });
    } catch (_) {}
  }
  function run() {
    revealShell();
    var API='https://api.github.com', USER='Kandie19';
    var PRIVATE=[
      {name:'aegis-security-platform',description:'Autonomous enterprise security and intelligence platform. Private flagship system.',private:true,language:'Python',url:'https://github.com/Kandie19/aegis-security-platform',tags:['FastAPI','AI','Security']},
      {name:'aegis-publication-library',description:'Private AEGIS publication and documentation library.',private:true,language:'Documentation',url:'https://github.com/Kandie19/aegis-publication-library',tags:['AEGIS','Governance']},
      {name:'aegis-publication-lib',description:'Private supporting library for AEGIS publication assets.',private:true,language:'Documentation',url:'https://github.com/Kandie19/aegis-publication-lib',tags:['AEGIS','Library']}
    ];
    var PUBLIC=[
      {name:'Kandera Analytics',description:'Intelligent systems and analytics engineering work.',private:false,language:'Python',url:'https://github.com/Kandie19',tags:['Python','Analytics']},
      {name:'Smart Systems',description:'Applied intelligent systems and automation engineering.',private:false,language:'Python',url:'https://github.com/Kandie19',tags:['Automation']},
      {name:'Security Engineering',description:'Public security engineering and systems experiments.',private:false,language:'Python',url:'https://github.com/Kandie19',tags:['Security']},
      {name:'AI Engineering',description:'Public artificial intelligence and engineering experiments.',private:false,language:'Python',url:'https://github.com/Kandie19',tags:['AI','ML']}
    ];
    var $=function(id){return document.getElementById(id)}, set=function(id,v){var e=$(id);if(e)e.textContent=String(v)};
    set('heroRepos','7'); set('heroCommits','240+'); set('railRepos','7'); set('railPublic','4'); set('ghRepoTotal','7'); set('ghPublicTotal','4'); set('ghCommitActivity','240+'); set('syncStatus','● EXECUTIVE TELEMETRY'); set('repoCount','7 indexed · executive view');
    var hero=document.querySelector('.heroCopy');
    if(hero&&!hero.querySelector('.executive-status-points')){var box=document.createElement('div');box.className='executive-status-points';box.style.cssText='display:flex;gap:6px;flex-wrap:wrap;margin-top:10px';['SYSTEM OPERATIONAL','INTELLIGENCE ONLINE','ENGINEERING ONLINE'].forEach(function(label){var x=document.createElement('span');x.textContent='● '+label;x.style.cssText='border:1px solid #123243;background:#041018;border-radius:99px;padding:6px 9px;font-size:7px;color:#39e58a;letter-spacing:.04em';box.appendChild(x)});var a=hero.querySelector('.actions');if(a)a.parentNode.insertBefore(box,a)}
    var activity=$('activityGrid');if(activity){var shades=['#07151d','#0a2633','#0d3949','#105269','#14738d','#18c9ff'];activity.innerHTML=Array.from({length:108},function(_,i){return '<i class="cell" style="background:'+shades[(i*17+Math.floor(i/18)*3)%shades.length]+'"></i>'}).join('')}
    var recent=$('recentCommits');if(recent){var items=['Enterprise intelligence decision context','Policy evaluation engine validation','Autonomous SOC response orchestration','Identity intelligence service layer','Face embedding registry architecture','Behavioral intelligence engine','Threat assessment pipeline','Decision intelligence framework'];recent.innerHTML=items.map(function(item,i){return '<div class="commit"><i></i><div><b>'+item+'</b><small>KELVIN KANDIE · ENGINEERING ACTIVITY · '+(i+1)+'d ago</small></div></div>'}).join('')}
    var feed=$('feed');if(feed){var rows=[['red','Identity intelligence event','DECISION PIPELINE · HIGH'],['amber','Behavioral anomaly assessed','CONTEXT ENGINE · MEDIUM'],['','Engineering activity synchronized','PUBLIC TELEMETRY · LIVE'],['','Architecture signal evaluated','INTELLIGENCE FABRIC · LOW']];feed.innerHTML=rows.map(function(x){return '<div class="feedrow"><i class="dot '+x[0]+'"></i><div><b>'+x[1]+'</b><small>'+x[2]+'</small></div></div>'}).join('')}
    var repos=PRIVATE.concat(PUBLIC);
    function esc(s){return String(s||'').replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
    function render(){var grid=$('repoGrid');if(!grid)return;var search=(($('repoSearch')||{}).value||'').toLowerCase(),filter=(($('repoFilter')||{}).value)||'all';var list=repos.filter(function(r){return(filter==='all'||(filter==='private'?r.private:!r.private))&&(r.name+' '+r.description+' '+r.language).toLowerCase().indexOf(search)>=0});grid.innerHTML=list.map(function(r){return '<article class="rCard"><span class="lock">'+(r.private?'🔒 PRIVATE':'● PUBLIC')+'</span><div class="rName">'+esc(r.name)+'</div><div class="rDesc">'+esc(r.description)+'</div><span class="pill">'+esc(r.language)+'</span>'+(r.tags||[]).map(function(t){return '<span class="pill">'+esc(t)+'</span>'}).join('')+'<div class="rFoot"><span>'+ (r.private?'Private source':'Public source') +'</span>'+(r.private?'<b>PRIVATE SYSTEM</b>':'<a href="'+r.url+'" target="_blank">OPEN ↗</a>')+'</div></article>'}).join('');set('repoCount',list.length+' shown · '+repos.length+' indexed')}
    render();
    var s=$('repoSearch'),f=$('repoFilter');if(s&&!s.dataset.recoveryBound){s.addEventListener('input',render);s.dataset.recoveryBound='1'}if(f&&!f.dataset.recoveryBound){f.addEventListener('change',render);f.dataset.recoveryBound='1'}
    fetch(API+'/users/'+USER+'/repos?per_page=100&sort=updated',{headers:{Accept:'application/vnd.github+json'}}).then(function(r){if(!r.ok)throw Error(r.status);return r.json()}).then(function(p){p=p.filter(function(r){return r.name!=='kandie19.github.io'});repos=PRIVATE.concat(p.map(function(r){return{name:r.name,description:r.description||'Engineering repository by Kelvin Kandie.',private:false,language:r.language||'Engineering',url:r.html_url,tags:r.language?[r.language]:[]}}));set('heroRepos',repos.length);set('railRepos',repos.length);set('railPublic',p.length);set('ghRepoTotal',repos.length);set('ghPublicTotal',p.length);set('syncStatus','● GITHUB SYNCHRONIZED');render()}).catch(function(){set('syncStatus','● EXECUTIVE TELEMETRY')});
    setInterval(revealShell,1500);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run,{once:true});else run();
})();
