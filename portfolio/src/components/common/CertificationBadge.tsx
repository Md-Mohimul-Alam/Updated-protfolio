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

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex h-40 w-40 flex-col items-center justify-center rounded-lg border-2 border-blue-500 bg-gradient-to-br from-blue-900/30 to-purple-900/30 p-4 transition-all hover:shadow-xl hover:shadow-blue-500/50"
    >
      {/* Badge Container */}
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotateY: isHovered ? 5 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="flex h-24 w-24 items-center justify-center"
      >
        <img
          src={certification.badgeUrl}
          alt={certification.name}
          className="h-full w-full object-contain drop-shadow-lg"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHZpZXdCb3g9IjAgMCA5NiA5NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iOTYiIGhlaWdodD0iOTYiIHJ4PSIxNiIgZmlsbD0iIzAwNTJmMyIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHRleHQ9ImE=" + certification.issuer.substring(0, 1) + "iIHg9IjQ4IiB5PSI1NiIgZm9udC1zaXplPSI0MCIgZmlsbD0id2hpdGUiIGZvbnQtd2VpZ2h0PSJib2xkIiBmb250LWZhbWlseT0iQXJpYWwiPjwvdGV4dD48L3N2Zz4=';
          }}
        />
      </motion.div>

      {/* Info Tooltip */}
      {isHovered && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute -bottom-24 left-0 right-0 z-10 rounded-lg bg-slate-900 p-3 text-center text-xs shadow-xl"
        >
          <p className="font-bold text-white">{certification.name}</p>
          <p className="text-slate-400">{certification.date}</p>
        </motion.div>
      )}

      {/* Issuer */}
      <p className="mt-2 text-center text-xs font-semibold text-slate-300">{certification.issuer}</p>

      {/* Link Icon */}
      <a
        href={certification.credlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute -right-2 -top-2 rounded-full bg-blue-600 p-1 opacity-0 transition-opacity hover:bg-blue-700"
      >
        <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4m-4-6l6-6m0 0l-6 6" />
        </svg>
      </a>
    </motion.div>
  );
};
