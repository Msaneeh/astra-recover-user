import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
   WifiOff, 
  Stethoscope, LineChart, Hexagon,
} from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Hero from '@/components/landing/Hero';
import Works from '@/components/landing/Works';

// Animation Variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Landing() {
  

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-[#0B7A35] selection:text-white overflow-hidden">
      
      {/* --- NAVBAR --- */}
      <Navbar />

      {/* --- HERO SECTION --- */}
      <Hero />

      {/* --- HOW IT WORKS SECTION --- */}
      <Works />

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