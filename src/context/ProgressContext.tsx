'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo, ReactNode } from 'react';

interface ProgressState {
  visitedPages: string[];
  passedQuizzes: string[];
}

interface ProgressContextType {
  visitedPages: Set<string>;
  passedQuizzes: Set<string>;
  markPageVisited: (pageId: string) => void;
  markQuizPassed: (moduleId: string) => void;
  isPageComplete: (pageId: string, moduleId: string) => boolean;
  getModuleProgress: (moduleId: string, pageIds: string[]) => { visited: number; total: number; quizPassed: boolean };
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'cyber-learning-hub-progress';

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [visitedPages, setVisitedPages] = useState<Set<string>>(new Set());
  const [passedQuizzes, setPassedQuizzes] = useState<Set<string>>(new Set());
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed: ProgressState = JSON.parse(stored);
        setVisitedPages(new Set(parsed.visitedPages || []));
        setPassedQuizzes(new Set(parsed.passedQuizzes || []));
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (!isLoaded) return;
    try {
      const state: ProgressState = {
        visitedPages: Array.from(visitedPages),
        passedQuizzes: Array.from(passedQuizzes),
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Failed to save progress to localStorage:', e);
    }
  }, [visitedPages, passedQuizzes, isLoaded]);

  const markPageVisited = useCallback((pageId: string) => {
    setVisitedPages((prev) => {
      if (prev.has(pageId)) return prev; // No update needed
      const next = new Set(prev);
      next.add(pageId);
      return next;
    });
  }, []);

  const markQuizPassed = useCallback((moduleId: string) => {
    setPassedQuizzes((prev) => {
      if (prev.has(moduleId)) return prev; // No update needed
      const next = new Set(prev);
      next.add(moduleId);
      return next;
    });
  }, []);

  const isPageComplete = useCallback((pageId: string, moduleId: string): boolean => {
    return visitedPages.has(pageId) && passedQuizzes.has(moduleId);
  }, [visitedPages, passedQuizzes]);

  const getModuleProgress = useCallback((moduleId: string, pageIds: string[]) => {
    const visited = pageIds.filter((id) => visitedPages.has(id)).length;
    return {
      visited,
      total: pageIds.length,
      quizPassed: passedQuizzes.has(moduleId),
    };
  }, [visitedPages, passedQuizzes]);

  const resetProgress = useCallback(() => {
    setVisitedPages(new Set());
    setPassedQuizzes(new Set());
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo(() => ({
    visitedPages,
    passedQuizzes,
    markPageVisited,
    markQuizPassed,
    isPageComplete,
    getModuleProgress,
    resetProgress,
  }), [visitedPages, passedQuizzes, markPageVisited, markQuizPassed, isPageComplete, getModuleProgress, resetProgress]);

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
