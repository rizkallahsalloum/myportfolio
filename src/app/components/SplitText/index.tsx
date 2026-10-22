'use client';
import React, {
  useRef,
  useEffect,
  ReactElement,
  JSXElementConstructor,
} from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(SplitText, ScrollTrigger);

interface CopyProps {
  children: React.ReactElement;
  variant?: 'lines' | 'words' | 'chars';
  animateOnScroll?: boolean;
  delay?: number;
}

export default function Copy({
  children,
  variant = 'lines',
  animateOnScroll = true,
  delay = 0,
}: CopyProps) {
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const split = SplitText.create(containerRef.current, {
      type: variant,
      linesClass: 'line++',
    });

    const targets =
      variant === 'lines'
        ? split.lines
        : variant === 'words'
        ? split.words
        : split.chars;

    gsap.set(targets, { y: '100%', opacity: 0 });

    const animation = {
      y: '0%',
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'power4.out',
      delay,
    };

    if (animateOnScroll) {
      gsap.to(targets, {
        ...animation,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    } else {
      gsap.to(targets, animation);
    }

    return () => {
      split.revert();
    };
  }, [variant, animateOnScroll, delay]);

  return React.cloneElement(children, { ref: containerRef });
}
