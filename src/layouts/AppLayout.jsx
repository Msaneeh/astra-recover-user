import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, Activity, ClipboardList, CalendarDays, 
  Dumbbell, LineChart, FileText, Settings, RefreshCw, 
  PanelLeft, PanelRight, Hexagon, Bell, LogOut, Menu, X
} from 'lucide-react';

const workspaceItems = [
  { name: 'Overview', path: '/overview', icon: LayoutDashboard },
  { name: 'My Recovery', path: '/recovery', icon: Activity },
  { name: 'Assessments', path: '/assessments', icon: ClipboardList },
  { name: 'Rehabilitation Plans', path: '/plans', icon: CalendarDays },
  { name: 'Exercise Sessions', path: '/sessions', icon: Dumbbell },
  { name: 'Progress & Insights', path: '/progress', icon: LineChart },
  { name: 'Medical Reports', path: '/reports', icon: FileText },
];

const preferenceItems = [
  { name: 'Profile & Settings', path: '/settings', icon: Settings },
  { name: 'Sync Queue', path: '/sync', icon: RefreshCw },
];

export default function AppLayout() {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 1024);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
        setIsMobileOpen(false);
      } else {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 overflow-hidden font-sans">
      
      {/* MOBILE SLIDE-OUT OVERLAY */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <aside 
        className={`
          flex flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 
          transition-[width,transform] duration-300 ease-in-out shrink-0
          ${isCollapsed ? 'w-[72px]' : 'w-64'} 
          fixed inset-y-0 left-0 z-50 lg:relative lg:translate-x-0
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        
        {/* Brand */}
        <div className={`flex h-16 shrink-0 items-center border-b border-slate-200 dark:border-slate-800 overflow-hidden ${isCollapsed ? 'justify-center px-0' : 'justify-between px-4'}`}>
          <div className="flex items-center gap-3 whitespace-nowrap">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0B7A35] text-white">
              <Hexagon className="h-5 w-5" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-tight tracking-wide">ASTRA RECOVER</span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Crew Health</span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <button onClick={() => setIsMobileOpen(false)} className="lg:hidden text-slate-500 hover:text-slate-800 dark:hover:text-white shrink-0">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3 space-y-6 custom-scrollbar">
          <div>
            {!isCollapsed && <h3 className="mb-2 px-2 text-xs font-semibold tracking-wider text-slate-500 uppercase whitespace-nowrap">Workspace</h3>}
            <ul className="space-y-1">
              {workspaceItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    title={isCollapsed ? item.name : undefined}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center rounded-md py-2 text-sm font-medium transition-colors ${
                        isCollapsed ? 'justify-center px-0' : 'px-3 gap-3'
                      } ${
                        isActive 
                          ? 'bg-[#0B7A35]/10 text-[#0B7A35] dark:bg-[#0B7A35]/20 dark:text-[#169C46]' 
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100'
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            {!isCollapsed && <h3 className="mb-2 px-2 text-xs font-semibold tracking-wider text-slate-500 uppercase whitespace-nowrap">Preferences</h3>}
            <ul className="space-y-1">
              {preferenceItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    title={isCollapsed ? item.name : undefined}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center rounded-md py-2 text-sm font-medium transition-colors ${
                        isCollapsed ? 'justify-center px-0' : 'px-3 gap-3'
                      } ${
                        isActive 
                          ? 'bg-[#0B7A35]/10 text-[#0B7A35] dark:bg-[#0B7A35]/20 dark:text-[#169C46]' 
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-slate-100'
                      }`
                    }
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Footer (Collapse Toggle) */}
        <div className="border-t border-slate-200 p-3 dark:border-slate-800 shrink-0">
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`flex w-full items-center rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${isCollapsed ? 'justify-center' : 'justify-start gap-2'}`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {/* Swapped to Panel Icons */}
            {isCollapsed ? (
              <PanelLeft className="h-5 w-5 shrink-0" />
            ) : (
              <>
                <PanelRight className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium whitespace-nowrap">Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        
        {/* HEADER */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 md:px-6">
          <div className="flex items-center gap-4 md:gap-6 text-sm">
            
            {/* Mobile Hamburger Menu */}
            <button 
              onClick={() => {
                setIsMobileOpen(true);
                setIsCollapsed(false);
              }}
              className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="hidden sm:block">
              <span className="text-slate-500 mr-2">Mission:</span>
              <span className="font-semibold">ASTR-001</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-slate-500 mr-2">MET:</span>
              <span className="font-mono text-[#0B7A35] dark:text-[#169C46] font-medium">042:13:07:22</span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>
            </button>

            <div className="border-l border-slate-200 dark:border-slate-800 pl-2 md:pl-4 flex items-center gap-3">
              <div className="hidden md:flex flex-col text-right">
                <span className="text-sm font-medium leading-none capitalize">{user?.name || 'Crew'}</span>
                <span className="text-xs text-slate-500 mt-1">{user?.role}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="rounded-full p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors"
                title="Sign out"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-7xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}