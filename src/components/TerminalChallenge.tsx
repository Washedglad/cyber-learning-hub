'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

interface CommandOutput {
  command: string;
  output: string[];
  isError?: boolean;
  isSuccess?: boolean;
}

interface TerminalChallengeProps {
  title: string;
  objective: string;
  hint?: string;
  successCommand: string;
  successMessage: string;
  onComplete?: () => void;
}

const MOCK_FILESYSTEM = {
  '/': ['home', 'etc', 'var', 'usr', 'tmp'],
  '/home': ['user'],
  '/home/user': ['Documents', 'Downloads', 'scripts', '.bashrc', 'notes.txt'],
  '/home/user/Documents': ['report.pdf', 'passwords.txt', 'network_diagram.png'],
  '/home/user/scripts': ['scan.sh', 'backup.sh', 'monitor.py'],
};

export default function TerminalChallenge({
  title,
  objective,
  hint,
  successCommand,
  successMessage,
  onComplete,
}: TerminalChallengeProps) {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: '',
      output: [
        '╔══════════════════════════════════════════════════════════════╗',
        '║  CyberLearn Interactive Terminal v1.0                        ║',
        '║  Type "help" for available commands                          ║',
        '╚══════════════════════════════════════════════════════════════╝',
        '',
      ],
    },
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDir, setCurrentDir] = useState('/home/user');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const getPrompt = () => `┌──(user㉿cyberlearn)-[~${currentDir.replace('/home/user', '')}]\n└─$ `;

  const processCommand = (cmd: string): CommandOutput => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    // Check for success condition
    if (trimmedCmd.includes(successCommand.toLowerCase())) {
      setIsCompleted(true);
      onComplete?.();
      return {
        command: cmd,
        output: [successMessage, '', '✓ Challenge completed!'],
        isSuccess: true,
      };
    }

    switch (command) {
      case 'help':
        return {
          command: cmd,
          output: [
            'Available commands:',
            '  help              - Show this help message',
            '  ping <host>       - Ping a host (e.g., ping google.com)',
            '  nslookup <host>   - DNS lookup for a host',
            '  netstat           - Show network connections',
            '  ifconfig          - Show network interfaces',
            '  ls [dir]          - List directory contents',
            '  cd <dir>          - Change directory',
            '  pwd               - Print working directory',
            '  cat <file>        - Display file contents',
            '  whoami            - Display current user',
            '  clear             - Clear the terminal',
            '',
          ],
        };

      case 'ping':
        if (args.length === 0) {
          return { command: cmd, output: ['Usage: ping <hostname>'], isError: true };
        }
        const host = args[0];
        return {
          command: cmd,
          output: [
            `PING ${host} (${host === 'google.com' ? '142.250.80.46' : '93.184.216.34'}) 56(84) bytes of data.`,
            `64 bytes from ${host}: icmp_seq=1 ttl=117 time=14.2 ms`,
            `64 bytes from ${host}: icmp_seq=2 ttl=117 time=13.8 ms`,
            `64 bytes from ${host}: icmp_seq=3 ttl=117 time=14.1 ms`,
            '',
            `--- ${host} ping statistics ---`,
            '3 packets transmitted, 3 received, 0% packet loss, time 2003ms',
            'rtt min/avg/max/mdev = 13.8/14.0/14.2/0.2 ms',
            '',
          ],
        };

      case 'nslookup':
        if (args.length === 0) {
          return { command: cmd, output: ['Usage: nslookup <hostname>'], isError: true };
        }
        return {
          command: cmd,
          output: [
            'Server:    8.8.8.8',
            'Address:   8.8.8.8#53',
            '',
            `Non-authoritative answer:`,
            `Name:    ${args[0]}`,
            `Address: ${args[0] === 'google.com' ? '142.250.80.46' : '93.184.216.34'}`,
            '',
          ],
        };

      case 'netstat':
        return {
          command: cmd,
          output: [
            'Active Internet connections (w/o servers)',
            'Proto Recv-Q Send-Q Local Address           Foreign Address         State',
            'tcp        0      0 192.168.1.100:22        192.168.1.1:52431       ESTABLISHED',
            'tcp        0      0 192.168.1.100:443       142.250.80.46:https     ESTABLISHED',
            'tcp        0      0 192.168.1.100:80        93.184.216.34:http      TIME_WAIT',
            'udp        0      0 192.168.1.100:68        192.168.1.1:67          ESTABLISHED',
            '',
          ],
        };

      case 'ifconfig':
        return {
          command: cmd,
          output: [
            'eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500',
            '        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255',
            '        inet6 fe80::1  prefixlen 64  scopeid 0x20<link>',
            '        ether 00:1a:2b:3c:4d:5e  txqueuelen 1000  (Ethernet)',
            '        RX packets 1234567  bytes 1876543210 (1.7 GB)',
            '        TX packets 987654  bytes 123456789 (117.7 MB)',
            '',
            'lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536',
            '        inet 127.0.0.1  netmask 255.0.0.0',
            '        loop  txqueuelen 1000  (Local Loopback)',
            '',
          ],
        };

      case 'ls':
        const targetDir = args[0] ? (args[0].startsWith('/') ? args[0] : `${currentDir}/${args[0]}`) : currentDir;
        const contents = MOCK_FILESYSTEM[targetDir as keyof typeof MOCK_FILESYSTEM];
        if (!contents) {
          return { command: cmd, output: [`ls: cannot access '${args[0]}': No such file or directory`], isError: true };
        }
        return {
          command: cmd,
          output: [contents.join('  '), ''],
        };

      case 'cd':
        if (args.length === 0 || args[0] === '~') {
          setCurrentDir('/home/user');
          return { command: cmd, output: [] };
        }
        if (args[0] === '..') {
          const parent = currentDir.split('/').slice(0, -1).join('/') || '/';
          setCurrentDir(parent);
          return { command: cmd, output: [] };
        }
        const newDir = args[0].startsWith('/') ? args[0] : `${currentDir}/${args[0]}`;
        if (MOCK_FILESYSTEM[newDir as keyof typeof MOCK_FILESYSTEM]) {
          setCurrentDir(newDir);
          return { command: cmd, output: [] };
        }
        return { command: cmd, output: [`cd: ${args[0]}: No such file or directory`], isError: true };

      case 'pwd':
        return { command: cmd, output: [currentDir, ''] };

      case 'whoami':
        return { command: cmd, output: ['user', ''] };

      case 'cat':
        if (args.length === 0) {
          return { command: cmd, output: ['Usage: cat <filename>'], isError: true };
        }
        if (args[0] === 'notes.txt') {
          return {
            command: cmd,
            output: [
              '# Network Security Notes',
              '- Always use encrypted protocols (HTTPS, SSH)',
              '- Monitor network traffic with netstat',
              '- Regular ping tests verify connectivity',
              '',
            ],
          };
        }
        if (args[0] === 'passwords.txt') {
          return {
            command: cmd,
            output: [
              '⚠️  WARNING: Never store passwords in plain text!',
              'This is a security vulnerability.',
              '',
            ],
            isError: true,
          };
        }
        return { command: cmd, output: [`cat: ${args[0]}: No such file or directory`], isError: true };

      case 'clear':
        setHistory([]);
        return { command: cmd, output: [] };

      case '':
        return { command: cmd, output: [] };

      default:
        return {
          command: cmd,
          output: [`Command not found: ${command}. Type 'help' for available commands.`],
          isError: true,
        };
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCommand.trim()) return;

    const output = processCommand(currentCommand);
    
    if (currentCommand.toLowerCase() !== 'clear') {
      setHistory((prev) => [...prev, output]);
    }
    
    setCommandHistory((prev) => [...prev, currentCommand]);
    setHistoryIndex(-1);
    setCurrentCommand('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  return (
    <div className="mt-8 rounded-xl overflow-hidden border border-cyber-green/30 bg-cyber-bg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-cyber-green/20 to-cyber-cyan/20 border-b border-cyber-green/30">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-cyber-green" />
          <span className="font-mono text-sm font-semibold text-white">{title}</span>
          {isCompleted && (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyber-green/20 text-cyber-green text-xs">
              <CheckCircle2 size={12} />
              Completed
            </span>
          )}
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
      </div>

      {/* Objective */}
      <div className="px-4 py-3 bg-cyber-bg-card border-b border-[#2a2a35]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-cyber-cyan/10 flex items-center justify-center flex-shrink-0">
            <span className="text-cyber-cyan text-lg">🎯</span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">Objective</p>
            <p className="text-sm text-zinc-400">{objective}</p>
          </div>
          {hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="ml-auto flex items-center gap-1 px-2 py-1 rounded text-xs text-yellow-400 hover:bg-yellow-400/10 transition-colors"
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

      {/* Terminal */}
      <div
        ref={terminalRef}
        className="h-72 overflow-y-auto p-4 font-mono text-sm cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((entry, i) => (
          <div key={i} className="mb-2">
            {entry.command && (
              <div className="text-cyber-green whitespace-pre">{getPrompt()}<span className="text-white">{entry.command}</span></div>
            )}
            {entry.output.map((line, j) => (
              <div
                key={j}
                className={`whitespace-pre ${
                  entry.isError ? 'text-red-400' : entry.isSuccess ? 'text-cyber-green' : 'text-zinc-300'
                }`}
              >
                {line}
              </div>
            ))}
          </div>
        ))}
        
        {/* Current input line */}
        <form onSubmit={handleSubmit} className="flex">
          <span className="text-cyber-green whitespace-pre">{getPrompt()}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-white outline-none caret-cyber-green"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>

      {/* Status bar */}
      <div className="px-4 py-2 bg-cyber-bg-card border-t border-[#2a2a35] flex items-center justify-between text-xs text-zinc-500">
        <span>Press ↑↓ for command history</span>
        <span className="flex items-center gap-2">
          {isCompleted ? (
            <CheckCircle2 size={14} className="text-cyber-green" />
          ) : (
            <XCircle size={14} className="text-zinc-500" />
          )}
          {isCompleted ? 'Challenge Complete' : 'In Progress'}
        </span>
      </div>
    </div>
  );
}


