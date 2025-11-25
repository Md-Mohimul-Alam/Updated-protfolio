// src/App.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PreLoader from './components/PreLoader';
import { Hero } from './components/sections/Hero';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Publications } from './components/sections/Publications';
import { Certifications } from './components/sections/Certifications';
import { CONTACT } from './utils/constants';

const App: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const navigationItems = [
    { label: 'Home', href: '#home' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Publications', href: '#publications' },
    { label: 'Certifications', href: '#certifications' },
  ];

  // Show preloader while loading
  if (isLoading) {
    return <PreLoader onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="w-full overflow-hidden bg-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold cursor-pointer"
            >
              <a href="#home">
                <img src="/logo.jpeg" alt="Logo" className="h-8 w-8" />
              </a>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden items-center gap-8 md:flex">
              {navigationItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-slate-300 transition-colors hover:text-blue-400"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <motion.a
              href={`mailto:${CONTACT.email}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="hidden rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/50 md:inline-block"
            >
              Contact
            </motion.a>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsNavOpen(!isNavOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden"
            >
              <motion.svg 
                className="h-6 w-6 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                animate={{ rotate: isNavOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isNavOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </motion.svg>
            </motion.button>
          </div>

          {/* Mobile Menu */}
          {isNavOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-3 border-t border-slate-700 pt-4 md:hidden"
            >
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-slate-300 transition-colors hover:text-blue-400"
                  onClick={() => setIsNavOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={`mailto:${CONTACT.email}`}
                className="block rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white"
              >
                Contact
              </a>
            </motion.div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <motion.section 
          id="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
        </motion.section>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Skills />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Experience />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Projects />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Publications />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Certifications />
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-4">
        <div className="mx-auto max-w-6xl">
          {/* Footer Content */}
          <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Brand */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h3 className="mb-4 text-2xl font-bold">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  MD Mohimul Alam
                </span>
              </h3>
              <p className="text-slate-400">Frontend Developer | Blockchain Researcher</p>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="mb-4 font-semibold text-white">Quick Links</h4>
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block text-slate-400 transition-colors hover:text-blue-400"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="mb-4 font-semibold text-white">Connect</h4>
              <div className="flex gap-4">
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors hover:text-blue-400"
                >
                  GitHub
                </a>
                <a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 transition-colors hover:text-blue-400"
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="text-slate-400 transition-colors hover:text-blue-400"
                >
                  Email
                </a>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-slate-800 py-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-slate-500">© 2025 MD Mohimul Alam. All rights reserved.</p>
              <p className="text-slate-500">
                Designed & Built with React • TypeScript • Three.js
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;