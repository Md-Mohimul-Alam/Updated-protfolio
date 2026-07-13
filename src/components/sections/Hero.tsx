// src/components/sections/Hero.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BlockchainNetwork } from '../3D/BlockchainNetwork';
import { CONTACT } from '../../utils/constants';

export const Hero: React.FC = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#0a0f1e] via-blue-950/20 to-[#0a0f1e] px-4 pt-20">
      {/* 3D Background – larger and more prominent */}
      <div className="absolute inset-0 opacity-40">
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <BlockchainNetwork scale={1.8} colorScheme="blue" />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.6} />
        </Canvas>
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMzYjgyZjYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHpNMzYgMzZoNHYxaC00ek0zNiAzOGg0djFoLTR6TTM4IDMwaDF2NGgtMXoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-60 pointer-events-none" />

      {/* Gradient Orbs – stronger and more vibrant */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl w-full">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Left Column – Text Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Greeting Badge – using glass class */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-block"
            >
              <span className="glass inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                </span>
                Available for opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4 text-4xl font-bold text-white md:text-6xl lg:text-7xl"
            >
              Hi, I'm <br className="sm:hidden" />
              <span className="gradient-text">
                MD Mohimul Alam
              </span>
            </motion.h1>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-6"
            >
              <p className="text-2xl font-semibold text-slate-300 md:text-3xl">
                <span className="text-blue-400">Frontend Developer</span>
                <span className="text-slate-600 mx-3">|</span>
                <span className="text-purple-400">Blockchain Researcher</span>
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-8 text-lg text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Crafting innovative solutions with <span className="text-blue-400 font-semibold">React</span>, <span className="text-purple-400 font-semibold">TypeScript</span>, and <span className="text-pink-400 font-semibold">Hyperledger Fabric</span>. 
              Passionate about building secure, scalable applications that bridge traditional systems with blockchain technology.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <motion.a
                href="/cv/CV.pdf"
                download="MD-Mohimul-Alam-CV.pdf"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/50 hover:-translate-y-1"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download CV
              </motion.a>

              <motion.a
                href="#projects"
                className="glass-hover inline-flex items-center gap-2 rounded-xl border border-blue-500/30 bg-transparent px-8 py-4 text-lg font-semibold text-blue-400 transition-all hover:bg-blue-500/10"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                View Projects
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.a>
            </motion.div>

            {/* Social Links – now with glass backgrounds */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-4"
            >
              {[
                { href: CONTACT.github, label: 'GitHub', icon: 'github' },
                { href: CONTACT.linkedin, label: 'LinkedIn', icon: 'linkedin' },
                { href: `mailto:${CONTACT.email}`, label: 'Email', icon: 'email' },
                { href: CONTACT.credly, label: 'Credly', icon: 'credly' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass flex h-12 w-12 items-center justify-center rounded-xl text-slate-400 transition-all hover:text-white hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  aria-label={social.label}
                >
                  {social.icon === 'github' && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  )}
                  {social.icon === 'linkedin' && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                  {social.icon === 'email' && (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {social.icon === 'credly' && (
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z" />
                    </svg>
                  )}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Column – Profile Image (enhanced) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            {/* Glowing background – larger, more diffused */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl scale-110" />
            
            {/* Double rotating rings */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 border border-blue-500/20 rounded-full" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] md:w-[400px] md:h-[400px] border border-purple-500/20 rounded-full" />
            </motion.div>

            {/* Profile Image Container */}
            <div className="relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-500/50 shadow-2xl shadow-blue-500/50 glass">
                  <img
                    src="/profile/profile-photo.jpeg"
                    alt="MD Mohimul Alam"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect fill="%2300d4ff" width="400" height="400"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="120" fill="white">MA</text></svg>';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-500/30 via-transparent to-transparent" />
                </div>

                {/* Floating badges – improved with glass */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-3 -right-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-3 shadow-2xl shadow-blue-500/30 glass"
                >
                  <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  className="absolute -bottom-3 -left-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl p-3 shadow-2xl shadow-pink-500/30 glass"
                >
                  <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator – refined */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="flex flex-col items-center gap-1.5"
          >
            <span className="text-xs font-medium text-slate-400 tracking-wider uppercase">Scroll</span>
            <div className="h-8 w-5 rounded-full border-2 border-slate-500/50 flex items-start justify-center p-1 glass">
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 1.8, repeat: Infinity }}
                className="h-2 w-1.5 rounded-full bg-gradient-to-b from-blue-500 to-purple-500"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};