'use client';

import { modules } from '@/data/curriculum';
import Quiz from '@/components/Quiz';

export default function Module7QuizPage() {
  const currentModule = modules[6];

  return (
    <Quiz
      moduleId={currentModule.id}
      moduleTitle={currentModule.title}
      questions={currentModule.quiz}
    />
  );
}

