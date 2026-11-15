import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, ShieldAlert, Settings as SettingsIcon, Lock, 
  Info, LogOut, Monitor, Globe, Bell
} from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const item = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const tabs = [
  { id: 'personal', name: 'Personal Profile', icon: User },
  { id: 'medical', name: 'Medical Profile', icon: ShieldAlert },
  { id: 'preferences', name: 'Preferences', icon: SettingsIcon },
  { id: 'security', name: 'Security', icon: Lock },
  { id: 'app', name: 'Application Info', icon: Info },
];

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('personal');
  const { user, logout } = useAuthContext();

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-8 pb-12 max-w-5xl mx-auto">
      
      {/* Page Header */}
      <motion.div variants={item}>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Profile & Settings</h1>
        <p className="mt-2 text-[15px] text-slate-500 dark:text-slate-400">
          Manage your personal information and application preferences.
        </p>
      </motion.div>

      <motion.div variants={item} className="flex flex-col md:flex-row gap-8">
        
        {/* Secondary Tab Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex md:flex-col gap-1 overflow-x-auto pb-2 md:pb-0 custom-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#0B7A35]/10 text-[#0B7A35] dark:bg-[#0B7A35]/20 dark:text-[#169C46]'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-200'
                }`}
              >
                <tab.icon className="h-4 w-4 shrink-0" />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* TAB 1: Personal Profile */}
          {activeTab === 'personal' && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800/50">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Personal Profile</h2>
                <p className="text-sm text-slate-500 mt-1">Your identity within the crew health system.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-400">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <button className="rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                      Change Avatar
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Display Name</label>
                    <input type="text" defaultValue={user?.name || 'Crew Member'} className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0B7A35] outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Astronaut ID</label>
                    <input type="text" defaultValue="ASTR-001" disabled className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Mission ID</label>
                    <input type="text" defaultValue="M-042" disabled className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Crew Role</label>
                    <input type="text" defaultValue="Mission Specialist" disabled className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed" />
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50 dark:bg-slate-900/50 flex justify-end rounded-b-2xl">
                <button className="rounded-xl bg-[#0B7A35] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#096328] transition-colors shadow-sm">
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {/* TAB 2: Medical Profile */}
          {activeTab === 'medical' && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="h-5 w-5 text-amber-500" />
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Medical Profile</h2>
                </div>
                <p className="text-sm text-slate-500 mt-1">Strict permissions apply. Changes require medical team authorization.</p>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="rounded-xl bg-amber-50 dark:bg-amber-500/10 p-4 border border-amber-100 dark:border-amber-900/30 flex gap-3">
                  <Lock className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0" />
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    Sensitive medical information cannot be edited through ordinary profile settings. Contact the Ground Medical Team for corrections.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Baseline Reference</label>
                    <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-sm font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">
                      Mission Start (Oct 01, 2026)
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Allergies</label>
                    <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-sm font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">
                      None recorded
                    </div>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Existing Medical Restrictions</label>
                    <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-sm font-medium text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">
                      Avoid heavy axial loading on the left knee until cleared by Flight Surgeon.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 3: Preferences */}
          {activeTab === 'preferences' && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
              <div className="p-6 border-b border-slate-100 dark:border-slate-800/50">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Preferences</h2>
                <p className="text-sm text-slate-500 mt-1">Customize your workspace experience.</p>
              </div>
              <div className="p-6 space-y-8">
                
                {/* Theme */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">Appearance</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Choose light or dark mode.</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">Light</button>
                    <button className="px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900">Dark</button>
                    <button className="px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">System</button>
                  </div>
                </div>

                <div className="h-px bg-slate-100 dark:bg-slate-800 w-full"></div>

                {/* Notifications */}
                <div className="flex items-center justify-between">
                   <div>
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white">Notifications</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Alerts for assessments and medical reviews.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-[#0B7A35]"></div>
                  </label>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 4: Security */}
          {activeTab === 'security' && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
               <div className="p-6 border-b border-slate-100 dark:border-slate-800/50">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Security</h2>
                <p className="text-sm text-slate-500 mt-1">Manage your account access.</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Current Password</label>
                  <input type="password" placeholder="••••••••" className="w-full max-w-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0B7A35] outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
                  <input type="password" placeholder="••••••••" className="w-full max-w-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#0B7A35] outline-none" />
                </div>
                
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button onClick={logout} className="flex items-center gap-2 rounded-xl bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400 px-5 py-2.5 text-sm font-semibold hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-colors">
                    <LogOut className="h-4 w-4" /> Sign Out of All Devices
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 5: Application Info */}
          {activeTab === 'app' && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-[#1C1C1E]">
               <div className="p-6 border-b border-slate-100 dark:border-slate-800/50">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Application Information</h2>
              </div>
              <div className="p-6">
                <dl className="space-y-4 text-sm">
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/50">
                    <dt className="text-slate-500">Application Version</dt>
                    <dd className="font-medium text-slate-900 dark:text-white">ASTRA RECOVER v2.1.0</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/50">
                    <dt className="text-slate-500">Data Storage</dt>
                    <dd className="font-medium text-slate-900 dark:text-white">Local IndexedDB (Encrypted)</dd>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-800/50">
                    <dt className="text-slate-500">Last Synchronization</dt>
                    <dd className="font-medium text-slate-900 dark:text-white">14 Nov 2026, 08:42 UTC</dd>
                  </div>
                </dl>
              </div>
            </motion.div>
          )}

        </div>
      </motion.div>
    </motion.div>
  );
}