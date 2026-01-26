import React from 'react';
import { siteConfig } from '../data/mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#12122e] py-8 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src={siteConfig.logo}
              alt="MG Projects Logo"
              className="h-8"
            />
          </div>

          {/* Copyright */}
          <p className="text-white/50 text-sm text-center">
            © {currentYear} MG Project & Expert Services. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="#services"
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              Services
            </a>
            <a
              href="#about"
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              About
            </a>
            <a
              href="#contact"
              className="text-white/50 hover:text-white text-sm transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
