"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutGrid, Activity, Shield, Code, GitBranch, Archive, Mail,
  Moon, Sun, Github, Twitter, Linkedin, ArrowRight, Zap, Target,
  CheckCircle, ShieldCheck, Clock, Users, Database, Server, Settings
} from 'lucide-react';

export default function PortfolioDashboard() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`min-h-screen flex font-sans transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-900'}`}>
      <aside className={`w-64 border-r flex flex-col justify-between p-6 ${darkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'}`}>
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-cyan-500 flex items-center justify-center font-bold text-slate-950 text-xl rounded-sm">KK</div>
            <div>
              <h1 className="font-bold tracking-wider leading-tight">KELVIN KANDIE</h1>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Chief Architect</p>
            </div>
          </div>
          <nav className="space-y-2">
            <NavItem icon={<LayoutGrid size={18} />} label="COMMAND CENTER" active />
            <NavItem icon={<Activity size={18} />} label="OVERVIEW" />
            <NavItem icon={<Shield size={18} />} label="AEGIS PLATFORM" />
            <NavItem icon={<Server size={18} />} label="ARCHITECTURE" />
            <NavItem icon={<Code size={18} />} label="ENGINEERING" href="/engineering" />
            <NavItem icon={<GitBranch size={18} />} label="REPOSITORIES" />
            <NavItem icon={<Archive size={18} />} label="DOSSIER" />
            <NavItem icon={<Mail size={18} />} label="CONTACT" />
          </nav>
        </div>
        <div>
          <div className="mb-6 text-sm italic text-slate-500 border-l-2 border-cyan-500 pl-4">
            "Architecture First.<br />
            Intelligence Over Information.<br />
            Security by Design.<br />
            Impact by Execution."
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-semibold uppercase tracking-wider">Dark Mode</span>
            <button onClick={() => setDarkMode(!darkMode)} className={`w-12 h-6 rounded-full p-1 flex items-center transition-colors ${darkMode ? 'bg-cyan-500 justify-end' : 'bg-slate-300 justify-start'}`}>
              <div className="w-4 h-4 rounded-full bg-white shadow-sm flex items-center justify-center">
                {darkMode ? <Moon size={10} className="text-slate-900" /> : <Sun size={10} className="text-yellow-500" />}
              </div>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto p-8">
        <header className="flex justify-between items-end mb-8 border-b pb-4 border-slate-800">
          <div>
            <h2 className="text-cyan-500 font-bold tracking-widest text-sm mb-1 uppercase">Executive Technology Command Center</h2>
            <p className="text-xs text-slate-500 uppercase tracking-widest">Intelligent Systems. Secure Futures. Measurable Impact.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs font-bold text-green-500"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>SYSTEMS ONLINE</div>
            <div className="flex gap-4 text-slate-500">
              <Github size={18} className="hover:text-cyan-400 cursor-pointer transition-colors" />
              <Linkedin size={18} className="hover:text-cyan-400 cursor-pointer transition-colors" />
              <Twitter size={18} className="hover:text-cyan-400 cursor-pointer transition-colors" />
              <Mail size={18} className="hover:text-cyan-400 cursor-pointer transition-colors" />
            </div>
          </div>
        </header>

        <section className={`p-8 rounded-xl border mb-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-center ${darkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="relative z-10 w-full md:w-3/5">
            <p className="text-cyan-500 text-xs font-bold tracking-widest mb-2">FOUNDER • SYSTEMS ARCHITECT • BUILDER</p>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2">KELVIN KANDIE</h1>
            <p className="text-sm font-semibold tracking-widest text-slate-400 mb-6">SYSTEMS ARCHITECT | AI & CYBERSECURITY ENGINEER</p>
            <p className="text-slate-400 mb-8 leading-relaxed max-w-xl">I design and build intelligent, scalable, and secure systems that solve real-world problems at enterprise scale. Specializing in AI, Cybersecurity, and Distributed Systems.</p>
            <div className="flex flex-wrap gap-8 mb-8 font-mono">
              <Metric value="10+" label="Years Engineering" />
              <Metric value="21" label="Engineering Repositories" />
              <Metric value="15" label="Public Repositories" />
              <Metric value="500+" label="Source-Control Changes" />
            </div>
            <button className="flex items-center gap-2 text-sm font-bold border border-cyan-500 text-cyan-500 px-6 py-2 rounded-full hover:bg-cyan-500 hover:text-slate-900 transition-all">EXPLORE ARCHITECTURE <ArrowRight size={16} /></button>
          </div>
          <div className="relative w-full md:w-2/5 h-64 md:h-96 mt-8 md:mt-0 flex justify-end">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900/0 to-transparent z-0"></div>
            <img src="/profile.jpg.png" alt="Kelvin Kandie" className="relative z-10 h-full max-w-full object-contain object-top -translate-y-3" />
            <div className="absolute top-0 right-0 flex flex-col gap-4 text-xs font-semibold text-right z-20 bg-slate-950/50 p-4 rounded-lg backdrop-blur-sm border border-slate-800">
              <div className="flex items-center justify-end gap-2 text-cyan-400"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>BASED IN NAIROBI, KENYA</div>
              <div className="flex items-center justify-end gap-2 text-green-500"><span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse-slow"></span>AVAILABLE FOR EXCITING OPPORTUNITIES</div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Widget title="AEGIS SECURITY PLATFORM">
            <p className="text-xs text-slate-500 mb-4 italic">Autonomous Security. Intelligent Response.</p>
            <p className="text-sm text-slate-400 mb-6">AEGIS is an autonomous security platform that perceives, understands, predicts, and responds to threats in real-time.</p>
            <ul className="space-y-3 text-sm font-medium mb-6">
              <li className="flex items-center gap-3"><Zap size={16} className="text-cyan-500" /> Perception: See Everything</li>
              <li className="flex items-center gap-3"><Database size={16} className="text-cyan-500" /> Intelligence: Understand Everything</li>
              <li className="flex items-center gap-3"><Settings size={16} className="text-cyan-500" /> Autonomy: Act Intelligently</li>
            </ul>
            <Link href="/engineering" className="inline-block text-xs font-bold border border-cyan-500 text-cyan-500 px-4 py-2 rounded-full hover:bg-cyan-500 hover:text-slate-900 transition-all">ENTER ENGINEERING LAB →</Link>
          </Widget>

          <Widget title="TECHNOLOGY CONSTELLATION">
            <div className="grid grid-cols-1 gap-3 text-sm text-slate-300 font-medium h-full content-center">
              <div className="flex items-center gap-3"><Target size={16} className="text-cyan-500" /> AI / Machine Learning</div>
              <div className="flex items-center gap-3"><ShieldCheck size={16} className="text-cyan-500" /> Cybersecurity</div>
              <div className="flex items-center gap-3"><Server size={16} className="text-cyan-500" /> Cloud Architecture</div>
              <div className="flex items-center gap-3"><GitBranch size={16} className="text-cyan-500" /> Distributed Systems</div>
              <div className="flex items-center gap-3"><Database size={16} className="text-cyan-500" /> Data Engineering</div>
              <div className="flex items-center gap-3"><Settings size={16} className="text-cyan-500" /> DevOps & Automation</div>
            </div>
          </Widget>

          <Widget title="RECENT ENGINEERING ACTIVITY">
            <div className="space-y-4">
              <ActivityItem repo="aegis-security-platform" desc="Architectural adaptive threat intelligence engine" time="2 days ago" lang="C++" />
              <ActivityItem repo="aegis-publication-library" desc="Enhanced document processing & indexing pipeline" time="1 week ago" lang="Python" />
              <ActivityItem repo="decision-intelligence-engine" desc="Implemented predictive risk scoring module" time="2 weeks ago" lang="Python" />
              <ActivityItem repo="autonomous-soc-orchestrator" desc="Developed playbook orchestration framework" time="3 weeks ago" lang="Go" />
            </div>
          </Widget>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Widget title="ENGINEERING PRINCIPLES">
            <ul className="space-y-4">
              <PrincipleItem title="Architecture First" desc="Every decision starts with long-term scalability in mind." />
              <PrincipleItem title="Intelligence Over Information" desc="Systems that think, learn, and adapt continuously." />
              <PrincipleItem title="Security by Design" desc="Built-in security, not bolted on as an afterthought." />
              <PrincipleItem title="Impact by Execution" desc="Ideas mean nothing without measurable impact." />
            </ul>
          </Widget>

          <Widget title="SYSTEMS AT A GLANCE (30 DAYS)">
            <div className="grid grid-cols-2 gap-4">
              <StatCard value="1,348" label="AEGIS Incidents Monitored" icon={<Shield size={16} />} />
              <StatCard value="64" label="Cameras Online (Active)" icon={<Server size={16} />} />
              <StatCard value="2,317" label="Alerts Responded (Total)" icon={<Zap size={16} />} />
              <StatCard value="99.98%" label="Uptime Guarantee" icon={<Clock size={16} />} />
              <StatCard value="12" label="Sites Protected" icon={<Target size={16} />} />
              <StatCard value="156" label="Users Active" icon={<Users size={16} />} />
            </div>
          </Widget>

          <Widget title="EXECUTIVE DOSSIER">
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex justify-between items-center border-b border-slate-800 pb-2"><span>Professional Summary</span><span className="text-cyan-500 text-xs">Expertise & Value</span></li>
              <li className="flex justify-between items-center border-b border-slate-800 pb-2"><span>Career Timeline</span><span className="text-cyan-500 text-xs">Milestones</span></li>
              <li className="flex justify-between items-center border-b border-slate-800 pb-2"><span>Core Competencies</span><span className="text-cyan-500 text-xs">Leadership</span></li>
              <li className="flex justify-between items-center"><span>Certifications</span><span className="text-cyan-500 text-xs">Validated</span></li>
            </ul>
            <div className="mt-6 flex items-center gap-2 text-xs text-green-500 font-bold uppercase tracking-wider"><span className="w-2 h-2 rounded-full bg-green-500"></span>Official Portfolio Active</div>
          </Widget>
        </div>

        <footer className="text-xs text-slate-500 flex justify-between items-center border-t border-slate-800 pt-6 mt-6">
          <p>© 2024 KELVIN KANDIE. ALL RIGHTS RESERVED.</p>
          <p>BUILT WITH PURPOSE. ENGINEERED FOR IMPACT.</p>
          <p>DESIGNED IN KENYA. BUILDING FOR THE WORLD.</p>
        </footer>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false, href }: { icon: React.ReactNode, label: string, active?: boolean, href?: string }) {
  const content = <>{icon}{label}</>;
  const className = `flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer transition-colors text-sm font-semibold tracking-wider ${active ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'}`;
  return href ? <Link href={href} className={className}>{content}</Link> : <div className={className}>{content}</div>;
}

function Metric({ value, label }: { value: string, label: string }) {
  return <div className="flex flex-col border-r border-slate-700 pr-8 last:border-0 last:pr-0"><span className="text-3xl font-bold text-cyan-400 mb-1">{value}</span><span className="text-xs text-slate-500 uppercase font-bold tracking-widest">{label}</span></div>
}

function Widget({ title, children }: { title: string, children: React.ReactNode }) {
  return <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col"><h3 className="text-xs font-bold text-slate-400 tracking-widest mb-6 uppercase border-b border-slate-800 pb-3">{title}</h3><div className="flex-1">{children}</div></div>
}

function ActivityItem({ repo, desc, time, lang }: { repo: string, desc: string, time: string, lang: string }) {
  return <div className="flex justify-between items-start text-sm pb-4 border-b border-slate-800 last:border-0 last:pb-0"><div><h4 className="text-cyan-400 font-semibold mb-1">{repo}</h4><p className="text-slate-500 text-xs">{desc}</p></div><div className="text-right flex flex-col items-end"><span className="text-slate-500 text-xs mb-1">{time}</span><span className="text-yellow-500 text-xs font-bold bg-yellow-500/10 px-2 py-0.5 rounded flex items-center gap-1"><Code size={10} /> {lang}</span></div></div>
}

function PrincipleItem({ title, desc }: { title: string, desc: string }) {
  return <li className="flex gap-4"><div className="mt-0.5 text-cyan-500"><CheckCircle size={18} /></div><div><h4 className="text-slate-200 font-semibold text-sm mb-0.5">{title}</h4><p className="text-slate-500 text-xs">{desc}</p></div></li>
}

function StatCard({ value, label, icon }: { value: string, label: string, icon: React.ReactNode }) {
  return <div className="bg-slate-950 p-4 rounded-lg border border-slate-800"><div className="text-cyan-500 mb-2">{icon}</div><div className="text-xl font-bold text-slate-200 mb-1">{value}</div><div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">{label}</div></div>
}
