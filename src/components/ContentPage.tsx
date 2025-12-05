'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, BookOpen } from 'lucide-react';
import { Page, Module } from '@/data/curriculum';
import { useProgress } from '@/context/ProgressContext';

interface ContentPageProps {
  module: Module;
  page: Page;
  prevPage?: Page;
  nextPage?: Page;
  children?: React.ReactNode;
}

export default function ContentPage({ module, page, prevPage, nextPage, children }: ContentPageProps) {
  const { markPageVisited } = useProgress();

  useEffect(() => {
    markPageVisited(page.id);
  }, [page.id, markPageVisited]);

  return (
    <div className="p-8 lg:p-12 max-w-4xl mx-auto animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
        <Link href="/" className="hover:text-cyber-cyan transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-zinc-400">{module.icon} {module.title}</span>
        <span>/</span>
        <span className="text-zinc-300">{page.title}</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-cyber-green/10 border border-cyber-green/20 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-cyber-green" />
          </div>
          <div>
            <p className="text-sm text-cyber-cyan">{module.icon} {module.title}</p>
            <h1 className="text-3xl font-bold text-white">{page.title}</h1>
          </div>
        </div>
      </div>

      {/* Topics */}
      <div className="space-y-8 mb-12">
        {page.topics.map((topic, index) => (
          <div
            key={index}
            className="topic-card"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="text-cyber-cyan font-mono text-sm font-bold">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-white mb-3">{topic.title}</h2>
                <p className="text-zinc-400 leading-relaxed">{topic.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Challenges */}
      {children && (
        <div className="mb-12">
          {children}
        </div>
      )}

      {/* Navigation */}
      <div className="border-t border-[#2a2a35] pt-8">
        <div className="flex items-center justify-between">
          {prevPage ? (
            <Link
              href={prevPage.route}
              className="flex items-center gap-2 text-zinc-400 hover:text-cyber-cyan transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm">{prevPage.title}</span>
            </Link>
          ) : (
            <div />
          )}
          
          <Link
            href={`/${module.id}/quiz`}
            className="px-4 py-2 bg-cyber-green/10 border border-cyber-green/30 rounded-lg text-cyber-green text-sm hover:bg-cyber-green/20 transition-colors"
          >
            Take Module Quiz →
          </Link>

          {nextPage ? (
            <Link
              href={nextPage.route}
              className="flex items-center gap-2 text-zinc-400 hover:text-cyber-cyan transition-colors"
            >
              <span className="text-sm">{nextPage.title}</span>
              <ArrowRight size={18} />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}


