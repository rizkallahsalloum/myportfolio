'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Menu from '../Menu';
import './Header.scss';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <div className={`mobile-header ${isScrolled ? 'visible' : ''}`}>
        <Menu />
      </div>

      <div className={`desktop-header ${isScrolled ? 'hidden' : ''}`}>
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
