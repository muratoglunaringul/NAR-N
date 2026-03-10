import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  Trash2, 
  Clock, 
  BookOpen, 
  ChevronRight, 
  RefreshCw, 
  Zap,
  Calendar,
  BrainCircuit
} from 'lucide-react';
import { motion } from 'motion/react';
import { generateStudyPlan } from '../services/gemini';
import { StudyPlan, Subject } from '../types';
import { LGS_SUBJECTS, SUBJECT_COLORS } from '../constants';

export default function StudyPlanner() {
  const [plan, setPlan] = useState<StudyPlan[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [goals, setGoals] = useState('Fen lisesi hedefliyorum, matematikte zorlanıyorum.');

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const result = await generateStudyPlan('Henüz başlangıç aşamasındayım.', goals);
      setPlan(result.plan);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Çalışma Programım</h2>
          <p className="text-slate-500 mt-1">Yapay zeka destekli, sana özel haftalık program.</p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={isLoading}
          className="bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-brand-200 hover:bg-brand-700 transition-all disabled:opacity-50"
        >
          {isLoading ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />}
          Program Oluştur
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
        <label className="block text-sm font-bold text-slate-700 mb-2">Hedeflerin ve Mevcut Durumun</label>
        <textarea 
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all"
          placeholder="Örn: Matematikte üslü sayılarda eksiğim var, günde 4 saat çalışabilirim..."
          rows={3}
        />
      </div>

      {plan.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plan.map((dayPlan, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden"
            >
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800">{dayPlan.day}</h3>
                <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded-lg">
                  {dayPlan.tasks.length} Görev
                </span>
              </div>
              <div className="p-4 space-y-3">
                {dayPlan.tasks.map((task, tIdx) => (
                  <div key={tIdx} className="group flex items-start gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                    <div 
                      className="w-1.5 h-10 rounded-full mt-1 shrink-0" 
                      style={{ backgroundColor: SUBJECT_COLORS[task.subject as Subject] }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-sm font-bold text-slate-800 truncate">{task.subject}</p>
                        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                          <Clock size={10} /> {task.duration} dk
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">{task.topic}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-medium">
                          {task.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
            <Calendar size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Henüz Programın Yok</h3>
          <p className="text-slate-500 max-w-xs mt-2">
            Yukarıdaki butona tıklayarak yapay zeka ile sana özel bir program oluşturabilirsin.
          </p>
        </div>
      )}

      {/* Learning Methods Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Pomodoro Tekniği', desc: '25 dk çalışma, 5 dk mola. Odaklanmanı artırır.', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-50' },
          { title: 'Feynman Tekniği', desc: 'Konuyu birine anlatır gibi açıkla. Eksiklerini gör.', icon: BrainCircuit, color: 'text-blue-500', bg: 'bg-blue-50' },
          { title: 'Aktif Hatırlama', desc: 'Okumak yerine sorularla kendini test et.', icon: Sparkles, color: 'text-emerald-500', bg: 'bg-emerald-50' },
        ].map((method, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex gap-4">
            <div className={cn("w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center", method.bg, method.color)}>
              <method.icon size={24} />
            </div>
            <div>
              <h4 className="font-bold text-slate-800">{method.title}</h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{method.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
