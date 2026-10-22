'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrambleTextPlugin } from 'gsap/dist/ScrambleTextPlugin';

// Register the plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrambleTextPlugin);
}

const ScrambleText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    // Check if the plugin is registered and the element exists
    if (gsap.plugins.scrambleText && textRef.current) {
      // Set up a GSAP timeline for the hover effect
      const tl = gsap.timeline({ paused: true });

      tl.to(textRef.current, {
        duration: 0.8,
        scrambleText: {
          text: 'GSAP is cool!',
          chars: 'abcdeABCDE12345!@#$%^',
          speed: 0.5,
          revealDelay: 0.2,
          tweenLength: true,
          oldText: 'Hover Me!',
        },
      });

      // Attach event listeners for hover
      const element = textRef.current;
      const handleMouseEnter = () => tl.play();
      const handleMouseLeave = () => tl.reverse();

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);

      // Clean up event listeners on unmount
      return () => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <div className="scramble-container">
      <h1 className="scramble-text" ref={textRef}>
        Hover Me!
      </h1>
    </div>
  );
};

export default ScrambleText;
