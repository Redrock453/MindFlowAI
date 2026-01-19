
export type Category = 'Inbox' | 'Projects' | 'Areas' | 'Resources' | 'Archive' | 'Daily';

export interface Note {
  id: string;
  title: string;
  content: string;
  category: Category;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export interface Skill {
  id: string;
  name: string;
  prompt: string;
  icon: string;
  active: boolean;
}

export interface AppState {
  notes: Note[];
  skills: Skill[];
  activeNoteId: string | null;
  searchQuery: string;
}
