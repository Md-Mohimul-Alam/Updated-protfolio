// src/components/sections/Certifications.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CertificationBadge } from '../common/CertificationBadge';
import { CERTIFICATIONS } from '../../utils/constants';

export const Certifications: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Group certifications by category
  const groupedCertifications = CERTIFICATIONS.reduce((acc, cert) => {
    const category = cert.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(cert);
    return acc;
  }, {} as Record<string, typeof CERTIFICATIONS>);

  const categories = ['All', ...Object.keys(groupedCertifications)];

  const filteredCertifications = selectedCategory === 'All' 
    ? CERTIFICATIONS 
    : groupedCertifications[selectedCategory] || [];

  return (
    <section id="certifications" className="relative w-full bg-gradient-to-b from-slate-950 via-purple-950/10 to-slate-950 py-20 px-4 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-4 inline-block"
          >
            <span className="rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-4 py-2 text-sm font-semibold text-blue-400 border border-blue-500/20">
              🏆 Professional Credentials
            </span>
          </motion.div>

          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-slate-400 mb-6">
            Industry-recognized certifications and professional credentials from leading organizations
          </p>

          {/* Credly Badge */}
          <motion.a
            href="https://www.credly.com/users/mohim-reza"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"/>
            </svg>
            Verified on Credly
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.a>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-semibold text-sm transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              {category}
              {category !== 'All' && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  selectedCategory === category
                    ? 'bg-white/20'
                    : 'bg-slate-700'
                }`}>
                  {groupedCertifications[category]?.length || 0}
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Certifications Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filteredCertifications.map((cert, index) => (
              <CertificationBadge
                key={cert.id}
                certification={cert}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="rounded-lg border border-slate-700 bg-gradient-to-br from-blue-500/10 to-transparent p-6 text-center backdrop-blur-sm"
          >
            <div className="mb-2 text-4xl font-bold text-blue-400">{CERTIFICATIONS.length}</div>
            <div className="text-sm text-slate-400">Total Certifications</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="rounded-lg border border-slate-700 bg-gradient-to-br from-purple-500/10 to-transparent p-6 text-center backdrop-blur-sm"
          >
            <div className="mb-2 text-4xl font-bold text-purple-400">{Object.keys(groupedCertifications).length}</div>
            <div className="text-sm text-slate-400">Categories</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className="rounded-lg border border-slate-700 bg-gradient-to-br from-pink-500/10 to-transparent p-6 text-center backdrop-blur-sm"
          >
            <div className="mb-2 text-4xl font-bold text-pink-400">100%</div>
            <div className="text-sm text-slate-400">Verified on Credly</div>
          </motion.div>
        </motion.div>

        {/* CTA Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 relative overflow-hidden rounded-2xl border border-slate-700 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 p-8 backdrop-blur-sm"
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50" />
          
          <div className="relative text-center">
            <h3 className="mb-3 text-2xl font-bold text-white">
              View All Verified Credentials
            </h3>
            <p className="mb-6 text-slate-400">
              All certifications are verified and available to view in detail on my Credly profile
            </p>
            
            <motion.a
              href="https://www.credly.com/users/mohim-reza"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm0-18c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm0 14c-3.309 0-6-2.691-6-6s2.691-6 6-6 6 2.691 6 6-2.691 6-6 6z"/>
              </svg>
              View Full Credly Profile
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </motion.a>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-blue-500/10 blur-2xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-purple-500/10 blur-2xl" />
        </motion.div>
      </div>
    </section>
  );
};