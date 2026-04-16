import React from 'react';
import { motion } from 'framer-motion';
import { Server, Cpu, Database, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Architecture() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 space-y-32">
      
      {/* Page Header */}
      <motion.section 
        initial="hidden" animate="visible" variants={fadeIn} 
        className="space-y-6"
      >
        <Link to="/" className="text-sky-600 flex items-center space-x-2 font-bold uppercase text-[10px] tracking-widest hover:text-sky-800 transition-colors w-fit">
          <ArrowRight className="rotate-180" size={14} />
          <span>Return to Telemetry</span>
        </Link>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase leading-none">
          System <br/><span className="text-slate-400 italic">Architecture.</span>
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-2xl leading-relaxed border-l-2 border-sky-600 pl-6 mt-8">
          A deep dive into the machine learning pipelines, synthetic physics generation, and API infrastructure powering the AeroDynamics v2 platform.
        </p>
      </motion.section>

      {/* Grid of Features */}
      <div className="space-y-24">
        
        {/* Section 1 */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="space-y-6">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600">
              <Database size={24} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">1. Synthetic Physics Data</h2>
          </div>
          <p className="leading-relaxed text-lg text-slate-600">
            Because real-world aerospace failure telemetry is highly classified, this engine was trained on a rigorously engineered synthetic dataset of 2,000 flight profiles.
          </p>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Dynamic Tolerances</h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <span className="bg-slate-900 text-white p-1.5 rounded font-bold text-[10px] uppercase tracking-widest mt-1">Wing Root</span>
                <p className="text-sm text-slate-600"><strong className="text-slate-900">High Stress Tolerance:</strong> Engineered to withstand massive static loads, but highly vulnerable to cyclical fatigue over long durations.</p>
              </li>
              <li className="flex items-start space-x-4">
                <span className="bg-slate-900 text-white p-1.5 rounded font-bold text-[10px] uppercase tracking-widest mt-1">Tail Fin</span>
                <p className="text-sm text-slate-600"><strong className="text-slate-900">High Vibration Sensitivity:</strong> Exposed to turbulent airflow from the main chassis, meaning minor vibration spikes trigger critical risk alerts rapidly.</p>
              </li>
            </ul>
          </div>
        </motion.section>

        {/* Section 2 */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="space-y-6">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600">
              <Cpu size={24} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">2. ML Pipeline & One-Hot Encoding</h2>
          </div>
          <p className="leading-relaxed text-lg text-slate-600">
            Machine learning models inherently only understand mathematics, not text. To allow the AI to differentiate between airframe zones, we deployed a <strong className="text-slate-900">Scikit-Learn Pipeline</strong>.
          </p>
          <p className="leading-relaxed text-lg text-slate-600">
            Before data reaches the Random Forest Regressor, the pipeline automatically intercepts the textual zone data (e.g., "Fuselage") and applies <strong className="text-slate-900">One-Hot Encoding</strong>, converting the text into a binary matrix. This yields a highly accurate, explainable R-Squared score of <strong>93.38%</strong>.
          </p>
        </motion.section>

        {/* Section 3 */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="space-y-6">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600">
              <Server size={24} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">3. Production API Infrastructure</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 p-8 rounded-3xl text-white">
              <ShieldCheck className="text-sky-400 mb-6" size={32} />
              <h3 className="text-xl font-bold mb-3">FastAPI Backend</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                The trained pipeline (`.pkl`) is loaded into memory via a high-performance Python FastAPI server, resolving complex physics inferences in under 20 milliseconds.
              </p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
              <div className="w-8 h-8 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mb-6 font-bold text-sm">V</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">React + Vite</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The telemetry dashboard is built on React 18, utilizing Tailwind CSS for fluid, enterprise-grade styling and Framer Motion for SVG data visualization.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Section 4: Explainability */}
        <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn} className="space-y-6">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 flex items-center justify-center text-sky-600">
              <ShieldCheck size={24} />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">4. Model Explainability</h2>
          </div>
          <p className="leading-relaxed text-lg text-slate-600">
            In aerospace engineering, "black box" AI is unacceptable; every prediction must be mathematically justifiable. During the Random Forest training phase, we extracted the Gini importance of each feature to understand the primary drivers of hydraulic line failure:
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <div className="flex-1 bg-slate-50 border border-slate-200 p-6 rounded-2xl">
              <span className="text-3xl font-black text-rose-600">68%</span>
              <span className="block text-xs uppercase font-bold tracking-widest text-slate-500 mt-2">Fatigue Cycles</span>
            </div>
            <div className="flex-1 bg-slate-50 border border-slate-200 p-6 rounded-2xl">
              <span className="text-3xl font-black text-amber-500">24%</span>
              <span className="block text-xs uppercase font-bold tracking-widest text-slate-500 mt-2">Vibration</span>
            </div>
            <div className="flex-1 bg-slate-50 border border-slate-200 p-6 rounded-2xl">
              <span className="text-3xl font-black text-emerald-600">8%</span>
              <span className="block text-xs uppercase font-bold tracking-widest text-slate-500 mt-2">Static Stress</span>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}