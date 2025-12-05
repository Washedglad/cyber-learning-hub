'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Check, ChevronDown, ChevronRight, Home, Wrench } from 'lucide-react';
import { modules } from '@/data/curriculum';
import { useProgress } from '@/context/ProgressContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { visitedPages, passedQuizzes, getModuleProgress } = useProgress();
  const [expandedModules, setExpandedModules] = React.useState<Set<string>>(new Set(modules.map(m => m.id)));

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(moduleId)) {
        next.delete(moduleId);
      } else {
        next.add(moduleId);
      }
      return next;
    });
  };

  const isPageVisited = (pageId: string) => visitedPages.has(pageId);
  const isModuleQuizPassed = (moduleId: string) => passedQuizzes.has(moduleId);

  return (
    <aside className="w-72 min-h-screen bg-cyber-bg-light border-r border-[#2a2a35] flex flex-col">
      {/* Logo / Title */}
      <div className="p-6 border-b border-[#2a2a35]">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-green to-cyber-cyan flex items-center justify-center">
            <span className="text-cyber-bg font-bold text-lg">C</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-white group-hover:text-cyber-green transition-colors">
              CyberLearn
            </h1>
            <p className="text-xs text-zinc-500">Security Fundamentals</p>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {/* Home Link */}
        <Link
          href="/"
          className={`sidebar-link flex items-center gap-3 mb-4 text-zinc-300 hover:text-white ${
            pathname === '/' ? 'active text-white' : ''
          }`}
        >
          <Home size={18} />
          <span className="font-medium">Dashboard</span>
        </Link>

        {/* Modules */}
        <div className="space-y-2">
          {modules.map((module) => {
            const progress = getModuleProgress(module.id, module.pages.map(p => p.id));
            const isExpanded = expandedModules.has(module.id);
            const allPagesVisited = progress.visited === progress.total;
            const isComplete = allPagesVisited && progress.quizPassed;

            return (
              <div key={module.id} className="space-y-1">
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#1a1a24] transition-colors group"
                >
                  <span className="text-lg">{module.icon}</span>
                  <span className="flex-1 text-left text-sm font-medium text-zinc-300 group-hover:text-white truncate">
                    {module.title}
                  </span>
                  {isComplete && (
                    <span className="w-5 h-5 rounded-full bg-cyber-green/20 flex items-center justify-center check-pulse">
                      <Check size={12} className="text-cyber-green" />
                    </span>
                  )}
                  {isExpanded ? (
                    <ChevronDown size={16} className="text-zinc-500" />
                  ) : (
                    <ChevronRight size={16} className="text-zinc-500" />
                  )}
                </button>

                {/* Module Pages */}
                {isExpanded && (
                  <div className="ml-4 pl-4 border-l border-[#2a2a35] space-y-1">
                    {module.pages.map((page) => {
                      const pageVisited = isPageVisited(page.id);
                      const pageComplete = pageVisited && isModuleQuizPassed(module.id);
                      const isActive = pathname === page.route;

                      return (
                        <Link
                          key={page.id}
                          href={page.route}
                          className={`sidebar-link flex items-center gap-2 text-sm ${
                            isActive
                              ? 'active text-white'
                              : 'text-zinc-400 hover:text-white'
                          }`}
                        >
                          <span className="flex-1 truncate">{page.title}</span>
                          {pageComplete && (
                            <Check size={14} className="text-cyber-green" />
                          )}
                          {pageVisited && !pageComplete && (
                            <span className="w-2 h-2 rounded-full bg-cyber-cyan" />
                          )}
                        </Link>
                      );
                    })}
                    {/* Quiz Link */}
                    <Link
                      href={`/${module.id}/quiz`}
                      className={`sidebar-link flex items-center gap-2 text-sm ${
                        pathname === `/${module.id}/quiz`
                          ? 'active text-white'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="flex-1">📝 Module Quiz</span>
                      {isModuleQuizPassed(module.id) && (
                        <Check size={14} className="text-cyber-green" />
                      )}
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* SkillForge Link */}
        <div className="mt-6 pt-4 border-t border-[#2a2a35]">
          <Link
            href="/skillforge"
            className={`sidebar-link flex items-center gap-3 text-zinc-300 hover:text-white ${
              pathname === '/skillforge' ? 'active text-white' : ''
            }`}
          >
            <Wrench size={18} />
            <span className="font-medium">🛠️ SkillForge</span>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-[#2a2a35]">
        <div className="text-xs text-zinc-500 text-center">
          Progress is saved locally
        </div>
      </div>
    </aside>
  );
}

