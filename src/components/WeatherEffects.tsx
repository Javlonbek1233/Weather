import { motion } from "motion/react";
import React from "react";
import { WeatherState } from "../types";

interface Props {
  state: WeatherState;
}

export const WeatherEffects: React.FC<Props> = ({ state }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Background Gradient */}
      <motion.div
        animate={{
          background: state === "clear" 
            ? "radial-gradient(circle at 50% 30%, #1e3a8a 0%, #020617 100%)"
            : state === "rain" || state === "thunder"
            ? "radial-gradient(circle at 50% 30%, #1e293b 0%, #020617 100%)"
            : "radial-gradient(circle at 50% 30%, #334155 0%, #020617 100%)",
        }}
        transition={{ duration: 2 }}
        className="absolute inset-0"
      />

      {/* Atmospheric Blur Layers */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500 rounded-full blur-[150px] animate-pulse delay-700" />
      </div>

      {/* Rain Effect */}
      {(state === "rain" || state === "thunder") && (
        <div className="absolute inset-0">
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, x: Math.random() * 100 + "vw", opacity: 0.5 }}
              animate={{ y: "110vh" }}
              transition={{
                duration: 0.5 + Math.random() * 0.5,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
              className="absolute w-[1px] h-4 bg-blue-400/30"
            />
          ))}
        </div>
      )}

      {/* Snow Effect */}
      {state === "snow" && (
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, x: Math.random() * 100 + "vw", opacity: 0.8 }}
              animate={{ 
                y: "110vh",
                x: (Math.random() * 100 + "vw")
              }}
              transition={{
                duration: 3 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "linear",
              }}
              className="absolute w-2 h-2 bg-white rounded-full blur-sm"
            />
          ))}
        </div>
      )}

      {/* Lightning Effect */}
      {state === "thunder" && (
        <motion.div
          animate={{
            opacity: [0, 0, 0.8, 0, 0.2, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 5 + Math.random() * 10,
          }}
          className="absolute inset-0 bg-white z-10"
        />
      )}

      {/* Grid Lines for Futuristic Look */}
      <div 
        className="absolute inset-0 opacity-[0.03]" 
        style={{ 
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }} 
      />
    </div>
  );
};
