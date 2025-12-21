
import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowRight, Sun, Moon, Mail, FileText, Code, User, Briefcase, GraduationCap, Github, Linkedin, X } from 'lucide-react';
import { PERSONAL_INFO } from '../constants';

interface CommandPaletteProps {
  isOpen: boolean;
  setIsOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, setIsOpen, toggleTheme, isDarkMode }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const commands = [
    {
      category: "Navigation",
      items: [
        { id: 'about', label: 'Go to About', icon: User, action: () => scrollTo('#about') },
        { id: 'experience', label: 'Go to Experience', icon: Briefcase, action: () => scrollTo('#experience') },
        { id: 'projects', label: 'Go to Projects', icon: Code, action: () => scrollTo('#projects') },
        { id: 'education', label: 'Go to Education', icon: GraduationCap, action: () => scrollTo('#education') },
        { id: 'contact', label: 'Go to Contact', icon: Mail, action: () => scrollTo('#contact') },
      ]
    },
    {
      category: "Actions",
      items: [
        { id: 'theme', label: `Switch to ${isDarkMode ? 'Light' : 'Dark'} Mode`, icon: isDarkMode ? Sun : Moon, action: () => toggleTheme() },
        { id: 'resume', label: 'View Resume', icon: FileText, action: () => window.open('/resume.pdf', '_blank') },
        { id: 'email', label: 'Copy Email', icon: Mail, action: () => { navigator.clipboard.writeText(PERSONAL_INFO.email); alert('Email copied!'); } },
      ]
    },
    {
      category: "Social",
      items: [
        { id: 'github', label: 'Open GitHub', icon: Github, action: () => window.open(`https://${PERSONAL_INFO.github}`, '_blank') },
        { id: 'linkedin', label: 'Open LinkedIn', icon: Linkedin, action: () => window.open(`https://${PERSONAL_INFO.linkedin}`, '_blank') },
      ]
    }
  ];

  const flattenCommands = () => {
    return commands.flatMap(group => group.items).filter(item => 
      item.label.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filteredCommands = flattenCommands();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (isOpen) {
        if (e.key === 'Escape') {
          setIsOpen(false);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            setIsOpen(false);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, setIsOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      setQuery('');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 font-sans">
      <div className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)}></div>
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#020617] rounded-xl shadow-2xl border border-slate-200 dark:border-white/10 overflow-hidden animate-fade-in-up flex flex-col max-h-[60vh] ring-1 ring-black/5 dark:ring-white/10">
        <div className="flex items-center px-4 py-4 border-b border-slate-100 dark:border-white/5">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none px-4 text-xl text-slate-900 dark:text-white placeholder-slate-400 font-light h-full py-2"
            placeholder="Where to?"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
          />
          <div className="flex gap-2">
            <span className="text-[10px] bg-slate-100 dark:bg-white/10 px-2 py-1 rounded text-slate-500 dark:text-slate-400 font-mono tracking-tight border border-slate-200 dark:border-white/5">ESC</span>
          </div>
        </div>

        <div ref={listRef} className="overflow-y-auto py-2 px-2 scrollbar-hide bg-slate-50/50 dark:bg-[#020617]">
          {filteredCommands.length === 0 ? (
            <div className="py-12 text-center text-slate-500 dark:text-slate-400">
              <p className="text-sm">No results found.</p>
            </div>
          ) : (
            commands.map((group, groupIdx) => {
              const groupItems = group.items.filter(item => 
                item.label.toLowerCase().includes(query.toLowerCase())
              );
              if (groupItems.length === 0) return null;

              return (
                <div key={groupIdx} className="mb-2">
                  <div className="px-3 py-2 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    {group.category}
                  </div>
                  {groupItems.map((item) => {
                    const globalIndex = flattenCommands().findIndex(i => i.id === item.id);
                    const isSelected = globalIndex === selectedIndex;

                    return (
                      <button
                        key={item.id}
                        onClick={() => { item.action(); setIsOpen(false); }}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-lg text-left transition-all duration-200 ${
                          isSelected 
                            ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[0.995]' 
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                        }`}
                      >
                        <item.icon size={18} className={isSelected ? 'text-white' : 'text-slate-400 dark:text-slate-500'} strokeWidth={1.5} />
                        <span className="flex-1 font-medium text-sm">{item.label}</span>
                        {isSelected && <ArrowRight size={16} className="text-white/70 animate-pulse" />}
                      </button>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
        
        <div className="px-4 py-3 bg-white dark:bg-[#020617] border-t border-slate-100 dark:border-white/5 text-[10px] text-slate-400 flex justify-between items-center">
           <span className="flex gap-2">
             <span className="flex items-center gap-1"><kbd className="font-mono bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded border border-slate-200 dark:border-white/5">↑</kbd> <kbd className="font-mono bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded border border-slate-200 dark:border-white/5">↓</kbd> to navigate</span>
           </span>
           <span className="flex items-center gap-1"><kbd className="font-mono bg-slate-100 dark:bg-white/10 px-1.5 py-0.5 rounded border border-slate-200 dark:border-white/5">↵</kbd> to select</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
