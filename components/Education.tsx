import React from 'react';
import { EDUCATION } from '../constants';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import { Reveal } from './Reveal';

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 md:py-32 bg-slate-50 dark:bg-darker relative overflow-hidden transition-colors duration-500 scroll-mt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-dark dark:bg-grid-white bg-[length:30px_30px] opacity-[0.03]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-start mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
              EDUCATION.
            </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EDUCATION.map((edu, index) => (
            <Reveal key={index} width="100%" delay={index * 0.1}>
              <div className="group relative h-full bg-white dark:bg-[#0a0a0a] rounded-3xl p-8 border border-slate-200 dark:border-white/10 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5">
                
                <div className="absolute top-6 right-6 p-0 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:rotate-12">
                    <GraduationCap size={80} className="text-slate-900 dark:text-white" />
                </div>

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 dark:bg-white/10 rounded-full text-xs font-mono font-medium text-slate-600 dark:text-slate-300 mb-4">
                        <Calendar size={12} /> {edu.period}
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-1 leading-tight">
                        {edu.role}
                    </h3>
                    <p className="text-base text-primary font-medium mb-6">
                        {edu.company}
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <MapPin size={14} /> {edu.location}
                        </div>
                        
                        <div className="border-t border-slate-100 dark:border-white/5 pt-4 mt-4">
                            <ul className="space-y-2">
                                {edu.points.map((point, idx) => (
                                    <li key={idx} className="flex items-start text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                                        <Award size={16} className="mr-3 mt-0.5 text-primary flex-shrink-0" />
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
              </div>
            </Reveal>
          ))}
          
          <Reveal width="100%" delay={0.2}>
             <div className="h-full flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-slate-200 dark:border-white/5 bg-transparent text-center opacity-60 hover:opacity-100 transition-opacity min-h-[250px]">
                 <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center mb-4">
                     <Award size={32} className="text-slate-400" />
                 </div>
                 <h3 className="text-lg font-bold text-slate-900 dark:text-white">Continuous Learning</h3>
                 <p className="text-sm text-slate-500 max-w-xs mx-auto mt-2">Always exploring new technologies and methodologies to stay ahead of the curve.</p>
             </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Education;