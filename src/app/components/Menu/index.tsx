'use client';
import React, { useState, useRef, useEffect } from 'react';
import { ScrambleTextPlugin } from 'gsap/dist/ScrambleTextPlugin';
import Link from 'next/link';
import Image from 'next/image';
import './Menu.scss';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useBackwardsScramble } from '../../../hooks/useBackwardsScramble';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrambleTextPlugin);
}

const menuLinks = [
  { path: '#home', label: 'Home' },
  { path: '#services', label: 'Services' },
  { path: '#work', label: 'Work' },
  { path: '#about', label: 'About' },
  { path: '#contact', label: 'Contact' },
];

const Menu = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tl = useRef<gsap.core.Timeline>();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const linkRefs = useRef<HTMLAnchorElement[]>([]);
  const infoRefs = useRef<HTMLAnchorElement[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  const { addElement, cleanup } = useBackwardsScramble({
    speed: 0.5,
    duration: 0.8,
  });

  const addToRefs = (
    el: HTMLAnchorElement | null,
    refArray: React.MutableRefObject<HTMLAnchorElement[]>,
  ) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      const elementsToScramble = [
        ...linkRefs.current,
        ...infoRefs.current,
        ctaRef.current,
      ].filter((el): el is HTMLAnchorElement => el !== null);

      elementsToScramble.forEach((element) => {
        addElement(element);
      });
    }

    return () => {
      cleanup();
    };
  }, [isMenuOpen, addElement, cleanup]);

  useGSAP(
    () => {
      gsap.set('.menu__overlay', {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      });
      gsap.set('.menu__link-item-holder', { y: 75, opacity: 0 });
      gsap.set('.menu__info', { y: 30, opacity: 0 });

      tl.current = gsap
        .timeline({ paused: true })
        .to('.menu__overlay', {
          duration: 1.25,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'power4.inOut',
        })
        .to('.menu__link-item-holder', {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.inOut',
          delay: -0.75,
        })
        .to(
          '.menu__info',
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            stagger: 0.1,
            ease: 'power4.inOut',
            delay: -0.75,
          },
          '-=0.25',
        );
    },
    { scope: container },
  );

  useEffect(() => {
    if (isMenuOpen) {
      tl.current?.play();
    } else {
      tl.current?.reverse();
    }
  }, [isMenuOpen]);

  return (
    <div className="menu" ref={container}>
      <div className="menu__bar">
        <button className="menu__toggle" onClick={toggleMenu}>
          <span>[Menu]</span>
        </button>
      </div>

      <div
        className={`menu__overlay ${isMenuOpen ? 'menu__overlay--active' : ''}`}
      >
        <div className="menu__overlay-bar">
          <div className="menu__logo">
            <Link href="#home" className="navbar-link__logo">
              <Image
                src="/assets/images/header-logo.svg"
                alt="Logo"
                width={52}
                height={71}
                className="navbar-link__logo__icon"
              />
            </Link>
          </div>
          <button className="menu__close" onClick={toggleMenu}>
            <span>Close</span>
          </button>
        </div>

        <div className="menu__content">
          <nav className="menu__links">
            {menuLinks.map((link, index) => (
              <div className="menu__link-item" key={index}>
                <div className="menu__link-item-holder">
                  <Link
                    href={link.path}
                    ref={(el) => addToRefs(el, linkRefs)}
                    className="menu__link"
                    onClick={toggleMenu}
                  >
                    {link.label}
                  </Link>
                </div>
              </div>
            ))}
          </nav>

          <div className="menu__info">
            <div className="menu__info-col">
              <a
                href="https://www.linkedin.com/in/rick-salloum"
                target="_blank"
                rel="noopener noreferrer"
                ref={(el) => addToRefs(el, infoRefs)}
              >
                LinkedIn &#8599;
              </a>
              <a
                href="https://github.com/rizkallahsalloum"
                target="_blank"
                rel="noopener noreferrer"
                ref={(el) => addToRefs(el, infoRefs)}
              >
                Github &#8599;
              </a>
              <a
                href="https://dribbble.com/Rizkallah"
                target="_blank"
                rel="noopener noreferrer"
                ref={(el) => addToRefs(el, infoRefs)}
              >
                Dribbble &#8599;
              </a>
              <a
                href="https://www.instagram.com/rizkallah/"
                target="_blank"
                rel="noopener noreferrer"
                ref={(el) => addToRefs(el, infoRefs)}
              >
                Instagram &#8599;
              </a>
            </div>
            <div className="menu__info-col">
              <a
                href="mailto:salloumrick@gmail.com?subject=Contact%20portfolio"
                className="menu__info__email"
              >
                salloumrick@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
