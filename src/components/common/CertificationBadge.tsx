// src/components/common/CertificationBadge.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Certification } from '../../types';

interface CertificationBadgeProps {
  certification: Certification;
  index: number;
}

export const CertificationBadge: React.FC<CertificationBadgeProps> = ({ certification, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  // ─── Fallback SVG generator ───
  const getFallbackSVG = (issuer: string) => {
    const initial = issuer.charAt(0).toUpperCase();
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" rx="16" fill="%230052f3"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="40" fill="white" font-weight="bold" font-family="Arial">${initial}</text></svg>`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      viewport={{ once: true, margin: '-20px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex h-48 w-48 flex-col items-center justify-center rounded-2xl p-5 transition-all duration-300"
      style={{
        background: 'rgba(15, 23, 42, 0.5)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(71, 85, 105, 0.3)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Animated glow border on hover */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(139, 92, 246, 0.3), rgba(236, 72, 153, 0.3))',
          padding: '2px',
          borderRadius: '1rem',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
        }}
      />

      {/* Subtle background glow */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.15), transparent 70%)',
        }}
      />

      {/* Badge Image */}
      <motion.div
        animate={{
          scale: isHovered ? 1.08 : 1,
          rotateY: isHovered ? 6 : 0,
          y: isHovered ? -4 : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative z-10 flex h-24 w-24 items-center justify-center"
      >
        <img
          src={certification.badgeUrl}
          alt={certification.name}
          className="h-full w-full object-contain drop-shadow-xl transition-all duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = getFallbackSVG(certification.issuer);
          }}
        />
      </motion.div>

      {/* Issuer Name */}
      <p className="relative z-10 mt-3 text-center text-xs font-semibold text-slate-300 transition-colors duration-300 group-hover:text-blue-300">
        {certification.issuer}
      </p>

      {/* Category Badge */}
      <span className="relative z-10 mt-1 rounded-full bg-slate-700/60 px-2.5 py-0.5 text-[10px] font-medium text-slate-400 border border-slate-600/30">
        {certification.category}
      </span>

      {/* Credly Link */}
      <motion.a
        href={certification.credlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 right-3 z-20 rounded-full bg-slate-700/50 p-1.5 text-slate-400 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/30"
        whileHover={{ scale: 1.15, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        aria-label="View on Credly"
      >
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </motion.a>

      {/* Tooltip on Hover */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="absolute -top-20 left-1/2 z-30 w-48 -translate-x-1/2 rounded-xl bg-slate-900/95 px-4 py-3 text-center text-xs shadow-2xl shadow-black/50 backdrop-blur-md border border-slate-700/50"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          <p className="font-bold text-white text-sm leading-tight">{certification.name}</p>
          <p className="mt-1 text-slate-400">
            Issued: <span className="text-slate-300">{certification.date}</span>
          </p>
          <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 bg-slate-900/95 border-r border-b border-slate-700/50" />
        </motion.div>
      )}

      {/* Decorative progress bar */}
      <div className="absolute bottom-2 left-1/2 h-0.5 w-12 -translate-x-1/2 rounded-full bg-slate-700/30 overflow-hidden">
        <div
          className={`h-full w-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700 ${
            isHovered ? 'w-full' : ''
          }`}
        />
      </div>
    </motion.div>
  );
};