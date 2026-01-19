
import React from 'react';
import { Note, Category } from '../types';
import { FileText, Clock } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface NoteListProps {
  notes: Note[];
  activeNoteId: string | null;
  setActiveNoteId: (id: string) => void;
  category: Category;
}

const NoteList: React.FC<NoteListProps> = ({ notes, activeNoteId, setActiveNoteId, category }) => {
  const filteredNotes = notes
    .filter(n => n.category === category)
    .sort((a, b) => b.updatedAt - a.updatedAt);

  const categoryLabel = CATEGORIES.find(c => c.id === category)?.label || category;

  if (filteredNotes.length === 0) {
    return (
      <div className="w-80 border-r border-slate-800 bg-slate-900/50 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-slate-600">
          <FileText size={32} />
        </div>
        <h3 className="text-slate-400 font-medium">Раздел пуст</h3>
        <p className="text-xs text-slate-600 mt-1">Добавьте новую заметку в категорию «{categoryLabel}».</p>
      </div>
    );
  }

  return (
    <div className="w-80 h-full border-r border-slate-800 bg-slate-900/50 flex flex-col">
      <div className="p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
        <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
          {categoryLabel}
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredNotes.map((note) => (
          <button
            key={note.id}
            onClick={() => setActiveNoteId(note.id)}
            className={`w-full text-left p-4 border-b border-slate-800/50 transition-all hover:bg-slate-800/30 group ${
              activeNoteId === note.id ? 'bg-indigo-600/10 border-l-4 border-l-indigo-500' : 'border-l-4 border-l-transparent'
            }`}
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className={`text-sm font-semibold truncate ${activeNoteId === note.id ? 'text-indigo-400' : 'text-slate-200 group-hover:text-white'}`}>
                {note.title || 'Без названия'}
              </h3>
            </div>
            <p className="text-xs text-slate-500 line-clamp-2 mb-2 h-8 leading-relaxed">
              {note.content.replace(/[#*`]/g, '').substring(0, 100) || 'Нет содержимого...'}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                {note.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-1 text-[10px] text-slate-600">
                <Clock size={10} />
                {new Date(note.updatedAt).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
