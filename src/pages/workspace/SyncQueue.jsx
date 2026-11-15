import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wifi, WifiOff, RefreshCw, CheckCircle2, Clock, 
  AlertCircle, ChevronRight, X, RotateCw, Database
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

// Mock Data
const initialQueue = [
  { 
    id: 'REC-001', 
    type: 'Assessment', 
    status: 'Pending', 
    created: '14 Nov 2026, 08:30', 
    lastAttempt: '—', 
    attempts: 0, 
    localStatus: 'Saved locally',
    serverStatus: 'Awaiting connection'
  },
  { 
    id: 'REC-002', 
    type: 'Exercise session', 
    status: 'Delivered', 
    created: '14 Nov 2026, 07:15', 
    lastAttempt: '14 Nov 2026, 07:16', 
    attempts: 1, 
    localStatus: 'Saved locally',
    serverStatus: 'Acknowledged'
  },
  { 
    id: 'REC-003', 
    type: 'Medical report', 
    status: 'Failed', 
    created: '13 Nov 2026, 18:00', 
    lastAttempt: '13 Nov 2026, 18:05', 
    attempts: 3, 
    error: 'Timeout: Server did not acknowledge within 30s.',
    localStatus: 'Saved locally',
    serverStatus: 'Not received'
  },
];

export default function SyncQueue() {
  const [isOnline, setIsOnline] = useState(true); // Mock connection state
  const [queue, setQueue] = useState(initialQueue);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // Toggle Mock Connection
  const toggleConnection = () => setIsOnline(!isOnline);

  // Helper for status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-800/50';
      case 'Pending': return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-800/50';
      case 'Failed': return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-800/50';
      default: return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle2 className="h-3.5 w-3.5" />;
      case 'Pending': return <Clock className="h-3.5 w-3.5" />;
      case 'Failed': return <AlertCircle className="h-3.5 w-3.5" />;
      default: return null;
    }
  };

  const handleRetry = (id) => {
    // Simulate retry logic
    setQueue(queue.map(q => q.id === id ? { ...q, status: 'Pending', error: null } : q));
    setTimeout(() => {
      setQueue(prevQueue => prevQueue.map(q => q.id === id ? { ...q, status: 'Delivered', serverStatus: 'Acknowledged' } : q));
    }, 1500);
  };

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12 max-w-6xl mx-auto">
      
      {/* SECTION A: Connectivity Header */}
      <motion.div variants={item} className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Synchronization Queue</h1>
          <p className="mt-2 text-[15px] text-slate-500 dark:text-slate-400">
            Monitor local storage and transmission status of your records.
          </p>
        </div>
        
        <div className="flex items-center gap-3 bg-white dark:bg-[#1C1C1E] border border-slate-200 dark:border-slate-800 rounded-xl p-2 pr-4 shadow-sm">
          <button 
            onClick={toggleConnection}
            className={`p-2 rounded-lg transition-colors ${isOnline ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400'}`}
            title="Toggle mock connection state"
          >
            {isOnline ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />}
          </button>
          <div>
            <p className="text-xs font-medium text-slate-500">Connection</p>
            <p className={`text-sm font-semibold ${isOnline ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {isOnline ? 'Online' : 'Offline (Local Storage Active)'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* SECTION B: Sync Summary */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
          <p className="text-xs font-medium text-slate-500">Pending</p>
          <h3 className="text-2xl font-semibold text-amber-600 dark:text-amber-400 mt-1">1</h3>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
          <p className="text-xs font-medium text-slate-500">Sending</p>
          <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mt-1">0</h3>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
          <p className="text-xs font-medium text-slate-500">Delivered</p>
          <h3 className="text-2xl font-semibold text-emerald-600 dark:text-emerald-400 mt-1">1</h3>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
          <p className="text-xs font-medium text-slate-500">Failed</p>
          <h3 className="text-2xl font-semibold text-rose-600 dark:text-rose-400 mt-1">1</h3>
        </div>
      </motion.div>

      {/* SECTION C: Queue Records */}
      <motion.div variants={item} className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E] overflow-hidden">
        <div className="p-5 border-b border-slate-100 dark:border-slate-800/50 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <Database className="h-5 w-5 text-slate-400" /> Local Queue
          </h2>
          <button className="text-sm font-medium text-[#0B7A35] dark:text-[#169C46] hover:underline flex items-center gap-1">
            <RefreshCw className="h-4 w-4" /> Sync All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 text-xs uppercase tracking-wider text-slate-500 border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-4 font-medium">Record ID</th>
                <th className="px-6 py-4 font-medium">Type</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Created</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {queue.map((record) => (
                <tr key={record.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{record.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{record.type}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(record.status)}`}>
                      {getStatusIcon(record.status)} {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">{record.created}</td>
                  <td className="px-6 py-4 text-right flex items-center justify-end gap-2">
                    {record.status === 'Failed' && (
                      <button 
                        onClick={() => handleRetry(record.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        <RotateCw className="h-3.5 w-3.5" /> Retry
                      </button>
                    )}
                    <button 
                      onClick={() => setSelectedRecord(record)}
                      className="text-slate-400 hover:text-[#0B7A35] dark:hover:text-[#169C46] transition-colors p-1"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* SECTION D: Record Details Drawer */}
      <AnimatePresence>
        {selectedRecord && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedRecord(null)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white dark:bg-[#1C1C1E] shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Record Details</h2>
                  <p className="text-sm text-slate-500 mt-1">{selectedRecord.id}</p>
                </div>
                <button onClick={() => setSelectedRecord(null)} className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-full bg-slate-100 dark:bg-slate-800">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Status Banner */}
                <div className={`flex items-center gap-3 p-4 rounded-xl border ${getStatusStyle(selectedRecord.status)}`}>
                  {getStatusIcon(selectedRecord.status)}
                  <div>
                    <h4 className="text-sm font-semibold capitalize">Status: {selectedRecord.status}</h4>
                  </div>
                </div>

                {/* Error Details (if Failed) */}
                {selectedRecord.error && (
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-900/30">
                    <h4 className="text-sm font-semibold text-rose-800 dark:text-rose-300 mb-1">Error Details</h4>
                    <p className="text-xs text-rose-600 dark:text-rose-400 font-mono bg-white/50 dark:bg-black/20 p-2 rounded-lg mt-2">
                      {selectedRecord.error}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Record Type</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{selectedRecord.type}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Creation Time</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{selectedRecord.created}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Last Attempt</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{selectedRecord.lastAttempt}</span>
                  </div>
                  <div>
                    <span className="block text-xs text-slate-500 mb-1">Attempt Count</span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">{selectedRecord.attempts}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Local Storage</span>
                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="h-4 w-4" /> {selectedRecord.localStatus}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-500">Server Acknowledgment</span>
                    <span className={`text-sm font-medium flex items-center gap-1 ${selectedRecord.serverStatus === 'Acknowledged' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                      {selectedRecord.serverStatus === 'Acknowledged' ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                      {selectedRecord.serverStatus}
                    </span>
                  </div>
                </div>

              </div>

              <div className="p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
                <button 
                  onClick={() => setSelectedRecord(null)}
                  className="w-full rounded-xl bg-slate-200 dark:bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </motion.div>
  );
}