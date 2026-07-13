// src/components/common/ProjectCard.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import { fadeInUp } from '../../utils/animations';

export const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const getImageSrc = () => {
    if (project.liveDemo && !imageError) {
      return `https://s0.wp.com/mshots/v1/${encodeURIComponent(project.liveDemo)}?w=800&h=600`;
    }
    return project.image || `https://via.placeholder.com/800x600/1e293b/64748b?text=${encodeURIComponent(project.title)}`;
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-900/80 to-slate-800/80 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:border-blue-500/60 hover:shadow-blue-500/20"
    >
      {/* Image Container with Shimmer */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-800">
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse">
            <div className="h-8 w-8 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin" />
          </div>
        )}
        <motion.img
          src={getImageSrc()}
          alt={project.title}
          className={`h-full w-full object-cover transition-all duration-700 ${
            imageLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0 group-hover:scale-110'
          }`}
          onLoad={() => setImageLoading(false)}
          onError={() => { setImageError(true); setImageLoading(false); }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {project.liveDemo && (
            <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm flex items-center gap-1.5 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-200" />
              </span>
              LIVE
            </span>
          )}
          {project.featured && (
            <span className="rounded-full bg-blue-500/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm shadow-lg">
              ⭐ Featured
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase text-blue-300 border border-blue-500/30">
            {project.category}
          </span>
          <span className="text-xs text-slate-400">{project.technologies.length} tools</span>
        </div>

        <h3 className="mb-2 text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>

        <p className="mb-4 text-sm text-slate-300 leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech, i) => (
            <span key={i} className="rounded-full bg-slate-700/60 px-2.5 py-1 text-xs font-medium text-slate-200 border border-slate-600/30">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-xs text-slate-400">+{project.technologies.length - 4}</span>
          )}
        </div>

        <div className="flex gap-3">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg border border-slate-600/50 bg-slate-800/50 py-2.5 text-center text-sm font-semibold text-slate-300 transition-all hover:bg-slate-700/70 hover:text-white"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              📂 Code
            </motion.a>
          )}
          {project.liveDemo && (
            <motion.a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              🚀 Visit
            </motion.a>
          )}
        </div>
      </div>

      {/* Animated Border Glow */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500/50 transition-all duration-500 pointer-events-none" />
    </motion.div>
  );
};