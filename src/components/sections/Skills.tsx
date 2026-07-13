// src/components/sections/Skills.tsx

import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { SKILLS } from '../../utils/constants';

// ─── Category Icons ───
const categoryIcons: Record<string, string> = {
  Frontend: '🎨',
  Backend: '⚙️',
  Blockchain: '⛓️',
  Web3: '🌐',
  DevOps: '☁️',
  'IoT & Embedded': '📡',
};

// ─── Container Variants ───
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
};

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // ─── Mouse tracking for parallax ───
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // ─── Parallax transforms ───
  const parallaxX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), {
    damping: 30,
    stiffness: 100,
  });
  const parallaxY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-10, 10]), {
    damping: 30,
    stiffness: 100,
  });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full py-24 px-4 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(139, 92, 246, 0.08) 0%, transparent 60%), #0a0f1e',
      }}
    >
      {/* ─── Floating Particles Background ─── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full"
            style={{
              width: 2 + Math.random() * 4,
              height: 2 + Math.random() * 4,
              background: i % 3 === 0
                ? 'rgba(59, 130, 246, 0.3)'
                : i % 3 === 1
                ? 'rgba(139, 92, 246, 0.3)'
                : 'rgba(236, 72, 153, 0.3)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -30 - Math.random() * 40, 0],
              x: [0, 10 - Math.random() * 20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ─── Gradient Orbs ─── */}
      <motion.div
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/15 blur-3xl"
        style={{ x: parallaxX, y: parallaxY }}
      />
      <motion.div
        className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-500/15 blur-3xl"
        style={{ x: parallaxX, y: parallaxY }}
      />
      <motion.div
        className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-500/8 blur-3xl"
        style={{ x: parallaxX, y: parallaxY }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ─── Section Header ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <motion.div
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-300 backdrop-blur-sm"
            whileHover={{ scale: 1.05, borderColor: 'rgba(59, 130, 246, 0.6)' }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
            </span>
            Skills & Tech Stack
          </motion.div>

          <motion.h2 className="mb-4 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            <span className="gradient-text">Technical Arsenal</span>
          </motion.h2>

          <motion.p className="mx-auto max-w-2xl text-lg text-slate-400">
            A blend of frontend craftsmanship, blockchain engineering, and full‑stack problem solving.
          </motion.p>

          {/* ─── Decorative line ─── */}
          <motion.div
            className="mx-auto mt-6 h-0.5 w-24 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* ─── Legend / Scale ─── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-12 flex max-w-lg items-center justify-center gap-6 rounded-2xl border border-slate-700/50 bg-slate-900/40 px-6 py-3 backdrop-blur-md shadow-lg shadow-black/20"
        >
          {[
            { label: 'Expert', gradient: 'from-blue-500 via-purple-500 to-pink-500', color: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500' },
            { label: 'Advanced', gradient: 'from-blue-500 to-purple-500', color: 'bg-gradient-to-r from-blue-500 to-purple-500' },
            { label: 'Growing', gradient: 'from-slate-500 to-slate-400', color: 'bg-gradient-to-r from-slate-500 to-slate-400' },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 text-xs text-slate-400"
              whileHover={{ scale: 1.05 }}
            >
              <span className={`h-2 w-8 rounded-full ${item.color}`} />
              <span>{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ─── Skills Grid ─── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {SKILLS.map((group, groupIndex) => {
            const isHigh = group.proficiency >= 90;
            const isMid = group.proficiency >= 75 && group.proficiency < 90;

            const borderGradient = isHigh
              ? 'from-blue-500/60 via-purple-500/60 to-pink-500/60'
              : isMid
              ? 'from-blue-500/40 to-purple-500/40'
              : 'from-slate-500/40 to-slate-400/40';

            const barGradient = isHigh
              ? 'from-blue-500 via-purple-500 to-pink-500'
              : isMid
              ? 'from-blue-500 to-purple-500'
              : 'from-slate-500 to-slate-400';

            const glowColor = isHigh
              ? 'shadow-blue-500/20'
              : isMid
              ? 'shadow-purple-500/20'
              : 'shadow-slate-500/20';

            return (
              <motion.div
                key={group.category}
                variants={cardVariants}
                custom={groupIndex}
                className="group relative"
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {/* ─── Glow Border ─── */}
                <div
                  className={`pointer-events-none absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${borderGradient} opacity-40 blur-sm transition-opacity duration-500 group-hover:opacity-80`}
                />

                {/* ─── Card ─── */}
                <div
                  className={`relative h-full rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 shadow-xl shadow-black/40 backdrop-blur-md transition-all duration-300 group-hover:border-slate-600/80 ${glowColor} group-hover:shadow-2xl`}
                >
                  {/* ─── Category Header ─── */}
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <motion.span
                        className="text-2xl"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        {categoryIcons[group.category] || '🚀'}
                      </motion.span>
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                          {group.category}
                        </h3>
                        <p className="text-xs text-slate-400">
                          {isHigh ? '⭐ Core Strength' : isMid ? '🚀 Advanced' : '📚 Working Knowledge'}
                        </p>
                      </div>
                    </div>

                    <motion.div
                      className="flex flex-col items-end"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                        {group.proficiency}%
                      </span>
                      <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-slate-800/80 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-slate-400 border border-slate-700/50">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
                        Proficiency
                      </span>
                    </motion.div>
                  </div>

                  {/* ─── Skills Chips ─── */}
                  <motion.div className="mb-5 flex flex-wrap gap-2">
                    {group.skills.map((skill, i) => (
                      <motion.span
                        key={skill}
                        variants={chipVariants}
                        custom={i}
                        className="group/chip relative rounded-full bg-slate-800/80 px-3.5 py-1.5 text-xs font-medium text-slate-200 ring-1 ring-slate-700/60 transition-all duration-300 hover:bg-slate-700/80 hover:ring-blue-500/60 hover:text-blue-100 hover:shadow-lg hover:shadow-blue-500/20 cursor-default"
                        whileHover={{ scale: 1.08, y: -2 }}
                      >
                        {skill}
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 opacity-0 transition-opacity duration-500 group-hover/chip:opacity-100" />
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* ─── Proficiency Meter ─── */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Confidence Level</span>
                      <motion.span
                        className={`flex items-center gap-1.5 font-semibold ${
                          isHigh
                            ? 'text-green-400'
                            : isMid
                            ? 'text-amber-400'
                            : 'text-slate-400'
                        }`}
                        whileHover={{ scale: 1.05 }}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            isHigh
                              ? 'bg-green-400 animate-pulse'
                              : isMid
                              ? 'bg-amber-400'
                              : 'bg-slate-400'
                          }`}
                        />
                        {isHigh ? 'Expert' : isMid ? 'Strong' : 'Growing'}
                      </motion.span>
                    </div>

                    <div className="relative h-2 overflow-hidden rounded-full bg-slate-800/80 ring-1 ring-slate-700/30">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${group.proficiency}%` }}
                        transition={{ duration: 1.2, delay: groupIndex * 0.08, ease: 'easeOut' }}
                        viewport={{ once: true }}
                        className={`h-full rounded-full bg-gradient-to-r ${barGradient} relative`}
                      >
                        {/* ─── Shimmer effect on bar ─── */}
                        <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg] animate-shimmer" />
                      </motion.div>
                    </div>
                  </div>

                  {/* ─── Bottom metadata ─── */}
                  <div className="mt-4 flex items-center justify-between text-[10px] text-slate-500">
                    <span>Updated · 2025</span>
                    <span className="flex items-center gap-1">
                      <span className="h-1 w-4 rounded-full bg-blue-500/50" />
                      <span className="h-1 w-4 rounded-full bg-purple-500/50" />
                      <span className="h-1 w-4 rounded-full bg-pink-500/50" />
                    </span>
                  </div>

                  {/* ─── Decorative corner accent ─── */}
                  <div className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-sm transition-all duration-500 group-hover:scale-150 group-hover:opacity-50" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ─── Bottom CTA ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-slate-400">
            Constantly learning and expanding my technical repertoire
          </p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-slate-500">Always growing</span>
          </div>
        </motion.div>
      </div>

      {/* ─── Add shimmer animation keyframes ─── */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-20deg); }
          100% { transform: translateX(300%) skewX(-20deg); }
        }
        .animate-shimmer {
          animation: shimmer 2.5s infinite;
        }
      `}</style>
    </section>
  );
};