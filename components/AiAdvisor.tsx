import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, User } from 'lucide-react';
import { getConsultationResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AiAdvisorProps {
  toolsContext: string;
}

const AiAdvisor: React.FC<AiAdvisorProps> = ({ toolsContext }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: 'Selamat datang. Ada yang bisa kami bantu carikan hari ini?',
      timestamp: Date.now()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await getConsultationResponse(userMsg.text, toolsContext);
      const modelMsg: ChatMessage = {
        role: 'model',
        text: responseText,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, modelMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Subtle Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 px-6 py-3 bg-neutral-900 text-white shadow-xl hover:bg-neutral-800 transition-all duration-300 flex items-center gap-3 group ${isOpen ? 'hidden' : 'flex'}`}
      >
        <span className="text-sm font-medium tracking-wide">Butuh Bantuan?</span>
        <MessageCircle className="w-5 h-5 text-emerald-400" />
      </button>

      {/* Chat Window - Clean Style */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 z-50 w-[90vw] md:w-[380px] h-[550px] bg-white shadow-2xl flex flex-col border border-neutral-200 animate-in slide-in-from-bottom-10 fade-in duration-300">
          {/* Header */}
          <div className="p-5 bg-white border-b border-neutral-100 flex justify-between items-center">
            <div>
              <h3 className="font-serif font-bold text-lg text-neutral-900">Konsultan</h3>
              <p className="text-xs text-neutral-500">Virtual Assistant aigpt.id</p>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-neutral-50 rounded-full transition-colors text-neutral-400 hover:text-neutral-900"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-neutral-50/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-4 text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-neutral-900 text-white'
                      : 'bg-white text-neutral-700 border border-neutral-100'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-[10px] text-neutral-400 mt-2 px-1">
                    {msg.role === 'user' ? 'Anda' : 'aigpt'}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start">
                 <div className="bg-white p-4 border border-neutral-100 shadow-sm">
                   <div className="flex gap-1">
                     <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce"></span>
                     <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce delay-75"></span>
                     <span className="w-1.5 h-1.5 bg-neutral-400 rounded-full animate-bounce delay-150"></span>
                   </div>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-neutral-100">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tulis pesan..."
                className="w-full pl-4 pr-12 py-3 bg-neutral-50 border border-neutral-200 text-sm focus:outline-none focus:border-neutral-400 focus:bg-white transition-all placeholder:text-neutral-400"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 text-neutral-900 hover:text-primary-600 disabled:opacity-30 transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default AiAdvisor;