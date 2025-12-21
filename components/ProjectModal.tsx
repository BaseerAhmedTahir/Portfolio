
import React, { useEffect } from 'react';
import { X, ExternalLink, Github } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
       document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md transition-opacity duration-300" 
        onClick={onClose}
      ></div>
      <div className="relative w-full max-w-3xl bg-white dark:bg-[#020617] rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 animate-fade-in-up flex flex-col max-h-[90vh]">
        
        {/* Header Image Placeholder */}
        <div className="h-48 sm:h-72 bg-gradient-to-br from-[#6366f1] to-[#4338ca] relative flex-shrink-0 group">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
           <div className="absolute inset-0 bg-grid-white/[0.2] opacity-50"></div>
           <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
           
           <button 
             onClick={onClose}
             className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-all hover:rotate-90 z-20"
           >
             <X size={20} />
           </button>
           
           <div className="absolute bottom-6 left-6 sm:left-8 z-10 pr-6">
             <div className="inline-block px-3 py-1 mb-3 text-xs font-mono font-bold text-white bg-black/30 rounded-full backdrop-blur-md border border-white/20 shadow-lg">
               {project.category}
             </div>
             <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tighter drop-shadow-xl">{project.title}</h2>
           </div>
        </div>

        <div className="p-6 sm:p-10 overflow-y-auto custom-scrollbar">
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tech.map(t => (
              <span key={t} className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-indigo-300 bg-slate-100 dark:bg-indigo-500/10 border border-slate-200 dark:border-indigo-500/20 rounded-lg">
                {t}
              </span>
            ))}
          </div>

          <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-base sm:text-lg">
             {project.description.map((desc, i) => (
                <p key={i} className="flex gap-4">
                  <span className="text-primary mt-2 h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0"></span>
                  {desc}
                </p>
             ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4 border-t border-slate-100 dark:border-white/10 pt-8">
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full hover:scale-105 active:scale-95 transition-all shadow-xl shadow-slate-900/10 dark:shadow-none"
              >
                <ExternalLink size={18} /> View Project
              </a>
            )}
             <a 
                href="#" 
                className="flex items-center gap-2 px-6 py-3.5 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-bold rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors border border-slate-200 dark:border-white/10"
              >
                <Github size={18} /> Source Code
              </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
