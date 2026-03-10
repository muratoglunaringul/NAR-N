import { Subject, Topic } from './types';

export const LGS_SUBJECTS: Subject[] = [
  'Türkçe',
  'Matematik',
  'Fen Bilimleri',
  'İnkılap Tarihi',
  'İngilizce',
  'Din Kültürü'
];

export const SUBJECT_COLORS: Record<Subject, string> = {
  'Türkçe': '#ef4444', // red-500
  'Matematik': '#3b82f6', // blue-500
  'Fen Bilimleri': '#10b981', // emerald-500
  'İnkılap Tarihi': '#f59e0b', // amber-500
  'İngilizce': '#8b5cf6', // violet-500
  'Din Kültürü': '#06b6d4' // cyan-500
};

export const INITIAL_TOPICS: Topic[] = [
  // Türkçe
  { id: 'tr-1', name: 'Fiilimsiler', subject: 'Türkçe', isCompleted: false },
  { id: 'tr-2', name: 'Sözcükte Anlam', subject: 'Türkçe', isCompleted: false },
  { id: 'tr-3', name: 'Cümlede Anlam', subject: 'Türkçe', isCompleted: false },
  { id: 'tr-4', name: 'Paragrafta Anlam', subject: 'Türkçe', isCompleted: false },
  // Matematik
  { id: 'mat-1', name: 'Çarpanlar ve Katlar', subject: 'Matematik', isCompleted: false },
  { id: 'mat-2', name: 'Üslü İfadeler', subject: 'Matematik', isCompleted: false },
  { id: 'mat-3', name: 'Kareköklü İfadeler', subject: 'Matematik', isCompleted: false },
  { id: 'mat-4', name: 'Veri Analizi', subject: 'Matematik', isCompleted: false },
  // Fen
  { id: 'fen-1', name: 'Mevsimler ve İklim', subject: 'Fen Bilimleri', isCompleted: false },
  { id: 'fen-2', name: 'DNA ve Genetik Kod', subject: 'Fen Bilimleri', isCompleted: false },
  { id: 'fen-3', name: 'Basınç', subject: 'Fen Bilimleri', isCompleted: false },
  { id: 'fen-4', name: 'Madde ve Endüstri', subject: 'Fen Bilimleri', isCompleted: false },
];
