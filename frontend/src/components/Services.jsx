import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '../data/mock';
import { X, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ServiceCard = ({ service, index, onOpen }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      cardRef.current,
      {
        opacity: 0,
        y: 60,
        rotateX: 10,
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 0.8,
        delay: index * 0.15,
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="service-card relative group cursor-pointer rounded-xl overflow-hidden h-80 md:h-96"
      onClick={() => onOpen(service)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
          {service.title}
        </h3>
        <p className="text-white/70 text-sm md:text-base mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {service.shortDesc}
        </p>
        <div className="flex items-center text-[#4a90d9] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Learn More</span>
          <ChevronRight size={18} className="ml-1" />
        </div>
      </div>
    </div>
  );
};

const ServiceModal = ({ service, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Animate modal in
    gsap.fromTo(
      modalRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, delay: 0.1 }
    );

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    gsap.to(contentRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.95,
      duration: 0.2,
    });
    gsap.to(modalRef.current, {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Modal Content */}
      <div
        ref={contentRef}
        className="relative bg-[#12122e] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white z-10 p-2"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Header Image */}
        <div className="h-48 md:h-64 relative">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#12122e] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 -mt-12 relative">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {service.title}
          </h2>

          {/* Overview */}
          <div className="mb-6">
            <h3 className="text-[#4a90d9] font-semibold text-lg mb-2">Overview</h3>
            <p className="text-white/70 leading-relaxed">{service.overview}</p>
          </div>

          {/* Deliverables */}
          <div className="mb-6">
            <h3 className="text-[#4a90d9] font-semibold text-lg mb-3">Deliverables</h3>
            <ul className="space-y-2">
              {service.deliverables.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-white/70">
                  <span className="text-[#4a90d9] mt-1">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Info */}
          {service.process && (
            <div className="mb-6">
              <h3 className="text-[#4a90d9] font-semibold text-lg mb-2">Process</h3>
              <p className="text-white/70 leading-relaxed">{service.process}</p>
            </div>
          )}

          {service.outcomes && (
            <div className="mb-6">
              <h3 className="text-[#4a90d9] font-semibold text-lg mb-2">Outcomes</h3>
              <p className="text-white/70 leading-relaxed">{service.outcomes}</p>
            </div>
          )}

          {service.whyItMatters && (
            <div className="mb-6">
              <h3 className="text-[#4a90d9] font-semibold text-lg mb-2">Why It Matters</h3>
              <p className="text-white/70 leading-relaxed">{service.whyItMatters}</p>
            </div>
          )}

          {service.approach && (
            <div className="mb-6">
              <h3 className="text-[#4a90d9] font-semibold text-lg mb-2">Our Approach</h3>
              <p className="text-white/70 leading-relaxed">{service.approach}</p>
            </div>
          )}

          {service.benefits && (
            <div className="mb-6">
              <h3 className="text-[#4a90d9] font-semibold text-lg mb-2">Benefits</h3>
              <p className="text-white/70 leading-relaxed">{service.benefits}</p>
            </div>
          )}

          {service.outcome && (
            <div className="mb-6">
              <h3 className="text-[#4a90d9] font-semibold text-lg mb-2">Outcome</h3>
              <p className="text-white/70 leading-relaxed">{service.outcome}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState(null);
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-[#1a1a40]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Section Title */}
        <div ref={titleRef} className="mb-16">
          <p className="text-white/60 text-lg tracking-wider mb-4 font-medium">
            MG PROJECT & EXPERT SERVICES
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">Our Services</h2>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onOpen={setSelectedService}
            />
          ))}
        </div>
      </div>

      {/* Service Modal */}
      {selectedService && (
        <ServiceModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </section>
  );
};

export default Services;
