/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  Cpu, 
  Database, 
  Workflow, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles, 
  Terminal, 
  Settings, 
  CheckCircle2, 
  Users, 
  ArrowRight, 
  Download, 
  Trash2, 
  FileText,
  AlertTriangle,
  Mail,
  Sliders,
  Share2,
  Check,
  Github,
  Twitter,
  Hexagon
} from 'lucide-react';
import { getWaitlistEntries, saveWaitlistEntry, cleanAllSignups } from './utils';
import { WaitlistEntry } from './types';

// @ts-ignore
import screen1 from '../assets/screen-1.webp';
// @ts-ignore
import screen2 from '../assets/screen-2.webp';
// @ts-ignore
import screen3 from '../assets/screen-3.webp';
// @ts-ignore
import screen4 from '../assets/screen-4.webp';
// @ts-ignore
import logo2 from '../assets/logo-2.svg';

const screens = [screen1, screen2, screen3, screen4];

export default function App() {
  // Waitlist email states
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Developer');
  const [companySize, setCompanySize] = useState('10-50');
  const [submitted, setSubmitted] = useState(false);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [totalWaitlisted, setTotalWaitlisted] = useState(382);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // Carousel Screen state
  const [currentScreen, setCurrentScreen] = useState(0);

  // Auto-cycle Carousel screens every 3.5 seconds
  useEffect(() => {
    const screenInterval = setInterval(() => {
      setCurrentScreen(prev => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(screenInterval);
  }, []);

  // Hero Headline Toggle
  const [activeHeadline, setActiveHeadline] = useState<'agentic' | 'act' | 'prompts'>('act');

  // Auto-cycle Hero Headlines every 4 seconds
  useEffect(() => {
    const headlines: ('act' | 'agentic' | 'prompts')[] = ['act', 'agentic', 'prompts'];
    const headlineInterval = setInterval(() => {
      setActiveHeadline(prev => {
        const currentIndex = headlines.indexOf(prev);
        const nextIndex = (currentIndex + 1) % headlines.length;
        return headlines[nextIndex];
      });
    }, 4000);
    return () => clearInterval(headlineInterval);
  }, []);

  // Load initial waitlist from local storage
  useEffect(() => {
    setWaitlist(getWaitlistEntries());
    // Auto increment count slightly to feel live
    const interval = setInterval(() => {
      setTotalWaitlisted(prev => prev + (Math.random() > 0.6 ? 1 : 0));
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  // Join waitlist handle
  const handleJoinWaitlist = async (e: FormEvent, source: string) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid business email.');
      return;
    }

    const updated = await saveWaitlistEntry(email, {
      source,
      role,
      companySize
    });
    setWaitlist(updated);
    setSubmitted(true);
    setTotalWaitlisted(prev => prev + 1);
    setEmail('');
  };

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Email', 'Role', 'Company Size', 'Source', 'Registered At'];
    const rows = waitlist.map(entry => [
      entry.id,
      entry.email,
      entry.role || 'N/A',
      entry.companySize || 'N/A',
      entry.source,
      entry.createdAt
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.map(val => `"${val}"`).join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `optivian_waitlist_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Seed clear and reload
  const handleClearWaitlist = () => {
    if (confirm('Are you sure you want to clear the entire waitlist database?')) {
      const updated = cleanAllSignups();
      setWaitlist(updated);
    }
  };

  return (
    <div className="bg-[#060505] min-h-screen text-stone-100 flex flex-col font-sans relative overflow-hidden selection:bg-stone-700 selection:text-white">
      
      {/* Absolute background image layer specifically for the hero section with a black overlay */}
      <div className="absolute top-0 inset-x-0 h-[100vh] sm:h-[115vh] bg-hero-main pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#060505]/80" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#060505] to-transparent" />
      </div>

      {/* Top ambient neutral glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-stone-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* HEADER NAVBAR */}
      <header className="border-b border-coal-800 backdrop-blur-md sticky top-0 z-40 bg-[#060505]/80">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 h-18 flex items-center justify-between">
          <div className="flex items-center">
            <img src={logo2} alt="Optivian Logo" className="h-8 md:h-9 w-auto object-contain" referrerPolicy="no-referrer" />
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#simulator" className="text-sm font-medium text-stone-300 hover:text-white transition-colors">
              Why Optivian
            </a>
            <a href="#vision" className="text-sm font-medium text-stone-300 hover:text-white transition-colors">
              Our Vision
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href="#waitlist-form" 
              className="text-sm font-medium bg-[#FDD703] hover:bg-[#FDD703]/90 text-coal-950 font-sans tracking-tight px-4 py-2 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 flex flex-col items-center justify-center min-h-[calc(100vh-4.5rem)] py-12">

        {/* Dynamic Headings */}
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold text-stone-100 tracking-tighter leading-[1.05] mb-6">
            <AnimatePresence mode="wait">
              {activeHeadline === 'act' && (
                <motion.span
                  key="act"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="block"
                >
                  The future belongs to <span className="text-white">systems that act.</span>
                </motion.span>
              )}
              {activeHeadline === 'agentic' && (
                <motion.span
                  key="agentic"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="block"
                >
                  Software is becoming <span className="text-stone-300">agentic.</span>
                </motion.span>
              )}
              {activeHeadline === 'prompts' && (
                <motion.span
                  key="prompts"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="block"
                >
                  The future won't be built with <span className="text-stone-200">prompts.</span>
                </motion.span>
              )}
            </AnimatePresence>
          </h1>


          <p className="text-lg md:text-xl text-stone-400 max-w-2xl mx-auto font-sans leading-relaxed mb-10">
            Deploy intelligent AI systems that reason, act, and deliver outcomes using your enterprise knowledge.
          </p>
        </div>

        {/* HERO FORM - Beautiful single screen input card with Raleway (font-display) */}
        <div id="waitlist-form" className="w-full max-w-xl bg-coal-900/50 backdrop-blur-md rounded-2xl border border-coal-800 p-6 md:p-8 relative font-display">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[50px] rounded-full pointer-events-none" />

          {!submitted ? (
            <form onSubmit={(e) => handleJoinWaitlist(e, 'Hero Form')} className="space-y-6">
              <div className="text-left mb-2">
                <h3 className="text-lg font-display font-bold text-stone-200 tracking-wide">Join Waitlist</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-1.5">Company Size</label>
                  <select 
                    value={companySize} 
                    onChange={(e) => setCompanySize(e.target.value)}
                    className="w-full bg-[#060505]/80 border border-coal-700/60 rounded-xl py-3 px-3.5 text-sm text-stone-300 focus:outline-none focus:border-stone-400 font-display tracking-wide"
                  >
                    <option value="1-10">1 - 10 people</option>
                    <option value="10-50">10 - 50 people</option>
                    <option value="50-100">50 - 100 people</option>
                    <option value="100-500">100 - 500 people</option>
                    <option value="500+">500+ Enterprise tier</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-1.5">Your Role</label>
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-[#060505]/80 border border-coal-700/60 rounded-xl py-3 px-3.5 text-sm text-stone-300 focus:outline-none focus:border-stone-400 font-display tracking-wide"
                  >
                    <option value="Developer">Lead Developer / Architect</option>
                    <option value="CTO">CTO / Executive Leader</option>
                    <option value="Manager">Product / Engineering Manager</option>
                    <option value="Researcher">AI Researcher / Data Scientist</option>
                    <option value="Other">Autonomous AI Hobbyist</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <label className="block text-[10px] font-mono text-stone-400 uppercase tracking-widest mb-1.5">Work Email</label>
                <div className="flex flex-col gap-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@enterprise.com"
                      className="w-full bg-[#060505]/80 border border-coal-700/60 rounded-xl py-3.5 pl-11 pr-4 text-sm text-stone-100 placeholder:text-stone-600 focus:outline-none focus:border-stone-400 focus:ring-1 focus:ring-stone-400/20 transition-all font-display tracking-wide"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#FDD703] hover:bg-[#FDD703]/90 text-coal-950 font-bold font-display tracking-wider py-4 rounded-xl text-xs uppercase transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Join System Waitlist</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* Dynamic trust counter */}
              <div className="pt-4 border-t border-coal-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-stone-500" />
                  <span className="text-xs text-stone-400">
                    <strong className="text-stone-300 font-mono font-bold">{totalWaitlisted}</strong> engineers queuing for access
                  </span>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 rounded-full bg-zinc-800 border-2 border-coal-900 text-[8px] flex items-center justify-center font-mono text-stone-300">A</div>
                  <div className="w-6 h-6 rounded-full bg-zinc-700 border-2 border-coal-900 text-[8px] flex items-center justify-center font-mono text-stone-300">W</div>
                  <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-coal-900 text-[8px] flex items-center justify-center font-mono text-stone-400">🤖</div>
                </div>
              </div>
            </form>
          ) : (
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-8"
            >
              <div className="w-12 h-12 bg-stone-800 border border-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-200">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-stone-100 mb-2">You are in the queue!</h3>
              <p className="text-sm text-stone-400 max-w-sm mx-auto mb-6">
                Thank you for reserving a spot. We have noted your role as <strong className="text-white font-bold">{role}</strong>. Your organization credentials have been recorded safely.
              </p>
              
              <div className="bg-coal-950 p-4 rounded-xl border border-coal-800 max-w-sm mx-auto text-left space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-500">QUEUE ID:</span>
                  <span className="text-stone-200 font-bold">#OP-{Math.floor(Math.random() * 89999 + 10000)}</span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-stone-500">EST. DEPLOYMENT:</span>
                  <span className="text-stone-300">Q3 2026 Batch</span>
                </div>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="mt-6 text-xs text-stone-500 hover:text-stone-300 underline underline-offset-4 cursor-pointer"
              >
                Register another email
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* WHY OPTIVIAN SECTION */}
      <section id="simulator" className="py-20 border-t border-coal-800 bg-mesh-subtle relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-mono font-bold tracking-widest text-stone-300 uppercase block mb-3">WHY OPTIVIAN</span>
              <h2 className="text-3xl md:text-5xl font-display font-medium text-stone-100 tracking-tight leading-tight">
                Every agentic primitive your systems need. <br />
                <span className="text-white">Available today.</span>
              </h2>
              <p className="mt-4 text-stone-400 text-sm md:text-base leading-relaxed">
                From initial multi-agent experiment to production-grade deployment, compile and run autonomous agents on Optivian without managing infrastructure.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a href="#waitlist-form" className="text-xs font-mono font-semibold text-stone-200 hover:text-white transition-colors inline-flex items-center gap-1.5 border border-coal-800 hover:border-stone-500 px-4 py-2.5 rounded-none bg-transparent">
                <span>Browse all primitives</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Box 1 */}
            <div className="bg-transparent border border-coal-800 rounded-none p-6 flex flex-col justify-between hover:border-stone-500/30 transition-colors group">
              <div>
                <div className="w-10 h-10 border border-coal-800 rounded-none bg-transparent flex items-center justify-center text-stone-300 group-hover:border-stone-500/20 transition-colors">
                  <Cpu className="w-5 h-5 pointer-events-none" />
                </div>
                <h3 className="text-base font-display font-semibold text-stone-200 mt-6 tracking-tight">Agent Workspaces</h3>
                <p className="mt-3 text-xs text-stone-400 leading-relaxed font-sans">
                  Autonomous processing environments that run multi-step execution plans, manage short-term state, and reason independently across workflows.
                </p>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-transparent border border-coal-800 rounded-none p-6 flex flex-col justify-between hover:border-stone-500/30 transition-colors group">
              <div>
                <div className="w-10 h-10 border border-coal-800 rounded-none bg-transparent flex items-center justify-center text-stone-300 group-hover:border-stone-500/20 transition-colors">
                  <Database className="w-5 h-5 pointer-events-none" />
                </div>
                <h3 className="text-base font-display font-semibold text-stone-200 mt-6 tracking-tight">Enterprise Knowledge</h3>
                <p className="mt-3 text-xs text-stone-400 leading-relaxed font-sans">
                  Ground every decision in trusted context and proprietary data with safe vector parsing and instant context metadata synchronization.
                </p>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-transparent border border-coal-800 rounded-none p-6 flex flex-col justify-between hover:border-stone-500/30 transition-colors group">
              <div>
                <div className="w-10 h-10 border border-coal-800 rounded-none bg-transparent flex items-center justify-center text-stone-300 group-hover:border-stone-500/20 transition-colors">
                  <Workflow className="w-5 h-5 pointer-events-none" />
                </div>
                <h3 className="text-base font-display font-semibold text-stone-200 mt-6 tracking-tight">Workflow Automation</h3>
                <p className="mt-3 text-xs text-stone-400 leading-relaxed font-sans">
                  Coordinate actions across connected services, databases, and APIs with built-in retry policies and real-time step monitoring.
                </p>
              </div>
            </div>

            {/* Box 4 */}
            <div className="bg-transparent border border-coal-800 rounded-none p-6 flex flex-col justify-between hover:border-stone-500/30 transition-colors group">
              <div>
                <div className="w-10 h-10 border border-coal-800 rounded-none bg-transparent flex items-center justify-center text-stone-300 group-hover:border-stone-500/20 transition-colors">
                  <ShieldCheck className="w-5 h-5 pointer-events-none" />
                </div>
                <h3 className="text-base font-display font-semibold text-stone-200 mt-6 tracking-tight">Governance & Security</h3>
                <p className="mt-3 text-xs text-stone-400 leading-relaxed font-sans">
                  Enforce human-in-the-loop triggers, role-based resource access, exact spend thresholds, and full visibility logs.
                </p>
              </div>
            </div>

            {/* Box 5 */}
            <div className="bg-transparent border border-coal-800 rounded-none p-6 flex flex-col justify-between hover:border-stone-500/30 transition-colors group">
              <div>
                <div className="w-10 h-10 border border-coal-800 rounded-none bg-transparent flex items-center justify-center text-stone-300 group-hover:border-stone-500/20 transition-colors">
                  <Terminal className="w-5 h-5 pointer-events-none" />
                </div>
                <h3 className="text-base font-display font-semibold text-stone-200 mt-6 tracking-tight">System Triggers</h3>
                <p className="mt-3 text-xs text-stone-400 leading-relaxed font-sans">
                  Instantly ingest webhook signals from Stripe, Salesforce, or Datadog to initiate corresponding agentic execution loops.
                </p>
              </div>
            </div>

            {/* Box 6 */}
            <div className="bg-transparent border border-coal-800 rounded-none p-6 flex flex-col justify-between hover:border-stone-500/30 transition-colors group">
              <div>
                <div className="w-10 h-10 border border-coal-800 rounded-none bg-transparent flex items-center justify-center text-stone-300 group-hover:border-stone-500/20 transition-colors">
                  <Sliders className="w-5 h-5 pointer-events-none" />
                </div>
                <h3 className="text-base font-display font-semibold text-stone-200 mt-6 tracking-tight">Task Scheduler</h3>
                <p className="mt-3 text-xs text-stone-400 leading-relaxed font-sans">
                  Configure persistent cron-triggers for periodic security reviews, autonomous document audits, or system logs compilation.
                </p>
              </div>
            </div>

            {/* Box 7 */}
            <div className="bg-transparent border border-coal-800 rounded-none p-6 flex flex-col justify-between hover:border-stone-500/30 transition-colors group">
              <div>
                <div className="w-10 h-10 border border-coal-800 rounded-none bg-transparent flex items-center justify-center text-stone-300 group-hover:border-stone-500/20 transition-colors">
                  <Settings className="w-5 h-5 pointer-events-none" />
                </div>
                <h3 className="text-base font-display font-semibold text-stone-200 mt-6 tracking-tight">Tool Integration</h3>
                <p className="mt-3 text-xs text-stone-400 leading-relaxed font-sans">
                  Execute system commands, invoke external REST endpoints, and run custom code-interpreter scripts inside highly isolated sandbox environments.
                </p>
              </div>
            </div>

            {/* Box 8 */}
            <div className="bg-transparent border border-coal-800 rounded-none p-6 flex flex-col justify-between hover:border-stone-500/30 transition-colors group">
              <div>
                <div className="w-10 h-10 border border-coal-800 rounded-none bg-transparent flex items-center justify-center text-stone-300 group-hover:border-stone-500/20 transition-colors">
                  <FileText className="w-5 h-5 pointer-events-none" />
                </div>
                <h3 className="text-base font-display font-semibold text-stone-200 mt-6 tracking-tight">Execution Ledger</h3>
                <p className="mt-3 text-xs text-stone-400 leading-relaxed font-sans">
                  Maintain an immutable session history log, stream logs directly to Slack, and sync interactions automatically with corporate CRMs.
                </p>
              </div>
            </div>

          </div>

          {/* Centered White Background CTA */}
          <div className="mt-16 flex justify-center">
            <a 
              href="#waitlist-form"
              className="inline-flex items-center gap-2 bg-white hover:bg-stone-100 text-coal-950 font-display font-semibold tracking-wider text-xs uppercase px-8 py-4 rounded-xl transition-all hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow-xl border border-stone-200"
            >
              <span>Join the Waitlist</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>

        </div>
      </section>

      {/* VISION SECTION (Now INDIA-FIRST BILLING with bg-mesh-vision) */}
      <section id="vision" className="py-20 border-t border-coal-800 bg-mesh-vision relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20">
          <div className="rounded-3xl border border-stone-800 bg-black p-8 md:p-12 lg:p-16 relative overflow-hidden">
            
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-radial-gradient from-[#FDD703]/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Left Column */}
              <div className="lg:col-span-5 space-y-6">
                <span className="text-xs font-mono font-bold tracking-widest text-[#FDD703] uppercase block">
                  INDIA-FIRST BILLING
                </span>
                <h2 className="text-3xl md:text-5xl font-display font-semibold text-stone-105 tracking-tight leading-tight">
                  Built for Indian companies, by Indian companies.
                </h2>
                <p className="text-stone-400 font-sans text-sm md:text-base leading-relaxed">
                  Most cloud platforms treat India as an afterthought. Optivian was built here, for here. Every billing detail is tuned for the way Indian businesses actually pay.
                </p>
                
                <div className="pt-2">
                  <a href="#waitlist-form" className="text-sm font-semibold text-[#FDD703] hover:text-yellow-400 transition-colors inline-flex items-center gap-1.5 group">
                    <span>See pricing in INR</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>

              {/* Right Column: Cards */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                {/* Card 1 */}
                <div className="bg-[#0c0a09]/60 border border-stone-900 rounded-xl p-6 flex items-start gap-4 hover:border-stone-800 transition-all">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#FDD703]/10 border border-[#FDD703]/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#FDD703]" />
                  </div>
                  <div>
                    <h4 className="text-base font-display font-semibold text-stone-100">
                      GST-compliant invoices
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-400 mt-1.5 leading-relaxed font-sans">
                      CGST, SGST, IGST split correctly. Sequential invoice numbering. HSN 998313 on every line. Ready for your accountant on day one.
                    </p>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-[#0c0a09]/60 border border-stone-900 rounded-xl p-6 flex items-start gap-4 hover:border-stone-800 transition-all">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#FDD703]/10 border border-[#FDD703]/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#FDD703]" />
                  </div>
                  <div>
                    <h4 className="text-base font-display font-semibold text-stone-100">
                      UPI Autopay & e-mandate
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-400 mt-1.5 leading-relaxed font-sans">
                      Recurring billing through UPI Autopay or card e-mandate. No more manually paying every month, no foreign-currency surcharge.
                    </p>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-[#0c0a09]/60 border border-stone-900 rounded-xl p-6 flex items-start gap-4 hover:border-stone-800 transition-all">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#FDD703]/10 border border-[#FDD703]/20 flex items-center justify-center">
                    <Check className="w-4 h-4 text-[#FDD703]" />
                  </div>
                  <div>
                    <h4 className="text-base font-display font-semibold text-stone-100">
                      Pay in INR or USD
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-400 mt-1.5 leading-relaxed font-sans">
                      Indian customers see INR pricing with GST. International customers see USD. Same product, billed in your currency.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FUTURE MANIFESTO QUOTE BLOCK */}
      <section className="py-24 border-t border-coal-800 relative overflow-hidden bg-coal-950/20">
        
        {/* Soft background light */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(120,113,108,0.06),transparent_60%)] pointer-events-none" />

        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left side: Text manifesto */}
            <div className="lg:col-span-4 space-y-8 text-left">
              
              <blockquote className="text-[24px] font-display font-medium text-stone-100 tracking-tight leading-relaxed">
                "The future belongs to autonomous systems. Every organization will operate with intelligent systems working alongside teams. Not replacing people. Amplifying them."
              </blockquote>

              <div className="flex items-center gap-5 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-[1px] bg-stone-800" />
                  <span className="text-xs font-mono text-stone-300 font-semibold uppercase tracking-wider">FROM THE CREATORS</span>
                </div>
                {/* Carousel indicators */}
                <div className="flex items-center gap-1.5 ml-auto">
                  {[0, 1, 2, 3].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentScreen(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 outline-none ${
                        currentScreen === index 
                          ? 'w-6 bg-[#FDD703]' 
                          : 'w-1.5 bg-stone-700 hover:bg-stone-500'
                      }`}
                      aria-label={`Go to screen ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Vertical Carousel Mockup */}
            <div className="lg:col-span-8 flex flex-col items-center">
              <div className="w-full max-w-3xl aspect-[16/10.5] rounded-xl border border-stone-800 bg-[#0c0a09]/90 p-2 sm:p-3 shadow-2xl relative group overflow-hidden">
                {/* Mock browser header */}
                <div className="flex items-center justify-between border-b border-stone-900 pb-2 sm:pb-3 mb-2 sm:mb-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-stone-800" />
                    <div className="w-2.5 h-2.5 rounded-full bg-stone-800" />
                    <div className="w-2.5 h-2.5 rounded-full bg-stone-800" />
                  </div>
                  <div className="text-[10px] font-mono text-stone-500 bg-stone-950/60 px-3/12 sm:px-4 py-0.5 rounded border border-stone-900/40 w-44 sm:w-56 text-center truncate select-none">
                    optivian.ai/agent/workspace-0{currentScreen + 1}
                  </div>
                  <div className="w-12" /> {/* alignment spacer */}
                </div>

                {/* Vertical slider wrapper */}
                <div className="relative w-full h-[calc(100%-2rem)] overflow-hidden rounded-lg bg-stone-950/40">
                  <AnimatePresence initial={false} mode="wait">
                    <motion.div
                      key={currentScreen}
                      initial={{ opacity: 0, y: 50, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -50, filter: 'blur(4px)' }}
                      transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={screens[currentScreen]}
                        alt={`Optivian Agent System Screen ${currentScreen + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                        referrerPolicy="no-referrer"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Left overlay slide state banner */}
                  <div className="absolute bottom-3 left-3 bg-stone-950/85 backdrop-blur border border-stone-800/60 px-2.5 py-1 rounded text-[10px] font-mono text-[#FDD703] tracking-wider flex items-center gap-1.5 select-none shadow">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FDD703] animate-pulse" />
                    <span>WORKSPACE SCREEN 0{currentScreen + 1}</span>
                  </div>

                  {/* Right side navigation thumbnails preview / vertical active labels */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-2 bg-stone-950/80 backdrop-blur border border-stone-800/60 p-1.5 rounded-lg shadow-xl z-20">
                    {screens.map((src, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentScreen(i)}
                        className={`group relative w-12 h-8 rounded overflow-hidden border transition-all duration-300 cursor-pointer ${
                          currentScreen === i 
                            ? 'border-[#FDD703] ring-1 ring-[#FDD703]/30 scale-105' 
                            : 'border-stone-800 hover:border-stone-500'
                        }`}
                      >
                        <img 
                          src={screens[i]} 
                          alt={`Thumbnail ${i + 1}`} 
                          className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-stone-950/20 group-hover:bg-transparent transition-all" />
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="py-20 border-t border-coal-800 bg-section relative overflow-hidden">
        {/* Darkening overlay for text readability and style transition */}
        <div className="absolute inset-0 bg-[#060505]/75 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#060505] to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#060505] to-transparent pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <span className="text-xs font-mono font-bold tracking-widest text-stone-300 uppercase block mb-3">Enrolling Alpha Sites</span>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-stone-100 tracking-tight">
            Be among the first to build with Optivian.
          </h2>
          <p className="mt-4 text-stone-400 max-w-md mx-auto text-sm md:text-base leading-relaxed">
            Get product updates, early access opportunities, and launch announcements.
          </p>

          <div className="mt-10 max-w-md mx-auto">
            <a 
              href="#waitlist-form"
              className="inline-flex w-full sm:w-auto bg-[#FDD703] hover:bg-[#FDD703]/90 text-coal-950 font-bold px-8 py-3.5 rounded-xl text-sm justify-center items-center gap-2 transition-all active:scale-[0.98] shadow-lg cursor-pointer"
            >
              <span>Join Waitlist & Request Access</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <div className="mt-3 text-xs text-stone-500 text-center">
              No spam. Only product updates.
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM CONTROLS / EASTER EGG SYSTEM ADMIN DRAWER */}
      {showAdminPanel && (
        <div className="fixed inset-0 bg-[#060505]/85 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-coal-900 border border-coal-800 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col h-[520px]"
          >
            {/* Head */}
            <div className="bg-coal-950 border-b border-coal-800 px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-stone-300 animate-spin-slow" />
                <span className="font-mono text-xs font-bold text-stone-300">OPTIVIAN WAITINGLIST DATABASE CONSOLE</span>
              </div>
              <button 
                onClick={() => setShowAdminPanel(false)}
                className="text-stone-500 hover:text-stone-300 font-bold text-sm cursor-pointer"
              >
                ✕ Close
              </button>
            </div>

            {/* List */}
            <div className="flex-1 p-6 overflow-y-auto scrollbar space-y-4">
              <div className="flex items-center justify-between text-xs font-mono text-stone-500 pb-2 border-b border-coal-800">
                <span>TOTAL REGISTERED CONTACTS: {waitlist.length}</span>
                <span className="text-stone-400">SESSION DATABASE STORAGE</span>
              </div>

              {waitlist.length === 0 ? (
                <div className="py-20 text-center space-y-2">
                  <AlertTriangle className="w-8 h-8 text-stone-600 mx-auto" />
                  <p className="text-stone-400 text-xs">No registered emails found.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {waitlist.map((entry) => (
                    <div 
                      key={entry.id} 
                      className="bg-coal-950 border border-coal-800 p-3 rounded-lg flex items-center justify-between text-xs font-mono hover:border-coal-700 transition"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-stone-200">{entry.email}</span>
                          <span className="text-[10px] px-1.5 py-0.5 bg-coal-800 text-stone-400 rounded">
                            {entry.role || 'N/A'}
                          </span>
                        </div>
                        <div className="text-[9.5px] text-stone-500 flex gap-4">
                          <span>Size: {entry.companySize || 'N/A'}</span>
                          <span>Ref: {entry.source}</span>
                          <span>At: {new Date(entry.createdAt).toLocaleTimeString()}</span>
                        </div>
                      </div>
                      
                      <div className="text-stone-600 text-[10px]">
                        ID: {entry.id.substring(0, 10)}...
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Panel control bar */}
            <div className="bg-coal-950 border-t border-coal-800 px-6 py-4 flex gap-3">
              <button
                onClick={exportToCSV}
                disabled={waitlist.length === 0}
                className="flex-1 bg-stone-100 hover:bg-white text-coal-950 font-bold py-2 px-4 rounded-lg text-xs flex items-center justify-center gap-2 transition disabled:opacity-55 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Submissions to CSV</span>
              </button>
              
              <button
                onClick={handleClearWaitlist}
                className="bg-red-950 hover:bg-red-900 text-red-300 hover:text-red-200 border border-red-900/30 px-4 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Database</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-coal-800 mt-auto bg-[#060505] relative z-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-20 py-12 md:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 pb-12">
            
            {/* Logo/Brand column */}
            <div className="space-y-4 lg:col-span-1 min-w-[160px]">
              <div className="flex items-center">
                <img src={logo2} alt="Optivian Logo" className="h-7 w-auto object-contain" referrerPolicy="no-referrer" />
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Push code from GitHub. Deploy globally. Built for modern teams, with India-first billing baked in.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-7 h-7 rounded-full border border-coal-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-stone-600 transition-all bg-coal-950/40"
                  id="footer-github-link"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-7 h-7 rounded-full border border-coal-800 flex items-center justify-center text-stone-400 hover:text-white hover:border-stone-600 transition-all bg-coal-950/40"
                  id="footer-twitter-link"
                >
                  <Twitter className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* PRODUCT */}
            <div>
              <h4 className="text-[10px] font-mono font-bold tracking-wider text-stone-500 uppercase mb-4">Product</h4>
              <ul className="space-y-2.5 text-xs text-stone-400 font-sans">
                <li><a href="#simulator" className="hover:text-stone-200 transition-colors">Web Services</a></li>
                <li><a href="#simulator" className="hover:text-stone-200 transition-colors">Static Sites</a></li>
                <li><a href="#simulator" className="hover:text-stone-200 transition-colors">Background Workers</a></li>
                <li><a href="#simulator" className="hover:text-stone-200 transition-colors">Cron Jobs</a></li>
                <li><a href="#simulator" className="hover:text-stone-200 transition-colors">PostgreSQL</a></li>
                <li><a href="#simulator" className="hover:text-stone-200 transition-colors">Redis</a></li>
                <li><a href="#simulator" className="hover:text-stone-200 transition-colors">Git Deploy</a></li>
                <li><a href="#simulator" className="hover:text-stone-200 transition-colors">All products</a></li>
                <li><a href="#simulator" className="hover:text-stone-200 transition-colors">Pricing</a></li>
              </ul>
            </div>

            {/* SOLUTIONS */}
            <div>
              <h4 className="text-[10px] font-mono font-bold tracking-wider text-stone-500 uppercase mb-4">Solutions</h4>
              <ul className="space-y-2.5 text-xs text-stone-400 font-sans">
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">Next.js</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">Django</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">Rails</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">Node.js</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">Python</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">Migrate from Heroku</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">Migrate from Vercel</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">Heroku alternatives</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">All solutions</a></li>
              </ul>
            </div>

            {/* COMPARE */}
            <div>
              <h4 className="text-[10px] font-mono font-bold tracking-wider text-stone-500 uppercase mb-4">Compare</h4>
              <ul className="space-y-2.5 text-xs text-stone-400 font-sans">
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">vs Vercel</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">vs Render</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">vs Railway</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">vs Heroku</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">vs AWS</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">All comparisons</a></li>
              </ul>
            </div>

            {/* RESOURCES */}
            <div>
              <h4 className="text-[10px] font-mono font-bold tracking-wider text-stone-500 uppercase mb-4">Resources</h4>
              <ul className="space-y-2.5 text-xs text-stone-400 font-sans">
                <li><a href="#simulator" className="hover:text-stone-200 transition-colors">Documentation</a></li>
                <li><a href="#simulator" className="hover:text-stone-200 transition-colors">Blog</a></li>
                <li><a href="#simulator" className="hover:text-stone-200 transition-colors">About</a></li>
                <li><a href="#simulator" className="hover:text-stone-200 transition-colors">Contact</a></li>
                <li>
                  <button 
                    onClick={() => setShowAdminPanel(true)} 
                    className="hover:text-stone-200 transition-colors inline-flex items-center gap-1 cursor-pointer text-left font-sans"
                    id="status-link-button"
                  >
                    <span>Status ↗</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* TRUST */}
            <div>
              <h4 className="text-[10px] font-mono font-bold tracking-wider text-stone-500 uppercase mb-4">Trust</h4>
              <ul className="space-y-2.5 text-xs text-stone-400 font-sans">
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">Trust center</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">Security</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">Sub-processors</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">Responsible disclosure</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">DPA</a></li>
              </ul>
            </div>

            {/* LEGAL */}
            <div>
              <h4 className="text-[10px] font-mono font-bold tracking-wider text-stone-500 uppercase mb-4">Legal</h4>
              <ul className="space-y-2.5 text-xs text-stone-400 font-sans">
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">Terms of Service</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">Privacy Policy</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">Cookie Policy</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">Cookie Preferences</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">Acceptable Use</a></li>
                <li><a href="#vision" className="hover:text-stone-200 transition-colors">SLA</a></li>
              </ul>
            </div>

          </div>

          {/* Sub-footer Section */}
          <div className="pt-8 mt-4 border-t border-coal-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-stone-500 font-sans">
              <span>© {new Date().getFullYear()} Optivian Technologies Pvt. Ltd.</span>
              <a href="#vision" className="hover:text-stone-300 transition-colors">Terms</a>
              <a href="#vision" className="hover:text-stone-300 transition-colors">Privacy</a>
              <a href="#vision" className="hover:text-stone-300 transition-colors">Cookies</a>
            </div>

            {/* Systems Operational Pill - clickable to show the admin console */}
            <button 
              onClick={() => setShowAdminPanel(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-lime-950/20 hover:bg-lime-950/40 border border-lime-500/20 hover:border-lime-500/40 rounded-full text-[10px] font-mono font-medium text-stone-400 transition-all cursor-pointer"
              title="Open System Admin Console"
              id="systems-operational-pill"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-lime-500"></span>
              </span>
              <span>All systems operational</span>
            </button>

            <span className="text-xs text-stone-500 font-sans">
              Made in India · Hosted globally
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
