import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { siteConfig } from '../data/mock';

const Hero = () => {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const headingWrapperRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(
      line1Ref.current,
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1 }
    )
      .fromTo(
        line2Ref.current,
        { opacity: 0, y: 80 },
        { opacity: 1, y: 0, duration: 1 },
        '-=0.6'
      )
      .fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      )
      .fromTo(
        buttonsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      );

    // Subtle headline hover interaction - Option A: Micro vertical lift
    const headingWrapper = headingWrapperRef.current;
    if (headingWrapper && !prefersReducedMotion) {
      const handleMouseEnter = () => {
        gsap.to(headingWrapper, { 
          y: -3, 
          duration: 0.25, 
          ease: 'power1.out' 
        });
      };
      const handleMouseLeave = () => {
        gsap.to(headingWrapper, { 
          y: 0, 
          duration: 0.25, 
          ease: 'power1.out' 
        });
      };

      headingWrapper.addEventListener('mouseenter', handleMouseEnter);
      headingWrapper.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        headingWrapper.removeEventListener('mouseenter', handleMouseEnter);
        headingWrapper.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, []);

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="min-h-screen bg-[#1a1a40] flex flex-col justify-center items-center relative overflow-visible"
    >
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-12 text-center hero-wrapper" style={{ overflow: 'visible' }}>
        {/* Main Headline - Grouped wrapper for hover interaction */}
        <div 
          ref={headingWrapperRef}
          className="hero-heading cursor-default"
          style={{ 
            lineHeight: 1.16, 
            paddingBottom: '0.36em', 
            overflow: 'visible',
            transition: 'transform 0.25s ease'
          }}
          tabIndex={0}
        >
          <div className="overflow-visible mb-2">
            <h1
              ref={line1Ref}
              className="hero-line-1 text-white tracking-tight leading-tight"
              style={{
                fontSize: 'clamp(2rem, 8vw, 4.5rem)',
                fontWeight: 700,
                lineHeight: 1.16,
                overflow: 'visible'
              }}
            >
              Partnering for Progress,
            </h1>
          </div>
          <div className="overflow-visible" style={{ paddingBottom: '0.2em' }}>
            <h1
              ref={line2Ref}
              className="hero-emphasis tracking-tight leading-tight"
              style={{
                fontSize: 'clamp(2rem, 8vw, 4.5rem)',
                fontWeight: 600,
                fontStyle: 'normal', /* NOT italic */
                color: '#8a6bd9', /* Accent color derived from logo */
                lineHeight: 1.16,
                overflow: 'visible'
              }}
            >
              Delivering Excellence
            </h1>
          </div>
        </div>

        {/* Description */}
        <p
          ref={descRef}
          className="text-white/70 max-w-3xl mx-auto mb-12 leading-relaxed"
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
            fontStyle: 'italic'
          }}
        >
          Expert project management and claims advisory services with over 20 years of experience in complex construction projects worldwide.
        </p>

        {/* Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="px-8 py-4 bg-[#7c6bc4] hover:bg-[#6b5ab3] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-[#8a6bd9] focus:ring-offset-2 focus:ring-offset-[#1a1a40]"
          >
            Get Consultation
          </a>
          <a
            href="#services"
            onClick={(e) => scrollToSection(e, '#services')}
            className="px-8 py-4 border-2 border-white/50 hover:border-white text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 min-w-[200px] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1a1a40]"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
