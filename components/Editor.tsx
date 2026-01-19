
import React, { useState, useEffect } from 'react';
import { Note, Category } from '../types';
import { CATEGORIES } from '../constants';
import { Save, Trash2, Tag, ChevronDown } from 'lucide-react';

interface EditorProps {
  note: Note;
  onUpdate: (note: Note) => void;
  onDelete: (id: string) => void;
}

const Editor: React.FC<EditorProps> = ({ note, onUpdate, onDelete }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [category, setCategory] = useState<Category>(note.category);
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    setCategory(note.category);
  }, [note.id]);

  const handleSave = () => {
    onUpdate({
      ...note,
      title,
      content,
      category,
      updatedAt: Date.now()
    });
  };

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      const newTags = Array.from(new Set([...note.tags, tagInput.trim().toLowerCase()]));
      onUpdate({ ...note, tags: newTags });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    onUpdate({ ...note, tags: note.tags.filter(t => t !== tag) });
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-900">
      <header className="h-16 border-b border-slate-800 px-6 flex items-center justify-between bg-slate-900/50 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="appearance-none bg-slate-800 text-xs font-semibold text-slate-300 px-3 py-1.5 pr-8 rounded-lg border border-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            >
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          </div>
          <div className="h-4 w-px bg-slate-800" />
          <div className="flex gap-1">
            {note.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 text-[10px] bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full">
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:text-white">&times;</button>
              </span>
            ))}
            <div className="flex items-center gap-1 ml-2">
              <Tag size={12} className="text-slate-500" />
              <input 
                type="text"
                placeholder="Тег..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={addTag}
                className="bg-transparent text-[10px] text-slate-400 focus:outline-none w-20"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all active:scale-95"
          >
            <Save size={14} />
            Сохранить
          </button>
          <button 
            onClick={() => onDelete(note.id)}
            className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
            title="Удалить заметку"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-12 max-w-4xl mx-auto w-full">
        <input 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Заголовок заметки..."
          className="w-full bg-transparent text-4xl font-bold text-white mb-8 focus:outline-none placeholder:text-slate-700"
        />
        <textarea 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Начните записывать ваши мысли..."
          className="w-full h-full min-h-[500px] bg-transparent text-slate-300 leading-relaxed focus:outline-none resize-none placeholder:text-slate-700"
        />
      </div>

      <footer className="p-4 border-t border-slate-800 bg-slate-900 text-[10px] text-slate-500 flex justify-between">
        <div className="flex gap-4">
          <span>Слов: {content.trim().split(/\s+/).filter(Boolean).length}</span>
          <span>Знаков: {content.length}</span>
        </div>
        <span>Обновлено: {new Date(note.updatedAt).toLocaleString('ru-RU')}</span>
      </footer>
    </div>
  );
};

export default Editor;
