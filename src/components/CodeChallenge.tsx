'use client';

import React, { useState } from 'react';
import { Code2, CheckCircle2, XCircle, AlertTriangle, Lightbulb, RotateCcw } from 'lucide-react';

interface CodeLine {
  lineNumber: number;
  code: string;
  isVulnerable?: boolean;
  explanation?: string;
}

interface CodeChallengeProps {
  title: string;
  description: string;
  language: string;
  codeLines: CodeLine[];
  hint?: string;
  correctLineNumber: number;
  onComplete?: () => void;
}

export default function CodeChallenge({
  title,
  description,
  language,
  codeLines,
  hint,
  correctLineNumber,
  onComplete,
}: CodeChallengeProps) {
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const handleLineClick = (lineNumber: number) => {
    if (isCompleted) return;
    setSelectedLine(lineNumber);
    setShowResult(false);
  };

  const handleSubmit = () => {
    if (selectedLine === null) return;
    
    setAttempts((prev) => prev + 1);
    setShowResult(true);

    if (selectedLine === correctLineNumber) {
      setIsCompleted(true);
      onComplete?.();
    }
  };

  const handleReset = () => {
    setSelectedLine(null);
    setShowResult(false);
    setIsCompleted(false);
    setAttempts(0);
  };

  const vulnerableLine = codeLines.find((l) => l.lineNumber === correctLineNumber);

  // Syntax highlighting helper
  const highlightCode = (code: string) => {
    // Keywords
    let highlighted = code
      .replace(/\b(SELECT|FROM|WHERE|INSERT|UPDATE|DELETE|AND|OR|INTO|VALUES|SET)\b/g, '<span class="text-purple-400">$1</span>')
      .replace(/\b(def|return|if|else|elif|for|while|import|from|class|try|except|with|as)\b/g, '<span class="text-purple-400">$1</span>')
      .replace(/\b(function|const|let|var|return|if|else|async|await)\b/g, '<span class="text-purple-400">$1</span>')
      // Strings
      .replace(/("[^"]*")/g, '<span class="text-amber-300">$1</span>')
      .replace(/('[^']*')/g, '<span class="text-amber-300">$1</span>')
      // Comments
      .replace(/(#.*)$/g, '<span class="text-zinc-500">$1</span>')
      .replace(/(\/\/.*)$/g, '<span class="text-zinc-500">$1</span>')
      // Functions
      .replace(/(\w+)\(/g, '<span class="text-cyan-400">$1</span>(')
      // Numbers
      .replace(/\b(\d+)\b/g, '<span class="text-orange-400">$1</span>');
    
    return highlighted;
  };

  return (
    <div className="mt-8 rounded-xl overflow-hidden border border-cyber-cyan/30 bg-cyber-bg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-cyber-cyan/20 to-purple-500/20 border-b border-cyber-cyan/30">
        <div className="flex items-center gap-3">
          <Code2 className="w-5 h-5 text-cyber-cyan" />
          <span className="font-mono text-sm font-semibold text-white">{title}</span>
          <span className="px-2 py-0.5 rounded bg-zinc-800 text-xs text-zinc-400">{language}</span>
          {isCompleted && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyber-green/20 text-cyber-green text-xs">
              <CheckCircle2 size={12} />
              Completed
            </span>
          )}
        </div>
        <button
          onClick={handleReset}
          className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          title="Reset challenge"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Description */}
      <div className="px-4 py-3 bg-cyber-bg-card border-b border-[#2a2a35]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-4 h-4 text-red-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Vulnerability Hunt</p>
            <p className="text-sm text-zinc-400">{description}</p>
          </div>
          {hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-1 px-2 py-1 rounded text-xs text-yellow-400 hover:bg-yellow-400/10 transition-colors"
            >
              <Lightbulb size={14} />
              Hint
            </button>
          )}
        </div>
        {showHint && hint && (
          <div className="mt-3 p-3 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
            <p className="text-sm text-yellow-300">{hint}</p>
          </div>
        )}
      </div>

      {/* Code Editor */}
      <div className="p-4 font-mono text-sm overflow-x-auto">
        <div className="min-w-fit">
          {codeLines.map((line) => {
            const isSelected = selectedLine === line.lineNumber;
            const isCorrect = showResult && isSelected && line.lineNumber === correctLineNumber;
            const isWrong = showResult && isSelected && line.lineNumber !== correctLineNumber;
            const isVulnerableRevealed = isCompleted && line.lineNumber === correctLineNumber;

            return (
              <div
                key={line.lineNumber}
                onClick={() => handleLineClick(line.lineNumber)}
                className={`flex items-stretch cursor-pointer transition-all duration-200 rounded ${
                  isCorrect
                    ? 'bg-cyber-green/20 ring-1 ring-cyber-green'
                    : isWrong
                    ? 'bg-red-500/20 ring-1 ring-red-500'
                    : isSelected
                    ? 'bg-cyber-cyan/10 ring-1 ring-cyber-cyan/50'
                    : isVulnerableRevealed
                    ? 'bg-cyber-green/10'
                    : 'hover:bg-zinc-800/50'
                }`}
              >
                {/* Line number */}
                <div className={`w-12 flex-shrink-0 px-3 py-1 text-right select-none border-r border-[#2a2a35] ${
                  isCorrect ? 'text-cyber-green' : isWrong ? 'text-red-400' : 'text-zinc-500'
                }`}>
                  {line.lineNumber}
                </div>
                {/* Code */}
                <div className="flex-1 px-4 py-1 whitespace-pre">
                  <span
                    dangerouslySetInnerHTML={{ __html: highlightCode(line.code) }}
                    className="text-zinc-200"
                  />
                </div>
                {/* Status indicator */}
                <div className="w-8 flex items-center justify-center">
                  {isCorrect && <CheckCircle2 size={16} className="text-cyber-green" />}
                  {isWrong && <XCircle size={16} className="text-red-400" />}
                  {isVulnerableRevealed && !showResult && (
                    <AlertTriangle size={14} className="text-red-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Result explanation */}
      {showResult && (
        <div className={`mx-4 mb-4 p-4 rounded-lg border ${
          isCompleted 
            ? 'bg-cyber-green/10 border-cyber-green/30' 
            : 'bg-red-500/10 border-red-500/30'
        }`}>
          {isCompleted ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="text-cyber-green" size={20} />
                <span className="font-semibold text-cyber-green">Correct! Vulnerability identified.</span>
              </div>
              <p className="text-sm text-zinc-300">{vulnerableLine?.explanation}</p>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="text-red-400" size={20} />
                <span className="font-semibold text-red-400">Not quite. Try again!</span>
              </div>
              <p className="text-sm text-zinc-400">
                Look for code that directly concatenates user input into a query without sanitization.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Action bar */}
      <div className="px-4 py-3 bg-cyber-bg-card border-t border-[#2a2a35] flex items-center justify-between">
        <div className="text-xs text-zinc-500">
          {attempts > 0 && <span>Attempts: {attempts}</span>}
        </div>
        <div className="flex items-center gap-3">
          {selectedLine !== null && !isCompleted && (
            <span className="text-sm text-zinc-400">
              Line {selectedLine} selected
            </span>
          )}
          <button
            onClick={handleSubmit}
            disabled={selectedLine === null || isCompleted}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
              selectedLine === null || isCompleted
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-cyber-cyan to-purple-500 text-white hover:opacity-90'
            }`}
          >
            {isCompleted ? 'Completed!' : 'Submit Answer'}
          </button>
        </div>
      </div>
    </div>
  );
}

