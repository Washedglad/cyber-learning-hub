'use client';

import React, { useState } from 'react';
import { Check, X, RefreshCw, Trophy } from 'lucide-react';
import { QuizQuestion } from '@/data/curriculum';
import { useProgress } from '@/context/ProgressContext';

interface QuizProps {
  moduleId: string;
  moduleTitle: string;
  questions: QuizQuestion[];
}

export default function Quiz({ moduleId, moduleTitle, questions }: QuizProps) {
  const { markQuizPassed, passedQuizzes } = useProgress();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const alreadyPassed = passedQuizzes.has(moduleId);

  const handleSelectAnswer = (optionIndex: number) => {
    if (hasSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setHasSubmitted(true);
    setShowResults(true);
    
    const score = calculateScore();
    const passingScore = Math.ceil(questions.length * 0.8); // 80% to pass
    
    if (score >= passingScore) {
      markQuizPassed(moduleId);
    }
  };

  const handleRetry = () => {
    setSelectedAnswers(new Array(questions.length).fill(null));
    setCurrentQuestion(0);
    setShowResults(false);
    setHasSubmitted(false);
  };

  const calculateScore = () => {
    return questions.reduce((score, question, index) => {
      return score + (selectedAnswers[index] === question.correctIndex ? 1 : 0);
    }, 0);
  };

  const allAnswered = selectedAnswers.every((answer) => answer !== null);
  const score = calculateScore();
  const passingScore = Math.ceil(questions.length * 0.8);
  const passed = score >= passingScore;

  if (alreadyPassed && !hasSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="animated-border p-8 text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-cyber-green/20 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-cyber-green" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Quiz Completed!</h2>
          <p className="text-zinc-400 mb-6">
            You&apos;ve already passed this quiz. Great job!
          </p>
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-bg border border-cyber-green/30 rounded-lg text-cyber-green hover:bg-cyber-green/10 transition-colors"
          >
            <RefreshCw size={18} />
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="animated-border p-8">
          <div className="text-center mb-8">
            <div
              className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                passed ? 'bg-cyber-green/20' : 'bg-red-500/20'
              }`}
            >
              {passed ? (
                <Trophy className="w-10 h-10 text-cyber-green" />
              ) : (
                <X className="w-10 h-10 text-red-500" />
              )}
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {passed ? 'Congratulations!' : 'Keep Learning!'}
            </h2>
            <p className="text-zinc-400 mb-4">
              You scored {score} out of {questions.length} ({Math.round((score / questions.length) * 100)}%)
            </p>
            {!passed && (
              <p className="text-sm text-zinc-500">
                You need {passingScore} correct answers (80%) to pass.
              </p>
            )}
          </div>

          {/* Review Answers */}
          <div className="space-y-4 mb-8">
            <h3 className="text-lg font-semibold text-white">Review Your Answers</h3>
            {questions.map((question, qIndex) => {
              const isCorrect = selectedAnswers[qIndex] === question.correctIndex;
              return (
                <div
                  key={question.id}
                  className={`p-4 rounded-lg border ${
                    isCorrect
                      ? 'border-cyber-green/30 bg-cyber-green/5'
                      : 'border-red-500/30 bg-red-500/5'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCorrect ? 'bg-cyber-green/20' : 'bg-red-500/20'
                      }`}
                    >
                      {isCorrect ? (
                        <Check size={14} className="text-cyber-green" />
                      ) : (
                        <X size={14} className="text-red-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-zinc-300 mb-2">{question.question}</p>
                      <p className="text-xs text-zinc-500">
                        Your answer:{' '}
                        <span className={isCorrect ? 'text-cyber-green' : 'text-red-400'}>
                          {question.options[selectedAnswers[qIndex] ?? 0]}
                        </span>
                      </p>
                      {!isCorrect && (
                        <p className="text-xs text-cyber-green mt-1">
                          Correct answer: {question.options[question.correctIndex]}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleRetry}
              className="inline-flex items-center gap-2 px-6 py-3 bg-cyber-bg border border-zinc-700 rounded-lg text-zinc-300 hover:border-cyber-cyan hover:text-white transition-colors"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="max-w-2xl mx-auto">
      <div className="animated-border p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">{moduleTitle} Quiz</h2>
            <span className="text-sm text-zinc-400">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          {/* Progress bar */}
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-lg text-white mb-6">{question.question}</h3>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                className={`quiz-option w-full text-left ${
                  selectedAnswers[currentQuestion] === index ? 'selected' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-cyber-cyan bg-cyber-cyan/20'
                        : 'border-zinc-600'
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 rounded-full bg-cyber-cyan" />
                    )}
                  </div>
                  <span className="text-zinc-300">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-4 py-2 text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            ← Previous
          </button>

          <div className="flex gap-2">
            {questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  index === currentQuestion
                    ? 'bg-cyber-cyan text-cyber-bg'
                    : selectedAnswers[index] !== null
                    ? 'bg-cyber-green/20 text-cyber-green'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className="px-6 py-2 bg-gradient-to-r from-cyber-green to-cyber-cyan text-cyber-bg font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-4 py-2 text-cyber-cyan hover:text-white transition-colors"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

