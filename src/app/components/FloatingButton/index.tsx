'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import './FloatingButton.scss';

interface FloatingButtonProps {
  text?: string;
  onClick?: () => void;
}

const FloatingButton = ({
  text = 'View Project',
  onClick,
}: FloatingButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const cursorRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      cursorRef.current = { x, y };

      gsap.to(button, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    const parent = button.parentElement;
    if (parent) {
      parent.addEventListener('mousemove', handleMouseMove);
      parent.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        parent.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  return (
    <button
      ref={buttonRef}
      className="floating-button"
      onClick={onClick}
      aria-label={text}
    >
      <span className="floating-button__text">{text}</span>
      <span className="floating-button__icon">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 10H16M16 10L11 5M16 10L11 15"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
};

export default FloatingButton;
