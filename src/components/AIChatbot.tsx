import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Clock } from 'lucide-react';
import { Button } from './ui/Button';

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hi! I am the FNF Super Shop Assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ai_chat_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  useEffect(() => {
    const handleTrigger = (e: Event) => {
      const customEvent = e as CustomEvent;
      const query = customEvent.detail?.query;
      if (query) {
        setIsOpen(true);
        // Automatically send the message
        sendMessage(query);
      }
    };
    
    window.addEventListener('trigger-ai-chat', handleTrigger);
    return () => window.removeEventListener('trigger-ai-chat', handleTrigger);
  }, []);

  const saveHistory = (query: string) => {
    const newHistory = [query, ...history.filter(h => h !== query)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem('ai_chat_history', JSON.stringify(newHistory));
  };

  const sendMessage = async (userMessage: string) => {
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    saveHistory(userMessage);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      
      const data = await response.json();
      
      if (data.reply) {
        setMessages(prev => [...prev, { role: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, I am having trouble connecting.' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: 'Sorry, an error occurred.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setInput('');
    await sendMessage(userMessage);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-[#FF6321] text-white rounded-full shadow-lg flex items-center justify-center hover:bg-[#e85a1e] transition-transform z-50 ${isOpen ? 'scale-0' : 'scale-100 hover:scale-110'}`}
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[350px] h-[550px] max-h-[85vh] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col z-50 border border-gray-200 overflow-hidden transform transition-all duration-300 origin-bottom-right">
          {/* Header */}
          <div className="bg-[#111827] text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#FF6321] flex items-center justify-center">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm">FNF Assistant</h3>
                <p className="text-[10px] text-green-400 font-semibold">• Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-[#FF6321] text-white self-end rounded-tr-sm' : 'bg-white border border-gray-200 text-gray-800 self-start rounded-tl-sm'}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="bg-white border border-gray-200 text-gray-500 self-start p-3 rounded-2xl rounded-tl-sm text-sm flex gap-1">
                <span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* History & Input */}
          <div className="bg-white border-t border-gray-100 flex flex-col">
            {history.length > 0 && (
              <div className="pt-3 px-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Recent Queries
                  </span>
                  <button 
                    onClick={() => { setHistory([]); localStorage.removeItem('ai_chat_history'); }} 
                    className="text-[10px] text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {history.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => !isLoading && sendMessage(item)}
                      disabled={isLoading}
                      className="text-[11px] whitespace-nowrap bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-full transition-colors flex-shrink-0 max-w-[200px] truncate"
                      title={item}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}
            <form onSubmit={handleSend} className="p-3 flex gap-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:border-[#FF6321] text-sm"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 flex-shrink-0 bg-[#FF6321] text-white rounded-full flex items-center justify-center hover:bg-[#e85a1e] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
