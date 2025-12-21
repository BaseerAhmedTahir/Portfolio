
import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, PolarRadiusAxis } from 'recharts';
import { RADAR_DATA } from '../constants';

const SkillsChart: React.FC = () => {
  return (
    <div className="h-[320px] w-full flex flex-col items-center justify-center bg-white/50 dark:bg-[#020617]/50 backdrop-blur-md rounded-3xl border border-slate-200 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none p-6 relative overflow-hidden group transition-all duration-300">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-50 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-[64px] -z-10 pointer-events-none"></div>
      
      <div className="w-full flex justify-between items-center mb-2 relative z-10 px-2">
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          Skill Matrix
        </h3>
        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-600">v2.4</span>
      </div>
      
      <div className="flex-1 w-full h-full relative z-10 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={RADAR_DATA}>
            <defs>
              <linearGradient id="radarFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.6}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            
            <PolarGrid 
              gridType="polygon" 
              stroke="currentColor" 
              className="text-slate-200 dark:text-white/10" 
              strokeWidth={1} 
            />
            <PolarAngleAxis 
              dataKey="subject" 
              tick={({ payload, x, y, textAnchor, stroke, radius }) => (
                <text
                  x={x}
                  y={y}
                  textAnchor={textAnchor}
                  fill="currentColor"
                  className="text-[10px] font-bold fill-slate-500 dark:fill-slate-400 uppercase tracking-wider"
                >
                  {payload.value}
                </text>
              )}
            />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            
            <Radar
              name="Baseer"
              dataKey="A"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#radarFill)"
              fillOpacity={1}
              isAnimationActive={true}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkillsChart;
