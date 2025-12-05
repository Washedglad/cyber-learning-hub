'use client';

import React, { useState } from 'react';
import { Mail, AlertTriangle, CheckCircle2, XCircle, ChevronLeft, ChevronRight, Shield, ExternalLink, RotateCcw } from 'lucide-react';

interface RedFlag {
  id: string;
  type: 'sender' | 'subject' | 'body' | 'link' | 'greeting' | 'urgency' | 'grammar';
  description: string;
  explanation: string;
}

interface PhishingEmail {
  id: string;
  difficulty: 'easy' | 'medium' | 'hard';
  from: {
    name: string;
    email: string;
    isPhishing: boolean;
    flagId?: string;
  };
  subject: {
    text: string;
    isPhishing: boolean;
    flagId?: string;
  };
  greeting: {
    text: string;
    isPhishing: boolean;
    flagId?: string;
  };
  body: {
    text: string;
    highlightedPhrases?: { text: string; flagId: string }[];
  };
  links: {
    displayText: string;
    actualUrl: string;
    isPhishing: boolean;
    flagId?: string;
  }[];
  redFlags: RedFlag[];
}

const phishingEmails: PhishingEmail[] = [
  {
    id: 'email-1',
    difficulty: 'easy',
    from: {
      name: 'Amazon Security Team',
      email: 'security@amaz0n-alerts.com',
      isPhishing: true,
      flagId: 'flag-1',
    },
    subject: {
      text: '⚠️ URGENT: Your Account Will Be Suspended!!!',
      isPhishing: true,
      flagId: 'flag-2',
    },
    greeting: {
      text: 'Dear Valued Customer,',
      isPhishing: true,
      flagId: 'flag-3',
    },
    body: {
      text: 'We have detected unusual activity on your account. Your account will be PERMANENTLY SUSPENDED within 24 hours if you do not verify your information immediately.\n\nClick the link below to verify your account and prevent suspension:',
      highlightedPhrases: [
        { text: 'PERMANENTLY SUSPENDED within 24 hours', flagId: 'flag-4' },
      ],
    },
    links: [
      {
        displayText: 'Verify My Account Now',
        actualUrl: 'http://amaz0n-secure-login.suspicious-site.ru/verify',
        isPhishing: true,
        flagId: 'flag-5',
      },
    ],
    redFlags: [
      { id: 'flag-1', type: 'sender', description: 'Suspicious sender email', explanation: 'The email uses "amaz0n" (with a zero) instead of "amazon" - a common typosquatting technique.' },
      { id: 'flag-2', type: 'urgency', description: 'Urgent/threatening subject', explanation: 'Excessive urgency, all caps, and multiple exclamation marks are classic phishing tactics to make you act without thinking.' },
      { id: 'flag-3', type: 'greeting', description: 'Generic greeting', explanation: 'Legitimate companies typically address you by name. "Dear Valued Customer" suggests they don\'t actually know who you are.' },
      { id: 'flag-4', type: 'urgency', description: 'Threatening language', explanation: 'Creating fear and artificial deadlines pressures victims into clicking without verifying.' },
      { id: 'flag-5', type: 'link', description: 'Suspicious link URL', explanation: 'The link goes to a Russian domain (.ru) with "suspicious-site" - clearly not Amazon\'s official website.' },
    ],
  },
  {
    id: 'email-2',
    difficulty: 'medium',
    from: {
      name: 'IT Help Desk',
      email: 'helpdesk@company-support.net',
      isPhishing: true,
      flagId: 'flag-6',
    },
    subject: {
      text: 'Password Expiration Notice - Action Required',
      isPhishing: false,
    },
    greeting: {
      text: 'Hello,',
      isPhishing: true,
      flagId: 'flag-7',
    },
    body: {
      text: 'Your corporate password will expire in 3 days. To avoid losing access to company systems, please update your password using the secure portal below.\n\nNote: You will need to enter your current password to verify your identity.',
      highlightedPhrases: [
        { text: 'enter your current password', flagId: 'flag-8' },
      ],
    },
    links: [
      {
        displayText: 'Update Password',
        actualUrl: 'http://corporatelogin.phishing-domain.com/reset',
        isPhishing: true,
        flagId: 'flag-9',
      },
    ],
    redFlags: [
      { id: 'flag-6', type: 'sender', description: 'External domain for internal IT', explanation: 'Your company\'s IT department would email from your company domain, not "company-support.net".' },
      { id: 'flag-7', type: 'greeting', description: 'Impersonal greeting', explanation: 'Your IT department knows your name and would typically use it.' },
      { id: 'flag-8', type: 'body', description: 'Asking for current password', explanation: 'Legitimate password resets never ask for your current password via email or external links.' },
      { id: 'flag-9', type: 'link', description: 'Suspicious domain', explanation: 'The URL contains "phishing-domain.com" - legitimate corporate portals use the company\'s actual domain.' },
    ],
  },
  {
    id: 'email-3',
    difficulty: 'hard',
    from: {
      name: 'Netflix',
      email: 'billing@netflix-account.com',
      isPhishing: true,
      flagId: 'flag-10',
    },
    subject: {
      text: 'Your payment method needs to be updated',
      isPhishing: false,
    },
    greeting: {
      text: 'Hi there,',
      isPhishing: false,
    },
    body: {
      text: 'We were unable to process your last payment. To continue enjoying Netflix without interruption, please update your billing information.\n\nIf you believe this is an error, you can also contact our support team.',
      highlightedPhrases: [],
    },
    links: [
      {
        displayText: 'Update Billing Info',
        actualUrl: 'https://netflix-account.com/billing/update?session=a8f3k2',
        isPhishing: true,
        flagId: 'flag-11',
      },
      {
        displayText: 'Contact Support',
        actualUrl: 'https://help.netflix.com/contact',
        isPhishing: false,
      },
    ],
    redFlags: [
      { id: 'flag-10', type: 'sender', description: 'Look-alike domain', explanation: 'Netflix emails come from @netflix.com, not @netflix-account.com. This is a deceptive look-alike domain.' },
      { id: 'flag-11', type: 'link', description: 'Fake Netflix domain', explanation: 'The billing link goes to netflix-account.com (fake) instead of netflix.com (real). Always check the actual domain!' },
    ],
  },
];

interface PhishingChallengeProps {
  onComplete?: () => void;
}

export default function PhishingChallenge({ onComplete }: PhishingChallengeProps) {
  const [currentEmailIndex, setCurrentEmailIndex] = useState(0);
  const [foundFlags, setFoundFlags] = useState<Set<string>>(new Set());
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<string | null>(null);
  const [completedEmails, setCompletedEmails] = useState<Set<string>>(new Set());

  const currentEmail = phishingEmails[currentEmailIndex];
  const totalFlags = currentEmail.redFlags.length;
  const foundInCurrent = currentEmail.redFlags.filter(f => foundFlags.has(f.id)).length;
  const isEmailComplete = foundInCurrent === totalFlags;

  const handleFlagClick = (flagId: string) => {
    if (!foundFlags.has(flagId)) {
      setFoundFlags(prev => {
        const next = new Set(prev);
        next.add(flagId);
        return next;
      });
      setShowExplanation(flagId);
      
      // Check if this completes the email
      const newFoundCount = foundInCurrent + 1;
        if (newFoundCount === totalFlags) {
          setCompletedEmails(prev => {
            const next = new Set(prev);
            next.add(currentEmail.id);
            return next;
          });
        if (completedEmails.size + 1 === phishingEmails.length) {
          onComplete?.();
        }
      }
    } else {
      setShowExplanation(showExplanation === flagId ? null : flagId);
    }
  };

  const handleNext = () => {
    if (currentEmailIndex < phishingEmails.length - 1) {
      setCurrentEmailIndex(prev => prev + 1);
      setShowExplanation(null);
    }
  };

  const handlePrev = () => {
    if (currentEmailIndex > 0) {
      setCurrentEmailIndex(prev => prev - 1);
      setShowExplanation(null);
    }
  };

  const handleReset = () => {
    setFoundFlags(new Set());
    setCompletedEmails(new Set());
    setCurrentEmailIndex(0);
    setShowExplanation(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'medium': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'hard': return 'text-red-400 bg-red-400/10 border-red-400/30';
      default: return '';
    }
  };

  const renderClickableText = (text: string, flagId: string, isFound: boolean, type: string) => (
    <span
      onClick={() => handleFlagClick(flagId)}
      className={`cursor-pointer transition-all duration-200 rounded px-1 -mx-1 ${
        isFound
          ? 'bg-cyber-green/20 text-cyber-green ring-1 ring-cyber-green/50'
          : 'hover:bg-red-500/20 hover:text-red-300'
      }`}
    >
      {text}
      {isFound && <CheckCircle2 className="inline ml-1 w-4 h-4" />}
    </span>
  );

  return (
    <div className="mt-8 rounded-xl overflow-hidden border border-purple-500/30 bg-cyber-bg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-500/20 to-red-500/20 border-b border-purple-500/30">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-purple-400" />
          <span className="font-mono text-sm font-semibold text-white">Phishing Email Detector</span>
          <span className={`px-2 py-0.5 rounded border text-xs capitalize ${getDifficultyColor(currentEmail.difficulty)}`}>
            {currentEmail.difficulty}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">
            Email {currentEmailIndex + 1} of {phishingEmails.length}
          </span>
          <button
            onClick={handleReset}
            className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Reset all progress"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="px-4 py-3 bg-cyber-bg-card border-b border-[#2a2a35]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Find the Red Flags</p>
            <p className="text-sm text-zinc-400">Click on suspicious elements in the email below. Hover over links to see their real URLs.</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{foundInCurrent}/{totalFlags}</div>
            <div className="text-xs text-zinc-500">flags found</div>
          </div>
        </div>
      </div>

      {/* Email Preview */}
      <div className="p-4">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          {/* Email Header */}
          <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-500 text-sm w-16">From:</span>
              <span
                onClick={() => currentEmail.from.flagId && handleFlagClick(currentEmail.from.flagId)}
                className={`text-sm cursor-pointer transition-all rounded px-1 -mx-1 ${
                  currentEmail.from.flagId && foundFlags.has(currentEmail.from.flagId)
                    ? 'bg-green-100 text-green-700 ring-1 ring-green-300'
                    : currentEmail.from.isPhishing
                    ? 'hover:bg-red-100 hover:text-red-700'
                    : ''
                }`}
              >
                <strong className="text-gray-900">{currentEmail.from.name}</strong>
                <span className="text-gray-600"> &lt;{currentEmail.from.email}&gt;</span>
                {currentEmail.from.flagId && foundFlags.has(currentEmail.from.flagId) && (
                  <CheckCircle2 className="inline ml-1 w-4 h-4 text-green-600" />
                )}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm w-16">Subject:</span>
              <span
                onClick={() => currentEmail.subject.flagId && handleFlagClick(currentEmail.subject.flagId)}
                className={`text-sm font-medium cursor-pointer transition-all rounded px-1 -mx-1 ${
                  currentEmail.subject.flagId && foundFlags.has(currentEmail.subject.flagId)
                    ? 'bg-green-100 text-green-700 ring-1 ring-green-300'
                    : currentEmail.subject.isPhishing
                    ? 'hover:bg-red-100 hover:text-red-700 text-gray-900'
                    : 'text-gray-900'
                }`}
              >
                {currentEmail.subject.text}
                {currentEmail.subject.flagId && foundFlags.has(currentEmail.subject.flagId) && (
                  <CheckCircle2 className="inline ml-1 w-4 h-4 text-green-600" />
                )}
              </span>
            </div>
          </div>

          {/* Email Body */}
          <div className="px-4 py-4 text-gray-800 text-sm leading-relaxed">
            {/* Greeting */}
            <p
              onClick={() => currentEmail.greeting.flagId && handleFlagClick(currentEmail.greeting.flagId)}
              className={`mb-4 cursor-pointer transition-all rounded px-1 -mx-1 inline-block ${
                currentEmail.greeting.flagId && foundFlags.has(currentEmail.greeting.flagId)
                  ? 'bg-green-100 text-green-700 ring-1 ring-green-300'
                  : currentEmail.greeting.isPhishing
                  ? 'hover:bg-red-100 hover:text-red-700'
                  : ''
              }`}
            >
              {currentEmail.greeting.text}
              {currentEmail.greeting.flagId && foundFlags.has(currentEmail.greeting.flagId) && (
                <CheckCircle2 className="inline ml-1 w-4 h-4 text-green-600" />
              )}
            </p>

            {/* Body Text */}
            <div className="mb-4 whitespace-pre-line">
              {currentEmail.body.highlightedPhrases && currentEmail.body.highlightedPhrases.length > 0 ? (
                (() => {
                  let remainingText = currentEmail.body.text;
                  const elements: React.ReactNode[] = [];
                  let keyIndex = 0;

                  currentEmail.body.highlightedPhrases.forEach((phrase) => {
                    const index = remainingText.indexOf(phrase.text);
                    if (index !== -1) {
                      if (index > 0) {
                        elements.push(<span key={keyIndex++}>{remainingText.slice(0, index)}</span>);
                      }
                      const isFound = foundFlags.has(phrase.flagId);
                      elements.push(
                        <span
                          key={keyIndex++}
                          onClick={() => handleFlagClick(phrase.flagId)}
                          className={`cursor-pointer transition-all rounded px-1 -mx-1 ${
                            isFound
                              ? 'bg-green-100 text-green-700 ring-1 ring-green-300'
                              : 'hover:bg-red-100 hover:text-red-700'
                          }`}
                        >
                          {phrase.text}
                          {isFound && <CheckCircle2 className="inline ml-1 w-4 h-4 text-green-600" />}
                        </span>
                      );
                      remainingText = remainingText.slice(index + phrase.text.length);
                    }
                  });

                  if (remainingText) {
                    elements.push(<span key={keyIndex++}>{remainingText}</span>);
                  }

                  return elements;
                })()
              ) : (
                currentEmail.body.text
              )}
            </div>

            {/* Links */}
            <div className="space-y-2">
              {currentEmail.links.map((link, index) => (
                <div key={index} className="relative">
                  <button
                    onClick={() => link.flagId && handleFlagClick(link.flagId)}
                    onMouseEnter={() => setHoveredLink(link.displayText)}
                    onMouseLeave={() => setHoveredLink(null)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded text-sm font-medium transition-all ${
                      link.flagId && foundFlags.has(link.flagId)
                        ? 'bg-green-100 text-green-700 ring-1 ring-green-300'
                        : link.isPhishing
                        ? 'bg-blue-600 text-white hover:bg-red-500'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {link.displayText}
                    <ExternalLink size={14} />
                    {link.flagId && foundFlags.has(link.flagId) && (
                      <CheckCircle2 className="w-4 h-4" />
                    )}
                  </button>
                  {hoveredLink === link.displayText && (
                    <div className="absolute left-0 top-full mt-1 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg z-10 max-w-md break-all">
                      <span className="text-gray-400">URL: </span>
                      <span className={link.isPhishing ? 'text-red-400' : 'text-green-400'}>
                        {link.actualUrl}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Explanation Panel */}
      {showExplanation && (
        <div className="mx-4 mb-4 p-4 rounded-lg bg-cyber-green/10 border border-cyber-green/30">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-cyber-green flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-cyber-green mb-1">
                {currentEmail.redFlags.find(f => f.id === showExplanation)?.description}
              </p>
              <p className="text-sm text-zinc-300">
                {currentEmail.redFlags.find(f => f.id === showExplanation)?.explanation}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Completion message */}
      {isEmailComplete && (
        <div className="mx-4 mb-4 p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <p className="font-medium text-purple-400">Email Analyzed!</p>
              <p className="text-sm text-zinc-400">You found all {totalFlags} red flags in this phishing email.</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="px-4 py-3 bg-cyber-bg-card border-t border-[#2a2a35] flex items-center justify-between">
        <button
          onClick={handlePrev}
          disabled={currentEmailIndex === 0}
          className="flex items-center gap-1 px-3 py-1.5 rounded text-sm text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {phishingEmails.map((email, index) => (
            <button
              key={email.id}
              onClick={() => {
                setCurrentEmailIndex(index);
                setShowExplanation(null);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                completedEmails.has(email.id)
                  ? 'bg-cyber-green'
                  : index === currentEmailIndex
                  ? 'bg-purple-500 ring-2 ring-purple-500/50'
                  : 'bg-zinc-600 hover:bg-zinc-500'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentEmailIndex === phishingEmails.length - 1}
          className="flex items-center gap-1 px-3 py-1.5 rounded text-sm text-zinc-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

