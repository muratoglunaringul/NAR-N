
export type Subject = 'Türkçe' | 'Matematik' | 'Fen Bilimleri' | 'İnkılap Tarihi' | 'İngilizce' | 'Din Kültürü';

export interface Topic {
  id: string;
  name: string;
  subject: Subject;
  isCompleted: boolean;
}

export interface QuestionLog {
  id: string;
  date: string;
  subject: Subject;
  topicId: string;
  correctCount: number;
  wrongCount: number;
  emptyCount: number;
  notes?: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  subject: Subject;
  createdAt: string;
}

export interface StudyPlan {
  id: string;
  day: string;
  tasks: {
    subject: Subject;
    topic: string;
    duration: number; // minutes
    type: 'Konu Çalışma' | 'Soru Çözümü' | 'Deneme' | 'Tekrar';
  }[];
}

export interface UserState {
  name: string;
  targetPoints: number;
  dailyQuestionGoal: number;
}
