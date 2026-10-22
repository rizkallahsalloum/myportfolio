'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, forwardRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getCalApi } from '@calcom/embed-react';
import './CTA.scss';

interface CtaButtonProps {
  href?: string;
  text: string;
  iconSrc?: string;
  iconAlt?: string;
  iconWidth?: number;
  iconHeight?: number;
  className?: string;
  calLink?: string;
}

const CtaButton = forwardRef<HTMLAnchorElement, CtaButtonProps>(
  (
    {
      href = '#',
      text,
      iconSrc,
      iconAlt = 'icon',
      iconWidth = 20,
      iconHeight = 26,
      className = '',
      calLink,
    },
    externalRef
  ) => {
    const internalRef = useRef<HTMLAnchorElement | null>(null);
    const tl = useRef<gsap.core.Timeline>();

    const setRefs = (node: HTMLAnchorElement | null) => {
      internalRef.current = node;

      // Handle external ref
      if (typeof externalRef === 'function') {
        externalRef(node);
      } else if (externalRef && externalRef !== null) {
        // Use type assertion for external ref object
        (
          externalRef as React.MutableRefObject<HTMLAnchorElement | null>
        ).current = node;
      }
    };

    useGSAP(
      () => {
        tl.current = gsap
          .timeline({ paused: true })
          .to('.cta-button__icon', {
            x: 5,
            y: -5,
            duration: 0.3,
            ease: 'power2.out',
          })
          .to('.cta-button__icon', {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.in',
          });
      },
      { scope: internalRef }
    );

    const handleMouseEnter = () => tl.current?.play();
    const handleMouseLeave = () => tl.current?.reverse();

    useEffect(() => {
      if (!calLink) return;
      (async () => {
        const cal = await getCalApi({ namespace: 'cta-book-call' });
        cal('ui', {
          theme: 'dark',
          styles: { branding: { brandColor: '#ee4648' } },
        });
      })();
    }, [calLink]);

    return (
      <Link
        href={href}
        className={`cta-button ${className}`}
        ref={setRefs}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...(calLink
          ? {
              'data-cal-namespace': 'cta-book-call',
              'data-cal-link': calLink,
              'data-cal-config': '{"layout":"month_view"}',
              onClick: (e: React.MouseEvent) => e.preventDefault(),
            }
          : {})}
      >
        <span className="cta-button__text">{text}</span>
        {iconSrc && (
          <span className="cta-button__icon">
            <Image
              src={iconSrc}
              alt={iconAlt}
              width={iconWidth}
              height={iconHeight}
            />
          </span>
        )}
      </Link>
    );
  }
);

CtaButton.displayName = 'CtaButton';
export default CtaButton;
