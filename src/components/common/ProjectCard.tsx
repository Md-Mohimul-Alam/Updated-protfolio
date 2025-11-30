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

  // Generate screenshot from live demo URL
  const getLiveScreenshot = (url: string) => {
    // Using WordPress MShots - reliable and free
    return `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=800&h=600`;
    
    // Alternative: ScreenshotAPI with free tier
    // return `https://api.screenshotapi.io/screenshot?url=${encodeURIComponent(url)}&width=800&height=600&output=image&fresh=true`;
  };

  // Priority: Live demo screenshot > Project image > Fallback
  const getImageSource = () => {
    // Always try to use live demo screenshot first
    if (project.liveDemo && !imageError) {
      return getLiveScreenshot(project.liveDemo);
    }
    // Fallback to project image
    if (project.image) {
      return project.image;
    }
    // Final fallback placeholder
    return `https://via.placeholder.com/800x600/1e293b/64748b?text=${encodeURIComponent(project.title)}`;
  };

  const imageSrc = getImageSource();

  const handleImageLoad = () => {
    setImageLoading(false);
    console.log(`✅ Screenshot loaded for: ${project.title}`);
  };

  const handleImageError = () => {
    console.log(`❌ Failed to load screenshot for: ${project.title}`);
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
      {/* Background Image with Live Demo Screenshot */}
      <div className="relative h-48 w-full overflow-hidden">
        {/* Loading State */}
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 z-10">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <div className="text-slate-400 text-sm">Loading live preview...</div>
              <div className="text-slate-500 text-xs mt-1">{project.liveDemo}</div>
            </div>
          </div>
        )}
        
        {/* Live Demo Screenshot */}
        <motion.img
          src={imageSrc}
          alt={`Live preview of ${project.title}`}
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
        
        {/* Screenshot Status */}
        {!imageLoading && project.liveDemo && !imageError && (
          <div className="absolute top-3 right-3 z-20">
            <span className="rounded-full bg-blue-500/90 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              📸 Live Preview
            </span>
          </div>
        )}
        
        {/* Fallback Status */}
        {imageError && project.liveDemo && (
          <div className="absolute top-3 right-3 z-20">
            <span className="rounded-full bg-yellow-500/90 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              Using Fallback Image
            </span>
          </div>
        )}

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute bottom-3 left-3 z-20">
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
              <span className="text-lg">📂</span>
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
              <span className="text-lg">🚀</span>
              <span>Visit Live</span>
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