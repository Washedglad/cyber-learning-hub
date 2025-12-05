'use client';

import { modules } from '@/data/curriculum';
import Quiz from '@/components/Quiz';

export default function Module8QuizPage() {
  const currentModule = modules[7];

  return (
    <Quiz
      moduleId={currentModule.id}
      moduleTitle={currentModule.title}
      questions={currentModule.quiz}
    />
  );
}

