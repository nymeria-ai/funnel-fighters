'use client';
import { useState, useRef, useEffect } from 'react';

interface RightPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
  context?: Record<string, unknown>;
}

interface ChatMessage {
  role: 'user' | 'ai';
  text: string;
}

export default function RightPanel({ isOpen, onClose, title, children, context }: RightPanelProps) {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'ai', text: 'I can help you analyze this data. Ask me anything about the selected element.' },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    const trimmed = chatInput.trim();
    if (!trimmed || isLoading) return;

    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', text: trimmed }]);
    setIsLoading(true);

    // Add placeholder AI message for streaming
    const aiIndex = messages.length + 1; // +1 for the user message we just added
    setMessages(prev => [...prev, { role: 'ai', text: '' }]);

    try {
      abortRef.current = new AbortController();
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, context }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Request failed' }));
        setMessages(prev => {
          const updated = [...prev];
          updated[aiIndex] = { role: 'ai', text: err.error || 'Something went wrong. Please try again.' };
          return updated;
        });
        setIsLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response stream');

      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        const text = accumulated;
        setMessages(prev => {
          const updated = [...prev];
          updated[aiIndex] = { role: 'ai', text };
          return updated;
        });
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setMessages(prev => {
        const updated = [...prev];
        updated[aiIndex] = { role: 'ai', text: 'Something went wrong. Please try again.' };
        return updated;
      });
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  };

  return (
    <>
    {/* Mobile overlay */}
    {isOpen && (
      <div
        className="lg:hidden fixed inset-0 bg-black/60 z-40"
        onClick={onClose}
      />
    )}
    <div
      style={{ backgroundColor: 'var(--bg-secondary, #131316)' }}
      className={`fixed right-0 top-0 h-screen w-full sm:w-[380px] lg:w-[420px] border-l border-bg-border z-50 transform transition-transform duration-300 ease-out flex flex-col ${
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
                className={`max-w-[85%] px-3 py-2 rounded-lg text-sm whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'bg-accent-blue text-white'
                    : 'bg-bg-card text-text-secondary'
                }`}
              >
                {msg.text || (isLoading && i === messages.length - 1 ? (
                  <span className="inline-flex gap-1">
                    <span className="animate-pulse">●</span>
                    <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>●</span>
                    <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>●</span>
                  </span>
                ) : msg.text)}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-3 border-t border-bg-border flex gap-2">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about this data..."
            disabled={isLoading}
            className="flex-1 bg-bg-card border border-bg-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none focus:border-accent-blue disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="px-3 py-2 bg-accent-blue text-white rounded-lg text-sm hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
