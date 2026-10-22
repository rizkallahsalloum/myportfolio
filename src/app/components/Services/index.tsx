'use client';

import React from 'react';
import './Services.scss';
import CtaButton from '../CTA';
import Copy from '../SplitText';
import Reveal from '../Reveal';

const services = [
  {
    number: '01',
    title: 'Product Design',
    description:
      'I design user-centered digital products that turn business goals into clear, intuitive, and scalable user experiences.',
    points: [
      'User flows, wireframes, and product journeys',
      'High-fidelity UI design for web and mobile products',
      'Interactive prototypes and usability-focused design decisions',
    ],
  },
  {
    number: '02',
    title: 'Design Systems',
    description:
      'I create consistent design systems and reusable UI patterns that help products scale across teams, screens, and features.',
    points: [
      'Component libraries and reusable UI patterns',
      'Design tokens, spacing, typography, and visual rules',
      'Developer-ready documentation and handoff',
    ],
  },
  {
    number: '03',
    title: 'UI Engineering',
    description:
      'I translate Figma designs into responsive, accessible, and production-ready interfaces using modern front-end technologies.',
    points: [
      'Semantic HTML5, CSS3, SCSS, and JavaScript',
      'React.js and Next.js UI implementation',
      'Performance, accessibility, and cross-browser optimization',
    ],
  },
  {
    number: '04',
    title: 'Digital Brand Support',
    description:
      'I help refine and extend digital brand systems so your product feels consistent, polished, and recognizable across every touchpoint.',
    points: [
      'Visual identity alignment across digital products',
      'Typography, color, icon, and layout consistency',
      'Supporting UI assets, icons, and design elements',
    ],
  },
];
const Services = () => {
  return (
    <section
      id="services"
      className="full-width-container services"
      data-trigger-pixel="true"
    >
      <Copy variant="lines" delay={0.1}>
        <p className="services__intro">
          I help startups and product teams design and build clear, scalable
          digital experiences — from product strategy and UI design to design
          systems and production-ready front-end implementation.
        </p>
      </Copy>
      <Copy variant="lines" delay={0.1}>
        <h2 className="section-title">
          How <span className="break">I can help</span>
        </h2>
      </Copy>
      <div className="services__grid">
        {services.map((service, index) => (
          <Reveal
            slideDirection="up"
            delay={0.4 + index * 0.3} // Combined both delays
            key={index}
          >
            <div className="service-card">
              <span className="service-card__number">{service.number}</span>
              <div className="service-card__content">
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__desc">{service.description}</p>
                <ol className="service-card__list">
                  {service.points.map((point, i) => (
                    <li key={i} className="service-card__item">
                      {point}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="services__cta">
        <Reveal slideDirection="up" delay={0.5}>
          <CtaButton
            href="#"
            text="Start a project"
            iconSrc="/assets/images/arrow-up-icon.svg"
            calLink="ricksalloum"
          />
        </Reveal>
      </div>
    </section>
  );
};

export default Services;
