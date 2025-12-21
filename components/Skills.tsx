
import React from 'react';
import { SKILLS } from '../constants';
import SkillsChart from './SkillsChart';
import { Cpu, Database, Layout, Terminal, Code2 } from 'lucide-react';
import { Reveal } from './Reveal';
import Marquee from './Marquee';
import SpotlightCard from './SpotlightCard';

const Skills: React.FC = () => {
  const getIcon = (name: string) => {
    const className = "text-slate-700 dark:text-white w-5 h-5";
    if (name.includes('AI')) return <Cpu className={className} />;
    if (name.includes('Backend')) return <Database className={className} />;
    if (name.includes('Frontend')) return <Layout className={className} />;
    return <Terminal className={className} />;
  };

  return (
    <section className="py-24 md:py-32 bg-lightBg dark:bg-darker relative transition-colors duration-500 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] opacity-30"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-slate-200 dark:border-white/10 pb-6 mb-12">
            <div>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter mb-0 leading-none">
                TECHNICAL ARSENAL<span className="text-primary">.</span>
              </h2>
            </div>
            <div className="hidden md:block">
              <Code2 size={32} className="text-slate-200 dark:text-slate-800" strokeWidth={1} />
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            {SKILLS.map((category, idx) => (
              <Reveal key={category.name} delay={idx * 0.05}>
                <SpotlightCard className="h-full hover:shadow-lg hover:shadow-slate-200/50 dark:hover:shadow-none transition-shadow duration-300">
                  <div className="p-6 h-full flex flex-col">
                    <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100 dark:border-white/5">
                      <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 group-hover:scale-105 transition-transform duration-300 group-hover:bg-primary/10">
                        {getIcon(category.name)}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight font-mono uppercase tracking-wide">
                        {category.name}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {category.skills.map((skill) => (
                        <span key={skill} className="px-3 py-1.5 text-xs font-semibold bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-white/5 group-hover:bg-primary/5 group-hover:text-primary group-hover:border-primary/20 transition-all cursor-default">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
          
          <div className="lg:col-span-5 sticky top-24 hidden lg:block">
             <div className="relative p-3 rounded-[32px] bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/10 dark:to-transparent">
                 <div className="absolute inset-0 bg-primary/10 blur-[40px] rounded-full"></div>
                 <SkillsChart />
              </div>
          </div>
        </div>
      </div>
      
      <div className="mt-16 border-t border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-black/20 backdrop-blur-sm">
         <Marquee />
      </div>
    </section>
  );
};

export default Skills;
