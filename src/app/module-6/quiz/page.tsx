'use client';

import { modules } from '@/data/curriculum';
import Quiz from '@/components/Quiz';

export default function Module6QuizPage() {
  const currentModule = modules[5];

  return (
    <Quiz
      moduleId={currentModule.id}
      moduleTitle={currentModule.title}
      questions={currentModule.quiz}
    />
  );
}

