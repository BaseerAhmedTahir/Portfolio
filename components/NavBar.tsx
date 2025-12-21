import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal, Sun, Moon, Command } from 'lucide-react';

interface NavBarProps {
  darkMode: boolean;
  toggleTheme: () => void;
  toggleCommandPalette: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ darkMode, toggleTheme, toggleCommandPalette }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleActiveSection = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleActiveSection);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleActiveSection);
    };
  }, []);

  const links = [
    { name: 'About', href: '#about' },
    { name: 'Work', href: '#projects' },
    { name: 'History', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 ease-out ${scrolled ? 'pt-4' : 'pt-8'}`}>
      <nav 
        className={`
          relative flex items-center justify-between pl-6 pr-3 rounded-full transition-all duration-500 ease-out
          ${scrolled 
            ? 'w-full max-w-3xl bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl border border-slate-200/50 dark:border-white/10 shadow-lg shadow-black/5 py-2.5' 
            : 'w-full max-w-6xl bg-transparent border border-transparent py-4'
          }
        `}
      >
        {/* Logo Area */}
        <a 
          href="#about" 
          onClick={(e) => scrollToSection(e, '#about')}
          className="flex items-center gap-2 group"
        >
          <div className="relative flex items-center justify-center w-8 h-8 bg-slate-900 dark:bg-white text-white dark:text-black rounded-lg transform rotate-6 transition-transform group-hover:rotate-0 shadow-lg">
            <Terminal size={14} className="relative z-10" strokeWidth={3} />
          </div>
          <span className={`font-bold tracking-tight text-sm transition-all duration-300 text-slate-900 dark:text-white ${scrolled ? 'opacity-100' : 'opacity-100'}`}>
            BASEER<span className="text-primary">.AI</span>
          </span>
        </a>

        {/* Desktop Links - Floating Pill */}
        <div className={`
            hidden md:flex items-center gap-1 p-1 rounded-full transition-all duration-500 absolute left-1/2 -translate-x-1/2
            ${scrolled ? 'bg-slate-100/50 dark:bg-white/5 border border-transparent' : 'bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 backdrop-blur-md shadow-sm'}
        `}>
          {links.map((link) => {
             const isActive = activeSection === link.href.substring(1);
             return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className={`
                  relative px-5 py-1.5 text-xs font-medium rounded-full transition-all duration-300
                  ${isActive 
                    ? 'text-white bg-slate-900 dark:bg-white dark:text-slate-900 shadow-md' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5'
                  }
                `}
              >
                {link.name}
              </a>
             );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleCommandPalette}
            className={`
              hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-mono font-medium transition-colors border
              ${scrolled 
                ? 'bg-slate-100/50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-transparent hover:border-slate-200 dark:hover:border-white/10' 
                : 'bg-white/50 dark:bg-black/20 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10'
              }
            `}
          >
            <Command size={10} /> 
            <span>CMD+K</span>
          </button>

          <div className="h-4 w-px bg-slate-200 dark:bg-white/10 hidden md:block mx-1"></div>

          <button
            onClick={toggleTheme}
            className={`
              w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200
              ${scrolled
                ? 'hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300'
                : 'bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black text-slate-900 dark:text-white border border-slate-200 dark:border-white/10'
              }
            `}
          >
            {darkMode ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/10 text-slate-900 dark:text-white"
          >
            {isOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="absolute top-full left-4 right-4 mt-2 p-2 bg-white/95 dark:bg-[#0f172a]/95 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl animate-fade-in-up flex flex-col gap-1 md:hidden ring-1 ring-black/5 z-50">
          {links.map((link) => (
             <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 transition-colors flex justify-between items-center"
              >
                {link.name}
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-white/10"></span>
              </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBar;