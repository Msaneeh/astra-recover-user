import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Activity, CalendarCheck, ShieldAlert, ArrowRight, 
  Dumbbell, ClipboardList, Stethoscope, Wifi, CheckCircle2, 
  Clock, AlertCircle, FileText
} from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';

// Animation variants for staggered entrance
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function Overview() {
  const { user } = useAuthContext();
  const firstName = user?.name?.split('@')[0] || 'Crew Member';

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="show" 
      className="space-y-8 pb-12"
    >
      
      {/* SECTION A: Welcome & Mission Context */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white capitalize">
            Good morning, {firstName}.
          </h1>
          <p className="mt-2 text-[15px] text-slate-500 dark:text-slate-400">
            Here is your recovery summary for today.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm bg-white dark:bg-[#1C1C1E] border border-slate-200 dark:border-slate-800 rounded-full px-4 py-2 shadow-sm">
          <span className="flex items-center gap-1.5 font-medium text-slate-700 dark:text-slate-300">
            <span className="h-2 w-2 rounded-full bg-[#0B7A35]"></span> ASTR-001
          </span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="font-mono text-[#0B7A35] dark:text-[#169C46] font-medium tracking-tight">
            MET 042:13:07:22
          </span>
          <span className="text-slate-300 dark:text-slate-700">|</span>
          <span className="text-slate-500">14 Nov 2026</span>
        </div>
      </motion.div>

      {/* SECTION B: Recovery Overview (3 Cards) */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-[#0B7A35]/10 text-[#0B7A35] dark:text-[#169C46] rounded-xl">
              <Activity className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Pathways</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-slate-900 dark:text-white">2</span>
            <span className="text-sm text-slate-500">Active</span>
          </div>
          <div className="mt-3 text-xs text-slate-500 flex gap-2">
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">Injury</span>
            <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">Deconditioning</span>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
              <CalendarCheck className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Today's Activities</h3>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-slate-900 dark:text-white">1 <span className="text-xl text-slate-400 font-normal">/ 2</span></span>
            <span className="text-sm text-slate-500">Completed</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
            <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Next Assessment</h3>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-slate-900 dark:text-white truncate">Mobility Assessment</span>
            <span className="text-sm text-slate-500 mt-1">Due in 4 days (Nov 18)</span>
          </div>
          <Link to="/assessments" className="mt-3 text-xs font-medium text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1">
            Prepare <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SECTION C: Today's Schedule */}
        <motion.div variants={item} className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E] overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800/50">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Today's Schedule</h2>
            <Link to="/sessions" className="text-sm font-medium text-[#0B7A35] dark:text-[#169C46] hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
            
            {/* Completed Item */}
            <div className="p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 group-hover:text-[#0B7A35] transition-colors">
                  <Dumbbell className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">Lower Body Strength</h4>
                  <p className="text-[13px] text-slate-500 mt-0.5">Injury Rehabilitation • Plan IR-001</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 text-xs font-semibold border border-emerald-200 dark:border-emerald-800/50">
                <CheckCircle2 className="h-3.5 w-3.5" /> Completed
              </div>
            </div>

            {/* Scheduled Item */}
            <div className="p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 group-hover:text-blue-500 transition-colors">
                  <Dumbbell className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">Functional Movement</h4>
                  <p className="text-[13px] text-slate-500 mt-0.5">Deconditioning • Plan PC-002</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 text-xs font-semibold border border-blue-200 dark:border-blue-800/50">
                <Clock className="h-3.5 w-3.5" /> Scheduled
              </div>
            </div>

            {/* Awaiting Review Item */}
            <div className="p-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl text-slate-400 group-hover:text-amber-500 transition-colors">
                  <ClipboardList className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-slate-100">Mobility Assessment</h4>
                  <p className="text-[13px] text-slate-500 mt-0.5">Injury Rehabilitation • Protocol V2</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 text-xs font-semibold border border-amber-200 dark:border-amber-800/50">
                <AlertCircle className="h-3.5 w-3.5" /> Awaiting Review
              </div>
            </div>

          </div>
        </motion.div>

        {/* Right Column: Section D, E, F */}
        <div className="space-y-6">
          
          {/* SECTION E: Medical Review */}
          <motion.div variants={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
            <div className="flex items-center gap-2 mb-4">
              <Stethoscope className="h-5 w-5 text-rose-500" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Medical Review</h2>
            </div>
            <div className="rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-900/30 p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-rose-800 dark:text-rose-300">Observation Flagged</h4>
                  <p className="text-[13px] text-rose-600/80 dark:text-rose-400/80 mt-1">
                    Two consecutive assessments show a downward trend in mobility.
                  </p>
                  <p className="text-xs text-rose-500/70 dark:text-rose-400/50 mt-2 font-medium">
                    Recorded: 10 Nov 2026
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SECTION F: Synchronization Summary */}
          <motion.div variants={item} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Wifi className="h-5 w-5 text-slate-400" />
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">System Status</h2>
              </div>
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">Pending</span>
                <span className="text-lg font-semibold text-slate-900 dark:text-white">0</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">Synced</span>
                <span className="text-lg font-semibold text-slate-900 dark:text-white">12</span>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                <span className="block text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">Failed</span>
                <span className="text-lg font-semibold text-rose-600 dark:text-rose-400">0</span>
              </div>
            </div>
            
            <Link 
              to="/sync" 
              className="block w-full text-center rounded-xl bg-slate-100 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              Open Sync Queue
            </Link>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}