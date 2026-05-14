import { motion } from "motion/react";
import React from "react";
import { GlassCard } from "./WeatherWidgets";
import { Search } from "lucide-react";

export const RadarSystem: React.FC = () => (
  <GlassCard title="Atmospheric Radar L04" className="aspect-square relative flex items-center justify-center">
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Radar Rings */}
      <div className="w-[80%] h-[80%] border border-cyan-500/20 rounded-full" />
      <div className="w-[60%] h-[60%] border border-cyan-500/20 rounded-full" />
      <div className="w-[40%] h-[40%] border border-cyan-500/20 rounded-full" />
      <div className="w-[20%] h-[20%] border border-cyan-500/20 rounded-full" />
      
      {/* Radar Sweep */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute w-[50%] h-[1px] bg-gradient-to-r from-transparent to-cyan-400 origin-left left-1/2 top-1/2"
      />

      {/* Simulated Data Points */}
      <motion.div 
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-[30%] left-[40%] w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_10px_red]"
      />
      <motion.div 
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        className="absolute bottom-[40%] right-[30%] w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]"
      />
    </div>
    
    <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[8px] font-mono text-cyan-400/50">
      <span>LAT: 35.6895</span>
      <span>LON: 139.6917</span>
    </div>
  </GlassCard>
);

export const SatelliteView: React.FC = () => (
  <GlassCard title="Orbital Satellite Feed" className="h-[200px] relative overflow-hidden flex items-center justify-center bg-black/40">
    <motion.img 
      animate={{ scale: [1, 1.1, 1], rotate: [0, 1, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000"
      className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000"
      referrerPolicy="no-referrer"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
    <div className="relative z-10 text-center">
      <div className="flex items-center gap-2 justify-center mb-2">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
        <span className="text-[10px] text-white/80 font-bold uppercase tracking-widest">Live Feed</span>
      </div>
    </div>
    <div className="absolute top-2 right-2 flex gap-1">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="w-1 h-3 bg-white/20" />
      ))}
    </div>
  </GlassCard>
);

export const CitySearch: React.FC<{ onSearch: (city: string) => void }> = ({ onSearch }) => {
  const [value, setValue] = React.useState("");

  return (
    <div className="relative w-full max-w-md mx-auto group">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-cyan-400 transition-colors">
        <Search size={18} />
      </div>
      <input
        type="text"
        placeholder="ENTER SECTOR COORDINATES..."
        className="w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-full py-4 pl-12 pr-6 text-sm text-white placeholder:text-white/20 outline-none focus:border-cyan-400/50 focus:ring-4 focus:ring-cyan-400/10 transition-all font-mono uppercase tracking-wider"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch(value);
            setValue("");
          }
        }}
      />
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 items-center">
        <span className="text-[10px] text-white/20 font-bold">↵</span>
      </div>
    </div>
  );
};
