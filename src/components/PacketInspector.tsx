'use client';

import React, { useState } from 'react';
import { Layers, CheckCircle2, XCircle, RotateCcw, Lightbulb, Zap, Network, Globe, Server, MonitorSmartphone } from 'lucide-react';

interface LayerInfo {
  id: string;
  name: string;
  shortName: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ReactNode;
  description: string;
  examples: string[];
  position: number;
}

const TCP_IP_LAYERS: LayerInfo[] = [
  {
    id: 'application',
    name: 'Application Layer',
    shortName: 'Application',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/20',
    borderColor: 'border-purple-500/50',
    icon: <MonitorSmartphone size={20} />,
    description: 'Where users interact with network applications. Handles high-level protocols like HTTP, FTP, SMTP, and DNS.',
    examples: ['HTTP/HTTPS (Web)', 'SMTP (Email)', 'FTP (Files)', 'DNS (Names)', 'SSH (Secure Shell)'],
    position: 0,
  },
  {
    id: 'transport',
    name: 'Transport Layer',
    shortName: 'Transport',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/20',
    borderColor: 'border-blue-500/50',
    icon: <Zap size={20} />,
    description: 'Ensures reliable data transfer between hosts. Handles segmentation, flow control, and error recovery.',
    examples: ['TCP (Reliable)', 'UDP (Fast)', 'Port Numbers', 'Checksums', 'Sequencing'],
    position: 1,
  },
  {
    id: 'internet',
    name: 'Internet Layer',
    shortName: 'Internet',
    color: 'text-green-400',
    bgColor: 'bg-green-500/20',
    borderColor: 'border-green-500/50',
    icon: <Globe size={20} />,
    description: 'Routes packets across networks using IP addresses. Handles logical addressing and path determination.',
    examples: ['IPv4/IPv6', 'IP Addresses', 'Routing', 'ICMP (Ping)', 'Fragmentation'],
    position: 2,
  },
  {
    id: 'network',
    name: 'Network Access Layer',
    shortName: 'Network Access',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/20',
    borderColor: 'border-orange-500/50',
    icon: <Network size={20} />,
    description: 'Physical transmission of data over the network medium. Handles hardware addressing and frame creation.',
    examples: ['Ethernet', 'MAC Addresses', 'WiFi (802.11)', 'Frames', 'Physical Cables'],
    position: 3,
  },
];

interface PacketInspectorProps {
  onComplete?: () => void;
}

type ChallengeMode = 'learn' | 'build' | 'identify';

interface DragItem {
  id: string;
  name: string;
}

const PACKET_DATA_ITEMS: DragItem[] = [
  { id: 'app-http', name: 'HTTP Request' },
  { id: 'app-data', name: 'Application Data' },
  { id: 'trans-tcp', name: 'TCP Header' },
  { id: 'trans-port', name: 'Port: 443' },
  { id: 'net-ip', name: 'IP Header' },
  { id: 'net-src', name: 'Src: 192.168.1.100' },
  { id: 'net-dst', name: 'Dst: 142.250.80.46' },
  { id: 'link-eth', name: 'Ethernet Frame' },
  { id: 'link-mac', name: 'MAC Address' },
];

const CORRECT_PLACEMENTS: Record<string, string> = {
  'app-http': 'application',
  'app-data': 'application',
  'trans-tcp': 'transport',
  'trans-port': 'transport',
  'net-ip': 'internet',
  'net-src': 'internet',
  'net-dst': 'internet',
  'link-eth': 'network',
  'link-mac': 'network',
};

export default function PacketInspector({ onComplete }: PacketInspectorProps) {
  const [mode, setMode] = useState<ChallengeMode>('learn');
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null);
  const [placements, setPlacements] = useState<Record<string, string[]>>({
    application: [],
    transport: [],
    internet: [],
    network: [],
  });
  const [availableItems, setAvailableItems] = useState<DragItem[]>([...PACKET_DATA_ITEMS]);
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const handleLayerClick = (layerId: string) => {
    if (mode === 'learn') {
      setSelectedLayer(selectedLayer === layerId ? null : layerId);
    }
  };

  const handleDragStart = (item: DragItem) => {
    setDraggedItem(item);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleDrop = (layerId: string) => {
    if (draggedItem && mode === 'build') {
      setPlacements(prev => ({
        ...prev,
        [layerId]: [...prev[layerId], draggedItem.id],
      }));
      setAvailableItems(prev => prev.filter(item => item.id !== draggedItem.id));
      setDraggedItem(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSubmit = () => {
    let correct = 0;
    Object.entries(placements).forEach(([layerId, items]) => {
      items.forEach(itemId => {
        if (CORRECT_PLACEMENTS[itemId] === layerId) {
          correct++;
        }
      });
    });
    setScore(correct);
    setShowResults(true);
    if (correct === PACKET_DATA_ITEMS.length) {
      onComplete?.();
    }
  };

  const handleReset = () => {
    setPlacements({
      application: [],
      transport: [],
      internet: [],
      network: [],
    });
    setAvailableItems([...PACKET_DATA_ITEMS]);
    setShowResults(false);
    setScore(0);
  };

  const handleModeChange = (newMode: ChallengeMode) => {
    setMode(newMode);
    setSelectedLayer(null);
    if (newMode === 'build') {
      handleReset();
    }
  };

  const selectedLayerInfo = TCP_IP_LAYERS.find(l => l.id === selectedLayer);

  return (
    <div className="mt-8 rounded-xl overflow-hidden border border-cyan-500/30 bg-cyber-bg">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-cyan-500/30">
        <div className="flex items-center gap-3">
          <Layers className="w-5 h-5 text-cyan-400" />
          <span className="font-mono text-sm font-semibold text-white">TCP/IP Packet Inspector</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
            title="Reset"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="px-4 py-3 bg-cyber-bg-card border-b border-[#2a2a35]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-zinc-400 mr-2">Mode:</span>
          {[
            { id: 'learn', label: 'Learn Layers', icon: <Lightbulb size={14} /> },
            { id: 'build', label: 'Build a Packet', icon: <Server size={14} /> },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => handleModeChange(m.id as ChallengeMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                mode === m.id
                  ? 'bg-cyan-500/20 text-cyan-400 ring-1 ring-cyan-500/50'
                  : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
              }`}
            >
              {m.icon}
              {m.label}
            </button>
          ))}
          {mode === 'build' && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="ml-auto flex items-center gap-1 px-2 py-1 rounded text-xs text-yellow-400 hover:bg-yellow-400/10 transition-colors"
            >
              <Lightbulb size={14} />
              Hint
            </button>
          )}
        </div>
        {showHint && mode === 'build' && (
          <div className="mt-3 p-3 rounded-lg bg-yellow-400/10 border border-yellow-400/20">
            <p className="text-sm text-yellow-300">
              Think about what each layer handles: Application (user protocols like HTTP), 
              Transport (ports, TCP/UDP), Internet (IP addresses), Network Access (hardware like Ethernet/MAC).
            </p>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="p-4">
        {mode === 'learn' && (
          <div className="space-y-3">
            <p className="text-sm text-zinc-400 mb-4">
              Click on each layer to learn about its role in the TCP/IP model. Data flows down through layers when sending, and up when receiving.
            </p>
            
            {/* Layers Stack */}
            <div className="space-y-2">
              {TCP_IP_LAYERS.map((layer, index) => (
                <div key={layer.id}>
                  <button
                    onClick={() => handleLayerClick(layer.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${layer.borderColor} ${layer.bgColor} ${
                      selectedLayer === layer.id ? 'ring-2 ring-offset-2 ring-offset-cyber-bg' : ''
                    }`}
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${layer.bgColor} flex items-center justify-center ${layer.color}`}>
                        {layer.icon}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${layer.color}`}>{layer.name}</span>
                          <span className="text-xs text-zinc-500">Layer {4 - index}</span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-0.5">{layer.examples.slice(0, 3).join(' • ')}</p>
                      </div>
                      <div className={`text-2xl font-bold ${layer.color} opacity-30`}>
                        {4 - index}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Info */}
                  {selectedLayer === layer.id && (
                    <div className={`mt-2 p-4 rounded-lg ${layer.bgColor} border ${layer.borderColor} animate-fade-in`}>
                      <p className="text-sm text-zinc-300 mb-3">{layer.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {layer.examples.map(ex => (
                          <span
                            key={ex}
                            className={`px-2 py-1 rounded text-xs ${layer.bgColor} ${layer.color} border ${layer.borderColor}`}
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Arrow between layers */}
                  {index < TCP_IP_LAYERS.length - 1 && (
                    <div className="flex justify-center py-1">
                      <div className="flex flex-col items-center text-zinc-600">
                        <span className="text-xs">↓ Encapsulation</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {mode === 'build' && (
          <div className="space-y-4">
            <p className="text-sm text-zinc-400">
              Drag each packet component to its correct layer. Build a complete packet from Application to Network Access!
            </p>

            {/* Available Items */}
            {!showResults && availableItems.length > 0 && (
              <div className="p-4 rounded-lg bg-zinc-900 border border-zinc-800">
                <p className="text-xs text-zinc-500 mb-2">Available Components (drag to layers below):</p>
                <div className="flex flex-wrap gap-2">
                  {availableItems.map(item => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={() => handleDragStart(item)}
                      onDragEnd={handleDragEnd}
                      className={`px-3 py-2 rounded-lg bg-cyber-bg-card border border-zinc-700 text-sm text-zinc-300 cursor-grab active:cursor-grabbing hover:border-cyan-500/50 hover:text-cyan-400 transition-all ${
                        draggedItem?.id === item.id ? 'opacity-50 scale-95' : ''
                      }`}
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Drop Zones */}
            <div className="space-y-2">
              {TCP_IP_LAYERS.map(layer => {
                const layerItems = placements[layer.id];
                const hasItems = layerItems.length > 0;

                return (
                  <div
                    key={layer.id}
                    onDrop={() => handleDrop(layer.id)}
                    onDragOver={handleDragOver}
                    className={`p-4 rounded-lg border-2 border-dashed transition-all ${
                      draggedItem 
                        ? `${layer.borderColor} ${layer.bgColor}` 
                        : 'border-zinc-700 bg-zinc-900/50'
                    } ${hasItems ? layer.bgColor : ''}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`${layer.color}`}>{layer.icon}</div>
                      <span className={`text-sm font-medium ${layer.color}`}>{layer.shortName}</span>
                    </div>
                    
                    {hasItems ? (
                      <div className="flex flex-wrap gap-2">
                        {layerItems.map(itemId => {
                          const item = PACKET_DATA_ITEMS.find(i => i.id === itemId);
                          const isCorrect = showResults && CORRECT_PLACEMENTS[itemId] === layer.id;
                          const isWrong = showResults && CORRECT_PLACEMENTS[itemId] !== layer.id;
                          
                          return (
                            <div
                              key={itemId}
                              className={`px-2 py-1 rounded text-sm flex items-center gap-1 ${
                                isCorrect 
                                  ? 'bg-green-500/20 text-green-400 border border-green-500/50' 
                                  : isWrong 
                                  ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                                  : `${layer.bgColor} ${layer.color} border ${layer.borderColor}`
                              }`}
                            >
                              {item?.name}
                              {isCorrect && <CheckCircle2 size={14} />}
                              {isWrong && <XCircle size={14} />}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-xs text-zinc-500">Drop components here...</p>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Results */}
            {showResults && (
              <div className={`p-4 rounded-lg border ${
                score === PACKET_DATA_ITEMS.length 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-yellow-500/10 border-yellow-500/30'
              }`}>
                <div className="flex items-center gap-3">
                  {score === PACKET_DATA_ITEMS.length ? (
                    <>
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                      <div>
                        <p className="font-medium text-green-400">Perfect! All components correctly placed.</p>
                        <p className="text-sm text-zinc-400">You understand how packets are structured across layers!</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-6 h-6 text-yellow-400" />
                      <div>
                        <p className="font-medium text-yellow-400">{score} of {PACKET_DATA_ITEMS.length} correct</p>
                        <p className="text-sm text-zinc-400">Some components are in the wrong layer. Try again!</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Bar */}
      {mode === 'build' && (
        <div className="px-4 py-3 bg-cyber-bg-card border-t border-[#2a2a35] flex items-center justify-between">
          <div className="text-sm text-zinc-500">
            {availableItems.length === 0 
              ? 'All components placed!' 
              : `${availableItems.length} components remaining`}
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleSubmit}
              disabled={availableItems.length > 0}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                availableItems.length > 0
                  ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:opacity-90'
              }`}
            >
              Check Answers
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

