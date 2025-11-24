// src/components/common/ProjectCard.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../types';
import { fadeInUp, cardHover } from '../../utils/animations';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
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
      {/* Background Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-b from-blue-500/20 to-transparent">
        {project.image ? (
          <motion.img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover opacity-60"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-b from-blue-600/30 to-purple-600/30" />
        )}
      </div>

      {/* Content */}
      <div className="relative p-6">
        {/* Badge */}
        <motion.div
          className="mb-3 inline-block"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-semibold uppercase text-blue-300">
            {project.category}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h3
          className="mb-2 text-xl font-bold text-white transition-colors group-hover:text-blue-400"
          whileHover={{ x: 5 }}
        >
          {project.title}
        </motion.h3>

        {/* Description */}
        <p className="mb-4 text-sm text-slate-400 line-clamp-3">{project.description}</p>

        {/* Technologies */}
        <div className="mb-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <motion.span
              key={i}
              className="rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-slate-300"
              whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
              transition={{ duration: 0.2 }}
            >
              {tech}
            </motion.span>
          ))}
          {project.technologies.length > 3 && (
            <span className="rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-slate-300">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.github && (
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-md bg-blue-600 py-2 text-center text-sm font-semibold text-white transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              GitHub
            </motion.a>
          )}
          {project.liveDemo && (
            <motion.a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-md border border-blue-500 py-2 text-center text-sm font-semibold text-blue-400 transition-all"
              whileHover={{ scale: 1.05, y: -2, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
              whileTap={{ scale: 0.95 }}
            >
              Live Demo
            </motion.a>
          )}
        </div>
      </div>

      {/* Accent Line */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: 'left' }}
      />
    </motion.div>
  );
};
