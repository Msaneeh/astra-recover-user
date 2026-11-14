import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { Hexagon, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Auth() {
  const [email, setEmail] = useState('astronaut@astra.space');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('USER');
  const [error, setError] = useState(null);
  const { login } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/overview';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await login({ email, password, role });
      navigate(from, { replace: true });
    } catch (err) {
      setError('Failed to sign in. Please check your credentials.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F5F7] dark:bg-black p-4 font-sans selection:bg-[#0B7A35] selection:text-white">
      
      {/* Background Texture - very subtle on Apple devices */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/50 to-transparent dark:from-white/[0.03] dark:to-transparent pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} // Apple's signature smooth ease-out
        className="relative z-10 w-full max-w-[400px] space-y-8 rounded-[24px] bg-white/80 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl dark:bg-[#1C1C1E]/80 dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-white/20 dark:border-white/5"
      >
        
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#0B7A35] text-white shadow-lg shadow-[#0B7A35]/20 mb-6">
            <Hexagon className="h-7 w-7" strokeWidth={1.5} />
          </div>
          <h2 className="text-[28px] font-semibold tracking-tight text-slate-900 dark:text-white">
            Sign in
          </h2>
          <p className="mt-2 text-[15px] text-slate-500 dark:text-slate-400">
            Access your recovery workspace
          </p>
        </div>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }} 
              animate={{ opacity: 1, height: 'auto' }} 
              className="rounded-xl bg-red-50 p-3 text-center text-[13px] font-medium text-red-600 dark:bg-red-950/30 dark:text-red-400"
            >
              {error}
            </motion.div>
          )}
          
          <div className="space-y-4">
            {/* Apple Style Input Group */}
            <div className="space-y-1">
              <label className="ml-1 text-[13px] font-medium text-slate-500 dark:text-slate-400">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-xl border-none bg-[#E8E8ED] px-4 py-3 text-[17px] text-slate-900 outline-none ring-1 ring-inset ring-transparent transition-all focus:bg-white focus:ring-[#0B7A35] dark:bg-[#2C2C2E] dark:text-white dark:focus:bg-[#1C1C1E] dark:focus:ring-[#0B7A35]"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="ml-1 text-[13px] font-medium text-slate-500 dark:text-slate-400">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-xl border-none bg-[#E8E8ED] px-4 py-3 text-[17px] text-slate-900 outline-none ring-1 ring-inset ring-transparent transition-all focus:bg-white focus:ring-[#0B7A35] dark:bg-[#2C2C2E] dark:text-white dark:focus:bg-[#1C1C1E] dark:focus:ring-[#0B7A35]"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label className="ml-1 text-[13px] font-medium text-slate-500 dark:text-slate-400">Role (Testing)</label>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full appearance-none rounded-xl border-none bg-[#E8E8ED] px-4 py-3 text-[17px] text-slate-900 outline-none ring-1 ring-inset ring-transparent transition-all focus:bg-white focus:ring-[#0B7A35] dark:bg-[#2C2C2E] dark:text-white dark:focus:bg-[#1C1C1E] dark:focus:ring-[#0B7A35]"
                >
                  <option value="USER">Astronaut</option>
                  <option value="MEDICAL_TEAM">Ground Medical Team</option>
                </select>
                {/* Custom chevron for Apple feel */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B7A35] px-4 py-3.5 text-[17px] font-semibold text-white transition-transform active:scale-[0.98] hover:bg-[#096328]"
          >
            Sign In
            <ArrowRight className="h-5 w-5" />
          </button>
        </form>
        
        <div className="text-center">
            <p className="text-[12px] text-slate-400 dark:text-slate-500">
              Protected by ASTRA Security Protocols
            </p>
        </div>
      </motion.div>
    </div>
  );
}