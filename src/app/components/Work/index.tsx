'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react'; // Official GSAP hook
import Reveal from '../Reveal';
import './Work.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface Project {
  number: string;
  image: string;
  videoWebM?: string;
  videoMP4?: string;
  alt: string;
  subtitle: string;
  name: string;
  roles: string[];
  tech: string[];
  link: string;
}

const Work = () => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const rightColumnRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  const projects: Project[] = [
    {
      number: '01',
      image: '/assets/images/portfolio/project-deja-vu.webp',
      // videoWebM: '/assets/videos/cme-hub.webm',
      // videoMP4: '/assets/videos/cme-hub.mp4',
      alt: 'Deja vu Project',
      subtitle:
        'A visual-first system for organizing saved content across platforms and eliminating duplicate bookmarks.',
      name: 'Deja vu',
      roles: ['DESIGN', 'PRODUCT STRATEGY', '2026'],
      tech: ['UI/UX', 'FIGMA', 'DESIGN SYSTEM'],
      link: 'https://dribbble.com/shots/27085055-Case-Study-Deja-vu',
    },
    {
      number: '02',
      image: '/assets/images/portfolio/project-cme.webp',
      videoWebM: '/assets/videos/cme-hub.webm',
      videoMP4: '/assets/videos/cme-hub.mp4',
      alt: 'CME Hub Project',
      subtitle:
        'The Learning Management System: A full-stack solution for medical education accreditation and tracking.',
      name: 'CME-Hub',
      roles: ['DESIGN', 'DEVELOPMENT', '2025'],
      tech: ['UI/UX', 'FIGMA', 'NEXT.JS', 'SASS'],
      link: 'https://www.cmehub.net/',
    },
    {
      number: '03',
      image: '/assets/images/portfolio/project-aigo.webp',
      videoWebM: '/assets/videos/aigo.webm',
      videoMP4: '/assets/videos/aigo.mp4',
      alt: 'AIGO Project',
      subtitle: 'A corporate website for AIGO, an AI innovation firm...',
      name: 'AIGO',
      roles: ['DESIGN', 'DEVELOPMENT', '2025'],
      tech: ['UI/UX', 'FIGMA', 'NEXT.JS', 'SASS', 'GSAP'],
      link: 'https://www.ai-go.ai/',
    },
    {
      number: '04',
      image: '/assets/images/portfolio/dashboard.webp',
      videoWebM: '/assets/videos/Nextjs-Dashboard.webm',
      videoMP4: '/assets/videos/Nextjs-Dashboard.mp4',
      alt: 'Nextjs 13 Dashboard Project',
      subtitle:
        'A project I designed using Figma and developed using Nextjs 13 typescript...',
      name: 'Nextjs 13 Dashboard',
      roles: ['DESIGN', 'DEVELOPMENT', '2024'],
      tech: ['UI/UX', 'FIGMA', 'NEXT.JS', 'TYPESCRIPT', 'FIREBASE', 'SASS'],
      link: 'https://nextjs-dashboard-rho-brown-29.vercel.app/',
    },
  ];

  useGSAP(
    () => {
      if (!galleryRef.current) return;

      // Use gsap.utils.toArray for better TypeScript inference
      const details = gsap.utils.toArray<HTMLElement>(
        '.work__desktop-content-section',
      );
      const photos = gsap.utils.toArray<HTMLElement>('.work__desktop-photo');

      // Initial state: hide all photos except the first one
      gsap.set(photos.slice(1), { yPercent: 101 });

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1025px)', () => {
        // Pin the right column
        ScrollTrigger.create({
          trigger: galleryRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: rightColumnRef.current,
          pinSpacing: false,
        });

        // We skip the first detail section because the first photo is already visible
        details.forEach((detail, index) => {
          if (index === 0) return; // Skip the first one

          const headline = detail.querySelector('h3');
          const photo = photos[index];
          const prevPhoto = photos[index - 1];

          if (!headline || !photo) return;

          const tl = gsap.timeline();
          tl.to(photo, { yPercent: 0, ease: 'none' }).set(prevPhoto, {
            autoAlpha: 0,
          });

          ScrollTrigger.create({
            trigger: headline,
            start: 'top 80%',
            end: 'top 50%',
            animation: tl,
            scrub: true,
            onUpdate: (self) => {
              if (self.progress > 0 && self.progress < 1)
                setActiveProjectIndex(index);
            },
            onToggle: (self) => {
              if (self.isActive) setActiveProjectIndex(index);
            },
          });
        });
      });
    },
    { scope: galleryRef },
  ); // Scoping prevents selecting elements outside this component

  return (
    <section className="full-width-container work" id="work">
      <h2 className="section-title">Selected Work</h2>
      <p className="work__intro">
        A collection of projects I've intentionally created...
      </p>

      <article className="work__gallery" ref={galleryRef}>
        <div className="work__gallery-left">
          <div className="work__desktop-content">
            {projects.map((project) => (
              <div
                key={project.number}
                className="work__desktop-content-section"
              >
                <span className="work__number">{project.number}</span>
                <h3 className="work__desktop-title">{project.name}</h3>
                <p className="work__desktop-description">{project.subtitle}</p>
                <div className="work__desktop-roles">
                  {project.roles.join(' · ')}
                </div>
                <div className="work__desktop-tech">
                  {project.tech.join(' · ')}
                </div>
                <Link
                  className="u-arrow-trigger"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                  <span className="u-arrow u-arrow--lg">
                    <span className="u-arrow__icon">
                      <Image
                        src="/assets/images/arrow-up-icon.svg"
                        alt="Arrow"
                        width={10}
                        height={10}
                      />
                    </span>
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="work__gallery-right" ref={rightColumnRef}>
          {/* Mobile View */}
          <div className="work__mobile-content">
            {projects.map((project, index) => (
              <Reveal slideDirection="up" delay={index * 0.3} key={index}>
                <div className="work__mobile-section">
                  <div className="work__mobile-image-container">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="100vw"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <h3 className="work__mobile-title">{project.name}</h3>
                  <Link href={project.link} className="u-arrow-trigger">
                    View Project
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Desktop View Stack */}
          <div className="work__desktop-photos">
            {projects.map((project) => (
              <video
                key={`desktop-${project.number}`}
                autoPlay
                loop
                muted
                playsInline
                className={`work__desktop-photo work__desktop-photo--${project.name}`}
                style={{
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                }}
                poster={project.image}
              >
                <source src={project.videoWebM} type="video/webm" />
                <source src={project.videoMP4} type="video/mp4" />
              </video>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
};

export default Work;
