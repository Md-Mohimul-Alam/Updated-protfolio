// src/components/sections/Skills.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { SKILLS } from '../../utils/constants';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const chipVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.25 },
  }),
};

export const Skills: React.FC = () => {
  return (
    <section
      id="skills"
      className="relative w-full bg-gradient-to-b from-slate-950 via-slate-950/80 to-blue-950/20 py-20 px-4 overflow-hidden"
    >
      {/* Background Orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-blue-300"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            Skills & Tech Stack
          </motion.div>

          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Technical Arsenal
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            A blend of frontend craftsmanship, blockchain engineering, and full‑stack problem solving.
          </p>
        </motion.div>

        {/* Legend / Scale */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-10 flex max-w-md items-center justify-center gap-4 rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 backdrop-blur-sm text-xs text-slate-400"
        >
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
            <span>Core</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />
            <span>Advanced</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <span className="h-2 w-8 rounded-full bg-slate-600" />
            <span>Foundational</span>
          </span>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {SKILLS.map((group, groupIndex) => {
            const isHigh = group.proficiency >= 90;
            const isMid = group.proficiency >= 75 && group.proficiency < 90;

            const borderGradient = isHigh
              ? 'from-blue-500/60 via-purple-500/60 to-pink-500/60'
              : isMid
              ? 'from-blue-500/40 to-purple-500/40'
              : 'from-slate-600 to-slate-700';

            const barGradient = isHigh
              ? 'from-blue-500 via-purple-500 to-pink-500'
              : isMid
              ? 'from-blue-500 to-purple-500'
              : 'from-slate-500 to-slate-400';

            return (
              <motion.div
                key={group.category}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="relative"
              >
                {/* Glow Border */}
                <div
                  className={`pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-r ${borderGradient} opacity-40 blur-md`}
                />

                {/* Card */}
                <div className="relative h-full rounded-2xl border border-slate-700/80 bg-slate-900/70 p-6 shadow-xl shadow-black/40 backdrop-blur-md">
                  {/* Category Row */}
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-blue-100">
                        {group.category}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {group.proficiency >= 90
                          ? 'Core Strength'
                          : group.proficiency >= 75
                          ? 'Advanced'
                          : 'Working Knowledge'}
                      </p>
                    </div>

                    <div className="flex flex-col items-end">
                      <span className="text-sm font-bold text-blue-400">
                        {group.proficiency}%
                      </span>
                      <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Proficiency
                      </span>
                    </div>
                  </div>

                  {/* Chips / Tags */}
                  <div className="mb-5 flex flex-wrap gap-2">
                    {group.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        variants={chipVariants}
                        custom={i}
                        className="rounded-full bg-slate-800/80 px-3 py-1 text-xs font-medium text-slate-200 ring-1 ring-slate-700/80 hover:ring-blue-500/70 hover:text-blue-100 transition-colors"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Proficiency Meter */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Confidence Level</span>
                      <span className="flex items-center gap-1">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isHigh
                              ? 'bg-green-400'
                              : isMid
                              ? 'bg-amber-300'
                              : 'bg-slate-400'
                          }`}
                        />
                        {isHigh ? 'Expert' : isMid ? 'Strong' : 'Growing'}
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${group.proficiency}%` }}
                        transition={{ duration: 1, delay: groupIndex * 0.1 }}
                        viewport={{ once: true }}
                        className={`h-full bg-gradient-to-r ${barGradient}`}
                      />
                    </div>
                  </div>

                  {/* Bottom Hint */}
                  <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Updated · 2025</span>
                    <span className="flex items-center gap-1">
                      <span className="h-1 w-4 rounded-full bg-blue-500/70" />
                      <span className="h-1 w-4 rounded-full bg-purple-500/70" />
                      <span className="h-1 w-4 rounded-full bg-pink-500/70" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
