
import React, { useState, useEffect } from 'react';
import { Note, Skill, Category } from './types';
import { INITIAL_NOTES, INITIAL_SKILLS } from './constants';
import Sidebar from './components/Sidebar';
import NoteList from './components/NoteList';
import Editor from './components/Editor';
import Assistant from './components/Assistant';
import { Brain, Sparkles, Info } from 'lucide-react';

const App: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('mindflow-notes');
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });
  
  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem('mindflow-skills');
    return saved ? JSON.parse(saved) : INITIAL_SKILLS;
  });

  const [activeNoteId, setActiveNoteId] = useState<string | null>(notes[0]?.id || null);
  const [activeCategory, setActiveCategory] = useState<Category>('Inbox');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('mindflow-notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('mindflow-skills', JSON.stringify(skills));
  }, [skills]);

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Math.random().toString(36).substring(7),
      title: 'Новая заметка',
      content: '',
      category: activeCategory,
      tags: [],
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleUpdateNote = (updatedNote: Note) => {
    setNotes(notes.map(n => n.id === updatedNote.id ? updatedNote : n));
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
    if (activeNoteId === id) setActiveNoteId(null);
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const activeNote = notes.find(n => n.id === activeNoteId) || null;

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 overflow-hidden">
      <Sidebar 
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        notes={notes}
        onNewNote={handleCreateNote}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="flex-1 flex overflow-hidden">
        {searchQuery ? (
          <NoteList 
            notes={filteredNotes} 
            activeNoteId={activeNoteId} 
            setActiveNoteId={setActiveNoteId} 
            category={activeCategory}
          />
        ) : (
          <NoteList 
            notes={notes} 
            activeNoteId={activeNoteId} 
            setActiveNoteId={setActiveNoteId} 
            category={activeCategory}
          />
        )}

        <div className="flex-1 flex flex-col relative">
          {activeNote ? (
            <Editor 
              note={activeNote} 
              onUpdate={handleUpdateNote} 
              onDelete={handleDeleteNote} 
            />
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-600 p-12 text-center">
              <div className="w-24 h-24 bg-slate-900 rounded-full flex items-center justify-center mb-6 shadow-xl border border-slate-800">
                <Brain size={48} className="text-slate-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-400 mb-2">Выберите или создайте заметку</h2>
              <p className="max-w-xs text-sm">Организуйте свои проекты, ресурсы и идеи, используя структуру PARA и помощь ИИ.</p>
              
              <div className="mt-12 grid grid-cols-3 gap-4 max-w-2xl">
                {[
                  { icon: <Sparkles />, title: "ИИ-Ассистент", desc: "Общайтесь со своей базой знаний на естественном языке." },
                  { icon: <Brain />, title: "Движок навыков", desc: "Автоматизируйте резюме, списки задач и генерацию идей." },
                  { icon: <Info />, title: "Метод PARA", desc: "Структурированные знания для высокой продуктивности." }
                ].map((feature, i) => (
                  <div key={i} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 text-left hover:border-indigo-500/30 transition-all group">
                    <div className="text-indigo-500 mb-3 group-hover:scale-110 transition-transform">{feature.icon}</div>
                    <h3 className="text-xs font-bold text-slate-300 mb-1">{feature.title}</h3>
                    <p className="text-[10px] text-slate-500 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Assistant notes={notes} activeNote={activeNote} skills={skills} />
      </main>
    </div>
  );
};

export default App;
