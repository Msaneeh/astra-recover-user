import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Clock, Send, AlertCircle, CheckCircle2, 
  ChevronRight, X, Plus, UploadCloud, Download
} from 'lucide-react';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

// Mock Reports
const mockReports = [
  { id: 'RPT-001', type: 'Functional assessment', date: '12 Nov 2026', status: 'Draft', pathway: 'Deconditioning', relatedRecord: 'AST-091' },
  { id: 'RPT-002', type: 'Recovery progress', date: '10 Nov 2026', status: 'Pending transmission', pathway: 'Injury', relatedRecord: 'SESS-042' },
  { id: 'RPT-003', type: 'Injury observation', date: '08 Nov 2026', status: 'Delivered', pathway: 'Injury', relatedRecord: 'MED-011' },
];

export default function MedicalReports() {
  const [isCreateDrawerOpen, setIsCreateDrawerOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const openReport = (report) => setSelectedReport(report);
  const closeReport = () => setSelectedReport(null);

  // Helper for status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-800/50';
      case 'Pending transmission': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-800/50';
      case 'Draft': return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
      case 'Failed': return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-800/50';
      default: return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle2 className="h-3.5 w-3.5" />;
      case 'Pending transmission': return <Clock className="h-3.5 w-3.5" />;
      case 'Draft': return <FileText className="h-3.5 w-3.5" />;
      case 'Failed': return <AlertCircle className="h-3.5 w-3.5" />;
      default: return null;
    }
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12">
      
      {/* SECTION A & B: Page Header & Report Overview */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Medical Reports</h1>
          <p className="mt-2 text-[15px] text-slate-500 dark:text-slate-400">
            Structured documentation for medical review and transmission.
          </p>
        </div>
        <button 
          onClick={() => setIsCreateDrawerOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B7A35] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#096328] transition-colors"
        >
          <Plus className="h-4 w-4" /> Create Report
        </button>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
          <p className="text-xs font-medium text-slate-500">Total Reports</p>
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mt-1">12</h3>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
          <p className="text-xs font-medium text-slate-500">Drafts</p>
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mt-1">1</h3>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
          <p className="text-xs font-medium text-slate-500">Awaiting Review</p>
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mt-1">2</h3>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
          <p className="text-xs font-medium text-slate-500">Pending Sync</p>
          <h3 className="text-2xl font-semibold text-[#0B7A35] dark:text-[#169C46] mt-1">1</h3>
        </div>
      </motion.div>

      {/* SECTION B: Reports Table */}
      <motion.div variants={item} className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-4 font-medium">Report ID & Type</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Pathway</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {mockReports.map((report) => (
                <tr 
                  key={report.id} 
                  onClick={() => openReport(report)}
                  className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 group-hover:text-[#0B7A35] transition-colors">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <span className="block font-medium text-slate-900 dark:text-white">{report.type}</span>
                        <span className="block text-xs text-slate-500 mt-0.5">{report.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{report.date}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 capitalize">{report.pathway}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(report.status)}`}>
                      {getStatusIcon(report.status)} {report.status}
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

      {/* CREATE REPORT DRAWER */}
      <AnimatePresence>
        {isCreateDrawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCreateDrawerOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-[#1C1C1E] shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Create Medical Report</h2>
                <button onClick={() => setIsCreateDrawerOpen(false)} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-5">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Report Category</label>
                  <select className="w-full rounded-xl border-none bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm focus:ring-2 focus:ring-[#0B7A35] outline-none">
                    <option>Assessment report</option>
                    <option>Recovery progress report</option>
                    <option>Injury observation report</option>
                    <option>Exercise session report</option>
                    <option>Medical event report</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Related Pathway</label>
                  <select className="w-full rounded-xl border-none bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm focus:ring-2 focus:ring-[#0B7A35] outline-none">
                    <option>Injury Rehabilitation</option>
                    <option>Physical Deconditioning</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Associated Record ID (Optional)</label>
                  <input type="text" placeholder="e.g., AST-091 or SESS-042" className="w-full rounded-xl border-none bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm focus:ring-2 focus:ring-[#0B7A35] outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Recorded Observations</label>
                  <textarea rows="4" placeholder="Enter clinical observations here..." className="w-full rounded-xl border-none bg-slate-100 dark:bg-slate-800 px-4 py-3 text-sm focus:ring-2 focus:ring-[#0B7A35] outline-none resize-none"></textarea>
                </div>
              </div>

              <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex gap-3">
                <button onClick={() => setIsCreateDrawerOpen(false)} className="flex-1 rounded-xl bg-slate-200 dark:bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                  Save Draft
                </button>
                <button onClick={() => setIsCreateDrawerOpen(false)} className="flex-1 rounded-xl bg-[#0B7A35] px-4 py-3 text-sm font-semibold text-white hover:bg-[#096328] transition-colors shadow-sm flex items-center justify-center gap-2">
                  <UploadCloud className="h-4 w-4" /> Submit for Review
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* REPORT DETAILS DRAWER */}
      <AnimatePresence>
        {selectedReport && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeReport}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white dark:bg-[#1C1C1E] shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{selectedReport.type}</h2>
                  <p className="text-sm text-slate-500 mt-1">{selectedReport.id}</p>
                </div>
                <button onClick={closeReport} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Status Banner */}
                <div className={`flex items-center gap-3 p-4 rounded-xl border ${getStatusStyle(selectedReport.status)}`}>
                  {getStatusIcon(selectedReport.status)}
                  <div>
                    <h4 className="text-sm font-semibold capitalize">Status: {selectedReport.status}</h4>
                    {selectedReport.status === 'Pending transmission' && (
                      <p className="text-xs mt-0.5 opacity-80">This record is queued locally and will transmit when connectivity is available.</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Date</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{selectedReport.date}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Pathway</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white capitalize">{selectedReport.pathway}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Related Record</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{selectedReport.relatedRecord}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Author</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">Crew Member</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">Observations</h4>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-400">
                    Patient reported mild improvement in lower limb mobility. No adverse events recorded during the session.
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-2">Revision History</h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-800">
                       <span className="text-slate-500">Created</span>
                       <span className="font-medium text-slate-900 dark:text-white">{selectedReport.date} 09:42</span>
                    </div>
                    {selectedReport.status !== 'Draft' && (
                      <div className="flex justify-between items-center py-2">
                        <span className="text-slate-500">Submitted for Review</span>
                        <span className="font-medium text-slate-900 dark:text-white">{selectedReport.date} 10:15</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex gap-3">
                 <button className="flex-1 rounded-xl bg-slate-200 dark:bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                  <Download className="h-4 w-4" /> Export
                </button>
                {selectedReport.status === 'Draft' && (
                   <button className="flex-1 rounded-xl bg-[#0B7A35] px-4 py-3 text-sm font-semibold text-white hover:bg-[#096328] transition-colors shadow-sm">
                    Submit Report
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