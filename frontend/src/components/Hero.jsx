import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { siteConfig } from '../data/mock';

const Hero = () => {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const descRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(
      line1Ref.current,
      { opacity: 0, y: 80, skewY: 3 },
      { opacity: 1, y: 0, skewY: 0, duration: 1 }
    )
      .fromTo(
        line2Ref.current,
        { opacity: 0, y: 80, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1 },
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
      className="min-h-screen bg-[#1a1a40] flex flex-col justify-center items-center relative overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=30')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#1a1a40]/85" />
      
      {/* Blueprint pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg stroke='%234a90d9' stroke-width='0.5'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3Cpath d='M30 0v60M0 30h60'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 max-w-[1100px] mx-auto px-6 lg:px-12 text-center">
        {/* Main Headline */}
        <div className="overflow-hidden mb-2">
          <h1
            ref={line1Ref}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-tight"
          >
            Partnering for Progress,
          </h1>
        </div>
        <div className="overflow-hidden mb-8">
          <h1
            ref={line2Ref}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold italic tracking-tight leading-tight"
            style={{ color: '#8b7dd8' }}
          >
            Delivering Excellence
          </h1>
        </div>

        {/* Description */}
        <p
          ref={descRef}
          className="text-white/70 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed italic"
        >
          Expert project management and claims advisory services with over 20 years of experience in complex construction projects worldwide.
        </p>

        {/* Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, '#contact')}
            className="px-8 py-4 bg-[#7c6bc4] hover:bg-[#6b5ab3] text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 min-w-[200px]"
          >
            Get Consultation
          </a>
          <a
            href="#services"
            onClick={(e) => scrollToSection(e, '#services')}
            className="px-8 py-4 border-2 border-white/50 hover:border-white text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 min-w-[200px]"
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
