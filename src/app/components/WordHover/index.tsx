'use client';

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './WordHover.scss';

interface HoverWordConfig {
  word: string;
  label: string;
  imageSrc: string;
  alt: string;
}

interface WordHoverProps {
  text: string;
  hoverWords: HoverWordConfig[];
  className?: string;
  hoverWordStyle?: React.CSSProperties;
}

const WordHover: React.FC<WordHoverProps> = ({
  text,
  hoverWords,
  className,
  hoverWordStyle = {
    cursor: 'pointer',
    borderBottom: '1px solid transparent',
    transition: 'all 0.2s ease',
  },
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imagesRef.current || !contentRef.current)
      return;

    const container = containerRef.current;
    const images = imagesRef.current.querySelectorAll('img');
    const hoverElements =
      contentRef.current.querySelectorAll('[data-hover-word]');

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(images, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -10,
        yPercent: -50,
        stagger: 0.02,
      });
    };

    container.addEventListener('mousemove', handleMouseMove);

    hoverElements.forEach((element) => {
      const wordLabel = element.getAttribute('data-hover-word');
      if (!wordLabel) return;

      const handleMouseEnter = () => {
        const targetImage = imagesRef.current?.querySelector(
          `img[data-image="${wordLabel}"]`
        );

        if (targetImage) {
          gsap.to(targetImage, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.set(targetImage, { zIndex: 10 });
        }
      };

      const handleMouseLeave = () => {
        const targetImage = imagesRef.current?.querySelector(
          `img[data-image="${wordLabel}"]`
        );

        if (targetImage) {
          gsap.to(targetImage, {
            opacity: 0,
            scale: 0.85,
            duration: 0.3,
            ease: 'power2.out',
          });
          gsap.set(targetImage, { zIndex: -1 });
        }

        if (element instanceof HTMLElement) {
          element.style.color = '';
          element.style.borderBottomColor = 'transparent';
        }
      };

      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const processText = (text: string): string => {
    let processedText = text;

    hoverWords.forEach((item) => {
      const regex = new RegExp(`\\b${item.word}\\b`, 'gi');
      const styleString = Object.entries(hoverWordStyle)
        .map(
          ([key, value]) =>
            `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value}`
        )
        .join('; ');

      processedText = processedText.replace(
        regex,
        `<span data-hover-word="${item.label}" style="${styleString}"  class="highlight">${item.word}</span>`
      );
    });

    return processedText;
  };

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      <div
        ref={imagesRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1000,
        }}
      >
        {hoverWords.map((item) => (
          <img
            key={item.label}
            src={item.imageSrc}
            alt={item.alt}
            data-image={item.label}
            style={{
              position: 'absolute',
              width: 'fit-content%',
              height: 'fit-content',
              objectFit: 'cover',
              opacity: 0,
              zIndex: -1,
              transform: 'scale(0.85)',
              borderRadius: '8px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            }}
          />
        ))}
      </div>

      <div
        ref={contentRef}
        className={className}
        dangerouslySetInnerHTML={{ __html: processText(text) }}
      />
    </div>
  );
};

export default WordHover;
