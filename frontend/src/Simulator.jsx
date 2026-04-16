import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crosshair, Download } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function Simulator() {
  const [formData, setFormData] = useState({ stress: 150, vibration: 10, fatigue: 100 });
  const [activeZone, setActiveZone] = useState("Fuselage");
  const [riskScore, setRiskScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [historyLog, setHistoryLog] = useState([]);

  const airframeZones = [
    { id: 'Fuselage', name: 'Fuselage', data: { stress: 45, vibration: 4, fatigue: 20 } },
    { id: 'Wing Root', name: 'Wing Root', data: { stress: 340, vibration: 12, fatigue: 85 } },
    { id: 'Wing Tip', name: 'Wing Tip', data: { stress: 80, vibration: 28, fatigue: 180 } },
    { id: 'Tail Fin', name: 'Tail Fin', data: { stress: 190, vibration: 22, fatigue: 210 } }
  ];

  const applyPreset = async (zoneObj) => {
    setFormData(zoneObj.data);
    setActiveZone(zoneObj.id);
    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          zone: zoneObj.id,
          ...zoneObj.data
        }),
      });
      const data = await response.json();
      setRiskScore(data.risk_score);
    } catch (error) {
      console.error("API Error:", error);
    }

    setLoading(false);
  };

  const handlePredict = async () => {
    setLoading(true);
    try {
      const payload = {
        zone: activeZone,
        ...formData
      };
      
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const data = await response.json();
      setRiskScore(data.risk_score);

      // Create a log entry and add it to our history array
      const logEntry = {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        zone: activeZone,
        stress: formData.stress,
        vibration: formData.vibration,
        fatigue: formData.fatigue,
        score: data.risk_score
      };
      
      setHistoryLog(prev => [logEntry, ...prev]);

    } catch (error) { 
      console.error("API Error:", error); 
    }
    setLoading(false);
  };

  const exportReport = () => {
    const doc = new jsPDF();
    
    // Add Premium Branding
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(15, 23, 42); // Slate 900
    doc.text("AERODYNAMICS SYSTEMS", 14, 22);

    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // Slate 500
    doc.text("Telemetry & Risk Assessment Audit Trail", 14, 30);
    doc.text(`Session Date: ${new Date().toLocaleDateString()}`, 14, 36);

    // Generate the Data Table
    if (historyLog.length > 0) {
      autoTable(doc, {
        startY: 45,
        head: [['Time', 'Airframe Zone', 'Stress', 'Vibration', 'Fatigue', 'Risk Score']],
        body: historyLog.map(log => [
          log.time, 
          log.zone, 
          log.stress, 
          log.vibration, 
          log.fatigue, 
          Math.round(log.score)
        ]),
        theme: 'grid',
        headStyles: { fillColor: [2, 132, 199], textColor: 255 }, // Sky 600 header
        styles: { fontSize: 9, cellPadding: 4 },
        alternateRowStyles: { fillColor: [248, 250, 252] }
      });
    } else {
      doc.text("No simulation data recorded for this session.", 14, 50);
    }

    // Trigger Download
    doc.save(`AeroDynamics_Report_${Date.now()}.pdf`);
  };
  
  const getStatusInfo = (score) => {
    if (score === null) return { color: 'text-slate-500', label: 'STANDBY', bg: 'bg-slate-100' };
    if (score < 30) return { color: 'text-emerald-600', label: 'OPTIMAL', bg: 'bg-emerald-50' };
    if (score < 70) return { color: 'text-amber-600', label: 'CAUTION', bg: 'bg-amber-50' };
    return { color: 'text-rose-600', label: 'CRITICAL', bg: 'bg-rose-50' };
  };

  const status = getStatusInfo(riskScore);

  return (
    <div className="max-w-6xl mx-auto px-6 pb-24 space-y-12">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden rounded-[2.5rem] mt-8 bg-aircraft-hero shadow-2xl">
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]"></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 text-center px-6">
          <span className="text-sky-400 font-bold tracking-[0.4em] uppercase text-[10px] mb-4 block">Telemetry Dashboard</span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase">
            Precision <span className="text-slate-300 italic">Routing</span>
          </h2>
        </motion.div>
      </section>

      {/* Main Interface */}
      <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Col: Config */}
        <div className="p-12 border-b md:border-b-0 md:border-r border-slate-100">
          <h3 className="text-2xl font-bold mb-8 italic text-slate-900 uppercase tracking-tight">Configuration Deck</h3>
          
          <div className="mb-10">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 flex items-center space-x-1">
              <Crosshair size={12} />
              <span>Target Airframe Zone</span>
            </label>
            
            <select
              value={activeZone}
              onChange={(e) => {
                const selectedZone = airframeZones.find(z => z.id === e.target.value);
                if (selectedZone) {
                  applyPreset(selectedZone);
                }
              }}
              className="w-full p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 font-bold text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all cursor-pointer appearance-none"
            >
              {airframeZones.map((zone) => (
                <option key={zone.id} value={zone.id}>{zone.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-10">
            {['stress', 'vibration', 'fatigue'].map((key) => (
              <div key={key}>
                <div className="flex justify-between mb-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {key === 'stress' ? 'Stress (MPa)' : key === 'vibration' ? 'Vibration (mm)' : 'Fatigue Cycles (k)'}
                  </label>
                  <span className="font-mono text-sm font-bold text-sky-600">{formData[key]}</span>
                </div>
                <input 
                  type="range" 
                  min="0" max={key === 'stress' ? 400 : key === 'vibration' ? 30 : 250} 
                  value={formData[key]} 
                  onChange={(e) => {
                    setFormData({...formData, [key]: Number(e.target.value)});
                    setRiskScore(null); 
                  }} 
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600" 
                />
              </div>
            ))}
            <button 
              onClick={handlePredict} 
              disabled={loading} 
              className="w-full py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-sky-600 transition-colors shadow-lg active:scale-95 uppercase tracking-widest text-xs"
            >
              {loading ? "Processing..." : "Run AI Analysis"}
            </button>
          </div>
        </div>

        {/* Right Col: Telemetry */}
        <div className={`p-12 flex flex-col items-center justify-center transition-colors duration-500 ${status.bg}`}>
           <div className="relative w-72 h-72">
              <svg className="w-full h-full -rotate-90">
                <circle cx="144" cy="144" r="130" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200" />
                <motion.circle 
                  cx="144" cy="144" r="130" 
                  stroke="currentColor" strokeWidth="16" fill="transparent" 
                  strokeDasharray="816.8" 
                  initial={{ strokeDashoffset: 816.8 }} 
                  animate={{ strokeDashoffset: riskScore !== null ? 816.8 - (816.8 * (riskScore / 100)) : 816.8 }} 
                  transition={{ duration: 1.5, ease: "easeOut" }} 
                  className={`${status.color} stroke-current`} 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/50 backdrop-blur-[1px] m-6 rounded-full border border-white/50 shadow-sm">
                <span className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{status.label}</span>
                <span className={`text-6xl font-black tracking-tighter ${status.color}`}>
                  {riskScore !== null ? Math.round(riskScore) : "--"}
                </span>
                {riskScore !== null && <span className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Risk Index</span>}
              </div>
           </div>
           
           <div className="mt-12 text-center max-w-xs">
             <p className="text-xs font-medium text-slate-500 leading-relaxed">
               AI Model evaluates structural integrity specific to the <span className="font-bold text-slate-800">{activeZone}</span>.
             </p>
           </div>
        </div>
      </section>
      {/* Telemetry Log */}
      {historyLog.length > 0 && (
        <section className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-bold italic text-slate-900 uppercase tracking-tight">Audit Trail</h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mt-1">Session History</span>
            </div>
            <button 
              onClick={exportReport}
              className="flex items-center space-x-2 bg-sky-50 text-sky-600 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-sky-100 transition-colors"
            >
              <Download size={14} />
              <span>Export PDF</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-widest text-[10px]">
                  <th className="pb-4 font-black pl-4">Time</th>
                  <th className="pb-4 font-black">Airframe Zone</th>
                  <th className="pb-4 font-black text-center">Parameters (Stress / Vib / Fatg)</th>
                  <th className="pb-4 font-black text-right pr-4">Risk Score</th>
                </tr>
              </thead>
              <tbody className="text-slate-600 font-medium">
                {historyLog.map((log) => (
                  <tr key={log.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                    <td className="py-5 pl-4 font-mono text-[11px] text-slate-400">{log.time}</td>
                    <td className="py-5 font-bold text-slate-900">{log.zone}</td>
                    <td className="py-5 font-mono text-[11px] text-center text-slate-500">
                      {log.stress} <span className="text-slate-300">/</span> {log.vibration} <span className="text-slate-300">/</span> {log.fatigue}
                    </td>
                    <td className="py-5 text-right pr-4">
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest ${
                        log.score < 30 ? 'bg-emerald-50 text-emerald-600' :
                        log.score < 70 ? 'bg-amber-50 text-amber-600' :
                        'bg-rose-50 text-rose-600'
                      }`}>
                        {Math.round(log.score)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}