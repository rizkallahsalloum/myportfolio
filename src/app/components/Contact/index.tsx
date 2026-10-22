'use client';
import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import './Contact.scss';
import Image from 'next/image';
import CtaButton from '../CTA';
import Link from 'next/link';
import CountryTiming from '../CountryTiming';

const Contact = () => {
  const words = ['design', 'build', 'code', 'create', 'launch'];
  const wordRefs = useRef<HTMLSpanElement[]>([]);

  const setWordRef = useCallback(
    (el: HTMLSpanElement | null, index: number) => {
      if (el) {
        wordRefs.current[index] = el;
      }
    },
    [],
  );

  useEffect(() => {
    // Early return if refs aren't ready
    if (wordRefs.current.length === 0 || wordRefs.current.some((ref) => !ref)) {
      return;
    }

    const tl = gsap.timeline({ repeat: -1 });

    // Hide all words initially
    gsap.set(wordRefs.current, {
      yPercent: 100,
      opacity: 0,
    });

    // Set the first word visible at the start
    gsap.set(wordRefs.current[0], {
      yPercent: 0,
      opacity: 1,
    });

    tl.to({}, { duration: 1 });

    words.forEach((_, i) => {
      const currentWord = wordRefs.current[i];
      const nextWord = wordRefs.current[(i + 1) % words.length];

      if (!currentWord || !nextWord) return;

      // current word → out
      tl.to(currentWord, {
        yPercent: -100,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
      })
        // next word → in (simultaneously)
        .to(
          nextWord,
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power2.inOut',
          },
          '<',
        )
        // pause to display the word
        .to({}, { duration: 1 });
    });

    return () => {
      if (tl) {
        tl.kill();
      }
    };
  }, [words]);

  return (
    <footer id="contact" className="full-width-container contact">
      <div className="contact__container">
        <h2 className="section-title">
          Lets
          <span className="word-wrapper">
            {'{'}
            <span className="word-inner">
              {words.map((word, i) => (
                <span key={i} ref={(el) => setWordRef(el, i)} className="word">
                  {word}
                </span>
              ))}
            </span>
            {'}'}
          </span>
          together
        </h2>

        <div className="contact__content">
          <p className="contact__content-paragraph">
            Have a project in mind? I'd love to hear from you.
          </p>
        </div>
      </div>
      <div className="contact__footer">
        <CtaButton
          href="#"
          text="Book a Call"
          iconSrc="/assets/images/arrow-up-icon.svg"
          className="contact__cta"
          calLink="ricksalloum"
        />
        <div className="footer__socials">
          <div className="footer__socials-links">
            <Link
              href="mailto:salloumrick@gmail.com?subject=Contact%20portfolio"
              className="u-arrow-trigger"
            >
              Email
              <span className="u-arrow u-arrow--lg">
                <span className="u-arrow__icon">
                  <Image
                    src="/assets/images/arrow-up-icon.svg"
                    alt="Arrow icon"
                    width={10}
                    height={10}
                  />
                </span>

                <span className="u-arrow__icon u-arrow__icon--alt">
                  <Image
                    src="/assets/images/arrow-up-icon.svg"
                    alt="Arrow icon"
                    width={10}
                    height={10}
                  />
                </span>
              </span>
            </Link>

            <Link
              href="https://www.linkedin.com/in/rick-salloum"
              target="_blank"
              rel="noopener noreferrer"
              className="u-arrow-trigger"
            >
              LinkedIn
              <span className="u-arrow u-arrow--lg">
                <span className="u-arrow__icon">
                  <Image
                    src="/assets/images/arrow-up-icon.svg"
                    alt="Arrow icon"
                    width={10}
                    height={10}
                  />
                </span>

                <span className="u-arrow__icon u-arrow__icon--alt">
                  <Image
                    src="/assets/images/arrow-up-icon.svg"
                    alt="Arrow icon"
                    width={10}
                    height={10}
                  />
                </span>
              </span>
            </Link>
            <Link
              href="https://github.com/rizkallahsalloum"
              target="_blank"
              rel="noopener noreferrer"
              className="u-arrow-trigger"
            >
              GitHub
              <span className="u-arrow u-arrow--lg">
                <span className="u-arrow__icon">
                  <Image
                    src="/assets/images/arrow-up-icon.svg"
                    alt="Arrow icon"
                    width={10}
                    height={10}
                  />
                </span>

                <span className="u-arrow__icon u-arrow__icon--alt">
                  <Image
                    src="/assets/images/arrow-up-icon.svg"
                    alt="Arrow icon"
                    width={10}
                    height={10}
                  />
                </span>
              </span>
            </Link>
            <Link
              href="https://dribbble.com/Rizkallah"
              target="_blank"
              rel="noopener noreferrer"
              className="u-arrow-trigger"
            >
              Dribbble
              <span className="u-arrow u-arrow--lg">
                <span className="u-arrow__icon">
                  <Image
                    src="/assets/images/arrow-up-icon.svg"
                    alt="Arrow icon"
                    width={10}
                    height={10}
                  />
                </span>

                <span className="u-arrow__icon u-arrow__icon--alt">
                  <Image
                    src="/assets/images/arrow-up-icon.svg"
                    alt="Arrow icon"
                    width={10}
                    height={10}
                  />
                </span>
              </span>
            </Link>

            <Link
              href="https://www.instagram.com/rizkallah/"
              target="_blank"
              rel="noopener noreferrer"
              className="u-arrow-trigger"
            >
              Instagram
              <span className="u-arrow u-arrow--lg">
                <span className="u-arrow__icon">
                  <Image
                    src="/assets/images/arrow-up-icon.svg"
                    alt="Arrow icon"
                    width={10}
                    height={10}
                  />
                </span>

                <span className="u-arrow__icon u-arrow__icon--alt">
                  <Image
                    src="/assets/images/arrow-up-icon.svg"
                    alt="Arrow icon"
                    width={10}
                    height={10}
                  />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="footer__copyrights">
        <span>Rick Salloum &copy; {new Date().getFullYear()}</span>
        <CountryTiming />
      </div>
    </footer>
  );
};

export default Contact;
