// src/components/sections/Experience.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, fadeInLeft } from '../../utils/animations';
import { EXPERIENCE } from '../../utils/constants';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="relative w-full bg-gradient-to-b from-blue-950/20 to-slate-950 py-20 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Work Experience
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Professional journey in software development and blockchain technology
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 md:left-1/2" />

          {/* Experience Items */}
          <div className="space-y-12">
            {EXPERIENCE.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Timeline Dot */}
                <motion.div
                  className="absolute left-0 -ml-1.5 h-3 w-3 rounded-full bg-blue-500 md:left-1/2"
                  whileHover={{ scale: 1.5 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Content Card */}
                <motion.div
                  className={`ml-8 w-full md:ml-0 md:w-5/12 ${
                    index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
                  }`}
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative overflow-hidden rounded-lg border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl">
                    {/* Duration Badge */}
                    <div className="mb-3">
                      <span className="inline-block rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold text-blue-300">
                        {exp.duration}
                      </span>
                    </div>

                    {/* Position */}
                    <motion.h3 
                      className="mb-2 text-xl font-bold text-white"
                      whileHover={{ x: index % 2 === 0 ? 5 : -5 }}
                    >
                      {exp.position}
                    </motion.h3>

                    {/* Company */}
                    <p className="mb-4 text-lg font-semibold text-blue-400">{exp.company}</p>

                    {/* Description */}
                    <ul className="mb-4 space-y-2">
                      {exp.description.map((desc, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                          <span className="mt-1.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
                          {desc}
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <motion.span
                          key={i}
                          className="rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-slate-300"
                          whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Accent Line */}
                    <motion.div 
                      className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ transformOrigin: index % 2 === 0 ? 'left' : 'right' }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};