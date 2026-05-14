/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WeatherEffects } from "./components/WeatherEffects";
import { WeatherSummary, AIInsights, GlassCard } from "./components/WeatherWidgets";
import { Forecast } from "./components/Forecast";
import { RadarSystem, SatelliteView, CitySearch } from "./components/Navigation";
import { WeatherData, WeatherState } from "./types";
import { FETCH_WEATHER } from "./lib/utils";
import { GoogleGenAI, Type } from "@google/genai";
import { AlertCircle, Loader2, Sparkles, MapPin } from "lucide-react";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("Neo-Tokyo");
  const [aiAnalysis, setAiAnalysis] = useState("Initializing neural environmental patterns...");
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = async (targetCity: string) => {
    setLoading(true);
    const result = await FETCH_WEATHER(targetCity);
    if (result) {
      setData(result);
      setCity(targetCity);
      setError(null);
      generateAIAnalysis(result);
    } else {
      setError("COMMUNICATION ERROR: SECTOR UNREACHABLE");
    }
    setLoading(false);
  };

  const generateAIAnalysis = async (weather: WeatherData) => {
    setAiAnalysis("Computing metabolic climate feedback...");
    
    // Check for Gemini API key
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY") {
      // Mock AI Insight
      setTimeout(() => {
        setAiAnalysis(`Atmospheric density suggests a high probability of cyber-precipitation in ${weather.current.location}. Recommendation: Wear Class-3 Ionized Carbon jackets and synchronize your retinal HUD for low visibility.`);
      }, 1500);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = `
        You are an advanced futuristic weather AI assistant. 
        Current weather in ${weather.current.location}: ${weather.current.temp}°C, ${weather.current.description}.
        Humidity: ${weather.current.humidity}%, Wind: ${weather.current.wind_speed}km/h.
        
        Provide a cinematic, technical, and helpful weather analysis in one short, punchy paragraph (max 3 sentences). 
        Include a smart clothing recommendation suitable for the "WeatherX" futuristic theme.
        Style: Noir, cyberpunk, professional.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt
      });

      setAiAnalysis(response.text || "Unable to synthesize climate data.");
    } catch (err) {
      console.error(err);
      setAiAnalysis("Neural link disrupted. Reverting to base calculation: Dress lightly, radiation levels within acceptable limits.");
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, []);

  const weatherState: WeatherState = 
    data?.current.description.toLowerCase().includes("rain") ? "rain" :
    data?.current.description.toLowerCase().includes("snow") ? "snow" :
    data?.current.description.toLowerCase().includes("thunder") ? "thunder" :
    data?.current.description.toLowerCase().includes("cloud") ? "cloudy" : "clear";

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-cyan-500/30">
      <WeatherEffects state={weatherState} />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12 lg:py-24">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-4"
          >
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/20">
              <Sparkles className="text-cyan-400" size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tighter uppercase leading-none">WeatherX</h2>
              <p className="text-[10px] text-white/40 tracking-[0.4em] uppercase font-bold mt-1">Global Climate Terminal</p>
            </div>
          </motion.div>

          <CitySearch onSearch={fetchWeatherData} />
        </header>

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-40"
            >
              <Loader2 className="text-cyan-400 animate-spin mb-4" size={48} />
              <p className="text-[10px] tracking-[0.5em] text-white/20 uppercase font-bold">Synchronizing Satellite Link...</p>
            </motion.div>
          ) : error ? (
            <motion.div 
              key="error"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-40 text-center"
            >
              <AlertCircle className="text-red-500 mb-6" size={64} />
              <h3 className="text-3xl font-light mb-2">{error}</h3>
              <button 
                onClick={() => fetchWeatherData(city)}
                className="mt-4 px-8 py-2 bg-white/5 rounded-full text-[10px] tracking-[0.2em] font-bold hover:bg-white/10 transition-colors border border-white/10"
              >
                RETRY SYSTEM BOOT
              </button>
            </motion.div>
          ) : data && (
            <motion.div 
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            >
              {/* Left Column - Main Weather */}
              <div className="lg:col-span-8 flex flex-col gap-6">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-6">
                    <WeatherSummary data={data} />
                    <AIInsights analysis={aiAnalysis} />
                  </div>
                  <div className="flex flex-col gap-6">
                    <RadarSystem />
                  </div>
                </section>

                <section>
                  <Forecast data={data.forecast} />
                </section>
              </div>

              {/* Right Column - Utilities */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <SatelliteView />
                
                {data.alerts.length > 0 && (
                  <GlassCard title="Security Alerts" className="bg-red-500/10 border-red-500/30">
                    <div className="flex flex-col gap-4">
                      {data.alerts.map((alert, i) => (
                        <div key={i} className="flex gap-4 p-4 bg-red-500/5 rounded-2xl border border-red-500/10">
                          <AlertCircle className="text-red-500 shrink-0" size={20} />
                          <div>
                            <h4 className="text-[10px] font-bold uppercase tracking-wider text-red-400 mb-1">{alert.event}</h4>
                            <p className="text-xs text-white/60 leading-tight">{alert.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                )}

                <GlassCard title="Metabolic Stats">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">UV Index</span>
                      <span className="text-sm font-mono text-white">{data.current.uv} / 11</span>
                    </div>
                    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                      <div className="h-full bg-cyan-400" style={{ width: `${(data.current.uv / 11) * 100}%` }} />
                    </div>
                  </div>
                </GlassCard>

                <GlassCard title="Retinal Audio Link" className="relative group cursor-pointer hover:bg-cyan-500/10 transition-all border-cyan-400/20">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border-2 border-cyan-400/30 flex items-center justify-center relative overflow-hidden">
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1/2 h-1/2 bg-cyan-400 rounded-full blur-[2px]"
                      />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-cyan-400">Voice Assistant Active</h4>
                      <p className="text-[10px] text-white/40">"Awaiting vocal prompt for Sector ${city.toUpperCase()}"</p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard title="Global Climate Map" className="h-[150px] relative overflow-hidden p-0">
                  <div className="absolute inset-0 bg-blue-950/40" />
                  <svg viewBox="0 0 100 50" className="w-full h-full opacity-20">
                    <path d="M10,25 Q30,10 50,25 T90,25" fill="none" stroke="cyan" strokeWidth="0.5">
                      <animate attributeName="d" values="M10,25 Q30,10 50,25 T90,25; M10,25 Q30,40 50,25 T90,25; M10,25 Q30,10 50,25 T90,25" dur="10s" repeatCount="indefinite" />
                    </path>
                    <circle cx="50" cy="25" r="1" fill="cyan">
                      <animate attributeName="r" values="1;2;1" dur="2s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[8px] tracking-[0.2em] font-mono text-cyan-400/60 font-bold uppercase underline">Tactical Overlay Active</span>
                  </div>
                </GlassCard>

                <GlassCard title="Local favorites" className="opacity-50 hover:opacity-100 transition-opacity">
                  <div className="flex flex-wrap gap-2 pt-2">
                    {["San Francisco", "Seoul", "London", "Dubai"].map((f) => (
                      <button 
                        key={f}
                        onClick={() => fetchWeatherData(f)}
                        className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold border border-white/10 hover:border-cyan-400/50 transition-colors"
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Footer */}
        <footer className="mt-24 border-t border-white/5 py-12 flex flex-col items-center">
          <div className="flex gap-8 mb-8">
            <span className="text-[8px] tracking-[0.4em] uppercase text-white/20 font-bold">Privacy Protocol</span>
            <span className="text-[8px] tracking-[0.4em] uppercase text-white/20 font-bold">System Status: Optimal</span>
            <span className="text-[8px] tracking-[0.4em] uppercase text-white/20 font-bold">Node.js / React 19 / Satellite v.4.2</span>
          </div>
          <div className="text-[10px] text-white/40">
            © 2026 WEATHERX MULTIVARIATE INTERFACE - SECURED LINK
          </div>
        </footer>
      </main>
    </div>
  );
}

