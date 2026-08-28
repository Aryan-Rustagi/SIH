import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Send, AlertCircle, Bot, User, Loader2, Siren, X, MessageCircle } from 'lucide-react';
import api from '../services/api';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  reasoning_details?: unknown;
}

interface Coords {
  lat: number | null;
  lng: number | null;
}

export const SafetyChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        "Hello! I'm your AI Safety Assistant. I can provide emergency guidance, first-aid instructions, and safety information tailored to your current location. How can I help you?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [coords, setCoords] = useState<Coords>({ lat: null, lng: null });
  const [locationError, setLocationError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch GPS on mount
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      () => {
        setLocationError('Location permission denied. Advice may be less accurate.');
      },
      { enableHighAccuracy: true }
    );
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const res = await api.post('/ai/chat', {
        message: text.trim(),
        lat: coords.lat,
        lng: coords.lng,
      });

      const reply = res.data.reply || 'I could not generate a response. Please try again.';
      
      const isFallbackError = reply === 'AI is temporarily offline. Please call 112 for emergencies.';

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: isFallbackError ? `🚨 **CRITICAL ALERT**\n\n${reply}` : reply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errMsg: Message = {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content:
          '⚠️ Unable to reach the AI server. Please check your connection or call **112** for emergencies.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleEmergencyHelp = () => {
    const locStr =
      coords.lat && coords.lng
        ? `${coords.lat.toFixed(5)}, ${coords.lng.toFixed(5)}`
        : 'unknown location';
    sendMessage(
      `I need emergency help. I am at coordinates ${locStr}. Please give me immediate instructions.`
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      {/* ── Toggle Button ── */}
      <button
        onClick={() => setIsOpen(true)}
        className={`chat-fab fixed bottom-6 right-6 z-[100] p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition-all duration-300 ${
          isOpen ? 'scale-0 opacity-0 pointer-events-none' : 'scale-100 opacity-100 hover:scale-110'
        }`}
        aria-label="Open AI Safety Assistant"
      >
        <MessageCircle className="w-8 h-8" />
        {/* Unread badge logic could be added here */}
      </button>

      {/* ── Chat Window ── */}
      <div 
        className={`chat-panel fixed bottom-6 right-6 z-[100] flex flex-col w-[380px] h-[600px] max-h-[85vh] max-w-[calc(100vw-3rem)] bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-0 opacity-0 pointer-events-none'
        }`}
      >
        {/* ── Header ── */}
        <div className="flex items-center gap-3 px-5 py-4 bg-white border-b border-gray-200">
        <div className="relative">
          <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
        </div>
        <div>
          <p className="text-gray-900 font-bold text-sm leading-tight">Safety Assistant</p>
          <p className="text-gray-600 text-xs">
            {coords.lat
              ? `Locked on: ${coords.lat.toFixed(4)}, ${coords.lng?.toFixed(4)}`
              : locationError || 'Acquiring GPS…'}
          </p>
        </div>
        {locationError ? (
          <AlertCircle className="w-4 h-4 text-yellow-500 ml-auto flex-shrink-0" />
        ) : (
          <div className="ml-auto" />
        )}
        <button
          onClick={() => setIsOpen(false)}
          className="ml-2 p-1.5 hover:bg-gray-50 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
          aria-label="Close Chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-700">
          {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                msg.role === 'user' ? 'bg-blue-600' : 'bg-gray-100 border border-gray-200'
              }`}
            >
              {msg.role === 'user' ? (
                <User className="w-4 h-4 text-white" />
              ) : (
                <Bot className="w-4 h-4 text-blue-400" />
              )}
            </div>
            {/* Bubble */}
            <div
              className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-blue-600 text-white rounded-tr-sm'
                  : 'bg-gray-50 text-gray-900 border border-gray-200 rounded-tl-sm'
              }`}
            >
                {msg.role === 'assistant' ? (
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>,
                      strong: ({ children }) => <strong className="text-gray-900 font-bold">{children}</strong>,
                      code: ({ children }) => (
                        <code className="bg-gray-100 rounded px-1 text-blue-700 text-xs">{children}</code>
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  msg.content
                )}
              <p
                className={`text-[10px] mt-1.5 ${
                  msg.role === 'user' ? 'text-indigo-300 text-right' : 'text-gray-500'
                }`}
              >
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-blue-400" />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1.5">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* ── Emergency Button ── */}
      <div className="px-4 pt-3 pb-1">
        <button
          onClick={handleEmergencyHelp}
          disabled={isTyping}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2.5 px-4 rounded-xl transition-all duration-200 text-sm uppercase tracking-wider border border-red-600 shadow-md"
        >
          <Siren className="w-4 h-4" />
          Emergency Help!
        </button>
      </div>

      {/* ── Input Bar ── */}
      <div className="flex items-end gap-2 px-4 py-3">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about safety, routes, first aid…"
          rows={1}
          disabled={isTyping}
          className="flex-1 bg-white border border-gray-300 focus:border-blue-500 text-gray-900 placeholder-gray-500 rounded-xl px-4 py-3 text-sm resize-none outline-none transition-colors duration-200 max-h-28 overflow-y-auto"
          style={{ lineHeight: '1.5' }}
        />
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isTyping}
          className="h-11 w-11 flex-shrink-0 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm"
        >
          {isTyping ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
    </>
  );
};
