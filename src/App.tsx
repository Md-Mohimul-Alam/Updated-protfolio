// src/App.tsx

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import PreLoader from './components/PreLoader';
import { Hero } from './components/sections/Hero';
import Education from './components/sections/Education';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Publications } from './components/sections/Publications';
import { Certifications } from './components/sections/Certifications';
import { RotatingCube } from './components/3D/RotatingCube';
import { CONTACT } from './utils/constants';

const App: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCube, setShowCube] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const navigationItems = [
    { label: 'Home', href: '#home' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Publications', href: '#publications' },
    { label: 'Certifications', href: '#certifications' },
  ];

  // ─── Scroll listener to show cube after Hero ───
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      // Hero is considered "scrolled past" when its bottom is above the viewport
      const isPastHero = rect.bottom <= 0;
      setShowCube(isPastHero);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  if (isLoading) {
    return <PreLoader onComplete={handleLoadingComplete} />;
  }

  return (
    <div className="w-full overflow-hidden bg-[#0a0f1e] bg-noise">
      {/* ─── Navigation ─── */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/60 backdrop-blur-xl shadow-lg shadow-black/20">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <a href="#home" className="block">
                <img
                  src="/profile/profile-photo.jpeg"
                  alt="MD Mohimul Alam"
                  className="h-10 w-10 rounded-full border-2 border-blue-500/30 object-cover shadow-lg shadow-blue-500/20 transition-all hover:border-blue-400"
                />
              </a>
            </motion.div>

            <div className="hidden items-center gap-6 md:flex">
              {navigationItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative text-sm font-medium text-slate-300 transition-colors hover:text-blue-400"
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                </motion.a>
              ))}
            </div>

            <motion.a
              href={`mailto:${CONTACT.email}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="hidden rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/50 md:inline-block"
            >
              Contact
            </motion.a>

            <motion.button
              onClick={() => setIsNavOpen(!isNavOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden"
              aria-label="Toggle menu"
            >
              <motion.svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ rotate: isNavOpen ? 90 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isNavOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
                />
              </motion.svg>
            </motion.button>
          </div>

          {isNavOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-3 border-t border-slate-700/50 pt-4 md:hidden"
            >
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block text-sm font-medium text-slate-300 transition-colors hover:text-blue-400"
                  onClick={() => setIsNavOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={`mailto:${CONTACT.email}`}
                className="block rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2.5 text-center text-sm font-semibold text-white"
                onClick={() => setIsNavOpen(false)}
              >
                Contact
              </a>
            </motion.div>
          )}
        </div>
      </nav>

      {/* ─── RotatingCube Background (fixed, hidden on Hero) ─── */}
      {showCube && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            style={{ width: '100%', height: '100%' }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            {/* ─── Reduced scale & rainbow colors for visibility ─── */}
            <RotatingCube scale={1.0} speed={0.015} colorScheme="rainbow" />
          </Canvas>
        </div>
      )}

      {/* ─── Main Content ─── */}
      <main className="relative z-10">
        <motion.section
          id="home"
          ref={heroRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <Hero />
        </motion.section>

        <motion.div
          id="education"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <Education />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <Skills />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <Experience />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <Projects />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <Publications />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          viewport={{ once: true, margin: '-80px' }}
        >
          <Certifications />
        </motion.div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="relative z-10 border-t border-slate-800/50 bg-gradient-to-b from-[#0a0f1e] to-[#0d1428] py-16 px-4 overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:col-span-4 space-y-3"
            >
              <h3 className="text-2xl font-bold">
                <span className="gradient-text">MD Mohimul Alam</span>
              </h3>
              <p className="text-sm text-slate-400 max-w-xs">
                Frontend Developer · Blockchain Researcher
              </p>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
                Building secure, scalable, and beautiful web experiences with modern technologies.
              </p>
              <div className="h-0.5 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="md:col-span-4"
            >
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Explore
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="group flex items-center gap-2 text-sm text-slate-400 transition-all hover:text-blue-400 hover:translate-x-0.5"
                  >
                    <span className="h-1 w-1 rounded-full bg-blue-500 opacity-0 transition-opacity group-hover:opacity-100" />
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-4"
            >
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
                Connect
              </h4>
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 transition-all hover:text-white hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="GitHub"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </motion.a>

                <motion.a
                  href={CONTACT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 transition-all hover:text-white hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="LinkedIn"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </motion.a>

                <motion.a
                  href={`mailto:${CONTACT.email}`}
                  className="glass flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 transition-all hover:text-white hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Email"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.a>

                <motion.a
                  href={CONTACT.credly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex h-11 w-11 items-center justify-center rounded-xl text-slate-400 transition-all hover:text-white hover:shadow-lg hover:shadow-pink-500/20 hover:-translate-y-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Credly"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z" />
                  </svg>
                </motion.a>
              </div>
              <p className="mt-4 text-xs text-slate-500">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-green-400 mr-1.5" />
                Open to opportunities
              </p>
            </motion.div>
          </div>

          <div className="mt-12 border-t border-slate-800/50 pt-8">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-slate-500">
                &copy; {new Date().getFullYear()} MD Mohimul Alam. All rights reserved.
              </p>
              <p className="text-sm text-slate-500 flex items-center gap-2">
                <span>Designed & Built with</span>
                <span className="flex gap-1.5">
                  <span className="text-blue-400">React</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-purple-400">TypeScript</span>
                  <span className="text-slate-600">·</span>
                  <span className="text-pink-400">Three.js</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;