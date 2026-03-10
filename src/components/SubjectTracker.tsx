import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Circle, 
  ChevronDown,
  BookOpen
} from 'lucide-react';
import { Topic, Subject } from '../types';
import { LGS_SUBJECTS, SUBJECT_COLORS } from '../constants';

interface SubjectTrackerProps {
  topics: Topic[];
  onToggle: (id: string) => void;
}

export default function SubjectTracker({ topics, onToggle }: SubjectTrackerProps) {
  const [selectedSubject, setSelectedSubject] = useState<Subject | 'All'>('All');
  const [search, setSearch] = useState('');

  const filteredTopics = topics.filter(t => 
    (selectedSubject === 'All' || t.subject === selectedSubject) &&
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  const stats = LGS_SUBJECTS.map(s => {
    const subjectTopics = topics.filter(t => t.subject === s);
    const completed = subjectTopics.filter(t => t.isCompleted).length;
    return {
      name: s,
      total: subjectTopics.length,
      completed,
      percentage: subjectTopics.length ? Math.round((completed / subjectTopics.length) * 100) : 0
    };
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Konu Takibi</h2>
        <p className="text-slate-500 mt-1">LGS müfredatındaki tüm konular ve ilerleme durumun.</p>
      </div>

      {/* Subject Progress Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <button 
            key={i}
            onClick={() => setSelectedSubject(stat.name as Subject)}
            className={cn(
              "p-4 rounded-3xl border transition-all text-left",
              selectedSubject === stat.name 
                ? "bg-white border-brand-200 shadow-md ring-2 ring-brand-50" 
                : "bg-white border-slate-100 hover:border-slate-200 shadow-sm"
            )}
          >
            <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${SUBJECT_COLORS[stat.name as Subject]}15`, color: SUBJECT_COLORS[stat.name as Subject] }}>
              <BookOpen size={16} />
            </div>
            <p className="text-xs font-bold text-slate-800 truncate">{stat.name}</p>
            <div className="mt-3 flex items-end justify-between">
              <span className="text-lg font-bold text-slate-900">%{stat.percentage}</span>
              <span className="text-[10px] text-slate-400 font-medium">{stat.completed}/{stat.total}</span>
            </div>
            <div className="mt-2 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full transition-all duration-500" 
                style={{ width: `${stat.percentage}%`, backgroundColor: SUBJECT_COLORS[stat.name as Subject] }}
              />
            </div>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Konu ara..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setSelectedSubject('All')}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-bold transition-all",
                selectedSubject === 'All' ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              Hepsi
            </button>
            {/* Filter dropdown could go here */}
          </div>
        </div>

        <div className="divide-y divide-slate-50">
          {filteredTopics.length > 0 ? (
            filteredTopics.map((topic) => (
              <div 
                key={topic.id} 
                className="group flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => onToggle(topic.id)}
                    className={cn(
                      "transition-colors",
                      topic.isCompleted ? "text-emerald-500" : "text-slate-300 group-hover:text-slate-400"
                    )}
                  >
                    {topic.isCompleted ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                  </button>
                  <div>
                    <h4 className={cn("font-bold transition-all", topic.isCompleted ? "text-slate-400 line-through" : "text-slate-800")}>
                      {topic.name}
                    </h4>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-lg bg-slate-100 text-slate-500 mt-1 inline-block">
                      {topic.subject}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-xs font-bold text-brand-600 hover:underline">Not Ekle</button>
                  <button className="text-slate-400 hover:text-slate-600">
                    <ChevronDown size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-slate-500">
              Aradığınız kriterlere uygun konu bulunamadı.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
