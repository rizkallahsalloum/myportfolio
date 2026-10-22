// ImageReveal.tsx (Updated)
'use client';
import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

// Define possible slide directions
type SlideDirection = 'up' | 'down' | 'left' | 'right' | 'fade';

interface ImageRevealProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  animateOnScroll?: boolean;
  delay?: number;
  slideDirection?: SlideDirection;
  className?: string;
}

export default function ImageReveal({
  src,
  alt,
  width,
  height,
  animateOnScroll = true,
  delay = 0,
  slideDirection = 'up',
  className = '',
}: ImageRevealProps) {
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    if (!imageRef.current) return;

    let initialProps: gsap.TweenVars = { opacity: 0 };
    let finalProps: gsap.TweenVars = {
      opacity: 1,
      duration: 1,
      ease: 'power4.out',
      delay,
    };

    switch (slideDirection) {
      case 'up':
        // Starts 50px below, animates to y: 0
        initialProps = { y: 50, opacity: 0 };
        finalProps = { ...finalProps, y: 0 };
        break;
      case 'down':
        // Starts 50px above, animates to y: 0
        initialProps = { y: -50, opacity: 0 };
        finalProps = { ...finalProps, y: 0 };
        break;
      case 'left':
        // Starts 50px to the right, animates to x: 0
        initialProps = { x: 50, opacity: 0 };
        finalProps = { ...finalProps, x: 0 };
        break;
      case 'right':
        // Starts 50px to the left, animates to x: 0
        initialProps = { x: -50, opacity: 0 };
        finalProps = { ...finalProps, x: 0 };
        break;
      case 'fade':
      default:
        // Pure fade-in (only opacity)
        initialProps = { opacity: 0 };
        finalProps = { ...finalProps, y: 0, x: 0 }; // Ensure x/y are reset just in case
        break;
    }

    // 2. Set the Initial (Hidden) State
    gsap.set(imageRef.current, initialProps);

    // 3. Run the Animation (Reveal State)
    if (animateOnScroll) {
      gsap.to(imageRef.current, {
        ...finalProps,
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 75%',
          once: true,
        },
      });
    } else {
      gsap.to(imageRef.current, finalProps);
    }
  }, [animateOnScroll, delay, slideDirection]);

  return (
    <div ref={imageRef} className={className}>
      <Image src={src} alt={alt} width={width} height={height} />
    </div>
  );
}
