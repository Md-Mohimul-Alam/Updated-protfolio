import React from 'react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  return (
    <section id="about" className="relative w-full bg-slate-950 py-20 px-4">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            About Me
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Your bio here...
          </p>
        </motion.div>
      </div>
    </section>
  );
};
