// src/components/PreLoader.tsx

import { useState, useEffect } from 'react';

interface PreLoaderProps {
  onComplete: () => void;
}

const PreLoader: React.FC<PreLoaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsAnimating(false);
            setTimeout(onComplete, 800);
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 bg-slate-950 flex items-center justify-center transition-opacity duration-800 ${
        !isAnimating ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-blue-500 rotate-45 animate-spin-slow"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-purple-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-32 left-1/3 w-16 h-16 bg-blue-500/10 rotate-45 animate-bounce"></div>
          <div className="absolute bottom-20 right-20 w-20 h-20 border border-pink-500 rotate-12 animate-spin-slow"></div>
        </div>
      </div>

      {/* Main Logo Animation */}
      <div className="relative flex flex-col items-center">
        {/* Animated Logo */}
        <div className="relative mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <span 
                className="text-6xl font-bold text-blue-500 animate-fade-in"
                style={{ animationDelay: '0.2s' }}
              >
                M
              </span>
              <span 
                className="text-6xl font-bold text-purple-500 animate-fade-in"
                style={{ animationDelay: '0.4s' }}
              >
                D
              </span>
              <div className="w-px h-12 bg-blue-500/30 mx-4 animate-fade-in" style={{ animationDelay: '0.6s' }}></div>
              <span 
                className="text-6xl font-bold text-pink-500 animate-fade-in"
                style={{ animationDelay: '0.8s' }}
              >
                MO
              </span>
              <span 
                className="text-6xl font-bold text-pink-500 animate-fade-in"
                style={{ animationDelay: '0.9s' }}
              >
                H
              </span>
              <span 
                className="text-6xl font-bold text-blue-500 animate-fade-in"
                style={{ animationDelay: '1.0s' }}
              >
                IM
              </span>
            </div>
          </div>

          {/* Geometric Grid Overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="grid grid-cols-8 gap-1 w-full h-full">
              {Array.from({ length: 64 }).map((_, i) => (
                <div 
                  key={i}
                  className="border border-blue-500/10 animate-fade-in"
                  style={{ animationDelay: `${i * 0.02}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center mb-6">
          <p className="text-sm text-slate-400 animate-fade-in" style={{ animationDelay: '1.2s' }}>
            Loading Portfolio...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden animate-fade-in" style={{ animationDelay: '1.4s' }}>
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress Percentage */}
        <div className="mt-4 text-xs text-slate-500 animate-fade-in" style={{ animationDelay: '1.6s' }}>
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default PreLoader;