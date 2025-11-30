import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '../common/ProjectCard';
import { PROJECTS } from '../../utils/constants';
import { Project } from '../../types';
import { staggerContainer, fadeInUp } from '../../utils/animations';

type Category = 'all' | 'blockchain' | 'frontend' | 'fullstack';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<Category>('all');

  const filteredProjects: Project[] = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(project => project.category === filter);

  const categoryCounts = {
    all: PROJECTS.length,
    blockchain: PROJECTS.filter(p => p.category === 'blockchain').length,
    frontend: PROJECTS.filter(p => p.category === 'frontend').length,
    fullstack: PROJECTS.filter(p => p.category === 'fullstack').length,
  };

  return (
    <section id="projects" className="relative w-full bg-gradient-to-b from-slate-950 to-blue-950/20 py-20 px-4">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Featured Projects
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            A showcase of my best work in blockchain development, frontend engineering, and full-stack applications
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap justify-center gap-4"
        >
          {(['all', 'blockchain', 'frontend', 'fullstack'] as const).map((category) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`rounded-full px-6 py-2 font-semibold transition-all duration-300 capitalize flex items-center gap-2 ${
                filter === category
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'border border-slate-600 text-slate-300 hover:border-blue-500 hover:text-white hover:bg-slate-800/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category === 'all' ? 'All Projects' : category}
              <span className={`text-xs px-2 py-1 rounded-full ${
                filter === category ? 'bg-blue-700' : 'bg-slate-700'
              }`}>
                {categoryCounts[category]}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-96 items-center justify-center text-center"
          >
            <div className="text-slate-400">
              <svg className="w-16 h-16 mx-auto mb-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-lg">No projects found in this category</p>
              <p className="text-sm mt-2">Try selecting a different filter</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};