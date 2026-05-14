import React from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { WeatherData } from "../types";
import { GlassCard } from "./WeatherWidgets";

interface Props {
  data: WeatherData["forecast"];
}

export const Forecast: React.FC<Props> = ({ data }) => {
  return (
    <GlassCard title="7-Day Propulsion Forecast" className="h-[400px]">
      <div className="h-full w-full">
        <ResponsiveContainer width="100%" height="70%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)', 
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              itemStyle={{ color: '#22d3ee' }}
            />
            <Area 
              type="monotone" 
              dataKey="temp_max" 
              stroke="#22d3ee" 
              fillOpacity={1} 
              fill="url(#colorTemp)" 
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>

        <div className="flex justify-between mt-4 overflow-x-auto pb-2 gap-4 no-scrollbar">
          {data.map((day, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[50px]">
              <span className="text-[10px] text-white/40 uppercase mb-1 font-bold">{day.day}</span>
              <span className="text-sm text-white font-medium">{day.temp_max}°</span>
              <span className="text-[10px] text-white/20">{day.temp_min}°</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
};
