'use client';
import React from 'react';
import './About.scss';
import WordHover from '../WordHover';

const countryHoverWords = [
  {
    word: 'Lebanese',
    label: 'lebanese',
    imageSrc: 'assets/images/rawche.webp',
    alt: 'Rawche Beirut',
  },
  {
    word: 'Brest, Belarus',
    label: 'brest',
    imageSrc: 'assets/images/brest.webp',
    alt: 'Brest Fortress',
  },
  {
    word: 'IE6',
    label: 'ie6',
    imageSrc: 'assets/images/IE6-web.webp',
    alt: 'IE6 Browser',
  },
];

const About = () => {
  return (
    <section id="about" className="full-width-container about">
      <h2 className="section-title">
        I've been working with
        <span className="break">pixels since the days of</span>
        <span className="break">
          <WordHover
            text="IE6"
            hoverWords={countryHoverWords}
            data-image="ie6"
          />
        </span>
      </h2>

      <div className="about__content">
        <WordHover
          text="Lebanese, currently based in Brest, Belarus. I'm mostly self-taught driven by curiosity that evolved into a career spanning over 15 years in both freelance and studio environments."
          hoverWords={countryHoverWords}
          className="about__content-paragraph"
          data-image="belarus"
        />

        <p className="about__content-paragraph">
          I bring bold web experiences to life, blending clean UI design with
          smooth front-end interactions. Every project I take on is guided by
          clarity, detail, and a strong sense of storytelling
        </p>
      </div>
    </section>
  );
};

export default About;
