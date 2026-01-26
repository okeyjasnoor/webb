import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig, founder } from '../data/mock';

gsap.registerPlugin(ScrollTrigger);

const Founder = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Parallax effect on image
    gsap.to(imageRef.current, {
      y: -50,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    // Content fade in
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-[#1a1a40]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image with parallax */}
          <div className="parallax-container relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                ref={imageRef}
                src={siteConfig.founderImage}
                alt={founder.name}
                className="parallax-image w-full h-[110%] object-cover object-top"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-[#4a90d9]/30 rounded-2xl -z-10" />
          </div>

          {/* Content */}
          <div ref={contentRef} className="lg:pt-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
              {founder.name}
            </h2>
            <p className="text-[#4a90d9] text-xl font-medium mb-8">
              {founder.title}
            </p>

            <div className="space-y-6">
              {founder.bio.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-white/70 leading-relaxed text-base"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founder;
