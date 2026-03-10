import React, { useState } from 'react';
import { 
  Plus, 
  History, 
  TrendingUp, 
  AlertCircle,
  CheckCircle2,
  XCircle,
  MinusCircle,
  Calendar as CalendarIcon,
  Filter,
  BookOpen
} from 'lucide-react';
import { QuestionLog, Subject } from '../types';
import { LGS_SUBJECTS, SUBJECT_COLORS, INITIAL_TOPICS } from '../constants';

interface QuestionTrackerProps {
  logs: QuestionLog[];
  onAddLog: (log: QuestionLog) => void;
}

export default function QuestionTracker({ logs, onAddLog }: QuestionTrackerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newLog, setNewLog] = useState<Partial<QuestionLog>>({
    subject: 'Matematik',
    date: new Date().toISOString().split('T')[0],
    correctCount: 0,
    wrongCount: 0,
    emptyCount: 0,
    topicId: INITIAL_TOPICS[0].id
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddLog({
      ...newLog as QuestionLog,
      id: Math.random().toString(36).substr(2, 9)
    });
    setIsAdding(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Soru Takibi</h2>
          <p className="text-slate-500 mt-1">Çözdüğün soruları kaydet, yanlışlarını analiz et.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg hover:bg-slate-800 transition-all"
        >
          <Plus size={20} />
          Yeni Kayıt
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Soru Çözüm Kaydı</h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ders</label>
                  <select 
                    value={newLog.subject}
                    onChange={(e) => setNewLog({...newLog, subject: e.target.value as Subject})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    {LGS_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tarih</label>
                  <input 
                    type="date"
                    value={newLog.date}
                    onChange={(e) => setNewLog({...newLog, date: e.target.value})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Konu</label>
                <select 
                  value={newLog.topicId}
                  onChange={(e) => setNewLog({...newLog, topicId: e.target.value})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {INITIAL_TOPICS.filter(t => t.subject === newLog.subject).map(t => (
                    <option key={t.id} value={t.id}>{t.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-emerald-600 uppercase mb-1">Doğru</label>
                  <input 
                    type="number"
                    value={newLog.correctCount}
                    onChange={(e) => setNewLog({...newLog, correctCount: parseInt(e.target.value) || 0})}
                    className="w-full p-3 bg-emerald-50 border border-emerald-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-red-600 uppercase mb-1">Yanlış</label>
                  <input 
                    type="number"
                    value={newLog.wrongCount}
                    onChange={(e) => setNewLog({...newLog, wrongCount: parseInt(e.target.value) || 0})}
                    className="w-full p-3 bg-red-50 border border-red-100 rounded-xl outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Boş</label>
                  <input 
                    type="number"
                    value={newLog.emptyCount}
                    onChange={(e) => setNewLog({...newLog, emptyCount: parseInt(e.target.value) || 0})}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-slate-800 transition-all">
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* History List */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-800 flex items-center gap-2">
            <History size={18} /> Son Çözülenler
          </h3>
          <button className="text-slate-400 hover:text-slate-600">
            <Filter size={18} />
          </button>
        </div>
        <div className="divide-y divide-slate-50">
          {logs.length > 0 ? (
            logs.slice().reverse().map((log) => (
              <div key={log.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm"
                    style={{ backgroundColor: SUBJECT_COLORS[log.subject] }}
                  >
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{log.subject}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                      <CalendarIcon size={12} />
                      <span>{log.date}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                      <span>{INITIAL_TOPICS.find(t => t.id === log.topicId)?.name}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Doğru</p>
                    <p className="text-lg font-bold text-emerald-600">{log.correctCount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Yanlış</p>
                    <p className="text-lg font-bold text-red-500">{log.wrongCount}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Boş</p>
                    <p className="text-lg font-bold text-slate-400">{log.emptyCount}</p>
                  </div>
                  <div className="h-8 w-px bg-slate-100 mx-2"></div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Başarı</p>
                    <p className="text-lg font-bold text-slate-800">
                      %{Math.round((log.correctCount / (log.correctCount + log.wrongCount + log.emptyCount || 1)) * 100)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-slate-400">
              Henüz soru kaydı bulunmuyor.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
