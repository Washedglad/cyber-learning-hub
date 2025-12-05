'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, ArrowLeft, Target, BookOpen, Wrench } from 'lucide-react';
import { skillForgeResources } from '@/data/curriculum';

const categoryIcons = {
  'Hands-on Practice (CTFs/Labs)': Target,
  'Fundamental Learning (Courses/Docs)': BookOpen,
  'Key Tools': Wrench,
};

export default function SkillForgePage() {
  return (
    <div className="p-8 lg:p-12 max-w-5xl mx-auto animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
        <Link href="/" className="hover:text-cyber-cyan transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-zinc-300">SkillForge</span>
      </div>

      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-cyber-cyan transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Back to Dashboard
      </Link>

      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyber-green to-cyber-cyan flex items-center justify-center">
            <Wrench size={32} className="text-cyber-bg" />
          </div>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white">
              🛠️ SkillForge
            </h1>
            <p className="text-zinc-400">External Resources for Continued Learning</p>
          </div>
        </div>
        <p className="text-zinc-400 max-w-2xl mt-4">
          Ready to put your knowledge into practice? These carefully curated resources will help 
          you develop hands-on skills, deepen your understanding, and master essential security tools.
        </p>
      </div>

      {/* Resource Categories */}
      <div className="space-y-12">
        {skillForgeResources.map((category, categoryIndex) => {
          const Icon = categoryIcons[category.title as keyof typeof categoryIcons] || Target;
          
          return (
            <div key={category.title} style={{ animationDelay: `${categoryIndex * 150}ms` }}>
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-cyber-cyan/10 flex items-center justify-center">
                  <Icon size={20} className="text-cyber-cyan" />
                </div>
                <h2 className="text-xl font-semibold text-white">
                  {category.icon} {category.title}
                </h2>
              </div>

              {/* Resources Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.resources.map((resource, resourceIndex) => (
                  <a
                    key={resource.name}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="topic-card group block"
                    style={{ animationDelay: `${(categoryIndex * 150) + (resourceIndex * 50)}ms` }}
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="text-lg font-semibold text-white group-hover:text-cyber-green transition-colors">
                        {resource.name}
                      </h3>
                      <ExternalLink 
                        size={16} 
                        className="text-zinc-500 group-hover:text-cyber-cyan transition-colors flex-shrink-0 mt-1" 
                      />
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {resource.description}
                    </p>
                    <div className="mt-4 pt-4 border-t border-[#2a2a35]">
                      <span className="text-xs text-cyber-cyan group-hover:text-cyber-green transition-colors">
                        Visit Resource →
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Tips Section */}
      <div className="mt-16 animated-border p-6">
        <h3 className="text-lg font-semibold text-white mb-4">💡 Getting Started Tips</h3>
        <ul className="space-y-3 text-zinc-400">
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-cyber-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-cyber-green text-sm font-bold">1</span>
            </span>
            <span>
              <strong className="text-zinc-300">Start with TryHackMe</strong> - Their guided learning paths 
              are perfect for beginners with zero setup required.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-cyber-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-cyber-green text-sm font-bold">2</span>
            </span>
            <span>
              <strong className="text-zinc-300">Learn Linux basics</strong> - Most security tools run on 
              Linux. Use Linux Journey to build a solid foundation.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-cyber-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-cyber-green text-sm font-bold">3</span>
            </span>
            <span>
              <strong className="text-zinc-300">Practice with purpose</strong> - Pick one CTF challenge 
              and work through it completely before moving on.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-cyber-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-cyber-green text-sm font-bold">4</span>
            </span>
            <span>
              <strong className="text-zinc-300">Consider certification</strong> - CompTIA Security+ is 
              widely recognized and validates foundational knowledge.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}


