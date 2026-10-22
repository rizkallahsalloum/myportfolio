'use client';

import React from 'react';
import './Hero.scss';
import CtaButton from '../CTA';
import Copy from '../SplitText';
import Reveal from '../Reveal';

const Hero = () => {
  return (
    <section className="hero full-width-container" id="home">
      <div className="hero__main">
        <Copy variant="lines">
          <h1 className="hero__title">
            I build bold web <span className="break"> experiences</span>
          </h1>
        </Copy>
      </div>

      <div className="hero__body">
        <Copy variant="words">
          <h2 className="hero__iam">I'm</h2>
        </Copy>

        <Copy variant="lines">
          <h3 className="hero__name">
            <span className="hero__firstname"> Rick</span>
            <span className="hero__lastname"> Salloum</span>
          </h3>
        </Copy>

        <Copy variant="lines" delay={0.2}>
          <p className="hero__description">
            With over a decade of experience bridging the gap between design and
            front-end development, I help startups grow by crafting bold product
            interfaces, intuitive user experiences, and strong digital
            identities.
          </p>
        </Copy>

        <Copy variant="lines" delay={0.3}>
          <h4 className="hero__role">
            <span className="hero__role-title">Product Designer</span>
            <span className="hero__role-subtitle">and Senior UI Engineer</span>
          </h4>
        </Copy>
      </div>

      <div className="hero__footer">
        <div className="hero__footer-content">
          <CtaButton
            href="#"
            text="Book a Call"
            iconSrc="/assets/images/arrow-up-icon.svg"
            calLink="ricksalloum"
          />
        </div>
        <p className="hero__status">Available for Freelance</p>
      </div>
    </section>
  );
};

export default Hero;
