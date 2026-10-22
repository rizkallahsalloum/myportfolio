// ScrollTextAnimation.tsx
'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollTextAnimation.scss';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTextAnimationProps {
  items?: string[];
  className?: string;
}

const ScrollTextAnimation = ({
  items = [],
  className = '',
}: ScrollTextAnimationProps) => {
  // ✅ FIXED: Added proper types for all refs
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!items.length || itemRefs.current.length === 0 || !containerRef.current)
      return;

    // Filter out null/undefined refs
    itemRefs.current = itemRefs.current.filter(Boolean) as HTMLDivElement[];

    const workSection = containerRef.current.closest('#work');
    if (!workSection) return;

    const ctx = gsap.context(() => {
      itemRefs.current.forEach((item, i) => {
        gsap.set(item, {
          yPercent: 100,
          opacity: 0,
        });
      });

      // Show first item
      gsap.set(itemRefs.current[0], {
        yPercent: 0,
        opacity: 1,
      });

      // Create scroll-triggered animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: workSection,
          start: 'top top',
          end: '+=400%',
          // markers: true,
        },
      });

      items.forEach((_, i) => {
        if (i === items.length - 1) return;

        const currentItem = itemRefs.current[i];
        const nextItem = itemRefs.current[i + 1];

        // Ensure items exist
        if (!currentItem || !nextItem) return;

        // 1. Current item slides up and out
        tl.to(currentItem, {
          yPercent: -100,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        })
          // 2. Next item slides up from below and in
          .to(
            nextItem,
            {
              yPercent: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power2.inOut',
            },
            '<'
          )
          // 3. Add a pause in the timeline that occupies the scroll distance between snaps
          .to({}, { duration: 3.0 });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <div ref={containerRef} className={`scroll-text-animation ${className}`}>
      <div ref={wrapperRef} className="scroll-text-animation__wrapper">
        <div className="scroll-text-animation__inner">
          {items.map((item, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) {
                  itemRefs.current[i] = el;
                }
              }}
              className="scroll-text-animation__item"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollTextAnimation;
