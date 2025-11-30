import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import { fadeInUp, cardHover } from '../../utils/animations';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Get image source with proper fallbacks
  const getImageSource = () => {
    // If project has a specific image, use it
    if (project.image && !imageError) {
      return project.image;
    }
    // Fallback placeholder based on project category
    const categoryColors = {
      blockchain: '1e293b/0ea5e9',
      frontend: '1e1b4b/a855f7', 
      fullstack: '422006/d97706'
    };
    const color = categoryColors[project.category] || '1e293b/64748b';
    return `https://via.placeholder.com/800x600/${color}?text=${encodeURIComponent(project.title)}`;
  };

  const imageSrc = getImageSource();

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1 }}
      whileHover={cardHover}
      className="group relative overflow-hidden rounded-lg border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 shadow-xl"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        {/* Loading State */}
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 z-10">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <div className="text-slate-400 text-sm">Loading preview...</div>
            </div>
          </div>
        )}
        
        {/* Project Image */}
        <motion.img
          src={imageSrc}
          alt={`Preview of ${project.title}`}
          className={`h-full w-full object-cover transition-all duration-500 ${
            imageLoading ? 'opacity-0' : 'opacity-100 group-hover:opacity-90'
          }`}
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6 }}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        
        {/* Live Demo Badge */}
        {project.liveDemo && (
          <div className="absolute top-3 left-3 z-20">
            <span className="rounded-full bg-green-500/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm flex items-center gap-1.5 shadow-lg">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              LIVE DEMO
            </span>
          </div>
        )}
        
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-20">
            <span className="rounded-full bg-blue-500/90 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm flex items-center gap-1.5 shadow-lg">
              ⭐ Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative p-6">
        {/* Category Badge */}
        <motion.div
          className="mb-3 inline-block"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase text-blue-300 border border-blue-500/30">
            {project.category}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h3
          className="mb-3 text-xl font-bold text-white transition-colors group-hover:text-blue-400"
          whileHover={{ x: 5 }}
        >
          {project.title}
        </motion.h3>

        {/* Description */}
        <p className="mb-4 text-sm text-slate-300 leading-relaxed">{project.description}</p>

        {/* Technologies */}
        <div className="mb-6 flex flex-wrap gap-2">
          {project.technologies.map((tech, i) => (
            <motion.span
              key={i}
              className="rounded-full bg-slate-700/80 px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur-sm border border-slate-600/50"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: 'rgba(59, 130, 246, 0.3)',
                borderColor: 'rgba(59, 130, 246, 0.5)'
              }}
              transition={{ duration: 0.2 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-slate-700/80 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-slate-600/80 backdrop-blur-sm border border-slate-600/50 flex-1"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Code</span>
            </motion.a>
          )}
          {project.liveDemo && (
            <motion.a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 py-3 px-4 text-sm font-semibold text-white transition-all hover:from-green-700 hover:to-emerald-700 shadow-lg flex-1"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>Live Demo</span>
            </motion.a>
          )}
        </div>
      </div>

      {/* Accent Line */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.4 }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.div>
  );
};