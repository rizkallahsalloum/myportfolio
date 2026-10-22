'use client';

import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
  slideDirection?: 'up' | 'down' | 'left' | 'right' | 'fade';
  className?: string;
}

export default function Reveal({
  children,
  animateOnScroll = true,
  delay = 0,
  slideDirection = 'up',
  className = '',
}: RevealProps) {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    let initialProps: gsap.TweenVars = { opacity: 0 };
    let finalProps: gsap.TweenVars = {
      opacity: 1,
      duration: 1,
      ease: 'power4.out',
      delay,
    };

    switch (slideDirection) {
      case 'up':
        initialProps = { y: 50, opacity: 0 };
        finalProps = { ...finalProps, y: 0 };
        break;
      case 'down':
        initialProps = { y: -50, opacity: 0 };
        finalProps = { ...finalProps, y: 0 };
        break;
      case 'left':
        initialProps = { x: 50, opacity: 0 };
        finalProps = { ...finalProps, x: 0 };
        break;
      case 'right':
        initialProps = { x: -50, opacity: 0 };
        finalProps = { ...finalProps, x: 0 };
        break;
      case 'fade':
      default:
        initialProps = { opacity: 0 };
        finalProps = { ...finalProps, y: 0, x: 0 };
        break;
    }

    gsap.set(containerRef.current, initialProps);

    if (animateOnScroll) {
      gsap.to(containerRef.current, {
        ...finalProps,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 90%',
          once: true,
        },
      });
    } else {
      gsap.to(containerRef.current, finalProps);
    }
  }, [animateOnScroll, delay, slideDirection]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
