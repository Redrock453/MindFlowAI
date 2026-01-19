
import React, { useState, useRef, useEffect } from 'react';
import { Note, Skill } from '../types';
import { getGeminiResponse, applySkill } from '../services/geminiService';
import { Send, Bot, User, Sparkles, Wand2, ListTodo, Brain, Loader2 } from 'lucide-react';

interface AssistantProps {
  notes: Note[];
  activeNote: Note | null;
  skills: Skill[];
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const Assistant: React.FC<AssistantProps> = ({ notes, activeNote, skills }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Привет! Я твой ассистент Второго Мозга. Чем я могу помочь сегодня? Я могу проанализировать твои заметки, составить резюме документов или помочь с генерацией новых идей.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    const response = await getGeminiResponse(userMsg, notes);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  const runSkill = async (skill: Skill) => {
    if (!activeNote || isTyping) return;

    setIsTyping(true);
    setMessages(prev => [...prev, { role: 'user', content: `Применяю навык: ${skill.name}` }]);
    
    const response = await applySkill(skill, activeNote);
    
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles size={14} />;
      case 'ListTodo': return <ListTodo size={14} />;
      case 'Wand2': return <Wand2 size={14} />;
      case 'Brain': return <Brain size={14} />;
      default: return <Sparkles size={14} />;
    }
  };

  return (
    <div className="w-80 h-full border-l border-slate-800 bg-slate-900 flex flex-col">
      <div className="p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-10 flex items-center gap-2">
        <div className="p-1.5 bg-indigo-600 rounded-md">
          <Bot size={16} className="text-white" />
        </div>
        <h2 className="text-sm font-bold text-slate-300">ИИ-Ассистент</h2>
      </div>

      <div className="p-4 border-b border-slate-800 bg-slate-900/50">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Навыки</p>
        <div className="grid grid-cols-2 gap-2">
          {skills.filter(s => s.active).map(skill => (
            <button
              key={skill.id}
              onClick={() => runSkill(skill)}
              disabled={!activeNote || isTyping}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed text-[11px] text-slate-300 font-medium px-2 py-1.5 rounded-lg border border-slate-700 transition-all text-left"
            >
              <span className="text-indigo-400">{getIcon(skill.icon)}</span>
              <span className="truncate">{skill.name}</span>
            </button>
          ))}
        </div>
        {!activeNote && (
          <p className="text-[9px] text-slate-600 mt-2 italic">Выберите заметку для навыков</p>
        )}
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((m, idx) => (
          <div key={idx} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
              m.role === 'user' ? 'bg-slate-700 text-slate-400' : 'bg-indigo-600 text-white'
            }`}>
              {m.role === 'user' ? <User size={12} /> : <Bot size={12} />}
            </div>
            <div className={`max-w-[85%] text-xs p-3 rounded-2xl ${
              m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}>
              <div className="prose prose-invert prose-xs leading-relaxed break-words">
                {m.content}
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0">
              <Bot size={12} />
            </div>
            <div className="bg-slate-800 p-3 rounded-2xl">
              <Loader2 size={16} className="text-indigo-400 animate-spin" />
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-800 bg-slate-900">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Спроси свой мозг..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 pl-4 pr-10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-indigo-500 hover:text-indigo-400 disabled:text-slate-600 transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Assistant;
