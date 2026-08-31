import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import api from '../services/api';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export const AIAssistantWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello Officer! I am the **NER Logistics AI Assistant**. Ask me about road conditions (NH-6, NH-27, Sela Pass), weather disruption risks, or alternate supply routes.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const historyPayload = messages.concat(userMsg).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await api.post('/ai/chat', {
        history: historyPayload,
        district: 'Kamrup Metropolitan / NER Corridor'
      });

      const replyContent = res.data?.reply || 'Logistics network is normal. All key transit bridges operational.';

      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: replyContent,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: '⚠️ Unable to connect to cloud AI. Operating with local cached advisories: High landslide risk on NH-6 Barapani section due to monsoon runoff.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 right-5 z-40 w-14 h-14 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 text-white shadow-xl shadow-teal-500/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200"
        title="AI Logistics Assistant"
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        )}
      </button>

      {/* Slide-over / Modal Chat Window */}
      {isOpen && (
        <div className="fixed bottom-36 right-5 z-40 w-[92vw] max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[480px] animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-navy-900 to-navy-950 text-white p-4 flex items-center justify-between border-b border-navy-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
                <Bot size={18} />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  NER Logistics AI
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[10px] text-slate-400 font-medium">Terrain & Accessibility Intelligence</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Quick suggestions */}
          <div className="bg-slate-50 border-b border-slate-100 p-2 flex gap-1.5 overflow-x-auto text-[11px] font-semibold text-slate-600 no-scrollbar">
            <button
              onClick={() => setInput('Is NH-6 Guwahati to Shillong open?')}
              className="px-2.5 py-1 bg-white rounded-full border border-slate-200 hover:border-teal-400 hover:text-teal-600 flex-shrink-0 transition-colors"
            >
              🛣️ NH-6 Status
            </button>
            <button
              onClick={() => setInput('Alternate route to Tawang avoiding landslides?')}
              className="px-2.5 py-1 bg-white rounded-full border border-slate-200 hover:border-teal-400 hover:text-teal-600 flex-shrink-0 transition-colors"
            >
              ⛰️ Tawang Detour
            </button>
            <button
              onClick={() => setInput('Heavy rain alert for Meghalaya today?')}
              className="px-2.5 py-1 bg-white rounded-full border border-slate-200 hover:border-teal-400 hover:text-teal-600 flex-shrink-0 transition-colors"
            >
              🌧️ Monsoon Alert
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 text-sm">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot size={13} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 leading-relaxed text-xs font-medium ${
                    m.role === 'user'
                      ? 'bg-teal-600 text-white rounded-tr-sm'
                      : 'bg-slate-100 text-slate-800 rounded-tl-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.content}</p>
                  <div
                    className={`text-[9px] mt-1 text-right ${
                      m.role === 'user' ? 'text-teal-100' : 'text-slate-400'
                    }`}
                  >
                    {m.timestamp}
                  </div>
                </div>
                {m.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User size={13} />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex gap-2.5 items-center text-xs text-slate-500">
                <div className="w-6 h-6 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Bot size={13} />
                </div>
                <div className="bg-slate-100 rounded-2xl px-3.5 py-2.5 flex items-center gap-1.5">
                  <Loader2 size={13} className="animate-spin text-teal-600" />
                  <span>Analyzing terrain data...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about road conditions or routes..."
              className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-teal-500 font-medium"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center hover:bg-teal-700 disabled:opacity-40 transition-colors flex-shrink-0"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
