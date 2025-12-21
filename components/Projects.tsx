import React, { useState } from 'react';
import { PROJECTS, PERSONAL_INFO } from '../constants';
import { ArrowUpRight, FolderGit2, Code2 } from 'lucide-react';
import { Reveal } from './Reveal';
import ProjectModal from './ProjectModal';
import { Project } from '../types';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const getSpanClasses = (index: number) => {
     if (index === 0) return "md:col-span-2 md:row-span-2 min-h-[400px] md:min-h-[500px]";
     if (index === 3) return "md:col-span-2 min-h-[300px] md:min-h-[350px]";
     return "md:col-span-1 min-h-[300px] md:min-h-[350px]";
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-lightBg dark:bg-dark relative transition-colors duration-500 scroll-mt-20">
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-6 border-b border-slate-200 dark:border-white/10 pb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 bg-primary/10 rounded-md">
                    <Code2 className="text-primary w-5 h-5" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-primary uppercase">Selected Works</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                DIGITAL <br/>
                <span className="text-slate-300 dark:text-slate-700">CRAFTSMANSHIP.</span>
              </h2>
            </div>
            <a href={`https://${PERSONAL_INFO.github}`} target="_blank" className="hidden md:flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-slate-500 hover:text-primary transition-all group">
              View All <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors"><ArrowUpRight size={14} /></div>
            </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {PROJECTS.map((project, index) => (
            <Reveal key={index} delay={index * 0.05} width="100%" className={`${getSpanClasses(index)}`}>
              <div 
                className={`h-full w-full group relative overflow-hidden rounded-[2rem] cursor-pointer border border-slate-200 dark:border-white/5 bg-white dark:bg-[#0f172a] hover:border-slate-300 dark:hover:border-white/20 transition-all duration-500 shadow-sm`}
                onClick={() => setSelectedProject(project)}
              >
                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 p-6 md:p-8 flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <span className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                        {project.category.split('|')[0].trim()}
                      </span>
                      <div className="w-10 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all -translate-y-2 group-hover:translate-y-0 duration-300 border border-white/10">
                         <ArrowUpRight size={18} />
                      </div>
                   </div>
                   
                   <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight tracking-tight drop-shadow-md">{project.title}</h3>
                      <p className="text-slate-200 text-xs md:text-sm line-clamp-2 mb-4 opacity-0 group-hover:opacity-90 transition-opacity delay-75 duration-300 leading-relaxed font-light">
                         {project.description[0]}
                      </p>
                      <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                         {project.tech.slice(0,3).map(t => (
                            <span key={t} className="text-[10px] font-bold tracking-wider text-white/90 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">#{t}</span>
                         ))}
                      </div>
                   </div>
                </div>

                {/* Smooth Gradient Backgrounds */}
                <div className={`absolute inset-0 z-10 transition-transform duration-700 group-hover:scale-105 opacity-90
                   ${index % 4 === 0 ? 'bg-gradient-to-br from-[#4338ca] to-[#1e1b4b]' : 
                     index % 4 === 1 ? 'bg-gradient-to-bl from-[#059669] to-[#064e3b]' : 
                     index % 4 === 2 ? 'bg-gradient-to-tr from-[#be123c] to-[#881337]' :
                     'bg-gradient-to-br from-[#1d4ed8] to-[#1e3a8a]'}`
                }>
                   <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                   {/* Subtle Grain */}
                   <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                </div>
              </div>
            </Reveal>
          ))}
          
           {/* CTA Card */}
           <Reveal delay={0.4} width="100%" className="md:col-span-1 min-h-[300px] md:min-h-[350px]">
              <a href={`https://${PERSONAL_INFO.github}`} target="_blank" className="flex flex-col items-center justify-center h-full w-full rounded-[2rem] border-2 border-dashed border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group text-center p-8 cursor-pointer relative overflow-hidden">
                 <div className="relative z-10">
                    <div className="p-4 bg-white dark:bg-white/10 rounded-full mb-4 inline-block group-hover:scale-110 transition-transform text-slate-400 group-hover:text-primary shadow-sm">
                        <FolderGit2 size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">GitHub Archives</h3>
                    <p className="text-sm text-slate-500 mt-2">Check out open source contributions</p>
                 </div>
              </a>
           </Reveal>
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default Projects;