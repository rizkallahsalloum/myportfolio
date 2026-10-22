import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrambleTextPlugin } from 'gsap/dist/ScrambleTextPlugin';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrambleTextPlugin);
}

export const useBackwardsScramble = (options = {}) => {
  const elementsRef = useRef([]);
  const timelinesRef = useRef(new Map());

  const { speed = 0.5, duration = 0.8 } = options;

  const addElement = (element) => {
    if (!element || timelinesRef.current.has(element)) {
      return;
    }

    const originalText = element.textContent;
    const backwardsText = originalText.split('').reverse().join('');

    const tl = gsap.timeline({ paused: true });

    tl.to(element, {
      scrambleText: {
        text: backwardsText,
        original: originalText,
        speed: speed,
        tweenLength: false,
      },
      duration: duration,
    });

    const handleMouseEnter = () => {
      tl.timeScale(1).play();
    };

    const handleMouseLeave = () => {
      tl.timeScale(1.5).reverse();
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    timelinesRef.current.set(element, {
      timeline: tl,
      listeners: { handleMouseEnter, handleMouseLeave },
    });
  };

  const cleanup = () => {
    timelinesRef.current.forEach(({ timeline, listeners }, element) => {
      element.removeEventListener('mouseenter', listeners.handleMouseEnter);
      element.removeEventListener('mouseleave', listeners.handleMouseLeave);
      timeline.kill();
    });
    timelinesRef.current.clear();
  };

  useEffect(() => {
    return cleanup;
  }, []);

  return { addElement, cleanup };
};
