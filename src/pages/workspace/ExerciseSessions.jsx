import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PlayCircle, CheckCircle2, Clock, AlertCircle, 
  Dumbbell, X, ChevronRight, Pause, Square, ShieldAlert
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

// Mock Sessions
const todaySessions = [
  {
    id: 'SESS-001',
    name: 'Lower Body Strength',
    pathway: 'Injury Rehabilitation',
    plan: 'Plan IR-001',
    duration: 45,
    status: 'Completed',
    time: '08:00 AM'
  },
  {
    id: 'SESS-002',
    name: 'Functional Movement',
    pathway: 'Deconditioning',
    plan: 'Plan PC-002',
    duration: 30,
    status: 'Scheduled',
    time: '14:00 PM'
  }
];

export default function ExerciseSessions() {
  const [activeSession, setActiveSession] = useState(null); // Session object
  const [sessionState, setSessionState] = useState('idle'); // 'idle' | 'active' | 'paused' | 'feedback'
  const [timer, setTimer] = useState(0); // in seconds

  // Timer logic
  useEffect(() => {
    let interval = null;
    if (sessionState === 'active') {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else if (sessionState !== 'active' && interval) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [sessionState]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startSession = (session) => {
    setActiveSession(session);
    setTimer(0);
    setSessionState('active');
  };

  const endSession = () => {
    setSessionState('feedback');
  };

  const closeSession = () => {
    setActiveSession(null);
    setSessionState('idle');
    setTimer(0);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12">
      
      {/* SECTION A: Page Header */}
      <motion.div variants={item}>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Exercise Sessions</h1>
        <p className="mt-2 text-[15px] text-slate-500 dark:text-slate-400">
          Execute your assigned activities and record your completion.
        </p>
      </motion.div>

      {/* SECTION A: Today's Sessions List */}
      <motion.div variants={item} className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Today's Schedule</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {todaySessions.map((session) => (
            <div 
              key={session.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E] flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${session.status === 'Completed' ? 'bg-slate-100 text-slate-500 dark:bg-slate-800' : 'bg-[#0B7A35]/10 text-[#0B7A35] dark:text-[#169C46]'}`}>
                    <Dumbbell className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{session.name}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{session.pathway} • {session.plan}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                  session.status === 'Completed' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-800/50' 
                    : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-800/50'
                }`}>
                  {session.status === 'Completed' ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clock className="h-3.5 w-3.5" />}
                  {session.status}
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/50 mt-2">
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {session.duration} min</span>
                  <span>Scheduled: {session.time}</span>
                </div>
                
                {session.status === 'Scheduled' ? (
                  <button 
                    onClick={() => startSession(session)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#0B7A35] px-4 py-2 text-sm font-semibold text-white hover:bg-[#096328] transition-colors"
                  >
                    <PlayCircle className="h-4 w-4" /> Start
                  </button>
                ) : (
                  <button className="inline-flex items-center gap-1 text-sm font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                    View Record <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* SECTION E: Session History Table */}
      <motion.div variants={item} className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E] overflow-hidden mt-8">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800/50">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Session History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-4 font-medium">Activity</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Duration</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
               <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Lower Body Strength</td>
                  <td className="px-6 py-4 text-sm text-slate-500">13 Nov 2026</td>
                  <td className="px-6 py-4 text-sm text-slate-500">45 min</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                    </span>
                  </td>
               </tr>
               <tr className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">Functional Movement</td>
                  <td className="px-6 py-4 text-sm text-slate-500">11 Nov 2026</td>
                  <td className="px-6 py-4 text-sm text-slate-500">32 min</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">
                      <AlertCircle className="h-3.5 w-3.5" /> Interrupted
                    </span>
                  </td>
               </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* SECTION C & D: Active Session Interface & Feedback */}
      <AnimatePresence>
        {activeSession && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-2xl bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col"
            >
              
              {sessionState !== 'feedback' ? (
                <>
                  {/* Active Session Header */}
                  <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <div>
                      <p className="text-xs font-semibold text-[#0B7A35] dark:text-[#169C46] uppercase tracking-wider mb-1">
                        {activeSession.plan} • {activeSession.pathway}
                      </p>
                      <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">{activeSession.name}</h2>
                    </div>
                    <button onClick={closeSession} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full bg-slate-200 dark:bg-slate-800">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Timer & Controls */}
                  <div className="p-8 flex flex-col items-center justify-center space-y-8">
                    <div className="text-center space-y-2">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-medium text-slate-600 dark:text-slate-300 mb-4">
                        <span className={`h-2 w-2 rounded-full ${sessionState === 'active' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`}></span>
                        {sessionState === 'active' ? 'Session in Progress' : 'Session Paused'}
                      </div>
                      <div className="text-7xl font-mono font-light tracking-tighter text-slate-900 dark:text-white">
                        {formatTime(timer)}
                      </div>
                      <p className="text-sm text-slate-500">Elapsed session time</p>
                    </div>

                    <div className="flex items-center gap-4">
                      {sessionState === 'active' ? (
                        <button 
                          onClick={() => setSessionState('paused')}
                          className="flex items-center gap-2 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 px-6 py-3 font-semibold hover:bg-amber-200 transition-colors"
                        >
                          <Pause className="h-5 w-5" /> Pause
                        </button>
                      ) : (
                        <button 
                          onClick={() => setSessionState('active')}
                          className="flex items-center gap-2 rounded-full bg-[#0B7A35] text-white px-6 py-3 font-semibold hover:bg-[#096328] transition-colors shadow-lg shadow-[#0B7A35]/20"
                        >
                          <PlayCircle className="h-5 w-5" /> Resume
                        </button>
                      )}
                      
                      <button 
                        onClick={endSession}
                        className="flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-700 px-6 py-3 font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Square className="h-4 w-4" /> Finish Session
                      </button>
                    </div>
                  </div>

                  {/* Session Notes */}
                  <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/30">
                     <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      Session Notes (Optional)
                    </label>
                    <textarea 
                      rows="2" 
                      placeholder="Record any immediate observations or difficulties..."
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-[#0B7A35] outline-none resize-none"
                    ></textarea>
                  </div>
                </>
              ) : (
                /* SECTION D: Post-Session Feedback Form */
                <>
                  <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Post-Session Feedback</h2>
                      <p className="text-sm text-slate-500 mt-1">Record what happened during the session.</p>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh] custom-scrollbar">
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-900 dark:text-white">Did you complete the full activity?</label>
                      <div className="flex gap-3">
                        <button className="flex-1 py-3 rounded-xl border border-[#0B7A35] bg-[#0B7A35]/10 text-[#0B7A35] dark:text-[#169C46] font-semibold text-sm">Yes, fully completed</button>
                        <button className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium text-sm">Partially completed</button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-900 dark:text-white">Any deviations from the approved plan?</label>
                      <textarea rows="2" placeholder="e.g., Reduced weight, shortened duration..." className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm focus:ring-2 focus:ring-[#0B7A35] outline-none resize-none"></textarea>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-slate-900 dark:text-white flex items-center gap-2">
                        <ShieldAlert className="h-4 w-4 text-amber-500" />
                        Symptoms or discomfort reported?
                      </label>
                      <textarea rows="2" placeholder="Describe any pain or discomfort experienced..." className="w-full rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50 dark:bg-amber-500/10 px-4 py-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none resize-none"></textarea>
                    </div>

                    <div className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                       <input type="checkbox" id="requestReview" className="h-4 w-4 rounded border-slate-300 text-[#0B7A35] focus:ring-[#0B7A35]" />
                       <label htmlFor="requestReview" className="text-sm font-medium text-slate-700 dark:text-slate-300">
                         Request medical review of this session
                       </label>
                    </div>
                  </div>

                  <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3">
                    <button onClick={closeSession} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                      Discard
                    </button>
                    <button onClick={closeSession} className="px-6 py-2.5 rounded-xl bg-[#0B7A35] text-sm font-semibold text-white hover:bg-[#096328] transition-colors shadow-sm">
                      Save Session Record
                    </button>
                  </div>
                </>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.div>
  );
}