import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  LineChart, Activity, AlertCircle, CheckCircle2, 
  Clock, ArrowRight, ShieldAlert, FileText, ChevronDown
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

// Mock Data for the chart (Synthetic values as specified)
const chartData = [
  { date: 'Oct 15', value: 60 },
  { date: 'Oct 20', value: 64 },
  { date: 'Oct 25', value: 62 },
  { date: 'Nov 01', value: 68 },
  { date: 'Nov 08', value: 65 },
];

export default function ProgressInsights() {
  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12">
      
      {/* SECTION A: Page Header & Measurement Selector */}
      <motion.div variants={item} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Progress & Insights</h1>
          <p className="mt-2 text-[15px] text-slate-500 dark:text-slate-400">
            Compare measurements and review observations over time.
          </p>
        </div>

        {/* Measurement Selectors (Apple-style segmented controls) */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select className="appearance-none bg-white dark:bg-[#1C1C1E] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B7A35]">
              <option>Functional strength</option>
              <option>Mobility Index</option>
              <option>Endurance (VO2 max)</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
          <div className="relative">
            <select className="appearance-none bg-white dark:bg-[#1C1C1E] border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B7A35]">
              <option>Last 30 days</option>
              <option>Last 60 days</option>
              <option>All time</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* SECTION B: Measurement Trend Chart */}
        <motion.div variants={item} className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <LineChart className="h-5 w-5 text-[#0B7A35] dark:text-[#169C46]" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Functional measurement trend</h2>
            </div>
            <span className="text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 px-2.5 py-1 rounded-full">
              Illustrative data
            </span>
          </div>

          {/* Clean SVG Chart Area */}
          <div className="relative h-64 w-full">
            {/* Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between text-xs text-slate-400 pb-8">
              <div className="border-t border-slate-100 dark:border-slate-800 w-full flex items-center"><span className="bg-white dark:bg-[#1C1C1E] pr-2 -mt-2">84</span></div>
              <div className="border-t border-slate-100 dark:border-slate-800 w-full flex items-center"><span className="bg-white dark:bg-[#1C1C1E] pr-2 -mt-2">78</span></div>
              <div className="border-t border-slate-100 dark:border-slate-800 w-full flex items-center"><span className="bg-white dark:bg-[#1C1C1E] pr-2 -mt-2">72</span></div>
              <div className="border-t border-slate-100 dark:border-slate-800 w-full flex items-center"><span className="bg-white dark:bg-[#1C1C1E] pr-2 -mt-2">66</span></div>
              <div className="border-t border-slate-100 dark:border-slate-800 w-full flex items-center"><span className="bg-white dark:bg-[#1C1C1E] pr-2 -mt-2">60</span></div>
            </div>

            {/* SVG Line */}
            <svg className="absolute inset-0 h-full w-full pl-8 pb-8" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#169C46" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#169C46" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Area fill */}
              <motion.path 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                d="M 0,100 L 0,100 L 25,80 L 50,86 L 75,73 L 100,80 L 100,100 Z" 
                fill="url(#gradient)" 
              />
              
              {/* Line stroke */}
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                d="M 0,100 L 25,80 L 50,86 L 75,73 L 100,80" 
                fill="none" 
                stroke="#0B7A35" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                vectorEffect="non-scaling-stroke"
              />

              {/* Data points */}
              {[
                { x: '0', y: '100' },
                { x: '25', y: '80' },
                { x: '50', y: '86' },
                { x: '75', y: '73' },
                { x: '100', y: '80' }
              ].map((point, i) => (
                <motion.circle 
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1 + (i * 0.1) }}
                  cx={point.x} 
                  cy={point.y} 
                  r="3" 
                  fill="#0B7A35" 
                  stroke="white" 
                  strokeWidth="1.5" 
                  vectorEffect="non-scaling-stroke"
                />
              ))}
            </svg>
            
            {/* X-Axis Labels */}
            <div className="absolute bottom-0 left-8 right-0 flex justify-between text-xs text-slate-400 font-medium">
              {chartData.map((d, i) => (
                <span key={i}>{d.date}</span>
              ))}
            </div>
          </div>

          {/* Protocol Context */}
          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-start gap-2 text-xs text-slate-500">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p>Protocol V2.1 • Source: Manual entry. Actual chart must show the measurement's unit, protocol, source, and assessment dates.</p>
          </div>
        </motion.div>

        {/* SECTION E: Recovery Observations */}
        <motion.div variants={item} className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
             <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Observations</h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-900/30">
                <div className="flex gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-amber-800 dark:text-amber-300">Downward Trend</h4>
                    <p className="text-[13px] text-amber-600/80 dark:text-amber-400/80 mt-1">
                      Two consecutive assessments show a downward trend in Mobility Index.
                    </p>
                    <Link to="/assessments" className="mt-2 text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1">
                      View supporting data <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex gap-3">
                  <Clock className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Incomplete Data</h4>
                    <p className="text-[13px] text-slate-600 dark:text-slate-400 mt-1">
                      Endurance assessment data is incomplete for the last 14 days.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION F: Review History */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Review History</h2>
            <div className="space-y-4 relative border-l border-slate-200 dark:border-slate-800 ml-2">
              <div className="relative pl-5">
                <div className="absolute -left-[5px] top-1 h-2.5 w-2.5 rounded-full bg-amber-500 ring-4 ring-white dark:ring-[#1C1C1E]"></div>
                <span className="text-xs font-semibold text-slate-500 block mb-1">12 Nov 2026</span>
                <p className="text-sm font-medium text-slate-900 dark:text-white">Flagged by System</p>
                <p className="text-xs text-slate-500 mt-0.5">Mobility trend observation created.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* SECTION D: Activity Adherence (Kept strictly separate) */}
      <motion.div variants={item} className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E] overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800/50 flex items-center gap-2">
          <Activity className="h-5 w-5 text-slate-400" />
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Activity Adherence</h2>
        </div>
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
           <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center border border-slate-100 dark:border-slate-800">
              <span className="block text-2xl font-semibold text-slate-900 dark:text-white">12</span>
              <span className="text-xs text-slate-500 mt-1 block">Scheduled</span>
           </div>
           <div className="bg-emerald-50 dark:bg-emerald-500/10 p-4 rounded-xl text-center border border-emerald-100 dark:border-emerald-800/50">
              <span className="block text-2xl font-semibold text-emerald-600 dark:text-emerald-400">10</span>
              <span className="text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-1 block">Completed</span>
           </div>
           <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl text-center border border-slate-100 dark:border-slate-800">
              <span className="block text-2xl font-semibold text-slate-900 dark:text-white">1</span>
              <span className="text-xs text-slate-500 mt-1 block">Missed</span>
           </div>
           <div className="bg-amber-50 dark:bg-amber-500/10 p-4 rounded-xl text-center border border-amber-100 dark:border-amber-800/50">
              <span className="block text-2xl font-semibold text-amber-600 dark:text-amber-400">1</span>
              <span className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1 block">Interrupted</span>
           </div>
        </div>
        <div className="px-6 pb-6">
           <p className="text-xs text-slate-500 text-center">
             Activity adherence tracks task completion, not physical recovery.
           </p>
        </div>
      </motion.div>

    </motion.div>
  );
}