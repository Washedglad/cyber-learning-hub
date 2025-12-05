'use client';

import React, { useState } from 'react';
import { Shield, Plus, Trash2, Play, CheckCircle2, XCircle, AlertTriangle, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';

interface FirewallRule {
  id: string;
  action: 'allow' | 'deny';
  protocol: 'TCP' | 'UDP' | 'ICMP' | 'ANY';
  sourceIP: string;
  destIP: string;
  port: string;
  description: string;
}

interface TrafficPacket {
  id: string;
  name: string;
  protocol: 'TCP' | 'UDP' | 'ICMP';
  sourceIP: string;
  destIP: string;
  port: number;
  description: string;
  isLegitimate: boolean;
}

const SAMPLE_TRAFFIC: TrafficPacket[] = [
  { id: 't1', name: 'HTTPS Request', protocol: 'TCP', sourceIP: '192.168.1.100', destIP: '142.250.80.46', port: 443, description: 'User browsing Google', isLegitimate: true },
  { id: 't2', name: 'SSH Connection', protocol: 'TCP', sourceIP: '10.0.0.50', destIP: '192.168.1.10', port: 22, description: 'Admin SSH access', isLegitimate: true },
  { id: 't3', name: 'Ping Request', protocol: 'ICMP', sourceIP: '8.8.8.8', destIP: '192.168.1.100', port: 0, description: 'Network diagnostics', isLegitimate: true },
  { id: 't4', name: 'Suspicious Scan', protocol: 'TCP', sourceIP: '45.33.32.156', destIP: '192.168.1.10', port: 3389, description: 'RDP scan from unknown IP', isLegitimate: false },
  { id: 't5', name: 'DNS Query', protocol: 'UDP', sourceIP: '192.168.1.100', destIP: '8.8.8.8', port: 53, description: 'DNS lookup', isLegitimate: true },
  { id: 't6', name: 'Telnet Attempt', protocol: 'TCP', sourceIP: '103.25.44.12', destIP: '192.168.1.10', port: 23, description: 'Insecure Telnet from external', isLegitimate: false },
  { id: 't7', name: 'HTTP Traffic', protocol: 'TCP', sourceIP: '192.168.1.50', destIP: '93.184.216.34', port: 80, description: 'Unencrypted web traffic', isLegitimate: true },
  { id: 't8', name: 'SQL Port Probe', protocol: 'TCP', sourceIP: '185.220.101.1', destIP: '192.168.1.20', port: 1433, description: 'Database port scan', isLegitimate: false },
];

const DEFAULT_RULES: FirewallRule[] = [
  { id: 'default', action: 'deny', protocol: 'ANY', sourceIP: '*', destIP: '*', port: '*', description: 'Default deny all (implicit)' },
];

interface FirewallBuilderProps {
  onComplete?: () => void;
}

export default function FirewallBuilder({ onComplete }: FirewallBuilderProps) {
  const [rules, setRules] = useState<FirewallRule[]>([]);
  const [testResults, setTestResults] = useState<Record<string, { allowed: boolean; matchedRule: string | null }>>({});
  const [isSimulating, setIsSimulating] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [editingRule, setEditingRule] = useState<FirewallRule | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state for new/edit rule
  const [formAction, setFormAction] = useState<'allow' | 'deny'>('allow');
  const [formProtocol, setFormProtocol] = useState<'TCP' | 'UDP' | 'ICMP' | 'ANY'>('TCP');
  const [formSourceIP, setFormSourceIP] = useState('*');
  const [formDestIP, setFormDestIP] = useState('*');
  const [formPort, setFormPort] = useState('*');
  const [formDescription, setFormDescription] = useState('');

  const resetForm = () => {
    setFormAction('allow');
    setFormProtocol('TCP');
    setFormSourceIP('*');
    setFormDestIP('*');
    setFormPort('*');
    setFormDescription('');
    setEditingRule(null);
    setShowAddForm(false);
  };

  const handleAddRule = () => {
    const newRule: FirewallRule = {
      id: `rule-${Date.now()}`,
      action: formAction,
      protocol: formProtocol,
      sourceIP: formSourceIP || '*',
      destIP: formDestIP || '*',
      port: formPort || '*',
      description: formDescription || `${formAction} ${formProtocol} traffic`,
    };
    
    if (editingRule) {
      setRules(prev => prev.map(r => r.id === editingRule.id ? { ...newRule, id: editingRule.id } : r));
    } else {
      setRules(prev => [...prev, newRule]);
    }
    resetForm();
  };

  const handleEditRule = (rule: FirewallRule) => {
    setEditingRule(rule);
    setFormAction(rule.action);
    setFormProtocol(rule.protocol);
    setFormSourceIP(rule.sourceIP);
    setFormDestIP(rule.destIP);
    setFormPort(rule.port);
    setFormDescription(rule.description);
    setShowAddForm(true);
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(prev => prev.filter(r => r.id !== ruleId));
  };

  const moveRule = (index: number, direction: 'up' | 'down') => {
    const newRules = [...rules];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= rules.length) return;
    [newRules[index], newRules[newIndex]] = [newRules[newIndex], newRules[index]];
    setRules(newRules);
  };

  const matchesRule = (packet: TrafficPacket, rule: FirewallRule): boolean => {
    // Protocol check
    if (rule.protocol !== 'ANY' && rule.protocol !== packet.protocol) return false;
    
    // Source IP check (simplified - supports * wildcard and exact match)
    if (rule.sourceIP !== '*' && rule.sourceIP !== packet.sourceIP) {
      // Check for subnet-like patterns (simplified)
      if (!rule.sourceIP.includes('*') && rule.sourceIP !== packet.sourceIP) return false;
    }
    
    // Dest IP check
    if (rule.destIP !== '*' && rule.destIP !== packet.destIP) {
      if (!rule.destIP.includes('*') && rule.destIP !== packet.destIP) return false;
    }
    
    // Port check
    if (rule.port !== '*' && parseInt(rule.port) !== packet.port) return false;
    
    return true;
  };

  const simulateTraffic = () => {
    setIsSimulating(true);
    const results: Record<string, { allowed: boolean; matchedRule: string | null }> = {};
    
    // Combine user rules with default deny
    const allRules = [...rules, ...DEFAULT_RULES];
    
    SAMPLE_TRAFFIC.forEach(packet => {
      let allowed = false;
      let matchedRule: string | null = null;
      
      // Check rules in order (first match wins)
      for (const rule of allRules) {
        if (matchesRule(packet, rule)) {
          allowed = rule.action === 'allow';
          matchedRule = rule.id === 'default' ? 'Default Deny' : rule.description;
          break;
        }
      }
      
      results[packet.id] = { allowed, matchedRule };
    });
    
    setTestResults(results);
    
    // Check if challenge is complete (block malicious, allow legitimate)
    const allCorrect = SAMPLE_TRAFFIC.every(packet => {
      const result = results[packet.id];
      return packet.isLegitimate ? result.allowed : !result.allowed;
    });
    
    if (allCorrect && rules.length > 0) {
      onComplete?.();
    }
  };

  const handleReset = () => {
    setRules([]);
    setTestResults({});
    setIsSimulating(false);
    resetForm();
  };

  const getScoreInfo = () => {
    if (Object.keys(testResults).length === 0) return null;
    
    let correct = 0;
    let total = SAMPLE_TRAFFIC.length;
    
    SAMPLE_TRAFFIC.forEach(packet => {
      const result = testResults[packet.id];
      if (result) {
        const shouldAllow = packet.isLegitimate;
        if (shouldAllow === result.allowed) correct++;
      }
    });
    
    return { correct, total, percentage: Math.round((correct / total) * 100) };
  };

  const score = getScoreInfo();

  return (
    <div className="mt-8 rounded-xl overflow-hidden border border-amber-500/30 bg-cyber-bg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-amber-500/20 to-red-500/20 border-b border-amber-500/30">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-amber-400" />
          <span className="font-mono text-sm font-semibold text-white">Firewall Rule Builder</span>
        </div>
        <button
          onClick={handleReset}
          className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
          title="Reset"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Instructions */}
      <div className="px-4 py-3 bg-cyber-bg-card border-b border-[#2a2a35]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4 text-amber-400" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Build Your Firewall</p>
            <p className="text-sm text-zinc-400">Create rules to allow legitimate traffic and block suspicious activity. Rules are processed top-to-bottom (first match wins).</p>
          </div>
          <button
            onClick={() => setShowHint(!showHint)}
            className="flex items-center gap-1 px-2 py-1 rounded text-xs text-yellow-400 hover:bg-yellow-400/10 transition-colors"
          >
            <Lightbulb size={14} />
            Hint
          </button>
        </div>
        {showHint && (
          <div className="mt-3 p-3 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
            <p className="text-sm text-yellow-300">
              Allow outbound web traffic (ports 80, 443), DNS (port 53), and SSH from trusted IPs. 
              Block incoming connections on dangerous ports like Telnet (23), RDP (3389), and SQL (1433) from external sources.
            </p>
          </div>
        )}
      </div>

      <div className="p-4 space-y-4">
        {/* Rules List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-white">Your Rules ({rules.length})</h3>
            <button
              onClick={() => { resetForm(); setShowAddForm(true); }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-400 text-sm hover:bg-amber-500/30 transition-colors"
            >
              <Plus size={14} />
              Add Rule
            </button>
          </div>

          {rules.length === 0 ? (
            <div className="p-4 rounded-lg border border-dashed border-zinc-700 text-center">
              <p className="text-sm text-zinc-500">No rules yet. Add rules to control traffic flow.</p>
            </div>
          ) : (
            <div className="space-y-1">
              {rules.map((rule, index) => (
                <div
                  key={rule.id}
                  className={`p-3 rounded-lg border ${
                    rule.action === 'allow' 
                      ? 'bg-green-500/10 border-green-500/30' 
                      : 'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col gap-0.5">
                      <button
                        onClick={() => moveRule(index, 'up')}
                        disabled={index === 0}
                        className="text-zinc-500 hover:text-white disabled:opacity-30 text-xs"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => moveRule(index, 'down')}
                        disabled={index === rules.length - 1}
                        className="text-zinc-500 hover:text-white disabled:opacity-30 text-xs"
                      >
                        ▼
                      </button>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                      rule.action === 'allow' ? 'bg-green-500/30 text-green-400' : 'bg-red-500/30 text-red-400'
                    }`}>
                      {rule.action.toUpperCase()}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs bg-zinc-800 text-zinc-300">{rule.protocol}</span>
                    <div className="flex-1 text-sm text-zinc-300 flex items-center gap-2">
                      <span className="font-mono text-xs">{rule.sourceIP}</span>
                      <ArrowRight size={12} className="text-zinc-500" />
                      <span className="font-mono text-xs">{rule.destIP}</span>
                      {rule.port !== '*' && (
                        <span className="text-xs text-zinc-500">:{rule.port}</span>
                      )}
                    </div>
                    <span className="text-xs text-zinc-500 hidden sm:inline">{rule.description}</span>
                    <button
                      onClick={() => handleEditRule(rule)}
                      className="p-1 text-zinc-500 hover:text-white transition-colors"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteRule(rule.id)}
                      className="p-1 text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Default deny indicator */}
          <div className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 opacity-60">
            <div className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold">DENY</span>
              <span>ANY</span>
              <span className="font-mono">* → *</span>
              <span className="ml-auto">Default: deny all unmatched traffic</span>
            </div>
          </div>
        </div>

        {/* Add/Edit Rule Form */}
        {showAddForm && (
          <div className="p-4 rounded-lg bg-cyber-bg-card border border-zinc-700">
            <h4 className="text-sm font-medium text-white mb-3">{editingRule ? 'Edit Rule' : 'New Rule'}</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Action</label>
                <select
                  value={formAction}
                  onChange={(e) => setFormAction(e.target.value as 'allow' | 'deny')}
                  className="w-full px-2 py-1.5 rounded bg-zinc-900 border border-zinc-700 text-sm text-white"
                >
                  <option value="allow">ALLOW</option>
                  <option value="deny">DENY</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Protocol</label>
                <select
                  value={formProtocol}
                  onChange={(e) => setFormProtocol(e.target.value as 'TCP' | 'UDP' | 'ICMP' | 'ANY')}
                  className="w-full px-2 py-1.5 rounded bg-zinc-900 border border-zinc-700 text-sm text-white"
                >
                  <option value="TCP">TCP</option>
                  <option value="UDP">UDP</option>
                  <option value="ICMP">ICMP</option>
                  <option value="ANY">ANY</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Port (* = any)</label>
                <input
                  type="text"
                  value={formPort}
                  onChange={(e) => setFormPort(e.target.value)}
                  placeholder="443"
                  className="w-full px-2 py-1.5 rounded bg-zinc-900 border border-zinc-700 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Source IP (* = any)</label>
                <input
                  type="text"
                  value={formSourceIP}
                  onChange={(e) => setFormSourceIP(e.target.value)}
                  placeholder="192.168.1.*"
                  className="w-full px-2 py-1.5 rounded bg-zinc-900 border border-zinc-700 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Dest IP (* = any)</label>
                <input
                  type="text"
                  value={formDestIP}
                  onChange={(e) => setFormDestIP(e.target.value)}
                  placeholder="*"
                  className="w-full px-2 py-1.5 rounded bg-zinc-900 border border-zinc-700 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-500 block mb-1">Description</label>
                <input
                  type="text"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Allow HTTPS"
                  className="w-full px-2 py-1.5 rounded bg-zinc-900 border border-zinc-700 text-sm text-white"
                />
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleAddRule}
                className="px-4 py-1.5 rounded bg-amber-500 text-black text-sm font-medium hover:bg-amber-400 transition-colors"
              >
                {editingRule ? 'Update Rule' : 'Add Rule'}
              </button>
              <button
                onClick={resetForm}
                className="px-4 py-1.5 rounded bg-zinc-800 text-zinc-300 text-sm hover:bg-zinc-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Traffic Simulation */}
        <div className="border-t border-[#2a2a35] pt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-white">Test Traffic ({SAMPLE_TRAFFIC.length} packets)</h3>
            <button
              onClick={simulateTraffic}
              disabled={rules.length === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                rules.length === 0
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-red-500 text-white hover:opacity-90'
              }`}
            >
              <Play size={14} />
              Simulate Traffic
            </button>
          </div>

          <div className="space-y-2">
            {SAMPLE_TRAFFIC.map(packet => {
              const result = testResults[packet.id];
              const hasResult = result !== undefined;
              
              return (
                <div
                  key={packet.id}
                  className={`p-3 rounded-lg border transition-all ${
                    !hasResult
                      ? 'bg-zinc-900/50 border-zinc-800'
                      : result.allowed
                      ? 'bg-green-500/10 border-green-500/30'
                      : 'bg-red-500/10 border-red-500/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {hasResult ? (
                      result.allowed ? (
                        <CheckCircle2 size={18} className="text-green-400 flex-shrink-0" />
                      ) : (
                        <XCircle size={18} className="text-red-400 flex-shrink-0" />
                      )
                    ) : (
                      <div className="w-[18px] h-[18px] rounded-full border-2 border-zinc-700 flex-shrink-0" />
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-white">{packet.name}</span>
                        <span className="px-1.5 py-0.5 rounded text-xs bg-zinc-800 text-zinc-400">{packet.protocol}</span>
                        {!packet.isLegitimate && (
                          <span className="px-1.5 py-0.5 rounded text-xs bg-red-500/20 text-red-400 flex items-center gap-1">
                            <AlertTriangle size={10} />
                            Suspicious
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1 flex-wrap">
                        <span className="font-mono">{packet.sourceIP}</span>
                        <ArrowRight size={10} />
                        <span className="font-mono">{packet.destIP}:{packet.port}</span>
                        <span className="hidden sm:inline">— {packet.description}</span>
                      </div>
                    </div>
                    
                    {hasResult && (
                      <div className="text-xs text-zinc-500 text-right hidden md:block">
                        {result.matchedRule || 'Default Deny'}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Score */}
        {score && (
          <div className={`p-4 rounded-lg border ${
            score.percentage === 100
              ? 'bg-green-500/10 border-green-500/30'
              : score.percentage >= 70
              ? 'bg-yellow-500/10 border-yellow-500/30'
              : 'bg-red-500/10 border-red-500/30'
          }`}>
            <div className="flex items-center gap-3">
              {score.percentage === 100 ? (
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              ) : (
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
              )}
              <div>
                <p className={`font-medium ${
                  score.percentage === 100 ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {score.correct} of {score.total} correct ({score.percentage}%)
                </p>
                <p className="text-sm text-zinc-400">
                  {score.percentage === 100 
                    ? 'Perfect! Your firewall correctly handles all traffic.'
                    : 'Some traffic is being handled incorrectly. Adjust your rules.'}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


