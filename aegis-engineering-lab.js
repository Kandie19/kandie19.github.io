/* AEGIS Engineering Lab — public, IP-safe demonstration layer.
   Demonstrates decision reasoning with synthetic inputs only.
   No proprietary implementation, models, thresholds, data, credentials, or source code are exposed.
   Integration checkpoint: evidence layer activation verified through repository workflow.
*/
(function(){
  'use strict';
  function boot(){
    if(document.getElementById('aegisEvidenceLab')) return;
    const lab=document.createElement('section');
    lab.id='aegisEvidenceLab';
    lab.className='panel';
    lab.innerHTML=`
      <div class="head"><div><h2>AEGIS ENGINEERING LAB</h2><small>PUBLIC DEMONSTRATION · SYNTHETIC DATA · IMPLEMENTATION PROTECTED</small></div><span class="live">● SIMULATION</span></div>
      <p style="color:#8297a0;font-size:9px;line-height:1.7;max-width:900px">Explore the decision pathway AEGIS is designed around. Adjust synthetic context inputs and observe how identity confidence, behavioral anomaly, historical risk and policy sensitivity influence a simulated recommendation. This demonstration exposes reasoning structure, not proprietary implementation.</p>
      <div class="lab" style="margin-top:10px">
        <div class="terminal" id="aegisLabControls">
          <div><b>IDENTITY CONFIDENCE</b> <span id="idVal">75</span>%</div><input class="slider" id="idSlider" type="range" min="0" max="100" value="75">
          <div><b>BEHAVIORAL ANOMALY</b> <span id="behVal">45</span>%</div><input class="slider" id="behSlider" type="range" min="0" max="100" value="45">
          <div><b>HISTORICAL RISK</b> <span id="riskVal">30</span>%</div><input class="slider" id="riskSlider" type="range" min="0" max="100" value="30">
          <div><b>POLICY SENSITIVITY</b> <span id="polVal">60</span>%</div><input class="slider" id="polSlider" type="range" min="0" max="100" value="60">
        </div>
        <div class="terminal"><div class="green">[SIM] EVENT → CONTEXT → RISK → POLICY → DECISION</div><div id="aegisDecision" class="result">Recommendation: REVIEW</div><div id="aegisReason" style="color:#78909a;margin-top:8px">Synthetic context is being evaluated.</div></div>
      </div>`;
    const anchor=document.querySelector('.lab') || document.querySelector('.panel:last-of-type') || document.querySelector('main') || document.body;
    anchor.parentNode.insertBefore(lab, anchor.nextSibling);
    const fields=[['idSlider','idVal'],['behSlider','behVal'],['riskSlider','riskVal'],['polSlider','polVal']];
    function update(){
      const id=+document.getElementById('idSlider').value, beh=+document.getElementById('behSlider').value, risk=+document.getElementById('riskSlider').value, pol=+document.getElementById('polSlider').value;
      fields.forEach(([s,v])=>document.getElementById(v).textContent=document.getElementById(s).value);
      const score=(beh*.35)+(risk*.35)+(pol*.2)+((100-id)*.1);
      let decision='MONITOR';
      if(score>=70) decision='ESCALATE FOR REVIEW'; else if(score>=45) decision='REVIEW'; else decision='LOW-RISK / CONTINUE MONITORING';
      document.getElementById('aegisDecision').textContent='Recommendation: '+decision;
      document.getElementById('aegisReason').textContent='Simulated reasoning: identity confidence '+id+'%; behavioral anomaly '+beh+'%; historical risk '+risk+'%; policy sensitivity '+pol+'%. Combined context score '+Math.round(score)+'%. This is an illustrative decision pathway, not the proprietary AEGIS engine.';
    }
    fields.forEach(([s])=>document.getElementById(s).addEventListener('input',update));
    update();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
})();
