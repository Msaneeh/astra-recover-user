import { motion } from "motion/react"
import { ClipboardList, CalendarDays, Dumbbell, RefreshCw } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const Works = () => {
  return (
    <>
          <section id="how-it-works" className="relative z-10 bg-slate-900/50 py-24 sm:py-32 border-t border-slate-800/50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mx-auto max-w-2xl text-center mb-16"
          >
            <h2 className="text-base font-semibold leading-7 text-[#169C46]">Clinical Workflow</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How ASTRA RECOVER works.
            </p>
            <p className="mt-6 text-lg leading-8 text-slate-400">
              A strict, traceable loop connecting the astronaut's physical execution with the ground medical team's clinical oversight.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ClipboardList, title: "1. Assess", desc: "Record functional measurements using approved protocols. Data is saved locally and tagged with its source." },
              { icon: CalendarDays, title: "2. Plan", desc: "Ground Medical reviews assessments and approves rehabilitation plans. Astronauts never modify their own clinical prescriptions." },
              { icon: Dumbbell, title: "3. Execute", desc: "Complete scheduled exercise sessions. Record actual duration and any deviations from the approved plan." },
              { icon: RefreshCw, title: "4. Sync", desc: "Local records are safely transmitted to the medical team when connectivity is available, marked 'Delivered' only upon acknowledgement." }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                className="relative flex flex-col p-6 rounded-xl border border-slate-800 bg-slate-950 hover:border-[#0B7A35]/50 transition-colors group"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-[#0B7A35]/10 text-[#169C46] group-hover:bg-[#0B7A35] group-hover:text-white transition-colors">
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Works