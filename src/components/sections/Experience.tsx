// src/components/sections/Experience.tsx

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE } from '../../utils/constants';
import { fadeInUp, staggerContainer } from '../../utils/animations';

export const Experience: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);

  // Update progress line based on scroll
  useEffect(() => {
    const updateProgress = () => {
      if (!sectionRef.current || !progressFillRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalHeight = rect.height;
      const visible = Math.min(1, Math.max(0, -rect.top / (totalHeight - window.innerHeight)));
      progressFillRef.current.style.height = `${visible * 100}%`;
    };

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-blue-950/20 to-slate-950 py-20 px-4 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">Work Experience</h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Professional journey in software development and blockchain technology
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical line – background */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-800/50 md:left-1/2" />

          {/* Vertical line – animated fill */}
          <div
            ref={progressFillRef}
            className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 transition-[height] duration-100 ease-out md:left-1/2"
            style={{ height: '0%' }}
          />

          {/* Cards Container with Stagger */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-12"
          >
            {EXPERIENCE.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={exp.id}
                  variants={fadeInUp}
                  custom={index}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <motion.div
                    className="absolute left-0 -ml-1.5 h-3 w-3 rounded-full bg-blue-500 md:left-1/2 z-10"
                    whileHover={{ scale: 1.8 }}
                    transition={{ duration: 0.2 }}
                    style={{ willChange: 'transform' }}
                  />

                  {/* Card */}
                  <motion.div
                    className={`ml-8 w-full md:ml-0 md:w-5/12 ${
                      isEven ? 'md:pr-12' : 'md:pl-12'
                    }`}
                    whileHover={{ scale: 1.02, y: -6 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    style={{ willChange: 'transform' }}
                  >
                    <div className="relative overflow-hidden rounded-lg border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl">
                      <div className="mb-3">
                        <span className="inline-block rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                          {exp.duration}
                        </span>
                      </div>

                      <h3 className="mb-2 text-xl font-bold text-white">{exp.position}</h3>
                      <p className="mb-4 text-lg font-semibold text-blue-400">{exp.company}</p>

                      <ul className="mb-4 space-y-2">
                        {exp.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                            <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                            {desc}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, i) => (
                          <motion.span
                            key={i}
                            className="rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-slate-300"
                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                            transition={{ duration: 0.15 }}
                            style={{ willChange: 'transform' }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      {/* Animated accent bar */}
                      <motion.div
                        className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        style={{ transformOrigin: isEven ? 'left' : 'right', willChange: 'transform' }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};