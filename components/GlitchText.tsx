import React from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
}

const GlitchText: React.FC<GlitchTextProps> = ({ text, className = "" }) => {
  return (
    <div className={`relative inline-block group ${className}`}>
      <span className="relative z-10">{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-primary opacity-0 group-hover:opacity-70 group-hover:animate-pulse translate-x-[2px] translate-y-[2px] mix-blend-multiply dark:mix-blend-screen transition-all duration-300">
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-secondary opacity-0 group-hover:opacity-70 group-hover:animate-pulse -translate-x-[2px] -translate-y-[2px] mix-blend-multiply dark:mix-blend-screen transition-all duration-300 delay-75">
        {text}
      </span>
    </div>
  );
};

export default GlitchText;