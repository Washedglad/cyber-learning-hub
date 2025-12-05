'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-base', subtext: 'text-[10px]' },
    md: { icon: 'w-10 h-10', text: 'text-lg', subtext: 'text-xs' },
    lg: { icon: 'w-14 h-14', text: 'text-2xl', subtext: 'text-sm' },
  };

  const s = sizes[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <div className={`${s.icon} rounded-lg bg-gradient-to-br from-cyber-green to-cyber-cyan flex items-center justify-center relative overflow-hidden`}>
        {/* Terminal prompt */}
        <span className="text-cyber-bg font-mono font-bold text-sm flex items-center">
          <span className="opacity-90">&gt;</span>
          <span className="animate-pulse">_</span>
        </span>
      </div>
      
      {showText && (
        <div>
          <h1 className={`${s.text} font-bold text-white group-hover:text-cyber-green transition-colors`}>
            CyberLearn
          </h1>
          <p className={`${s.subtext} text-zinc-500`}>Security Fundamentals</p>
        </div>
      )}
    </div>
  );
}


