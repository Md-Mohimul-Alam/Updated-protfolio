// src/components/sections/Education.tsx

import React, { useEffect, useRef } from 'react';

const Education: React.FC = () => {
  const progressFillRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // ─── Scroll progress line ───
  useEffect(() => {
    const updateProgress = () => {
      if (!sectionRef.current || !progressFillRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalHeight = rect.height;
      const visible = Math.min(1, Math.max(0, -rect.top / (totalHeight - window.innerHeight)));
      progressFillRef.current.style.height = `${visible * 100}%`;
    };

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  // ─── Scroll reveal (Intersection Observer) ───
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => {
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      id="education-story"
      ref={sectionRef}
      className="relative w-full bg-[#0b1120] py-16 px-4 md:py-24 overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-6xl mx-auto">
        {/* ===== HERO : CHARACTER EVOLUTION ===== */}
        <div className="relative mb-20 rounded-3xl overflow-hidden border border-slate-800/60 shadow-2xl shadow-blue-500/10 hero-glow p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
              A Boy's Journey to <span className="gradient-text">Knowledge</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mb-8">
              From a small school bag to a laptop bag – each stage shaped the engineer I am today.
            </p>

            {/* Character evolution strip */}
            <div className="character-evolution">
              {/* SSC */}
              <div className="character-stage active">
                <span className="emoji">🧒</span>
                <span className="label">SSC</span>
                <span className="badge">🎒 2015–17</span>
              </div>
              <span className="character-arrow">→</span>

              {/* HSC */}
              <div className="character-stage">
                <span className="emoji">🧑‍🎓</span>
                <span className="label">HSC</span>
                <span className="badge">🎒 2017–19</span>
              </div>
              <span className="character-arrow">→</span>

              {/* B.Sc. */}
              <div className="character-stage">
                <span className="emoji">👨‍💻</span>
                <span className="label">B.Sc. CSE</span>
                <span className="badge">💼 2020–24</span>
              </div>
              <span className="character-arrow">→</span>

              {/* Research */}
              <div className="character-stage">
                <span className="emoji">🔬</span>
                <span className="label">Research</span>
                <span className="badge">🧠 2024–Present</span>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-6 italic">
              "The backpack gets heavier with knowledge, not books."
            </p>
          </div>
        </div>

        {/* ===== STORY TIMELINE ===== */}
        <div className="relative">
          {/* Vertical progress line (center) */}
          <div className="progress-line hidden md:block">
            <div className="progress-fill" ref={progressFillRef}></div>
          </div>

          {/* ─── CHAPTER 1 : SSC ─── */}
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 mb-16 md:mb-24 reveal">
            <div className="md:w-1/2 flex justify-end pr-8 relative">
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-orange-400 ring-4 ring-orange-400/30 dot-glow z-10"></div>
              <div className="md:text-right w-full">
                <span className="inline-block px-4 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-semibold tracking-wider border border-orange-500/30 mb-2">
                  Chapter 01
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3 md:justify-end">
                  <span className="text-orange-400">SSC</span>
                  <span className="text-sm text-slate-500 font-mono">(2015 – 2017)</span>
                </h3>
                <p className="text-slate-400 mt-2 max-w-md md:ml-auto">Narayanganj Ideal School · GPA 4.88</p>
                <p className="text-slate-300 mt-3 text-sm leading-relaxed max-w-md md:ml-auto">
                  The first step. A small school bag, big dreams. Science group, Olympiad participant – the foundation of
                  curiosity.
                </p>
                <div className="flex flex-wrap gap-2 mt-4 md:justify-end">
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">
                    Science
                  </span>
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">
                    Olympiad
                  </span>
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">
                    Mathematics
                  </span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-start pl-8">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-orange-500/20 to-amber-500/10 border border-orange-500/30 flex items-center justify-center text-6xl md:text-7xl float-slow">
                🧒
                <span className="absolute -bottom-2 -right-2 text-3xl">🎒</span>
                <span className="absolute -top-2 -left-2 text-xs bg-orange-500/30 px-2 py-0.5 rounded-full text-orange-200">
                  4.88
                </span>
              </div>
              <div className="ml-4 md:hidden">
                <p className="text-xs text-slate-500">First backpack</p>
                <p className="text-xs text-orange-400 font-medium">The Beginning</p>
              </div>
            </div>
          </div>

          {/* ─── CHAPTER 2 : HSC ─── */}
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 mb-16 md:mb-24 reveal">
            <div className="md:w-1/2 flex justify-end pr-8 relative order-2 md:order-1">
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-400 ring-4 ring-purple-400/30 dot-glow z-10"></div>
              <div className="w-full">
                <span className="inline-block px-4 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold tracking-wider border border-purple-500/30 mb-2">
                  Chapter 02
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                  <span className="text-purple-400">HSC</span>
                  <span className="text-sm text-slate-500 font-mono">(2017 – 2019)</span>
                </h3>
                <p className="text-slate-400 mt-2">Shaheed Suhrawardy College · GPA 4.50</p>
                <p className="text-slate-300 mt-3 text-sm leading-relaxed">
                  The bag gets heavier. Deep dive into Physics, Chemistry &amp; Math. Analytical thinking sharpened, the
                  path to engineering becomes clear.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">
                    Science
                  </span>
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">
                    Problem Solving
                  </span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-start pl-8 order-1 md:order-2">
              <div
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-purple-500/20 to-violet-500/10 border border-purple-500/30 flex items-center justify-center text-6xl md:text-7xl float-slow"
                style={{ animationDelay: '0.5s' }}
              >
                🧑‍🎓
                <span className="absolute -bottom-2 -right-2 text-3xl">🎒</span>
                <span className="absolute -top-2 -left-2 text-xs bg-purple-500/30 px-2 py-0.5 rounded-full text-purple-200">
                  4.50
                </span>
              </div>
              <div className="ml-4 md:hidden">
                <p className="text-xs text-slate-500">Bigger bag</p>
                <p className="text-xs text-purple-400 font-medium">The Growth</p>
              </div>
            </div>
          </div>

          {/* ─── CHAPTER 3 : B.Sc. ─── */}
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 mb-16 md:mb-24 reveal">
            <div className="md:w-1/2 flex justify-end pr-8 relative">
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-cyan-400 ring-4 ring-cyan-400/30 dot-glow z-10"></div>
              <div className="md:text-right w-full">
                <span className="inline-block px-4 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-semibold tracking-wider border border-cyan-500/30 mb-2">
                  Chapter 03
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3 md:justify-end">
                  <span className="text-cyan-400">B.Sc. CSE</span>
                  <span className="text-sm text-slate-500 font-mono">(2020 – 2024)</span>
                </h3>
                <p className="text-slate-400 mt-2">Daffodil International University · CGPA 2.73</p>
                <p className="text-slate-300 mt-3 text-sm leading-relaxed max-w-md md:ml-auto">
                  The backpack is now a laptop bag. Blockchain, IoT, Full-Stack. Research on Hyperledger Fabric &amp;
                  Healthcare data exchange. The future is being coded.
                </p>
                <div className="flex flex-wrap gap-2 mt-4 md:justify-end">
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">
                    Blockchain
                  </span>
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">
                    IoT
                  </span>
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">
                    React
                  </span>
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">
                    Hyperledger
                  </span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-start pl-8">
              <div
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 flex items-center justify-center text-6xl md:text-7xl float-slow"
                style={{ animationDelay: '1s' }}
              >
                👨‍💻
                <span className="absolute -bottom-2 -right-2 text-3xl">💼</span>
                <span className="absolute -top-2 -left-2 text-xs bg-cyan-500/30 px-2 py-0.5 rounded-full text-cyan-200">
                  2.73
                </span>
              </div>
              <div className="ml-4 md:hidden">
                <p className="text-xs text-slate-500">Laptop bag</p>
                <p className="text-xs text-cyan-400 font-medium">The Specialization</p>
              </div>
            </div>
          </div>

          {/* ─── CHAPTER 4 : Research ─── */}
          <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 reveal">
            <div className="md:w-1/2 flex justify-end pr-8 relative order-2 md:order-1">
              <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-pink-400 ring-4 ring-pink-400/30 dot-glow z-10 animate-pulse"></div>
              <div className="w-full">
                <span className="inline-block px-4 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-semibold tracking-wider border border-pink-500/30 mb-2">
                  Chapter 04
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                  <span className="text-pink-400">Blockchain Research</span>
                  <span className="text-sm text-slate-500 font-mono">(2024 – Present)</span>
                </h3>
                <p className="text-slate-400 mt-2">Independent Researcher</p>
                <p className="text-slate-300 mt-3 text-sm leading-relaxed">
                  Pushing boundaries. Zero-Knowledge Proofs, Threshold Encryption, and advanced Hyperledger Fabric
                  architectures. The journey continues.
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">
                    ZKPs
                  </span>
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">
                    Threshold Encryption
                  </span>
                  <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700">
                    Hyperledger
                  </span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-start pl-8 order-1 md:order-2">
              <div
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/10 border border-pink-500/30 flex items-center justify-center text-6xl md:text-7xl float-slow"
                style={{ animationDelay: '1.5s' }}
              >
                🔬
                <span className="absolute -bottom-2 -right-2 text-3xl">🧠</span>
                <span className="absolute -top-2 -left-2 text-xs bg-pink-500/30 px-2 py-0.5 rounded-full text-pink-200">
                  Ongoing
                </span>
              </div>
              <div className="ml-4 md:hidden">
                <p className="text-xs text-slate-500">Research mode</p>
                <p className="text-xs text-pink-400 font-medium">The Future</p>
              </div>
            </div>
          </div>
        </div>

        {/* ===== FOOTER STATS ===== */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t border-slate-800/60 pt-12">
          <div>
            <p className="text-3xl font-bold text-blue-400">4</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Stages</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-orange-400">4.88</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider">SSC GPA</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-purple-400">4.50</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider">HSC GPA</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-cyan-400">2.73</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider">B.Sc. CGPA</p>
          </div>
        </div>
      </div>

      {/* ===== Additional CSS (inline) ===== */}
      <style>{`
        .gradient-text {
          background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .progress-line {
          position: absolute;
          left: 50%;
          top: 0;
          bottom: 0;
          width: 3px;
          background: rgba(59, 130, 246, 0.15);
          transform: translateX(-50%);
          z-index: 0;
        }
        .progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 0%;
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6, #ec4899);
          transition: height 0.4s ease-out;
          border-radius: 4px;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }
        .dot-glow {
          box-shadow: 0 0 20px currentColor;
        }
        .character-evolution {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .character-stage {
          text-align: center;
          opacity: 0.6;
          transition: all 0.4s;
          filter: grayscale(0.5);
        }
        .character-stage.active {
          opacity: 1;
          filter: grayscale(0);
          transform: scale(1.05);
        }
        .character-stage .emoji {
          font-size: 4rem;
          display: block;
          line-height: 1.2;
        }
        .character-stage .label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #94a3b8;
          margin-top: 0.25rem;
        }
        .character-stage .badge {
          display: inline-block;
          background: rgba(59, 130, 246, 0.2);
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 20px;
          padding: 0.1rem 0.6rem;
          font-size: 0.6rem;
          color: #93c5fd;
          margin-top: 0.25rem;
        }
        .character-arrow {
          font-size: 1.5rem;
          color: #475569;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-slow {
          animation: float 4s ease-in-out infinite;
        }
        .reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .hero-glow {
          background: radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.15), transparent 70%),
                      radial-gradient(circle at 70% 50%, rgba(139, 92, 246, 0.15), transparent 70%);
          background-size: 200% 200%;
          animation: heroGlow 6s ease-in-out infinite alternate;
        }
        @keyframes heroGlow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
};

export default Education;