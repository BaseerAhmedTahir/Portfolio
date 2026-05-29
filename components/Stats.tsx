
import React from 'react';
import { Reveal } from './Reveal';

const Stats: React.FC = () => {
  const stats = [
    { label: "Years Dev.", value: "2+" },
    { label: "Projects", value: "10+" },
    { label: "CGPA", value: "3.36" },
    { label: "Commits", value: "1k+" },
  ];

  return (
    <section className="py-12 bg-slate-50 dark:bg-darker border-b border-slate-200 dark:border-white/5 relative z-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <Reveal key={index} delay={index * 0.1} width="100%">
              <div className="flex flex-col items-center justify-center p-6 bg-white dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 hover:border-primary/20 transition-colors">
                <span className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-2 tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                  {stat.value}
                </span>
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  {stat.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
