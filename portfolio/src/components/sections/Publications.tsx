// src/components/sections/Publications.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../utils/animations';

interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal?: string;
  conference?: string;
  year: string;
  doi?: string;
  pdfUrl?: string;
  abstract: string;
  keywords: string[];
  status: 'published' | 'under-review' | 'preprint';
}

// Add your publications here
const PUBLICATIONS: Publication[] = [
  {
    id: 'pub-1',
    title: 'Blockchain-Based Voting System with Hyperledger Fabric and React Interface',
    authors: ['MD Mohimul Alam'],
    conference: 'Springer CCIS, ICDSAIA 2025',
    year: '2025',
    pdfUrl: '/publications/voting-springer.pdf',
    abstract: 'This paper presents a comprehensive blockchain-based voting system implemented using Hyperledger Fabric with a modern React interface, ensuring secure and transparent electoral processes.',
    keywords: ['Blockchain', 'Hyperledger Fabric', 'Voting System', 'React', 'Smart Contracts'],
    status: 'published',
  },
  {
    id: 'pub-2',
    title: 'Real-Time Patient Health Monitoring Using IoT Sensors and Blockchain Technology',
    authors: ['MD Mohimul Alam'],
    year: '2024',
    pdfUrl: '/publications/iot-health-monitoring.pdf',
    abstract: 'Research paper on ESP32-based health monitoring system with ECG and SpO2 sensors integrated into a Hyperledger Fabric blockchain network for secure real-time patient data management.',
    keywords: ['IoT', 'ESP32', 'ECG', 'SpO2', 'Blockchain', 'Healthcare', 'Hyperledger Fabric'],
    status: 'published',
  },
  {
    id: 'pub-3',
    title: 'Healthcare Data Exchange Network',
    authors: ['MD Mohimul Alam'],
    year: '2024',
    abstract: 'Paper in progress focusing on secure private blockchain implementation for hospitals, enabling seamless and secure healthcare data exchange while maintaining patient privacy and regulatory compliance.',
    keywords: ['Blockchain', 'Healthcare', 'Data Exchange', 'Private Network', 'HIPAA'],
    status: 'under-review',
  },
  {
    id: 'pub-4',
    title: 'Extended Blockchain Voting Framework with Zero-Knowledge Proofs and Threshold Encryption',
    authors: ['MD Mohimul Alam'],
    journal: 'SN Computer Science',
    year: '2025',
    pdfUrl: '/publications/healthcare-network.pdf',
    abstract: 'Journal extension in progress presenting an advanced blockchain voting framework incorporating Zero-Knowledge Proofs for voter privacy and Threshold Encryption for enhanced security and auditability.',
    keywords: ['Blockchain', 'Zero-Knowledge Proofs', 'Threshold Encryption', 'Voting System', 'Cryptography'],
    status: 'preprint',
  },
];

export const Publications: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'under-review':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'preprint':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Published';
      case 'under-review':
        return 'Under Review';
      case 'preprint':
        return 'Preprint';
      default:
        return status;
    }
  };

  return (
    <section id="publications" className="relative w-full bg-gradient-to-b from-slate-950 to-blue-950/20 py-20 px-4">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Publications & Research
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Academic contributions and research papers in blockchain technology, IoT, and healthcare systems
          </p>
        </motion.div>

        {/* Publications List */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {PUBLICATIONS.map((pub, index) => (
            <motion.div
              key={pub.id}
              variants={fadeInUp}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
              className="group relative overflow-hidden rounded-lg border border-slate-700 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-xl"
            >
              {/* Status Badge */}
              <div className="mb-4 flex items-center justify-between">
                <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase ${getStatusColor(pub.status)}`}>
                  {getStatusText(pub.status)}
                </span>
                <span className="text-sm font-medium text-slate-400">{pub.year}</span>
              </div>

              {/* Title */}
              <motion.h3 
                className="mb-3 text-2xl font-bold text-white transition-colors group-hover:text-blue-400"
                whileHover={{ x: 5 }}
              >
                {pub.title}
              </motion.h3>

              {/* Authors */}
              <p className="mb-3 text-sm text-slate-400">
                <span className="font-semibold text-slate-300">Authors:</span> {pub.authors.join(', ')}
              </p>

              {/* Venue */}
              {(pub.journal || pub.conference) && (
                <p className="mb-3 text-sm italic text-slate-400">
                  {pub.journal || pub.conference}
                </p>
              )}

              {/* Abstract */}
              <p className="mb-4 text-sm text-slate-400 line-clamp-3">
                {pub.abstract}
              </p>

              {/* Keywords */}
              <div className="mb-4 flex flex-wrap gap-2">
                {pub.keywords.map((keyword, i) => (
                  <motion.span
                    key={i}
                    className="rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-slate-300"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                  >
                    {keyword}
                  </motion.span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {pub.pdfUrl && (
                  <motion.a
                    href={pub.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-blue-700"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </motion.a>
                )}
                {pub.doi && (
                  <motion.a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-blue-500 px-4 py-2 text-sm font-semibold text-blue-400 transition-all hover:bg-blue-500/10"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    DOI: {pub.doi}
                  </motion.a>
                )}
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
          ))}
        </motion.div>

        {/* Empty State */}
        {PUBLICATIONS.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex h-64 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/50"
          >
            <p className="text-lg text-slate-400">No publications available yet.</p>
          </motion.div>
        )}
      </div>
    </section>
  );
};