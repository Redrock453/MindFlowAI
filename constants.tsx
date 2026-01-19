
import React from 'react';
import { 
  Inbox, 
  Briefcase, 
  Target, 
  BookOpen, 
  Archive, 
  Calendar,
  Sparkles,
  Brain,
  Wand2,
  ListTodo
} from 'lucide-react';
import { Note, Skill, Category } from './types';

export const CATEGORIES: { id: Category; label: string; icon: React.ReactNode; color: string }[] = [
  { id: 'Inbox', label: 'Входящие', icon: <Inbox size={18} />, color: 'text-blue-400' },
  { id: 'Daily', label: 'Ежедневник', icon: <Calendar size={18} />, color: 'text-emerald-400' },
  { id: 'Projects', label: 'Проекты', icon: <Briefcase size={18} />, color: 'text-purple-400' },
  { id: 'Areas', label: 'Сферы', icon: <Target size={18} />, color: 'text-orange-400' },
  { id: 'Resources', label: 'Ресурсы', icon: <BookOpen size={18} />, color: 'text-cyan-400' },
  { id: 'Archive', label: 'Архив', icon: <Archive size={18} />, color: 'text-slate-400' },
];

export const INITIAL_SKILLS: Skill[] = [
  {
    id: '1',
    name: 'Авто-саммари',
    prompt: 'Сделай краткое резюме этой заметки в виде 3 ключевых тезисов.',
    icon: 'Sparkles',
    active: true
  },
  {
    id: '2',
    name: 'Список задач',
    prompt: 'Найди и выпиши все действия или задачи, упомянутые в этой заметке.',
    icon: 'ListTodo',
    active: true
  },
  {
    id: '3',
    name: 'Развитие идей',
    prompt: 'Развей идеи из этой заметки, предложив 3 креативных смежных концепции.',
    icon: 'Brain',
    active: false
  },
  {
    id: '4',
    name: 'Корректор',
    prompt: 'Проверь текст на ошибки и улучши стилистику изложения.',
    icon: 'Wand2',
    active: true
  }
];

export const INITIAL_NOTES: Note[] = [
  {
    id: 'welcome-note',
    title: 'Добро пожаловать в MindFlow AI',
    content: `# Добро пожаловать в ваш Второй Мозг! 🧠\n\nЭта система создана, чтобы помочь вам организовать жизнь по методологии PARA:\n\n- **Проекты (Projects)**: Активные задачи с дедлайном.\n- **Сферы (Areas)**: Долгосрочные зоны ответственности (Здоровье, Финансы).\n- **Ресурсы (Resources)**: Интересы и темы, которые вы изучаете.\n- **Архив (Archive)**: Завершенные проекты или неактивные сферы.\n\nИспользуйте Ассистента Gemini справа, чтобы анализировать и структурировать информацию!`,
    category: 'Inbox',
    tags: ['обучение', 'приветствие'],
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
];
