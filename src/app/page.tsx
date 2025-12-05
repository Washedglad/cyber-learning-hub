'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Globe, FileWarning, Key, Wrench, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { modules } from '@/data/curriculum';
import { useProgress } from '@/context/ProgressContext';

const moduleIcons = {
  'module-1': Shield,
  'module-2': Globe,
  'module-3': FileWarning,
  'module-4': Key,
};

export default function Home() {
  const { getModuleProgress, resetProgress } = useProgress();

  const totalPages = modules.reduce((sum, m) => sum + m.pages.length, 0);
  const totalQuizzes = modules.length;
  
  let completedPages = 0;
  let passedQuizzes = 0;
  
  modules.forEach((module) => {
    const progress = getModuleProgress(module.id, module.pages.map(p => p.id));
    completedPages += progress.visited;
    if (progress.quizPassed) passedQuizzes++;
  });

  const overallProgress = Math.round(
    ((completedPages + passedQuizzes) / (totalPages + totalQuizzes)) * 100
  );

  return (
    <div className="p-8 lg:p-12 max-w-6xl mx-auto animate-fade-in">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-green/10 border border-cyber-green/20 text-cyber-green text-sm mb-6">
          <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
          Interactive Learning Platform
        </div>
        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
          Welcome to <span className="gradient-text">CyberLearn</span>
        </h1>
        <p className="text-lg text-zinc-400 max-w-2xl">
          Master the fundamentals of cybersecurity through structured modules, 
          interactive content, and knowledge-testing quizzes. Track your progress 
          as you build essential security skills.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="animated-border p-6 mb-12">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Your Progress</h2>
            <p className="text-zinc-400">
              {completedPages} of {totalPages} pages visited • {passedQuizzes} of {totalQuizzes} quizzes passed
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-48">
              <div className="progress-bar h-3 rounded-full">
                <div
                  className="progress-bar-fill rounded-full"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
              <p className="text-right text-sm text-zinc-400 mt-1">{overallProgress}% Complete</p>
            </div>
            <button
              onClick={resetProgress}
              className="text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Module Cards */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Learning Modules</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {modules.map((module, index) => {
            const Icon = moduleIcons[module.id as keyof typeof moduleIcons] || Shield;
            const progress = getModuleProgress(module.id, module.pages.map(p => p.id));
            const isComplete = progress.visited === progress.total && progress.quizPassed;

            return (
              <div
                key={module.id}
                className="topic-card group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isComplete 
                      ? 'bg-cyber-green/20 text-cyber-green' 
                      : 'bg-cyber-cyan/10 text-cyber-cyan'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{module.icon}</span>
                      <h3 className="text-lg font-semibold text-white group-hover:text-cyber-green transition-colors">
                        {module.title}
                      </h3>
                      {isComplete && (
                        <CheckCircle2 size={18} className="text-cyber-green" />
                      )}
                    </div>
                    <p className="text-sm text-zinc-400 mb-4">{module.description}</p>
                    
                    {/* Pages list */}
                    <div className="space-y-2 mb-4">
                      {module.pages.map((page) => {
                        const isVisited = progress.visited > 0; // Simplified check
                        return (
                          <Link
                            key={page.id}
                            href={page.route}
                            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-cyber-cyan transition-colors"
                          >
                            {isVisited ? (
                              <Circle size={12} className="text-cyber-green fill-cyber-green" />
                            ) : (
                              <Circle size={12} />
                            )}
                            {page.title}
                          </Link>
                        );
                      })}
                    </div>

                    <Link
                      href={module.pages[0].route}
                      className="inline-flex items-center gap-2 text-sm text-cyber-cyan hover:text-cyber-green transition-colors"
                    >
                      {progress.visited === 0 ? 'Start Module' : 'Continue Learning'}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SkillForge Card */}
      <div className="animated-border p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyber-green to-cyber-cyan flex items-center justify-center">
            <Wrench size={32} className="text-cyber-bg" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">🛠️ SkillForge: External Resources</h3>
            <p className="text-zinc-400">
              Ready to practice? Explore curated external resources including hands-on labs, 
              courses, and essential security tools.
            </p>
          </div>
          <Link
            href="/skillforge"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyber-green to-cyber-cyan text-cyber-bg font-semibold rounded-lg hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Explore Resources
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}

