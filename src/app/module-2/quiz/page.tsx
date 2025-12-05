'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { modules } from '@/data/curriculum';
import Quiz from '@/components/Quiz';

export default function Module2QuizPage() {
  const module = modules[1];

  return (
    <div className="p-8 lg:p-12 animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-zinc-500 mb-6 max-w-2xl mx-auto">
        <Link href="/" className="hover:text-cyber-cyan transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-zinc-400">{module.icon} {module.title}</span>
        <span>/</span>
        <span className="text-zinc-300">Quiz</span>
      </div>

      {/* Back link */}
      <div className="max-w-2xl mx-auto mb-8">
        <Link
          href={module.pages[module.pages.length - 1].route}
          className="inline-flex items-center gap-2 text-zinc-400 hover:text-cyber-cyan transition-colors"
        >
          <ArrowLeft size={16} />
          Back to {module.pages[module.pages.length - 1].title}
        </Link>
      </div>

      <Quiz
        moduleId={module.id}
        moduleTitle={module.title}
        questions={module.quiz}
      />
    </div>
  );
}

