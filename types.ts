
export interface Verse {
  id: number;
  hindi: string;
  transliteration: string;
  translation: string;
}

export interface AppState {
  currentView: 'home' | 'chalisa' | 'counter' | 'calendar' | 'reflection';
  activeVerseIndex: number | null;
}

export interface NameEntry {
  id: number;
  name: string;
  meaning: string;
}
