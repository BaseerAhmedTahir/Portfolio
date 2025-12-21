
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot as BotIcon, Sparkles, RefreshCw, ChevronDown } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateResponse } from '../services/geminiService';

const SUGGESTED_QUESTIONS = [
  "What projects use React?",
  "What did he do at Eventus?",
  "Does he know Python?",
  "Is he available for hire?"
];

const Bot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello. I am Baseer's virtual assistant. Ask me anything about his engineering capabilities, specific skills, or project details.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const simulateTyping = (fullText: string, messageId: string) => {
    setIsTyping(true);
    let currentText = '';
    const speed = 15; // Slightly slower for realism

    setMessages(prev => [...prev, {
      id: messageId,
      role: 'model',
      text: '',
      timestamp: new Date()
    }]);

    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        currentText += fullText.charAt(i);
        setMessages(prev => prev.map(msg => 
          msg.id === messageId ? { ...msg, text: currentText } : msg
        ));
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, speed);
  };

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading || isTyping) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Pass history if needed, though local bot might mostly use just the new message
      const history = messages.map(m => ({ role: m.role, text: m.text }));
      const responseText = await generateResponse(history, userMessage.text);

      setIsLoading(false);
      simulateTyping(responseText, (Date.now() + 1).toString());

    } catch (error) {
      console.error("Chat error", error);
      setIsLoading(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "System overload. Please try asking differently.",
        timestamp: new Date()
      }]);
    }
  };

  const clearChat = () => {
      setMessages([{
        id: 'welcome',
        role: 'model',
        text: "Memory reset. How can I assist you?",
        timestamp: new Date()
      }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[99] flex flex-col items-end font-sans">
      
      {/* Chat Window */}
      <div 
        className={`
          transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform origin-bottom-right
          ${isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-90 opacity-0 translate-y-10 pointer-events-none absolute bottom-0 right-0'}
          bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-xl border border-white/20 dark:border-white/10 
          w-[90vw] sm:w-[380px] h-[600px] max-h-[75vh] rounded-[2rem] shadow-2xl shadow-indigo-500/20 
          flex flex-col overflow-hidden ring-1 ring-black/5 dark:ring-white/5
        `}
      >
          {/* Header */}
          <div className="px-6 py-4 flex justify-between items-center bg-white/50 dark:bg-white/5 backdrop-blur-md border-b border-slate-100 dark:border-white/5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-black shadow-lg">
                    <BotIcon size={20} strokeWidth={1.5} />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-[3px] border-white dark:border-[#0f172a] rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">BaseerAI</h3>
                <div className="flex items-center gap-1">
                  <Sparkles size={10} className="text-primary" />
                  <p className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">Portfolio Assistant</p>
                </div>
              </div>
            </div>
            <div className="flex gap-1">
                <button onClick={clearChat} className="p-2 text-slate-400 hover:text-primary dark:hover:text-white transition-colors hover:bg-slate-100 dark:hover:bg-white/5 rounded-full" title="Reset">
                    <RefreshCw size={14} />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-primary dark:hover:text-white transition-colors hover:bg-slate-100 dark:hover:bg-white/5 rounded-full">
                    <ChevronDown size={18} />
                </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide bg-gradient-to-b from-transparent to-slate-50/50 dark:to-black/20">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} animate-fade-in-up`}>
                
                {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-tr from-indigo-500 to-violet-600 text-white text-[10px] shadow-md border border-white/10 mt-1">
                     <Sparkles size={14} />
                  </div>
                )}

                <div 
                  className={`max-w-[80%] px-5 py-3.5 text-sm leading-relaxed shadow-sm whitespace-pre-line ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-slate-800 to-slate-900 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 rounded-2xl rounded-tr-sm' 
                      : 'bg-white dark:bg-[#1e293b] text-slate-600 dark:text-slate-200 rounded-2xl rounded-tl-sm border border-slate-100 dark:border-white/5 shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3 animate-pulse">
                 <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-tr from-indigo-500 to-violet-600 text-white text-[10px] mt-1 opacity-70">
                    <Sparkles size={14} />
                 </div>
                 <div className="bg-white dark:bg-[#1e293b] px-4 py-3 rounded-2xl rounded-tl-sm border border-slate-100 dark:border-white/5 shadow-sm">
                  <div className="flex space-x-1.5 items-center h-full">
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-xl border-t border-slate-100 dark:border-white/5 relative z-10">
            {/* Suggestions */}
            {messages.length < 3 && !isLoading && !isTyping && (
              <div className="absolute bottom-full left-0 right-0 p-4 pb-2 bg-gradient-to-t from-white dark:from-[#0f172a] to-transparent">
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
                  {SUGGESTED_QUESTIONS.map((q, i) => (
                      <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="whitespace-nowrap px-3 py-1.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary transition-colors flex-shrink-0 shadow-sm hover:shadow-md"
                      >
                      {q}
                      </button>
                  ))}
                  </div>
              </div>
            )}

            <div className="flex items-center gap-2 bg-slate-100/50 dark:bg-black/20 p-1.5 pl-4 rounded-[1.25rem] border border-slate-200 dark:border-white/10 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all shadow-inner">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask something..."
                className="flex-1 bg-transparent border-none text-slate-900 dark:text-white text-sm focus:outline-none placeholder-slate-400"
                disabled={isTyping}
                autoFocus
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isLoading || isTyping}
                className="p-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed transition-all shadow-md"
              >
                <Send size={14} className={input.trim() ? "translate-x-0.5" : ""} />
              </button>
            </div>
            
            <div className="text-center mt-2">
               <p className="text-[10px] text-slate-400 dark:text-slate-500">Automated Assistant. Responses are predefined.</p>
            </div>
          </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
            group relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-500 ease-elastic z-50
            ${isOpen ? 'bg-slate-200 dark:bg-white/10 text-slate-900 dark:text-white rotate-90 scale-90' : 'bg-slate-900 dark:bg-white text-white dark:text-black hover:scale-110 hover:shadow-indigo-500/30'}
        `}
      >
        {isOpen ? <X size={24} /> : (
            <>
                <BotIcon size={24} className="relative z-10" />
                <span className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></span>
            </>
        )}
        
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary border-[2px] border-white dark:border-black items-center justify-center">
              <span className="w-1 h-1 bg-white rounded-full"></span>
            </span>
          </span>
        )}
      </button>
    </div>
  );
};

export default Bot;
