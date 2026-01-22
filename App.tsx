
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
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);

  useEffect(() => {
    // 1. Disable browser scroll restoration to prevent starting in the middle
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    
    // 2. Force immediate scroll to top
    window.scrollTo(0, 0);

    // Theme initialization
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
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
