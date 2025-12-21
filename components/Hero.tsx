import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO, ROLES } from '../constants';
import { Github, Linkedin, FileText, ArrowRight, Terminal, Cpu } from 'lucide-react';
import { Reveal } from './Reveal';
import MagneticButton from './MagneticButton';
import GlitchText from './GlitchText';

const Hero: React.FC = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState(ROLES[0]);
  
  useEffect(() => {
    let interval: any;
    const targetText = ROLES[currentRoleIndex];
    let iteration = 0;
    
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/@#%&*";

    interval = setInterval(() => {
      setDisplayedText(prev => 
        targetText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("")
      );

      if (iteration >= targetText.length) { 
        clearInterval(interval);
        setTimeout(() => {
             setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, 3000);
      }
      
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [currentRoleIndex]);

  return (
    <section id="about" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 pb-20 md:pb-0 scroll-mt-20">
      
      {/* Premium Background */}
      <div className="absolute inset-0 w-full h-full bg-lightBg dark:bg-dark transition-colors duration-500">
        <div className="absolute inset-0 bg-grid-dark dark:bg-grid-white opacity-[0.03]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lightBg/50 to-lightBg dark:via-dark/80 dark:to-dark z-10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[128px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-[128px] animate-pulse-slow animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="flex flex-col items-center justify-center text-center">
            
            <Reveal>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-xs font-bold tracking-widest uppercase bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-full mb-8 md:mb-10 backdrop-blur-md shadow-sm hover:border-primary/30 transition-colors cursor-default">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-slate-600 dark:text-slate-300">Available for Hire</span>
                <span className="text-slate-300 dark:text-slate-600">|</span>
                <span className="text-primary">Global Remote</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white tracking-tighter leading-[0.9] mb-8 select-none">
                <GlitchText text="BASEER" />
                <span className="block text-slate-300 dark:text-slate-700">AHMED.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
               <div className="h-12 md:h-20 flex items-center justify-center mb-8 md:mb-10">
                  <div className="flex items-center gap-3 md:gap-4 px-5 py-2.5 md:px-6 md:py-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 shadow-inner">
                     <Cpu size={18} className="text-primary md:w-5 md:h-5" />
                     <p className="font-mono text-sm md:text-xl text-slate-700 dark:text-slate-200 font-bold uppercase tracking-widest">
                       {displayedText}
                     </p>
                  </div>
               </div>
            </Reveal>

            <Reveal delay={0.3}>
              <p className="text-slate-600 dark:text-slate-400 max-w-xl md:max-w-2xl text-base md:text-xl font-light mb-10 md:mb-12 leading-relaxed px-4">
                Architecting <span className="text-slate-900 dark:text-white font-medium border-b border-primary/50">Agentic AI</span> workflows & <span className="text-slate-900 dark:text-white font-medium border-b border-secondary/50">High-Scale</span> web systems.
                <br className="hidden md:block"/> Turning research into production-grade software.
              </p>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
                <MagneticButton 
                  href={`mailto:${PERSONAL_INFO.email}`} 
                  className="group relative w-full sm:w-auto px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-bold text-base rounded-full hover:scale-105 transition-all shadow-xl hover:shadow-2xl shadow-indigo-500/20 flex items-center justify-center gap-3 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start a Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:hidden"></div>
                </MagneticButton>
                
                <MagneticButton 
                  href="/resume.pdf" 
                  target="_blank" 
                  className="w-full sm:w-auto px-8 py-4 border border-slate-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm text-slate-900 dark:text-white font-bold text-base rounded-full hover:bg-white dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-white/20 transition-all flex items-center justify-center gap-3"
                >
                  <FileText size={18} /> View Resume
                </MagneticButton>
              </div>
            </Reveal>
            
            <Reveal delay={0.5}>
               <div className="mt-12 md:mt-16 flex items-center gap-8 text-slate-400 dark:text-slate-500">
                  <a href={`https://${PERSONAL_INFO.github}`} target="_blank" className="hover:text-slate-900 dark:hover:text-white transition-colors hover:scale-110 duration-300"><Github size={24} /></a>
                  <a href={`https://${PERSONAL_INFO.linkedin}`} target="_blank" className="hover:text-slate-900 dark:hover:text-white transition-colors hover:scale-110 duration-300"><Linkedin size={24} /></a>
               </div>
            </Reveal>

        </div>
      </div>
    </section>
  );
};

export default Hero;