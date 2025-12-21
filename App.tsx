import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Bot from './components/Bot';
import CustomCursor from './components/CustomCursor';
import CommandPalette from './components/CommandPalette';
import Stats from './components/Stats';

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);

  useEffect(() => {
    // Theme initialization
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }

    // Smart Loading Sequence
    const hasVisited = sessionStorage.getItem('hasVisited');

    if (hasVisited) {
      setLoading(false);
    } else {
      const duration = 2200; 
      const intervalTime = 20;
      const steps = duration / intervalTime;
      let currentStep = 0;
      
      const logs = [
        "INITIALIZING_KERNEL...",
        "LOADING_MODULES [REACT, TAILWIND, FRAMER]...",
        "CONNECTING_TO_NEURAL_NET...",
        "ESTABLISHING_SECURE_Handshake...",
        "LOADING_ASSETS...",
        "CONFIGURING_VIEWPORT...",
        "STARTING_SYSTEM_SERVICES...",
        "READY."
      ];

      const interval = setInterval(() => {
        currentStep++;
        const easeOutQuad = (t: number) => t * (2 - t);
        const ratio = currentStep / steps;
        const newProgress = Math.min(Math.round(easeOutQuad(ratio) * 100), 100);
        
        setProgress(newProgress);

        const logIndex = Math.floor(ratio * logs.length);
        if (logIndex < logs.length && logIndex >= bootLines.length) {
           setBootLines(prev => {
               const newLines = logs.slice(0, logIndex + 1);
               return newLines.length > prev.length ? newLines : prev;
           });
        }

        if (currentStep >= steps) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem('hasVisited', 'true');
          }, 800);
        }
      }, intervalTime);

      return () => clearInterval(interval);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#050505] z-[999] flex flex-col items-center justify-center text-white overflow-hidden font-mono">
        <div className="w-full max-w-md px-6 relative z-10">
            <div className="flex justify-between items-end mb-8 border-b border-white/20 pb-2">
                <span className="text-xs text-indigo-400 font-bold tracking-widest">BASEER.OS</span>
                <span className="text-xs text-gray-500">v2.0.4</span>
            </div>
            <div className="text-6xl md:text-8xl font-black tracking-tighter mb-6 tabular-nums leading-none text-white mix-blend-difference">
               {progress}%
            </div>
            <div className="w-full h-1 bg-gray-900 rounded-full mb-8 overflow-hidden">
                <div 
                    className="h-full bg-indigo-500 transition-all duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="h-32 flex flex-col justify-end gap-1 overflow-hidden mask-image-gradient">
                {bootLines.map((line, index) => (
                    <div key={index} className="text-[10px] md:text-xs text-gray-400 flex items-center gap-2">
                        <span className="text-indigo-500">➜</span>
                        <span className={index === bootLines.length - 1 ? "text-white animate-pulse" : ""}>
                            {line}
                        </span>
                    </div>
                ))}
            </div>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/10 via-[#050505] to-[#050505] z-0"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark' : ''}`}>
      <CustomCursor />
      
      {/* Global Grain Texture */}
      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <NavBar 
        darkMode={darkMode} 
        toggleTheme={toggleTheme} 
        toggleCommandPalette={() => setIsCmdKOpen(true)}
      />
      
      <CommandPalette 
        isOpen={isCmdKOpen} 
        setIsOpen={setIsCmdKOpen} 
        toggleTheme={toggleTheme}
        isDarkMode={darkMode}
      />

      <main className="relative z-10">
        <Hero />
        <Stats />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>

      <Bot />
    </div>
  );
};

export default App;