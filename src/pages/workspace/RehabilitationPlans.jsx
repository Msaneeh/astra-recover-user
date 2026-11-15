import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CalendarDays, ShieldCheck, ChevronRight, X, 
  Dumbbell, Activity, Clock, FileText, CheckCircle2, AlertCircle
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

// Mock Plans
const plans = {
  injury: [
    {
      id: 'IR-001',
      title: 'Injury Recovery Programme',
      status: 'Active',
      approvedBy: 'Dr. A. Vance (Flight Surgeon)',
      effectiveDate: '12 Nov 2026',
      nextReview: '19 Nov 2026',
      activityCount: 5,
      purpose: 'Restore lower limb strength and mobility following musculoskeletal strain.',
    },
    {
      id: 'IR-000',
      title: 'Initial Injury Stabilization',
      status: 'Completed',
      approvedBy: 'Dr. A. Vance (Flight Surgeon)',
      effectiveDate: '01 Oct 2026',
      nextReview: 'N/A',
      activityCount: 3,
      purpose: 'Acute phase management and pain reduction.',
    }
  ],
  deconditioning: [
    {
      id: 'PC-002',
      title: 'Physical Conditioning Programme',
      status: 'Active',
      approvedBy: 'Dr. M. Chen (Crew Medical Officer)',
      effectiveDate: '10 Nov 2026',
      nextReview: '24 Nov 2026',
      activityCount: 4,
      purpose: 'Maintain cardiovascular endurance and prevent microgravity-induced muscle atrophy.',
    }
  ]
};

export default function RehabilitationPlans() {
  const [activeTab, setActiveTab] = useState('injury');
  const [selectedPlan, setSelectedPlan] = useState(null);

  const currentPlans = plans[activeTab];

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12">
      
      {/* SECTION A: Page Header & Categories */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Rehabilitation Plans</h1>
          <p className="mt-2 text-[15px] text-slate-500 dark:text-slate-400">
            Review your approved recovery programmes and prescribed activities.
          </p>
        </div>
        
        {/* Tab Switcher */}
        <div className="inline-flex bg-slate-100 dark:bg-[#1C1C1E] p-1 rounded-xl border border-slate-200 dark:border-slate-800">
          <button
            onClick={() => setActiveTab('injury')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'injury' 
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Injury Rehabilitation
          </button>
          <button
            onClick={() => setActiveTab('deconditioning')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'deconditioning' 
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            Physical Deconditioning
          </button>
        </div>
      </motion.div>

      {/* SECTION B: Active Plans List */}
      <motion.div variants={item} className="grid grid-cols-1 gap-6">
        {currentPlans.map((plan) => (
          <div 
            key={plan.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E] flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group"
          >
            {/* Status indicator line */}
            <div className={`absolute top-0 left-0 w-1 h-full ${plan.status === 'Active' ? 'bg-[#0B7A35]' : 'bg-slate-300 dark:bg-slate-700'}`}></div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{plan.title}</h3>
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                  plan.status === 'Active' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-800/50' 
                    : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'
                }`}>
                  {plan.status}
                </span>
              </div>
              
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">
                PLAN {plan.id} • {activeTab === 'injury' ? 'INJURY REHABILITATION' : 'PHYSICAL DECONDITIONING'}
              </p>
              
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {plan.purpose}
              </p>

              <div className="flex flex-wrap gap-6 pt-2">
                <div>
                  <span className="block text-xs font-medium text-slate-500 mb-1">Effective Date</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{plan.effectiveDate}</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-slate-500 mb-1">Next Review</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{plan.nextReview}</span>
                </div>
                <div>
                  <span className="block text-xs font-medium text-slate-500 mb-1">Assigned Activities</span>
                  <span className="text-sm font-semibold text-slate-900 dark:text-white">{plan.activityCount}</span>
                </div>
              </div>
            </div>

            <div className="shrink-0 pt-4 md:pt-0">
              <button 
                onClick={() => setSelectedPlan(plan)}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors"
              >
                View plan details <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </motion.div>

      {/* SECTION C: Plan Details Drawer */}
      <AnimatePresence>
        {selectedPlan && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedPlan(null)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white dark:bg-[#1C1C1E] shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Plan Details</h2>
                  <p className="text-sm text-slate-500 mt-1">{selectedPlan.id}</p>
                </div>
                <button onClick={() => setSelectedPlan(null)} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                
                {/* Approval Banner */}
                <div className="flex items-start gap-3 p-4 bg-[#0B7A35]/5 dark:bg-[#0B7A35]/10 rounded-xl border border-[#0B7A35]/10 dark:border-[#0B7A35]/20">
                  <ShieldCheck className="h-5 w-5 text-[#0B7A35] dark:text-[#169C46] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-semibold text-[#0B7A35] dark:text-[#169C46]">Clinician Approved</h4>
                    <p className="text-xs text-[#0B7A35]/80 dark:text-[#169C46]/80 mt-1">
                      This plan has been authorized by {selectedPlan.approvedBy}. Astronauts cannot modify clinical prescriptions.
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{selectedPlan.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{selectedPlan.purpose}</p>
                </div>

                {/* Clinical Purpose & Schedule */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">Overview</h4>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block text-xs text-slate-500 mb-1">Pathway</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white capitalize">{activeTab === 'injury' ? 'Injury Rehabilitation' : 'Deconditioning'}</span>
                    </div>
                    <div>
                      <span className="block text-xs text-slate-500 mb-1">Effective Date</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{selectedPlan.effectiveDate}</span>
                    </div>
                  </div>
                </div>

                {/* Approved Activities List */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">Approved Activities</h4>
                  
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                        <div className="p-2 bg-white dark:bg-slate-700 rounded-lg shadow-sm">
                          <Dumbbell className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                        </div>
                        <div className="flex-1">
                          <h5 className="text-sm font-medium text-slate-900 dark:text-white">Exercise Activity {i}</h5>
                          <p className="text-xs text-slate-500">3 sets • 12 reps</p>
                        </div>
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      </div>
                    ))}
                    {selectedPlan.activityCount > 3 && (
                       <p className="text-xs text-center text-slate-500 pt-2">+ {selectedPlan.activityCount - 3} more activities</p>
                    )}
                  </div>
                </div>

                {/* Restrictions & Safety */}
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">Safety Notes</h4>
                  <div className="flex gap-3 text-sm text-slate-600 dark:text-slate-400 bg-rose-50 dark:bg-rose-500/10 p-4 rounded-xl border border-rose-100 dark:border-rose-900/30">
                    <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />
                    <p>Stop immediately if sharp pain is experienced. Report any discomfort in the post-session feedback.</p>
                  </div>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <button className="w-full rounded-xl bg-slate-200 dark:bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2">
                  <FileText className="h-4 w-4" /> Download Plan PDF
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}