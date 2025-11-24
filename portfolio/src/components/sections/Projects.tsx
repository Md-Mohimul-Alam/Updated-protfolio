// src/components/sections/Projects.tsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ProjectCard } from '../common/ProjectCard';
import { PROJECTS } from '../../utils/constants';
import { Project } from '../../types';

type Category = 'all' | 'blockchain' | 'frontend' | 'fullstack';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<Category>('all');

  const filteredProjects: Project[] = filter === 'all'
    ? PROJECTS
    : PROJECTS.filter(project => project.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="projects" className="relative w-full bg-gradient-to-b from-slate-950 to-blue-950/20 py-20 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
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
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`rounded-full px-6 py-2 font-semibold transition-all capitalize ${
                filter === category
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50'
                  : 'border border-slate-600 text-slate-300 hover:border-blue-500'
              }`}
            >
              {category === 'all' ? 'All Projects' : category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
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
            <p className="text-lg text-slate-400">No projects found in this category</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
