import { motion } from "motion/react";
import { Cloud, Droplets, Wind, Sun, Sunrise, Sunset, AlertTriangle, Zap, Thermometer, Brain } from "lucide-react";
import React from "react";
import { WeatherData } from "../types";
import { cn } from "../lib/utils";

export const GlassCard: React.FC<{ children: React.ReactNode; className?: string; title?: string }> = ({ 
  children, 
  className,
  title 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={cn(
      "bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 overflow-hidden",
      className
    )}
  >
    {title && (
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-white/40">{title}</span>
      </div>
    )}
    {children}
  </motion.div>
);

export const WeatherSummary: React.FC<{ data: WeatherData }> = ({ data }) => (
  <div className="flex flex-col gap-4">
    <div className="flex flex-col">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-6xl md:text-8xl font-light tracking-tighter text-white"
      >
        {data.current.temp}°
      </motion.h1>
      <div className="flex items-center gap-3">
        <span className="text-2xl text-white/80 font-medium">{data.current.location}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
      </div>
      <p className="text-lg text-white/40 mt-1 uppercase tracking-widest text-[12px] font-bold">
        {data.current.description}
      </p>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
      <GlassCard title="Humidity">
        <div className="flex items-end justify-between">
          <span className="text-3xl font-light text-white">{data.current.humidity}%</span>
          <Droplets className="text-cyan-400 mb-1" size={24} />
        </div>
      </GlassCard>
      <GlassCard title="Wind Speed">
        <div className="flex items-end justify-between">
          <span className="text-3xl font-light text-white">{data.current.wind_speed} <span className="text-sm opacity-40">km/h</span></span>
          <Wind className="text-purple-400 mb-1" size={24} />
        </div>
      </GlassCard>
      <GlassCard title="Air Quality" className="col-span-2 md:col-span-1">
        <div className="flex items-end justify-between">
          <span className="text-3xl font-light text-white">{data.current.aqi}</span>
          <div className="px-2 py-1 bg-green-500/20 text-green-400 text-[10px] uppercase font-bold rounded mb-1">Optimal</div>
        </div>
      </GlassCard>
    </div>
  </div>
);

export const AIInsights: React.FC<{ analysis: string }> = ({ analysis }) => (
  <GlassCard 
    title="AI Prediction Engine" 
    className="bg-blue-500/10 border-blue-400/20 relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Brain size={120} />
    </div>
    <div className="relative z-10">
      <p className="text-white/80 leading-relaxed italic text-sm">
        "{analysis}"
      </p>
      <div className="flex gap-2 mt-4">
        <div className="h-1 w-12 bg-cyan-400 rounded-full" />
        <div className="h-1 w-4 bg-cyan-400/30 rounded-full" />
      </div>
    </div>
  </GlassCard>
);
