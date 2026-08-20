// src/components/sections/Education.tsx

import React, { useEffect, useRef, useState } from 'react';

// ─── Types ──────────────────────────────────────────────
interface EducationItem {
  id: string;
  chapter: string;
  title: string;
  subtitle: string;
  period: string;
  institution: string;
  grade: string;
  description: string;
  tags: string[];
  emoji: string;
  icon: string;
  color: {
    name: string;
    bg: string;
    border: string;
    text: string;
    badge: string;
    gradient: string;
  };
  stats?: { label: string; value: string };
}

// ─── Data (more realistic & detailed) ──────────────────
const educationData: EducationItem[] = [
  {
    id: 'ssc',
    chapter: 'Chapter 01',
    title: 'SSC',
    subtitle: 'The Foundation',
    period: '2015 – 2017',
    institution: 'Municipal Model School and College',
    grade: '4.88',
    description:
      'Scored 4.88 out of 5.00 in the Science group. Participated in the National Mathematics Olympiad and secured a divisional position. Developed a strong interest in problem-solving and logical reasoning.',
    tags: ['Science', 'Mathematics Olympiad', 'Physics', 'Chemistry'],
    emoji: '🧒',
    icon: '🎒',
    color: {
      name: 'orange',
      bg: 'bg-orange-500/20',
      border: 'border-orange-500/30',
      text: 'text-orange-400',
      badge: 'bg-orange-500/30 text-orange-200',
      gradient: 'from-orange-500/20 to-amber-500/10',
    },
    stats: { label: 'SSC GPA', value: '4.88' },
  },
  {
    id: 'hsc',
    chapter: 'Chapter 02',
    title: 'HSC',
    subtitle: 'The Transition',
    period: '2017 – 2019',
    institution: 'Govt. City College Chittagong',
    grade: '4.50',
    description:
      'Completed Higher Secondary in Science with a GPA of 4.50. Deepened my understanding of Calculus, Mechanics, and Organic Chemistry. This phase cemented my decision to pursue Computer Science and Engineering.',
    tags: ['Science', 'Calculus', 'Mechanics', 'Organic Chemistry'],
    emoji: '🧑‍🎓',
    icon: '🎒',
    color: {
      name: 'purple',
      bg: 'bg-purple-500/20',
      border: 'border-purple-500/30',
      text: 'text-purple-400',
      badge: 'bg-purple-500/30 text-purple-200',
      gradient: 'from-purple-500/20 to-violet-500/10',
    },
    stats: { label: 'HSC GPA', value: '4.50' },
  },
  {
    id: 'bsc',
    chapter: 'Chapter 03',
    title: 'B.Sc. CSE',
    subtitle: 'The Specialization',
    period: '2020 – 2024',
    institution: 'Independent University, Bangladesh',
    grade: '2.73',
    description:
      'Graduated with a CGPA of 2.73 (on a 4.00 scale). The curriculum covered Data Structures, Algorithms, Database Systems, Computer Networks, and Software Engineering. My final year thesis focused on "Blockchain-based Secure Health Data Exchange using Hyperledger Fabric". Built a prototype with React, Node.js, and deployed on AWS.',
    tags: ['Blockchain', 'Hyperledger Fabric', 'React', 'Node.js', 'IoT', 'AWS'],
    emoji: '👨‍💻',
    icon: '💼',
    color: {
      name: 'cyan',
      bg: 'bg-cyan-500/20',
      border: 'border-cyan-500/30',
      text: 'text-cyan-400',
      badge: 'bg-cyan-500/30 text-cyan-200',
      gradient: 'from-cyan-500/20 to-blue-500/10',
    },
    stats: { label: 'B.Sc. CGPA', value: '2.73' },
  },
  {
    id: 'research',
    chapter: 'Chapter 04',
    title: 'Blockchain Research',
    subtitle: 'The Frontier',
    period: '2024 – Present',
    institution: 'Independent Researcher',
    grade: 'Ongoing',
    description:
      'Currently exploring Zero-Knowledge Proofs (ZKPs) and Threshold Encryption for privacy-preserving healthcare applications. Working on a paper about "Scalable Confidential Transactions in Hyperledger Fabric". Also contributing to an open-source project on decentralized identity management.',
    tags: ['ZKPs', 'Threshold Encryption', 'Hyperledger Fabric', 'Privacy', 'DID'],
    emoji: '🔬',
    icon: '🧠',
    color: {
      name: 'pink',
      bg: 'bg-pink-500/20',
      border: 'border-pink-500/30',
      text: 'text-pink-400',
      badge: 'bg-pink-500/30 text-pink-200',
      gradient: 'from-pink-500/20 to-rose-500/10',
    },
  },
];

// ─── Component (unchanged logic) ──────────────────────
const Education: React.FC = () => {
  const progressFillRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStageId, setActiveStageId] = useState<string>('ssc');

  useEffect(() => {
    let rafId: number | null = null;
    const updateProgress = () => {
      if (!sectionRef.current || !progressFillRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const totalHeight = rect.height;
      const visible = Math.min(1, Math.max(0, -rect.top / (totalHeight - window.innerHeight)));
      progressFillRef.current.style.height = `${visible * 100}%`;
      rafId = requestAnimationFrame(updateProgress);
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress, { passive: true });
    updateProgress();
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const stageElements = document.querySelectorAll('.stage-anchor');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const stageId = entry.target.getAttribute('data-stage');
            if (stageId) setActiveStageId(stageId);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );
    revealElements.forEach((el) => observer.observe(el));
    stageElements.forEach((el) => observer.observe(el));
    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      stageElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section
      id="education-story"
      ref={sectionRef}
      className="relative w-full bg-[#0b1120] py-16 px-4 md:py-24 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* ─── HERO : Character Evolution ────────────────── */}
        <div className="relative mb-20 rounded-3xl overflow-hidden border border-slate-800/60 shadow-2xl shadow-blue-500/10 hero-glow p-8 md:p-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
              Journey to <span className="gradient-text">Knowledge</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto mb-8">
              From a small school bag to a laptop bag – each stage shaped the engineer I am today.
            </p>

            <div className="character-evolution">
              {educationData.map((item, index) => (
                <React.Fragment key={item.id}>
                  <div
                    className={`character-stage ${activeStageId === item.id ? 'active' : ''}`}
                    style={{ transitionDelay: `${index * 0.1}s` }}
                  >
                    <span className="emoji">{item.emoji}</span>
                    <span className="label">{item.title}</span>
                    <span className="badge">{item.icon} {item.period}</span>
                  </div>
                  {index < educationData.length - 1 && (
                    <span className="character-arrow">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <p className="text-xs text-slate-500 mt-6 italic">
              "The backpack gets heavier with knowledge, not books."
            </p>
          </div>
        </div>

        {/* ─── TIMELINE ────────────────────────────────────── */}
        <div className="relative">
          {/* Vertical progress line */}
          <div className="progress-line hidden md:block">
            <div className="progress-fill" ref={progressFillRef} />
          </div>

          {educationData.map((item, index) => (
            <div
              key={item.id}
              className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 mb-16 md:mb-24 reveal stage-anchor ${index === educationData.length - 1 ? 'mb-0' : ''}`}
              data-stage={item.id}
            >
              {index % 2 === 0 ? (
                // Even index: icon left, text right
                <>
                  <div className="md:w-1/2 flex justify-start pl-8 order-1 md:order-1">
                    <div
                      className={`relative w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br ${item.color.gradient} border ${item.color.border} flex items-center justify-center text-6xl md:text-7xl float-slow`}
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      {item.emoji}
                      <span className="absolute -bottom-2 -right-2 text-3xl">{item.icon}</span>
                      <span
                        className={`absolute -top-2 -left-2 text-xs ${item.color.badge} px-2 py-0.5 rounded-full`}
                      >
                        {item.grade}
                      </span>
                    </div>
                    <div className="ml-4 md:hidden">
                      <p className="text-xs text-slate-500">{item.subtitle}</p>
                      <p className={`text-xs ${item.color.text} font-medium`}>{item.title}</p>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-end pr-8 relative order-2 md:order-2">
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-orange-400 ring-4 ring-orange-400/30 dot-glow z-10" />
                    <div className="md:text-right w-full">
                      <span
                        className={`inline-block px-4 py-1 rounded-full ${item.color.bg} ${item.color.text} text-xs font-semibold tracking-wider border ${item.color.border} mb-2`}
                      >
                        {item.chapter}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3 md:justify-end">
                        <span className={item.color.text}>{item.title}</span>
                        <span className="text-sm text-slate-500 font-mono">({item.period})</span>
                      </h3>
                      <p className="text-slate-400 mt-2 max-w-md md:ml-auto">{item.institution}</p>
                      <p className="text-slate-300 mt-3 text-sm leading-relaxed max-w-md md:ml-auto">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4 md:justify-end">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                // Odd index: text left, icon right
                <>
                  <div className="md:w-1/2 flex justify-end pr-8 relative order-2 md:order-1">
                    <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-purple-400 ring-4 ring-purple-400/30 dot-glow z-10" />
                    <div className="w-full">
                      <span
                        className={`inline-block px-4 py-1 rounded-full ${item.color.bg} ${item.color.text} text-xs font-semibold tracking-wider border ${item.color.border} mb-2`}
                      >
                        {item.chapter}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
                        <span className={item.color.text}>{item.title}</span>
                        <span className="text-sm text-slate-500 font-mono">({item.period})</span>
                      </h3>
                      <p className="text-slate-400 mt-2">{item.institution}</p>
                      <p className="text-slate-300 mt-3 text-sm leading-relaxed">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-300 border border-slate-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="md:w-1/2 flex justify-start pl-8 order-1 md:order-2">
                    <div
                      className={`relative w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br ${item.color.gradient} border ${item.color.border} flex items-center justify-center text-6xl md:text-7xl float-slow`}
                      style={{ animationDelay: `${index * 0.5}s` }}
                    >
                      {item.emoji}
                      <span className="absolute -bottom-2 -right-2 text-3xl">{item.icon}</span>
                      <span
                        className={`absolute -top-2 -left-2 text-xs ${item.color.badge} px-2 py-0.5 rounded-full`}
                      >
                        {item.grade}
                      </span>
                    </div>
                    <div className="ml-4 md:hidden">
                      <p className="text-xs text-slate-500">{item.subtitle}</p>
                      <p className={`text-xs ${item.color.text} font-medium`}>{item.title}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* ─── FOOTER STATS ────────────────────────────────── */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t border-slate-800/60 pt-12">
          <div>
            <p className="text-3xl font-bold text-blue-400">{educationData.length}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Stages</p>
          </div>
          {educationData
            .filter((d) => d.stats)
            .map((d) => (
              <div key={d.id}>
                <p className={`text-3xl font-bold ${d.color.text}`}>{d.stats!.value}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wider">{d.stats!.label}</p>
              </div>
            ))}
        </div>
      </div>

      {/* ─── Inline styles (unchanged) ──────────────────── */}
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
          transition: height 0.2s ease-out;
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
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          filter: grayscale(0.5);
        }
        .character-stage.active {
          opacity: 1;
          filter: grayscale(0);
          transform: scale(1.08);
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