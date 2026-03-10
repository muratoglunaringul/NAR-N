import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  BookOpen, 
  CheckCircle2, 
  PenLine, 
  BrainCircuit, 
  ChevronRight,
  LogOut,
  User,
  Settings,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Panel', icon: LayoutDashboard },
    { id: 'planner', label: 'Programım', icon: Calendar },
    { id: 'subjects', label: 'Konular', icon: BookOpen },
    { id: 'questions', label: 'Soru Takibi', icon: CheckCircle2 },
    { id: 'notes', label: 'Notlarım', icon: PenLine },
    { id: 'ai', label: 'Yapay Zeka', icon: BrainCircuit },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-200">
            <BrainCircuit size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800">LGS Pro</h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                activeTab === item.id
                  ? "bg-brand-50 text-brand-600 shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              )}
            >
              <item.icon size={20} />
              {item.label}
              {activeTab === item.id && (
                <motion.div
                  layoutId="active-pill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-600"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="bg-slate-50 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
              <User size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-800 truncate">Öğrenci Paneli</p>
              <p className="text-xs text-slate-500 truncate">8. Sınıf</p>
            </div>
            <button className="text-slate-400 hover:text-slate-600">
              <Settings size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <span>Uygulama</span>
            <ChevronRight size={14} />
            <span className="text-slate-800 font-medium capitalize">
              {menuItems.find(i => i.id === activeTab)?.label}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-2"></div>
            <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
              <LogOut size={18} />
              <span>Çıkış</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="max-w-6xl mx-auto"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
