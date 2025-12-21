
import React from 'react';
import { SKILLS } from '../constants';

const Marquee: React.FC = () => {
  // Flatten skills into a single array
  const allSkills = SKILLS.flatMap(category => category.skills);
  // Duplicate for seamless loop
  const marqueeItems = [...allSkills, ...allSkills];

  return (
    <div className="relative flex overflow-x-hidden w-full mt-2 group">
      {/* Gradient Masks */}
      <div className="absolute top-0 bottom-0 left-0 w-32 z-10 bg-gradient-to-r from-lightBg to-transparent dark:from-[#000000] dark:to-transparent"></div>
      <div className="absolute top-0 bottom-0 right-0 w-32 z-10 bg-gradient-to-l from-lightBg to-transparent dark:from-[#000000] dark:to-transparent"></div>

      <div className="py-2 animate-marquee whitespace-nowrap flex gap-8 items-center">
        {marqueeItems.map((skill, index) => (
          <div 
            key={`${skill}-${index}`} 
            className="text-lg font-bold text-slate-300 dark:text-slate-700 uppercase tracking-widest hover:text-primary dark:hover:text-white transition-colors cursor-default"
          >
            {skill}
            <span className="ml-8 text-primary/30">•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
