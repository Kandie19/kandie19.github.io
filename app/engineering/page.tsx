"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const pipeline = ["PERCEPTION", "ANALYSIS", "CONTEXT", "RISK", "DECISION", "RESPONSE", "EVIDENCE"];

export default function EngineeringLab() {
  const [severity, setSeverity] = useState(62);
  const [confidence, setConfidence] = useState(88);
  const [exposure, setExposure] = useState(54);
  const [active, setActive] = useState(false);

  const risk = useMemo(() => Math.min(100, Math.round(severity * 0.45 + confidence * 0.35 + exposure * 0.2)), [severity, confidence, exposure]);
  const level = risk >= 75 ? "HIGH" : risk >= 50 ? "ELEVATED" : "LOW";

  return (
    <main className="min-h-screen bg-[#030607] text-[#eef6f7] px-6 py-10 md:px-12 font-mono">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between border-b border-[#19343b] pb-5 mb-10">
          <div>
            <p className="text-[#18e6e2] text-xs tracking-[0.18em] font-bold">05 / ENGINEERING LAB</p>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight mt-2">AEGIS SIMULATION ENVIRONMENT</h1>
            <p className="text-[#8ca2a9] text-xs mt-3 max-w-3xl leading-6">A public engineering demonstration of the decision flow behind an autonomous security platform. This is a simulation — proprietary AEGIS implementation remains protected.</p>
          </div>
          <Link href="/" className="hidden md:inline-block border border-[#2a444b] px-4 py-2 text-xs hover:border-[#18e6e2]">← COMMAND CENTER</Link>
        </div>

        <section className="border border-[#1d555e] bg-gradient-to-br from-[#07171d] to-[#03080a] p-6 md:p-8 rounded-lg">
          <div className="grid md:grid-cols-3 gap-5">
            <Control label="THREAT SEVERITY" value={severity} setValue={setSeverity} />
            <Control label="MODEL CONFIDENCE" value={confidence} setValue={setConfidence} />
            <Control label="EXPOSURE" value={exposure} setValue={setExposure} />
          </div>

          <div className="mt-8 border-t border-[#19343b] pt-6">
            <div className="flex items-center gap-5">
              <div className="flex-1 h-3 bg-[#11252b] rounded overflow-hidden"><div className="h-full bg-gradient-to-r from-[#47e39a] via-[#d5b866] to-[#ff6670] transition-all" style={{ width: `${risk}%` }} /></div>
              <div className="text-right min-w-24"><div className="text-3xl text-[#18e6e2]">{risk}</div><div className="text-[9px] text-[#8ca2a9] tracking-widest">{level} RISK</div></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-7 gap-2 mt-8">
            {pipeline.map((node, index) => (
              <div key={node} className={`p-3 text-center text-[9px] tracking-wider border rounded transition-all ${active && index <= 6 ? "border-[#18e6e2] text-white bg-[#073039] shadow-[0_0_18px_rgba(24,230,226,.12)]" : "border-[#183a42] text-[#60767c] bg-[#050c0f]"}`}>{node}</div>
            ))}
          </div>

          <button onClick={() => setActive(true)} className="mt-8 border border-[#18e6e2] bg-[#06262c] text-white px-5 py-3 text-xs font-bold tracking-widest hover:bg-[#18e6e2] hover:text-[#030607] transition-colors">RUN AEGIS SIMULATION →</button>

          <div className="mt-5 min-h-44 p-5 bg-[#020506] border border-[#15343b] text-[10px] leading-7 text-[#8fa6ad]">
            <div><span className="text-[#47e39a]">● ENGINEERING LAB READY</span> — public simulation mode</div>
            {active && <>
              <div>→ PERCEPTION: event parameters received</div>
              <div>→ ANALYSIS: confidence normalized to {confidence}%</div>
              <div>→ CONTEXT: exposure weighted at {exposure}%</div>
              <div>→ RISK: composite assessment = {risk}/100 ({level})</div>
              <div>→ DECISION: response pathway selected for simulation</div>
              <div>→ RESPONSE: simulated action emitted</div>
              <div>→ EVIDENCE: simulation state recorded for demonstration</div>
              <div className="text-[#d5b866]">⚠ DEMONSTRATION ONLY — no live security action is performed.</div>
            </>}
          </div>
        </section>

        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Info title="PERCEPTION" text="Receive a simulated security event and establish the initial signal." />
          <Info title="INTELLIGENCE" text="Combine confidence, severity and exposure into contextual risk." />
          <Info title="DECISION" text="Demonstrate how a system can move from understanding toward controlled response." />
        </div>
      </div>
    </main>
  );
}

function Control({ label, value, setValue }: { label: string; value: number; setValue: (value: number) => void }) {
  return <label className="block border border-[#19343b] bg-[#061015] p-4 rounded"><span className="block text-[#8ea5ab] text-[9px] tracking-widest mb-3">{label}</span><input type="range" min="0" max="100" value={value} onChange={(e) => setValue(Number(e.target.value))} className="w-full accent-cyan-400" /><span className="block text-[#18e6e2] text-xl mt-2">{value}%</span></label>;
}

function Info({ title, text }: { title: string; text: string }) {
  return <article className="border border-[#19343b] bg-[#071116] p-5 rounded"><div className="text-[#18e6e2] text-[9px] tracking-widest font-bold">{title}</div><p className="text-[#8ca2a9] text-xs leading-6 mt-3">{text}</p></article>;
}
