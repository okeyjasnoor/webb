import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteConfig } from '../data/mock';
import { Phone, Mail, MapPin, CheckCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

gsap.registerPlugin(ScrollTrigger);

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const successRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectBrief: '',
    consent: false,
    honeypot: '', // Anti-spam
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    gsap.fromTo(
      infoRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (formData.phone && !/^[+]?[\d\s-()]{8,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.projectBrief.trim()) {
      newErrors.projectBrief = 'Please describe your project';
    }

    if (!formData.consent) {
      newErrors.consent = 'Please agree to be contacted';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) {
      console.log('Spam detected');
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await axios.post(`${BACKEND_URL}/api/contact`, {
        name: formData.name,
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        projectBrief: formData.projectBrief,
      });

      setIsSuccess(true);

      // Animate success
      if (successRef.current) {
        gsap.fromTo(
          successRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
        );
      }

      // Reset form after delay
      setTimeout(() => {
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          projectBrief: '',
          consent: false,
          honeypot: '',
        });
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to submit. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-[#1a1a40]">
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Get in Touch
        </h2>
        <p className="text-white/60 text-lg mb-12 max-w-2xl">
          Feel free to reach out with your questions or for a consultation. Our
          team is ready to provide the support you need.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <div ref={formRef}>
            {isSuccess ? (
              <div
                ref={successRef}
                className="success-animation bg-[#12122e] rounded-2xl p-8 text-center"
              >
                <div className="checkmark-animation inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
                  <CheckCircle size={40} className="text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Thank You!
                </h3>
                <p className="text-white/70">
                  Your message has been sent successfully. We'll get back to you
                  soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot - hidden field */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  className="hidden"
                  tabIndex="-1"
                  autoComplete="off"
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="sr-only">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name *"
                      className={`form-input ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="company" className="sr-only">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email *"
                      className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="sr-only">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      className={`form-input ${errors.phone ? 'border-red-500' : ''}`}
                    />
                    {errors.phone && (
                      <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="projectBrief" className="sr-only">
                    Project Brief
                  </label>
                  <textarea
                    id="projectBrief"
                    name="projectBrief"
                    value={formData.projectBrief}
                    onChange={handleChange}
                    placeholder="Project Brief *"
                    rows={5}
                    className={`form-input resize-none ${errors.projectBrief ? 'border-red-500' : ''}`}
                  />
                  {errors.projectBrief && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.projectBrief}
                    </p>
                  )}
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 rounded border-white/20 bg-white/5 text-[#4a90d9] focus:ring-[#4a90d9]"
                  />
                  <label htmlFor="consent" className="text-white/70 text-sm">
                    I agree to be contacted regarding my inquiry and understand
                    that my information will be handled in accordance with the
                    privacy policy.
                  </label>
                </div>
                {errors.consent && (
                  <p className="text-red-400 text-sm">{errors.consent}</p>
                )}

                {errors.submit && (
                  <p className="text-red-400 text-sm">{errors.submit}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="lg:pl-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#4a90d9]/20 flex items-center justify-center flex-shrink-0">
                  <Phone size={22} className="text-[#4a90d9]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Phone</h3>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-white/70 hover:text-[#4a90d9] transition-colors"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#4a90d9]/20 flex items-center justify-center flex-shrink-0">
                  <Mail size={22} className="text-[#4a90d9]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Email</h3>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-white/70 hover:text-[#4a90d9] transition-colors"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#4a90d9]/20 flex items-center justify-center flex-shrink-0">
                  <MapPin size={22} className="text-[#4a90d9]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">
                    Location
                  </h3>
                  <p className="text-white/70">
                    Serving clients globally in the UK, India, Middle East &
                    beyond
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
