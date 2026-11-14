import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowRight, ShieldCheck, Activity, WifiOff, 
  Stethoscope, LineChart, CheckCircle2, Hexagon,
  ClipboardList, CalendarDays, Dumbbell, RefreshCw
} from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Landing() {
  const { user } = useAuthContext();

  const ctaLink = user ? "/overview" : "/auth";
  const ctaText = user ? "Return to Workspace" : "Access Workspace";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-[#0B7A35] selection:text-white overflow-hidden">
      
      {/* --- NAVBAR --- */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B7A35] text-white">
              <Hexagon className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-tight tracking-wide text-white">ASTRA RECOVER</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Crew Health System</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="text-sm text-slate-300 hover:text-white transition-colors hidden sm:block">Terms of Use</Link>
            <Link 
              to={ctaLink}
              className="rounded-md bg-[#0B7A35] px-4 py-2 text-sm font-semibold text-white hover:bg-[#096328] transition-colors shadow-lg shadow-[#0B7A35]/20"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* --- HERO SECTION --- */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
        
        {/* Background Image & Animated Grid */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=2070&auto=format&fit=crop" 
            alt="Astronaut in space" 
            className="h-full w-full object-cover object-center opacity-30 mix-blend-luminosity"
          />
          {/* Subtle animated grid overlay for a "tech" feel */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center lg:text-left w-full grid lg:grid-cols-2 gap-12 items-center py-20">
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-[#169C46]/30 bg-[#169C46]/10 px-3 py-1 text-sm text-[#169C46]">
              <ShieldCheck className="h-4 w-4" />
              <span>Mission-Critical Health Management</span>
            </motion.div>
            
            <motion.h1 variants={fadeUp} className="text-4xl font-bold tracking-tight text-white sm:text-6xl text-balance">
              Evidence-based rehabilitation for the final frontier.
            </motion.h1>
            
            <motion.p variants={fadeUp} className="text-lg leading-relaxed text-slate-300 max-w-2xl">
              ASTRA RECOVER is a purpose-built, offline-first clinical workspace for astronauts. Manage injury rehabilitation, track physical deconditioning, and securely synchronize medical assessments with ground control.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link 
                to={ctaLink}
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-md bg-[#0B7A35] px-8 py-3.5 text-base font-semibold text-white hover:bg-[#096328] transition-colors shadow-lg shadow-[#0B7A35]/30 group"
              >
                {ctaText} <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a 
                href="#how-it-works"
                className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-md border border-slate-700 bg-slate-800/50 px-8 py-3.5 text-base font-semibold text-white hover:bg-slate-800 transition-colors backdrop-blur-sm"
              >
                Explore Capabilities
              </a>
            </motion.div>
          </motion.div>

          {/* Hero UI Mockup with Motion */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotateY: -10 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            className="hidden lg:block relative perspective-1000"
          >
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#0B7A35] to-[#169C46] opacity-20 blur-xl animate-pulse"></div>
            
            {/* Floating animation applied to the card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative rounded-xl border border-slate-700 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-lg"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Activity className="h-4 w-4 text-[#169C46]" />
                  Functional Assessment Trend
                </div>
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">Protocol V2</span>
              </div>
              
              <div className="space-y-5">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400"><span>Mobility</span><span>+12%</span></div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "75%" }} transition={{ duration: 1.5, delay: 1 }} className="h-full bg-[#169C46]"></motion.div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400"><span>Strength</span><span>+4%</span></div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "45%" }} transition={{ duration: 1.5, delay: 1.2 }} className="h-full bg-[#0B7A35]"></motion.div>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-400"><span>Endurance</span><span>-2%</span></div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: "60%" }} transition={{ duration: 1.5, delay: 1.4 }} className="h-full bg-amber-500"></motion.div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-500 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#169C46]" /> Synced with Ground Medical Team
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- HOW IT WORKS SECTION --- */}
      <section id="how-it-works" className="relative z-10 bg-slate-900/50 py-24 sm:py-32 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mx-auto max-w-2xl text-center mb-16"
          >
            <h2 className="text-base font-semibold leading-7 text-[#169C46]">Clinical Workflow</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How ASTRA RECOVER works.
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              A strict, traceable loop connecting the astronaut's physical execution with the ground medical team's clinical oversight.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ClipboardList, title: "1. Assess", desc: "Record functional measurements using approved protocols. Data is saved locally and tagged with its source." },
              { icon: CalendarDays, title: "2. Plan", desc: "Ground Medical reviews assessments and approves rehabilitation plans. Astronauts never modify their own clinical prescriptions." },
              { icon: Dumbbell, title: "3. Execute", desc: "Complete scheduled exercise sessions. Record actual duration and any deviations from the approved plan." },
              { icon: RefreshCw, title: "4. Sync", desc: "Local records are safely transmitted to the medical team when connectivity is available, marked 'Delivered' only upon acknowledgement." }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="relative flex flex-col p-6 rounded-xl border border-slate-800 bg-slate-950 hover:border-[#0B7A35]/50 transition-colors group"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#0B7A35]/10 text-[#169C46] group-hover:bg-[#0B7A35] group-hover:text-white transition-colors">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section id="features" className="relative z-10 bg-slate-950 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-base font-semibold leading-7 text-[#169C46]">Clinical Credibility</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Designed for the realities of spaceflight.
            </p>
          </motion.div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              
              <motion.div 
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#0B7A35]/20 text-[#169C46]">
                    <WifiOff className="h-6 w-6" />
                  </div>
                  Offline-First Architecture
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                  <p className="flex-auto">Records are saved locally via IndexedDB first. If communication drops, your data remains secure and will automatically queue for transmission when connectivity is restored.</p>
                </dd>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#0B7A35]/20 text-[#169C46]">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  Human Medical Oversight
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                  <p className="flex-auto">The software supports medical professionals; it does not replace them. All plans require clinician approval, and assessment flags are routed directly to the Ground Medical Team.</p>
                </dd>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-[#0B7A35]/20 text-[#169C46]">
                    <LineChart className="h-6 w-6" />
                  </div>
                  Functional Evidence
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-slate-400">
                  <p className="flex-auto">We strictly distinguish activity completion from actual physical recovery. Measurement trends are plotted against baselines with full traceability, never hidden behind an arbitrary "recovery score."</p>
                </dd>
              </motion.div>

            </dl>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
             <div className="flex h-6 w-6 items-center justify-center rounded bg-[#0B7A35] text-white">
              <Hexagon className="h-3 w-3" />
            </div>
            <span className="text-sm font-semibold text-slate-300">ASTRA RECOVER</span>
          </div>
          <p className="text-xs text-slate-500">
            &copy; 2026 Northern Innovators. All rights reserved. This is a prototype UI.
          </p>
          <div className="flex gap-4 text-sm text-slate-400">
             <Link to="/terms" className="hover:text-white transition-colors">Privacy</Link>
             <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}