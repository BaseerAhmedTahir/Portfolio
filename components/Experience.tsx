import React from 'react';
import { EXPERIENCE } from '../constants';
import { Calendar, MapPin, Briefcase, Circle } from 'lucide-react';
import { Reveal } from './Reveal';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 md:py-32 bg-white dark:bg-darker relative overflow-hidden transition-colors duration-500 scroll-mt-20">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center gap-6 mb-16 md:mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">
              History<span className="text-primary">.</span>
            </h2>
            <div className="h-px bg-slate-200 dark:bg-white/10 flex-1 mt-4"></div>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-0 top-4 bottom-0 w-px bg-slate-200 dark:bg-white/10 hidden md:block"></div>

          <div className="flex flex-col gap-12">
            {EXPERIENCE.map((exp, index) => (
              <Reveal key={index} width="100%" delay={index * 0.1}>
                 <div className="relative pl-0 md:pl-12 group">
                    {/* Timeline Dot */}
                    <div className="absolute left-[-5px] top-8 w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700 ring-4 ring-white dark:ring-darker group-hover:bg-primary transition-colors hidden md:block"></div>
                    
                    <div className="bg-slate-50 dark:bg-[#0f172a] rounded-[2rem] p-8 md:p-10 border border-slate-200 dark:border-white/5 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 dark:hover:shadow-indigo-500/5 group-hover:-translate-y-1">
                      <div className="flex flex-col md:flex-row gap-6 justify-between items-start mb-8">
                         <div>
                            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors leading-tight tracking-tight">
                               {exp.role}
                            </h3>
                            <div className="text-lg font-medium text-slate-600 dark:text-slate-300 flex items-center gap-2 mt-2">
                               <span className="text-primary font-bold">@</span> {exp.company}
                            </div>
                         </div>
                         
                         <div className="flex flex-col items-start md:items-end text-xs font-mono text-slate-500 dark:text-slate-400 bg-white dark:bg-black/20 px-4 py-2 rounded-xl border border-slate-100 dark:border-white/5 mt-2 md:mt-0 shadow-sm">
                            <div className="flex items-center gap-2 mb-1.5">
                               <Calendar size={12} />
                               <span>{exp.period}</span>
                            </div>
                            <div className="flex items-center gap-2">
                               <MapPin size={12} />
                               <span>{exp.location}</span>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-3">
                         {exp.points.map((point, idx) => (
                            <div key={idx} className="flex gap-3 text-slate-600 dark:text-slate-300 text-base leading-relaxed group/point">
                               <div className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-slate-600 group-hover/point:bg-primary transition-colors flex-shrink-0"></div>
                               <p>{point}</p>
                            </div>
                         ))}
                      </div>
                    </div>
                 </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;