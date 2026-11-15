import { Hexagon } from "lucide-react"
import { motion } from "motion/react"
import { Link } from "react-router-dom"
import { useAuthContext } from '../../context/AuthContext';

const Navbar = () => {
      const { user } = useAuthContext();
    
      const ctaLink = user ? "/overview" : "/auth";
      const ctaText = user ? "Return to Workspace" : "Access Workspace";
  return (
    <>
    <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B7A35] text-white">
              <Hexagon className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-tight tracking-wide text-white">ASTRA RECOVER</span>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Crew Health System</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/terms" className="text-sm text-slate-300 hover:text-white transition-colors hidden sm:block">Terms of Use</Link>
            <Link 
              to={ctaLink}
              className="rounded-md bg-[#0B7A35] px-4 py-2 text-sm font-semibold text-white hover:bg-[#096328] transition-colors shadow-lg shadow-[#0B7A35]/20"
            >
              {ctaText}
            </Link>
          </div>
        </div>
      </motion.nav>
    </>
  )
}

export default Navbar