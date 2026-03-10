import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { 
  Trophy, 
  Target, 
  Flame, 
  Clock, 
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import { SUBJECT_COLORS } from '../constants';
import { QuestionLog, Subject } from '../types';

interface DashboardProps {
  logs: QuestionLog[];
  dailyGoal: number;
}

export default function Dashboard({ logs, dailyGoal }: DashboardProps) {
  const today = new Date().toISOString().split('T')[0];
  const todayLogs = logs.filter(log => log.date === today);
  const todayTotal = todayLogs.reduce((acc, log) => acc + log.correctCount + log.wrongCount + log.emptyCount, 0);
  const progress = Math.min(Math.round((todayTotal / dailyGoal) * 100), 100);

  const subjectStats = logs.reduce((acc, log) => {
    if (!acc[log.subject]) {
      acc[log.subject] = { name: log.subject, total: 0, correct: 0 };
    }
    acc[log.subject].total += log.correctCount + log.wrongCount + log.emptyCount;
    acc[log.subject].correct += log.correctCount;
    return acc;
  }, {} as Record<string, { name: string, total: number, correct: number }>);

  const chartData = Object.values(subjectStats);

  const stats = [
    { label: 'Toplam Soru', value: logs.reduce((acc, l) => acc + l.correctCount + l.wrongCount, 0), icon: Target, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Doğru Oranı', value: `%${logs.length ? Math.round((logs.reduce((acc, l) => acc + l.correctCount, 0) / logs.reduce((acc, l) => acc + l.correctCount + l.wrongCount, 1)) * 100) : 0}`, icon: Trophy, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Çalışma Serisi', value: '5 Gün', icon: Flame, color: 'text-orange-600', bg: 'bg-orange-50' },
    { label: 'Bugün Çalışılan', value: '3.5 Saat', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Merhaba, Raif! 👋</h2>
          <p className="text-slate-500 mt-1">LGS hazırlık sürecinde harika ilerliyorsun. İşte bugünkü durumun.</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-slate-500">Hedef Puan</p>
          <p className="text-2xl font-bold text-brand-600">485.5</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center gap-4">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", stat.bg, stat.color)}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium">{stat.label}</p>
              <p className="text-xl font-bold text-slate-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Daily Goal Progress */}
        <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
          <h3 className="text-lg font-bold text-slate-800 mb-6 w-full text-left">Günlük Soru Hedefi</h3>
          
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={552.92}
                strokeDashoffset={552.92 - (552.92 * progress) / 100}
                className="text-brand-500 transition-all duration-1000 ease-out"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-slate-900">{todayTotal}</span>
              <span className="text-sm text-slate-500">/ {dailyGoal}</span>
            </div>
          </div>
          
          <div className="mt-8 w-full space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Kalan Soru</span>
              <span className="font-bold text-slate-800">{Math.max(0, dailyGoal - todayTotal)}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-500 transition-all duration-1000" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Subject Performance Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-slate-800">Ders Bazlı Performans</h3>
            <button className="text-sm text-brand-600 font-semibold flex items-center gap-1">
              Detaylar <ArrowUpRight size={16} />
            </button>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="total" radius={[6, 6, 0, 0]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={SUBJECT_COLORS[entry.name as Subject] || '#94a3b8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-6 grid grid-cols-3 gap-4">
            {chartData.slice(0, 3).map((data, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: SUBJECT_COLORS[data.name as Subject] }}></div>
                <span className="text-xs text-slate-500 font-medium truncate">{data.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Utility function for class merging (already defined in Layout but needed here if used)
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
