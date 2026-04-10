'use client';
import { useState } from 'react';

interface RightPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

export default function RightPanel({ isOpen, onClose, title, children }: RightPanelProps) {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: 'I can help you analyze this data. Ask me anything about the selected element.' },
  ]);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: chatInput }]);
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: `Analyzing "${chatInput}"... This feature will connect to an AI agent for real-time analysis. Stay tuned! 🦆` }]);
    }, 500);
    setChatInput('');
  };

  return (
    <div
      className={`fixed right-0 top-0 h-screen w-[420px] bg-bg-secondary border-l border-bg-border z-50 transform transition-transform duration-300 ease-out flex flex-col ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-bg-border">
        <h2 className="text-sm font-semibold text-text-primary truncate">{title}</h2>
        <button
          onClick={onClose}
          className="text-text-muted hover:text-text-primary transition-colors text-lg leading-none"
        >
          ✕
        </button>
      </div>

      {/* Detail Content */}
      <div className="flex-1 overflow-y-auto p-4 border-b border-bg-border">
        {children || (
          <div className="text-text-muted text-sm">Select an element to see details.</div>
        )}
      </div>

      {/* AI Chat */}
      <div className="h-[280px] flex flex-col">
        <div className="px-4 py-2 border-b border-bg-border">
          <span className="text-xs font-medium text-accent-blue">🤖 AI Assistant</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] px-3 py-2 rounded-lg text-sm ${
                  msg.role === 'user'
                    ? 'bg-accent-blue text-white'
                    : 'bg-bg-card text-text-secondary'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="p-3 border-t border-bg-border flex gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about this data..."
            className="flex-1 bg-bg-card border border-bg-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none focus:border-accent-blue"
          />
          <button
            onClick={handleSend}
            className="px-3 py-2 bg-accent-blue text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
