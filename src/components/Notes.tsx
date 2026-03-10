import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  BookOpen,
  Calendar as CalendarIcon,
  X
} from 'lucide-react';
import { Note, Subject } from '../types';
import { LGS_SUBJECTS, SUBJECT_COLORS } from '../constants';

interface NotesProps {
  notes: Note[];
  onAddNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
}

export default function Notes({ notes, onAddNote, onDeleteNote }: NotesProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [search, setSearch] = useState('');
  const [newNote, setNewNote] = useState<Partial<Note>>({
    title: '',
    content: '',
    subject: 'Türkçe'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title || !newNote.content) return;
    
    onAddNote({
      ...newNote as Note,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString()
    });
    setIsAdding(false);
    setNewNote({ title: '', content: '', subject: 'Türkçe' });
  };

  const filteredNotes = notes.filter(n => 
    n.title.toLowerCase().includes(search.toLowerCase()) ||
    n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Notlarım</h2>
          <p className="text-slate-500 mt-1">Önemli bilgileri ve çalışma notlarını burada sakla.</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-brand-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-brand-200 hover:bg-brand-700 transition-all"
        >
          <Plus size={20} />
          Yeni Not
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Notlarda ara..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-brand-500 outline-none shadow-sm transition-all"
        />
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-slate-800">Yeni Not Ekle</h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Ders</label>
                <select 
                  value={newNote.subject}
                  onChange={(e) => setNewNote({...newNote, subject: e.target.value as Subject})}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {LGS_SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Başlık</label>
                <input 
                  type="text"
                  value={newNote.title}
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  placeholder="Not başlığı..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">İçerik</label>
                <textarea 
                  value={newNote.content}
                  onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                  placeholder="Not içeriği..."
                  rows={8}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                />
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-brand-600 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-brand-700 transition-all">
                  Notu Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.length > 0 ? (
          filteredNotes.map((note) => (
            <div key={note.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col group hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div 
                  className="px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase"
                  style={{ backgroundColor: SUBJECT_COLORS[note.subject] }}
                >
                  {note.subject}
                </div>
                <button 
                  onClick={() => onDeleteNote(note.id)}
                  className="text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{note.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-4 flex-1">{note.content}</p>
              <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                <div className="flex items-center gap-1">
                  <CalendarIcon size={12} />
                  {new Date(note.createdAt).toLocaleDateString('tr-TR')}
                </div>
                <button className="text-brand-600 hover:underline flex items-center gap-1">
                  <Edit3 size={12} /> Düzenle
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mx-auto mb-4">
              <BookOpen size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Henüz Notun Yok</h3>
            <p className="text-slate-500 mt-2">Ders çalışırken aldığın notları buraya ekleyebilirsin.</p>
          </div>
        )}
      </div>
    </div>
  );
}
