'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

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

  const markPageVisited = (pageId: string) => {
    setVisitedPages((prev) => {
      const next = new Set(prev);
      next.add(pageId);
      return next;
    });
  };

  const markQuizPassed = (moduleId: string) => {
    setPassedQuizzes((prev) => {
      const next = new Set(prev);
      next.add(moduleId);
      return next;
    });
  };

  const isPageComplete = (pageId: string, moduleId: string): boolean => {
    return visitedPages.has(pageId) && passedQuizzes.has(moduleId);
  };

  const getModuleProgress = (moduleId: string, pageIds: string[]) => {
    const visited = pageIds.filter((id) => visitedPages.has(id)).length;
    return {
      visited,
      total: pageIds.length,
      quizPassed: passedQuizzes.has(moduleId),
    };
  };

  const resetProgress = () => {
    setVisitedPages(new Set());
    setPassedQuizzes(new Set());
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ProgressContext.Provider
      value={{
        visitedPages,
        passedQuizzes,
        markPageVisited,
        markQuizPassed,
        isPageComplete,
        getModuleProgress,
        resetProgress,
      }}
    >
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

