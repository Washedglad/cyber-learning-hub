'use client';

import React, { useState } from 'react';
import { AlertTriangle, Shield, CheckCircle, Clock, ChevronRight, RefreshCw, Lightbulb } from 'lucide-react';

interface TimelineEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  type: 'alert' | 'action' | 'decision';
  checklistItems?: {
    id: string;
    text: string;
    hint: string;
  }[];
}

interface TimelineStage {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  events: TimelineEvent[];
}

const stages: TimelineStage[] = [
  {
    id: 'detection',
    name: 'Detection',
    icon: <AlertTriangle size={20} />,
    color: 'from-red-500 to-orange-500',
    events: [
      {
        id: 'alert-1',
        time: '09:15 AM',
        title: 'SIEM Alert: Multiple Failed Logins',
        description: 'Your SIEM has detected 847 failed login attempts against the VPN gateway from IP 185.220.101.45 in the last 10 minutes.',
        type: 'alert',
        checklistItems: [
          { id: 'det-1', text: 'Verify the alert is not a false positive', hint: 'Check if this IP has any legitimate history. Look for successful logins from this IP.' },
          { id: 'det-2', text: 'Identify affected systems and accounts', hint: 'Which accounts are being targeted? Are they privileged accounts?' },
          { id: 'det-3', text: 'Check for successful authentication', hint: 'Did any of the 847 attempts succeed? This changes the severity dramatically.' },
        ],
      },
      {
        id: 'alert-2',
        time: '09:18 AM',
        title: 'Alert Escalation: Successful Login Detected',
        description: 'Attempt #848 succeeded! User "admin_backup" authenticated from the suspicious IP. This account hasn\'t been used in 6 months.',
        type: 'alert',
        checklistItems: [
          { id: 'det-4', text: 'Classify incident severity (Critical/High/Medium/Low)', hint: 'Unauthorized access to admin account = Critical' },
          { id: 'det-5', text: 'Document initial findings with timestamps', hint: 'Start your incident timeline now. Note: IP, account, time, alert source.' },
          { id: 'det-6', text: 'Notify incident response team', hint: 'Who is on-call? Use established communication channels.' },
        ],
      },
    ],
  },
  {
    id: 'containment',
    name: 'Containment',
    icon: <Shield size={20} />,
    color: 'from-yellow-500 to-amber-500',
    events: [
      {
        id: 'contain-1',
        time: '09:22 AM',
        title: 'Decision Point: Immediate Actions',
        description: 'The attacker is actively authenticated. You need to stop the bleeding without alerting them or destroying evidence.',
        type: 'decision',
        checklistItems: [
          { id: 'con-1', text: 'Disable the compromised account', hint: 'Disable, don\'t delete! You need to preserve the account for forensics.' },
          { id: 'con-2', text: 'Block the attacker IP at the firewall', hint: 'Add to block list, but know sophisticated attackers have multiple IPs.' },
          { id: 'con-3', text: 'Isolate affected systems from the network', hint: 'Can you segment without disrupting business? Consider VLANs.' },
        ],
      },
      {
        id: 'contain-2',
        time: '09:35 AM',
        title: 'Evidence Collection Begins',
        description: 'Before making changes, you need to preserve evidence. Legal and insurance may need this later.',
        type: 'action',
        checklistItems: [
          { id: 'con-4', text: 'Capture memory dump of affected systems', hint: 'Malware often lives only in memory. Capture before reboot!' },
          { id: 'con-5', text: 'Export relevant logs to secure storage', hint: 'Attackers often clear logs. Get copies now.' },
          { id: 'con-6', text: 'Document chain of custody', hint: 'Who touched what, when? This matters for legal proceedings.' },
        ],
      },
      {
        id: 'contain-3',
        time: '09:50 AM',
        title: 'Scope Assessment',
        description: 'What else did the attacker access? You need to understand the full blast radius.',
        type: 'action',
        checklistItems: [
          { id: 'con-7', text: 'Review all actions taken by compromised account', hint: 'Check VPN logs, file access, AD changes, database queries.' },
          { id: 'con-8', text: 'Check for lateral movement indicators', hint: 'Did they access other systems? Create new accounts? Install software?' },
          { id: 'con-9', text: 'Identify any data exfiltration', hint: 'Large outbound transfers? Access to sensitive databases?' },
        ],
      },
    ],
  },
  {
    id: 'recovery',
    name: 'Recovery',
    icon: <CheckCircle size={20} />,
    color: 'from-green-500 to-emerald-500',
    events: [
      {
        id: 'recover-1',
        time: '11:00 AM',
        title: 'Eradication Planning',
        description: 'The immediate threat is contained. Now you need to remove all traces and close the vulnerability.',
        type: 'action',
        checklistItems: [
          { id: 'rec-1', text: 'Identify root cause (how did they get the password?)', hint: 'Phishing? Credential stuffing? Password reuse? Insider threat?' },
          { id: 'rec-2', text: 'Check for persistence mechanisms', hint: 'Scheduled tasks? New services? SSH keys? Backdoor accounts?' },
          { id: 'rec-3', text: 'Plan credential rotation', hint: 'Which passwords need to be changed? All admin accounts? Service accounts?' },
        ],
      },
      {
        id: 'recover-2',
        time: '02:00 PM',
        title: 'System Restoration',
        description: 'Time to bring systems back online securely.',
        type: 'action',
        checklistItems: [
          { id: 'rec-4', text: 'Restore from known-good backup or rebuild', hint: 'When was the last clean backup? Can you verify it\'s not compromised?' },
          { id: 'rec-5', text: 'Implement additional monitoring', hint: 'Add detection rules for this attack pattern. Watch for the attacker\'s return.' },
          { id: 'rec-6', text: 'Verify security controls are in place', hint: 'MFA enabled? Password policy enforced? VPN hardened?' },
        ],
      },
      {
        id: 'recover-3',
        time: '04:00 PM',
        title: 'Post-Incident Activities',
        description: 'The incident is resolved, but the work isn\'t done.',
        type: 'action',
        checklistItems: [
          { id: 'rec-7', text: 'Complete incident documentation', hint: 'Timeline, actions taken, evidence collected, people involved.' },
          { id: 'rec-8', text: 'Schedule post-incident review meeting', hint: 'Blameless! Focus on process improvement, not finger-pointing.' },
          { id: 'rec-9', text: 'Update playbooks and detection rules', hint: 'What would have caught this faster? What can be automated?' },
        ],
      },
    ],
  },
];

export default function IncidentTimeline() {
  const [activeStage, setActiveStage] = useState<string>('detection');
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());
  const [showHint, setShowHint] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const currentStage = stages.find((s) => s.id === activeStage)!;
  const totalItems = stages.flatMap((s) => s.events.flatMap((e) => e.checklistItems || [])).length;
  const progress = Math.round((completedItems.size / totalItems) * 100);

  const toggleItem = (itemId: string) => {
    setCompletedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      
      // Check if all items are complete
      if (next.size === totalItems) {
        setIsComplete(true);
      } else {
        setIsComplete(false);
      }
      
      return next;
    });
  };

  const resetSimulation = () => {
    setCompletedItems(new Set());
    setActiveStage('detection');
    setShowHint(null);
    setIsComplete(false);
  };

  const getStageProgress = (stageId: string) => {
    const stage = stages.find((s) => s.id === stageId);
    if (!stage) return 0;
    const items = stage.events.flatMap((e) => e.checklistItems || []);
    const completed = items.filter((item) => completedItems.has(item.id)).length;
    return items.length > 0 ? Math.round((completed / items.length) * 100) : 0;
  };

  return (
    <div className="mt-12 mb-8">
      <div className="animated-border p-6 rounded-xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="text-cyber-cyan" />
              Incident Response Simulation
            </h3>
            <p className="text-zinc-400 text-sm mt-1">
              Walk through a realistic security incident from detection to recovery
            </p>
          </div>
          <button
            onClick={resetSimulation}
            className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white border border-zinc-700 rounded-lg hover:border-zinc-500 transition-colors"
          >
            <RefreshCw size={16} />
            Reset
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-zinc-400">Overall Progress</span>
            <span className="text-cyber-green">{progress}% Complete</span>
          </div>
          <div className="h-2 bg-cyber-bg rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyber-green to-cyber-cyan transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Stage Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {stages.map((stage) => {
            const stageProgress = getStageProgress(stage.id);
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all whitespace-nowrap ${
                  activeStage === stage.id
                    ? `bg-gradient-to-r ${stage.color} text-white`
                    : 'bg-cyber-bg text-zinc-400 hover:text-white hover:bg-[#1a1a24]'
                }`}
              >
                {stage.icon}
                <span className="font-medium">{stage.name}</span>
                {stageProgress === 100 && (
                  <CheckCircle size={16} className="text-white" />
                )}
                {stageProgress > 0 && stageProgress < 100 && (
                  <span className="text-xs opacity-75">({stageProgress}%)</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Timeline Events */}
        <div className="space-y-6">
          {currentStage.events.map((event, index) => (
            <div key={event.id} className="relative">
              {/* Timeline connector */}
              {index < currentStage.events.length - 1 && (
                <div className="absolute left-[19px] top-12 bottom-0 w-0.5 bg-zinc-700" />
              )}
              
              <div className="flex gap-4">
                {/* Timeline dot */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  event.type === 'alert' ? 'bg-red-500/20 text-red-400' :
                  event.type === 'decision' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {event.type === 'alert' && <AlertTriangle size={18} />}
                  {event.type === 'decision' && <ChevronRight size={18} />}
                  {event.type === 'action' && <Shield size={18} />}
                </div>
                
                <div className="flex-1 bg-cyber-bg rounded-lg p-4 border border-zinc-800">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <span className="text-xs text-zinc-500 font-mono">{event.time}</span>
                      <h4 className="text-white font-semibold">{event.title}</h4>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      event.type === 'alert' ? 'bg-red-500/20 text-red-400' :
                      event.type === 'decision' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {event.type.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="text-zinc-400 text-sm mb-4">{event.description}</p>
                  
                  {event.checklistItems && (
                    <div className="space-y-2">
                      <p className="text-xs text-zinc-500 uppercase tracking-wider">Response Checklist:</p>
                      {event.checklistItems.map((item) => (
                        <div key={item.id} className="flex items-start gap-3">
                          <button
                            onClick={() => toggleItem(item.id)}
                            className={`w-5 h-5 rounded border flex-shrink-0 flex items-center justify-center transition-colors mt-0.5 ${
                              completedItems.has(item.id)
                                ? 'bg-cyber-green border-cyber-green text-cyber-bg'
                                : 'border-zinc-600 hover:border-cyber-green'
                            }`}
                          >
                            {completedItems.has(item.id) && <CheckCircle size={14} />}
                          </button>
                          <div className="flex-1">
                            <span className={`text-sm ${completedItems.has(item.id) ? 'text-zinc-500 line-through' : 'text-zinc-300'}`}>
                              {item.text}
                            </span>
                            <button
                              onClick={() => setShowHint(showHint === item.id ? null : item.id)}
                              className="ml-2 text-cyber-cyan hover:text-cyber-green transition-colors"
                              title="Show hint"
                            >
                              <Lightbulb size={14} />
                            </button>
                            {showHint === item.id && (
                              <div className="mt-2 p-2 bg-cyber-cyan/10 border border-cyber-cyan/30 rounded text-xs text-cyber-cyan">
                                💡 {item.hint}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Completion Message */}
        {isComplete && (
          <div className="mt-6 p-4 bg-cyber-green/10 border border-cyber-green/30 rounded-lg">
            <div className="flex items-center gap-3">
              <CheckCircle className="text-cyber-green" size={24} />
              <div>
                <h4 className="text-cyber-green font-semibold">Incident Resolved!</h4>
                <p className="text-sm text-zinc-400">
                  Excellent work! You&apos;ve completed all checklist items across detection, containment, and recovery phases.
                  In a real incident, you&apos;d now schedule a post-incident review to capture lessons learned.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

