import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { aboutUs, ourApproach } from '../data/mock';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const aboutRef = useRef(null);
  const approachRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // About section animation
    gsap.fromTo(
      aboutRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    // Approach section animation
    gsap.fromTo(
      approachRef.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: approachRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-[#12122e]">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        {/* About Us */}
        <div ref={aboutRef} className="mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            {aboutUs.title}
          </h2>
          <div className="space-y-6">
            {aboutUs.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-white/70 text-lg leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Our Approach */}
        <div ref={approachRef} className="bg-[#1a1a40] rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {ourApproach.title}
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            {ourApproach.content}
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
