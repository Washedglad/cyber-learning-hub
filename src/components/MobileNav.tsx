'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Check, ChevronDown, ChevronRight, Home, Wrench } from 'lucide-react';
import { modules } from '@/data/curriculum';
import { useProgress } from '@/context/ProgressContext';
import Logo from '@/components/Logo';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { visitedPages, passedQuizzes, getModuleProgress } = useProgress();
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set(modules.map(m => m.id)));

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

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
    <>
      {/* Mobile Header Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-cyber-bg-light border-b border-[#2a2a35] px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg hover:bg-[#1a1a24] text-zinc-300 hover:text-white transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
        
        <Link href="/" className="flex items-center gap-2">
          <Logo size="sm" showText={false} />
          <span className="font-bold text-white">CyberLearn</span>
        </Link>
        
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Mobile top padding */}
      <div className="md:hidden h-14" />

      {/* Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Menu */}
      <div
        className={`md:hidden fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-cyber-bg-light z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="p-4 border-b border-[#2a2a35] flex items-center justify-between">
          <Link href="/" className="group" onClick={() => setIsOpen(false)}>
            <Logo size="md" />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg hover:bg-[#1a1a24] text-zinc-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 h-[calc(100vh-140px)]">
          {/* Home Link */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
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
                    type="button"
                    onClick={() => toggleModule(module.id)}
                    className="w-full flex items-center gap-2 px-3 py-3 rounded-lg hover:bg-[#1a1a24] transition-colors group"
                  >
                    <span className="text-lg">{module.icon}</span>
                    <span className="flex-1 text-left text-sm font-medium text-zinc-300 group-hover:text-white truncate">
                      {module.title}
                    </span>
                    {isComplete && (
                      <span className="w-5 h-5 rounded-full bg-cyber-green/20 flex items-center justify-center">
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
                            onClick={() => setIsOpen(false)}
                            className={`sidebar-link flex items-center gap-2 text-sm py-3 ${
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
                        onClick={() => setIsOpen(false)}
                        className={`sidebar-link flex items-center gap-2 text-sm py-3 ${
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
              onClick={() => setIsOpen(false)}
              className={`sidebar-link flex items-center gap-3 py-3 text-zinc-300 hover:text-white ${
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
      </div>
    </>
  );
}

