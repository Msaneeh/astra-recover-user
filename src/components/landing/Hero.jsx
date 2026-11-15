import { ArrowRight, ShieldCheck, Activity, CheckCircle2 } from "lucide-react";
import { useAuthContext } from '../../context/AuthContext';
import { motion } from "motion/react";
import { Link } from "react-router-dom";

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

const Hero = () => {
    const { user } = useAuthContext();

  const ctaLink = user ? "/overview" : "/auth";
  const ctaText = user ? "Return to Workspace" : "Access Workspace";

  return (
    <>
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
    </>
  )
}

export default Hero