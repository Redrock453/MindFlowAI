
import React from 'react';
import { CATEGORIES } from '../constants';
import { Category, Note } from '../types';
import { Plus, Search, Brain } from 'lucide-react';

interface SidebarProps {
  activeCategory: Category;
  setActiveCategory: (cat: Category) => void;
  notes: Note[];
  onNewNote: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeCategory, 
  setActiveCategory, 
  notes, 
  onNewNote,
  searchQuery,
  setSearchQuery
}) => {
  const getNoteCount = (cat: Category) => notes.filter(n => n.category === cat).length;

  return (
    <div className="w-64 h-full bg-slate-900 border-r border-slate-800 flex flex-col p-4">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/20">
          <Brain className="text-white" size={24} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-white">MindFlow</h1>
      </div>

      <button 
        onClick={onNewNote}
        className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 rounded-xl transition-all mb-6 shadow-lg shadow-indigo-600/20 active:scale-95"
      >
        <Plus size={20} />
        <span>Быстрая запись</span>
      </button>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input 
          type="text" 
          placeholder="Поиск в базе..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-slate-200"
        />
      </div>

      <div className="flex-1 overflow-y-auto space-y-1">
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-2 mb-2">Разделы</p>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              activeCategory === cat.id 
                ? 'bg-slate-800 text-white shadow-sm' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={activeCategory === cat.id ? cat.color : 'text-slate-500'}>
                {cat.icon}
              </span>
              {cat.label}
            </div>
            <span className="text-[10px] font-semibold bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 border border-slate-700">
              {getNoteCount(cat.id)}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-auto pt-4 border-t border-slate-800">
        <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
          <p className="text-xs font-semibold text-indigo-400 mb-1">Статус системы</p>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-3/4"></div>
          </div>
          <p className="text-[10px] text-slate-500 mt-2">Организовано на 75%</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
