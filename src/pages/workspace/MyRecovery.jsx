import { motion } from 'motion/react';
import { 
  Activity, ShieldAlert, CheckCircle2, ChevronRight, 
  Dumbbell, Stethoscope, CalendarDays, FileText, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function MyRecovery() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12">
      
      {/* SECTION A: Recovery Profile Header */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">My Recovery</h1>
          <p className="mt-2 text-[15px] text-slate-500 dark:text-slate-400">
            Detailed clinical profile, active pathways, and baseline measurements.
          </p>
        </div>
        
        {/* Profile summary pill */}
        <div className="flex flex-wrap items-center gap-3 text-sm bg-white dark:bg-[#1C1C1E] border border-slate-200 dark:border-slate-800 rounded-2xl px-5 py-3 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span className="font-medium text-slate-700 dark:text-slate-300">Status: Active</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:block">|</span>
          <div className="text-slate-500">
            Last Assessed: <span className="font-medium text-slate-700 dark:text-slate-300">12 Nov</span>
          </div>
          <span className="text-slate-300 dark:text-slate-700 hidden sm:block">|</span>
          <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium bg-amber-50 dark:bg-amber-500/10 px-2 py-0.5 rounded-md">
            <ShieldAlert className="h-3.5 w-3.5" /> Medical Review Pending
          </div>
        </div>
      </motion.div>

      {/* SECTION B: Active Recovery Pathways */}
      <motion.div variants={item}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Activity className="h-5 w-5 text-[#0B7A35] dark:text-[#169C46]" />
            Active Recovery Pathways
          </h2>
          <span className="text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded-full">2 Active</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          
          {/* Pathway 1: Injury Rehab */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E] flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-amber-400"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Injury Rehabilitation</h3>
                <p className="text-sm text-slate-500 mt-1">Musculoskeletal injury — example record</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-800/50">
                Under Review
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/50">
              <div>
                <span className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Associated Plan</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">Plan IR-001</span>
              </div>
              <div>
                <span className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Last Assessment</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">12 Nov 2026</span>
              </div>
            </div>

            <Link to="/plans" className="mt-5 flex items-center justify-between w-full rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 p-3 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors group">
              View Injury Pathway
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </Link>
          </div>

          {/* Pathway 2: Deconditioning */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E] flex flex-col h-full relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-[#0B7A35]"></div>
            
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Physical Deconditioning</h3>
                <p className="text-sm text-slate-500 mt-1">Physical conditioning and functional maintenance</p>
              </div>
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-800/50">
                Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-slate-100 dark:border-slate-800/50">
              <div>
                <span className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Associated Plan</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">Plan PC-002</span>
              </div>
              <div>
                <span className="block text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Last Assessment</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white">10 Nov 2026</span>
              </div>
            </div>

            <Link to="/plans" className="mt-5 flex items-center justify-between w-full rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 p-3 text-sm font-medium text-slate-700 dark:text-slate-300 transition-colors group">
              View Conditioning Pathway
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" />
            </Link>
          </div>

        </div>
      </motion.div>

      {/* SECTION C & D: Baselines and Current Measurements */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Baseline Profile */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E] overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800/50 flex items-center gap-2">
            <FileText className="h-5 w-5 text-slate-400" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Baseline Profile</h2>
          </div>
          <div className="p-5">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="pb-3 font-medium">Measurement</th>
                  <th className="pb-3 font-medium">Baseline</th>
                  <th className="pb-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                <tr>
                  <td className="py-3 text-slate-700 dark:text-slate-300">Functional strength</td>
                  <td className="py-3 font-medium text-slate-900 dark:text-white">142 kg</td>
                  <td className="py-3 text-slate-500">01 Nov 2026</td>
                </tr>
                <tr>
                  <td className="py-3 text-slate-700 dark:text-slate-300">Endurance (VO2 max)</td>
                  <td className="py-3 font-medium text-slate-900 dark:text-white">38 ml/kg/min</td>
                  <td className="py-3 text-slate-500">01 Nov 2026</td>
                </tr>
                <tr>
                  <td className="py-3 text-slate-700 dark:text-slate-300">Mobility Index</td>
                  <td className="py-3 font-medium text-slate-900 dark:text-white">84 units</td>
                  <td className="py-3 text-slate-500">01 Nov 2026</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Current Measurements */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E] overflow-hidden">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800/50 flex items-center gap-2">
            <Activity className="h-5 w-5 text-[#0B7A35] dark:text-[#169C46]" />
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Current Measurements</h2>
          </div>
          <div className="p-5">
             <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="pb-3 font-medium">Measurement</th>
                  <th className="pb-3 font-medium">Latest</th>
                  <th className="pb-3 font-medium">Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                <tr>
                  <td className="py-3 text-slate-700 dark:text-slate-300">Functional strength</td>
                  <td className="py-3 font-medium text-slate-900 dark:text-white">145 kg</td>
                  <td className="py-3 text-emerald-600 dark:text-emerald-400 font-medium">+3 kg</td>
                </tr>
                <tr>
                  <td className="py-3 text-slate-700 dark:text-slate-300">Endurance (VO2 max)</td>
                  <td className="py-3 font-medium text-slate-900 dark:text-white">37 ml/kg/min</td>
                  <td className="py-3 text-amber-600 dark:text-amber-400 font-medium">-1 ml/kg/min</td>
                </tr>
                <tr>
                  <td className="py-3 text-slate-700 dark:text-slate-300">Mobility Index</td>
                  <td className="py-3 font-medium text-slate-900 dark:text-white">82 units</td>
                  <td className="py-3 text-amber-600 dark:text-amber-400 font-medium">-2 units</td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-500/10 rounded-xl border border-amber-100 dark:border-amber-900/30 flex gap-2">
              <ShieldAlert className="h-4 w-4 text-amber-600 dark:text-amber-400 shrink-0" />
              <p className="text-xs text-amber-700 dark:text-amber-300">
                Two consecutive assessments show a downward trend in Mobility Index. Awaiting medical review.
              </p>
            </div>
          </div>
        </div>

      </motion.div>

      {/* SECTION E & F: Associated Plans & History */}
      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Associated Plans */}
        <div className="lg:col-span-1 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Associated Plans</h2>
          <div className="space-y-3">
            <Link to="/plans" className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                <Dumbbell className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Injury Recovery Programme</h4>
                <p className="text-xs text-slate-500 mt-0.5">Plan IR-001</p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>
            <Link to="/plans" className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
              <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
                <Activity className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Physical Conditioning</h4>
                <p className="text-xs text-slate-500 mt-0.5">Plan PC-002</p>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Recovery History (Timeline) */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">Recovery History</h2>
          
          <div className="relative border-l border-slate-200 dark:border-slate-800 ml-3 space-y-6">
            
            <div className="relative pl-6">
              <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-[#0B7A35] border-2 border-white dark:border-[#1C1C1E]"></div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-slate-500">12 Nov 2026</span>
              </div>
              <h4 className="text-sm font-medium text-slate-900 dark:text-white">Mobility Assessment Recorded</h4>
              <p className="text-xs text-slate-500 mt-1">Submitted for medical review.</p>
            </div>

            <div className="relative pl-6">
              <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-[#1C1C1E]"></div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-slate-500">05 Nov 2026</span>
              </div>
              <h4 className="text-sm font-medium text-slate-900 dark:text-white">Session Completed</h4>
              <p className="text-xs text-slate-500 mt-1">Lower Body Strength • 45 mins.</p>
            </div>

            <div className="relative pl-6">
              <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-slate-300 dark:bg-slate-600 border-2 border-white dark:border-[#1C1C1E]"></div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-slate-500">01 Nov 2026</span>
              </div>
              <h4 className="text-sm font-medium text-slate-900 dark:text-white">Plan Assigned</h4>
              <p className="text-xs text-slate-500 mt-1">Plan IR-001 assigned by Ground Medical Team.</p>
            </div>

          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}