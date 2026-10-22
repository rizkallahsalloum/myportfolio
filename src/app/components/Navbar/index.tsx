'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useBackwardsScramble } from '../../../hooks/useBackwardsScramble';
import Link from 'next/link';
import Image from 'next/image';
import Menu from '../Menu';
import './Navbar.scss';

const navbarLinks = [
  { path: '#home', label: 'Home' },
  { path: '#services', label: 'Services' },
  { path: '#work', label: 'Work' },
  { path: '#about', label: 'About' },
  { path: '#contact', label: 'Contact' },
];

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  const linkRefs = useRef<HTMLAnchorElement[]>([]);

  const { addElement, cleanup } = useBackwardsScramble({
    speed: 0.5,
    duration: 0.8,
    useRandomChars: false,
  });

  const addToRefs = (el: HTMLAnchorElement | null) => {
    if (el && !linkRefs.current.includes(el)) {
      linkRefs.current.push(el);
    }
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth <= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setShowMenu(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  useEffect(() => {
    if (linkRefs.current.length > 0) {
      linkRefs.current.forEach((element) => {
        addElement(element);
      });
    }

    return cleanup;
  }, [showMenu, isMobileOrTablet, addElement, cleanup]);

  const shouldShowMenu = isMobileOrTablet || showMenu;

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link href="#home" className="navbar-link__logo">
            <Image
              src="/assets/images/header-logo.svg"
              alt="Logo"
              width={52}
              height={71}
              className="navbar-link__logo__icon"
            />
          </Link>
          <span className="navbar-logo-tagline">Every Pixel Has Purpose.</span>
          {shouldShowMenu && <Menu />}
        </div>
        {!shouldShowMenu && (
          <ul className="navbar-list">
            {navbarLinks.map((link, index) => (
              <li className="navbar-item" key={index}>
                <Link
                  className="navbar-link scramble-nav-link"
                  href={link.path}
                  ref={addToRefs}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;
