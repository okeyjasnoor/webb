import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { siteConfig, sliderImages } from '../data/mock';
import { Play } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const playBtnRef = useRef(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8 }
    )
      .fromTo(
        line1Ref.current,
        { opacity: 0, y: 80, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1 },
        '-=0.4'
      )
      .fromTo(
        line2Ref.current,
        { opacity: 0, y: 80, skewY: 3 },
        { opacity: 1, y: 0, skewY: 0, duration: 1 },
        '-=0.6'
      )
      .fromTo(
        playBtnRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6 },
        '-=0.4'
      );
  }, []);

  return (
    <section
      ref={heroRef}
      className="min-h-screen bg-[#1a1a40] flex flex-col justify-center pt-24 pb-12"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
        {/* Company Name */}
        <p
          ref={subtitleRef}
          className="text-white/60 text-lg md:text-xl tracking-wider mb-8 font-medium"
        >
          {siteConfig.name}
        </p>

        {/* Main Headline */}
        <div className="overflow-hidden mb-4">
          <h1
            ref={line1Ref}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white italic tracking-tight leading-none"
            style={{ fontStyle: 'italic' }}
          >
            PARTNERING FOR PROGRESS,
          </h1>
        </div>
        <div className="overflow-hidden mb-12">
          <h1
            ref={line2Ref}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white italic tracking-tight leading-none"
            style={{ fontStyle: 'italic' }}
          >
            DELIVERING EXCELLENCE
          </h1>
        </div>

        {/* Play Button */}
        <div ref={playBtnRef} className="mb-16">
          <button
            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group"
            aria-label="Play video"
          >
            <div className="w-14 h-14 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-white/60 transition-colors">
              <Play size={20} className="ml-1" fill="currentColor" />
            </div>
            <span className="text-lg font-medium tracking-wide">Play</span>
          </button>
        </div>

        {/* Image Slider */}
        <div className="slider-container mt-8">
          <div className="slider-track">
            {[...sliderImages, ...sliderImages].map((img, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 h-40 md:w-80 md:h-48 mx-3 rounded-lg overflow-hidden"
              >
                <img
                  src={img}
                  alt={`Project ${(index % sliderImages.length) + 1}`}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
