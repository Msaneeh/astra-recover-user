import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ClipboardList, AlertCircle, Clock, Plus, X, 
  ChevronRight, Activity, FileText, CheckCircle2
} from 'lucide-react';

// Mock Data
const mockAssessments = [
  { id: '1', name: 'Strength assessment', pathway: 'Deconditioning', date: '12 Nov 2026', status: 'Completed' },
  { id: '2', name: 'Mobility assessment', pathway: 'Injury', date: '10 Nov 2026', status: 'Awaiting review' },
  { id: '3', name: 'Endurance assessment', pathway: 'Deconditioning', date: '08 Nov 2026', status: 'Completed' },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function Assessments() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState('new'); // 'new' or 'view'

  const openDrawer = (mode) => {
    setDrawerMode(mode);
    setIsDrawerOpen(true);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12">
      
      {/* SECTION A: Page Header */}
      <motion.div variants={item} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Assessments</h1>
          <p className="mt-2 text-[15px] text-slate-500 dark:text-slate-400">
            Record, review and compare functional measurements.
          </p>
        </div>
        <button 
          onClick={() => openDrawer('new')}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B7A35] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#096328] transition-colors"
        >
          <Plus className="h-4 w-4" /> New Assessment
        </button>
      </motion.div>

      {/* SECTION B: Assessment Summary */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E] flex items-center gap-4">
          <div className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl">
            <ClipboardList className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Assessments</p>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">12</h3>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E] flex items-center gap-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl">
            <Clock className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Upcoming</p>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">1</h3>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E] flex items-center gap-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Awaiting Review</p>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">1</h3>
          </div>
        </div>
      </motion.div>

      {/* SECTION C: Assessment History Table */}
      <motion.div variants={item} className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E] overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800/50">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Assessment History</h2>
        </div>
        
        {/* Table Container with horizontal scroll for mobile */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-4 font-medium">Assessment</th>
                <th className="px-6 py-4 font-medium">Pathway</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {mockAssessments.map((assessment) => (
                <tr 
                  key={assessment.id} 
                  onClick={() => openDrawer('view')}
                  className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 group-hover:text-[#0B7A35] transition-colors">
                        <Activity className="h-4 w-4" />
                      </div>
                      <span className="font-medium text-slate-900 dark:text-white">{assessment.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {assessment.pathway}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {assessment.date}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      assessment.status === 'Completed' 
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-800/50' 
                        : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-800/50'
                    }`}>
                      {assessment.status === 'Completed' ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5" />}
                      {assessment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-[#0B7A35] dark:hover:text-[#169C46] transition-colors">
                      <ChevronRight className="h-5 w-5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* SLIDE-OVER DRAWER (Sections D & E) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            
            {/* Drawer Panel */}
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-[#1C1C1E] shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {drawerMode === 'new' ? 'New Assessment' : 'Assessment Details'}
                </h2>
                <button onClick={() => setIsDrawerOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-5">
                {drawerMode === 'new' ? (
                  <div className="space-y-5">
                    <div className="rounded-xl bg-blue-50 dark:bg-blue-500/10 p-3 text-sm text-blue-700 dark:text-blue-400 flex gap-2">
                      <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                      <p>Illustrative interface — fields must load from the approved assessment protocol.</p>
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Assessment Pathway</label>
                      <select className="w-full rounded-xl border-none bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm focus:ring-2 focus:ring-[#0B7A35] outline-none">
                        <option>Injury rehabilitation</option>
                        <option>Deconditioning</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Assessment Type</label>
                      <select className="w-full rounded-xl border-none bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm focus:ring-2 focus:ring-[#0B7A35] outline-none">
                        <option>Mobility assessment</option>
                        <option>Strength assessment</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Measurement</label>
                      <div className="flex gap-2">
                        <input type="number" defaultValue="72.5" className="w-full rounded-xl border-none bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm focus:ring-2 focus:ring-[#0B7A35] outline-none" />
                        <div className="flex items-center justify-center px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 text-sm font-medium border border-slate-200 dark:border-slate-700">
                          units
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Symptoms or observations</label>
                      <textarea rows="3" placeholder="Describe any relevant observations..." className="w-full rounded-xl border-none bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm focus:ring-2 focus:ring-[#0B7A35] outline-none resize-none"></textarea>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Mobility assessment</h3>
                      <p className="text-sm text-slate-500 mt-1">Injury Rehabilitation • 10 Nov 2026</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                        <span className="text-xs text-slate-500 block mb-1">Recorded Value</span>
                        <span className="text-lg font-semibold text-slate-900 dark:text-white">72.5 <span className="text-sm font-normal text-slate-500">units</span></span>
                      </div>
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                        <span className="text-xs text-slate-500 block mb-1">Protocol</span>
                        <span className="text-lg font-semibold text-slate-900 dark:text-white">V2.1</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">Observations</h4>
                      <p className="text-sm text-slate-500 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        Patient reported mild discomfort during the final repetition. No sharp pain.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">Status</h4>
                      <div className="flex items-center gap-2 text-sm text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 p-3 rounded-xl border border-amber-200 dark:border-amber-800/50">
                        <Clock className="h-4 w-4" /> Awaiting Medical Review
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                {drawerMode === 'new' ? (
                  <div className="flex gap-3">
                    <button className="flex-1 rounded-xl bg-slate-200 dark:bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                      Save Draft
                    </button>
                    <button className="flex-1 rounded-xl bg-[#0B7A35] px-4 py-3 text-sm font-semibold text-white hover:bg-[#096328] transition-colors shadow-sm">
                      Submit
                    </button>
                  </div>
                ) : (
                  <button className="w-full rounded-xl bg-slate-200 dark:bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                    <FileText className="h-4 w-4" /> View Associated Report
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}