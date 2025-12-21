import React, { useEffect, useRef, useState } from 'react';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    // Only enable on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (followerRef.current) {
        followerRef.current.animate({
          transform: `translate3d(${e.clientX - 12}px, ${e.clientY - 12}px, 0)`
        }, {
          duration: 500,
          fill: 'forwards'
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') || 
          target.closest('button')) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      <style>{`
        @media (pointer: coarse) {
          .custom-cursor, .custom-follower { display: none; }
        }
        body { cursor: none; }
        a, button { cursor: none; }
      `}</style>
      <div 
        ref={cursorRef} 
        className="custom-cursor fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[100] mix-blend-difference"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
      <div 
        ref={followerRef} 
        className={`custom-follower fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[100] transition-all duration-200 ease-out ${
          hovering ? 'scale-150 bg-primary/10 border-primary' : 'scale-100'
        }`}
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />
    </>
  );
};

export default CustomCursor;